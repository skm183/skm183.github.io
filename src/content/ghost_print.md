---
title: "The Ghost Print"
date: "22-12-2025"
excerpt: "Stealing my own fingerprints from a locked sensor chip."
category: "KERNEL"
readTime: "6 min"
---

> **TL;DR** for those running on `O(1)` time: My laptop's fingerprint reader (`Focaltech 0x6553`) crashed standard Linux drivers with an undocumented `0x09` status code. After patching the crash, I hit a firmware bug that locked me out of enrolling or deleting prints. I fixed it by reverse-engineering the `fprintd` verification flow and injecting a fake "ghost" fingerprint file to trick the daemon into talking to the locked hardware.

# Chapter 1: The Unsupported Hardware
It all began with a classic Linux problem: I got a new Samsung laptop, installed Arch (*btw*), and everything worked after a **little** fixing—well, except for the fingerprint reader. "Just install `libfprint`," I thought. "It's standard."

I was wrong.

It turned out libfprint didn't support my reader, a `Focaltech FT9365 ESS (vid:2808, pid:6553)`. So I decided to add the support myself. How hard could it be? (~~Famous last words~~).

I added the device ID to the existing Focaltech driver and compiled the build. I ran the test script, expecting either a success or a simple error.

Instead, the driver crashed.

I created an issue on the official repo. Days passed until someone mentioned my issue in their merge request; they had added an additional `udev` power-fixing rule
that made their reader work.

I quickly added it for my variant too. It still returned `"Can't get response!!"`, but debugging showed it was actually returning a `0x09` status code, whereas the driver expected `0x04`. I modified the code to accept that as well, and finally, it was communicating instead of ignoring commands.

# Chapter 2: Error 0x09
Deep diving into the debug logs revealed something strange in the initialization sequence. The driver state machine (`SSM`) sends a command to list existing prints. The device responded with status code `0x09` and a tiny, truncated packet of only **6 bytes**.

The standard driver code expected a full list of fingerprints. When it tried to parse this tiny 6-byte packet, it read out of bounds and panicked.

The status `0x09` wasn't documented in the open-source driver. It likely meant "Busy" or "Locked," common in Windows-native hardware that retains state across reboots.

To stop the crash, I wrote a patch in C. The logic was simple: if we see `0x04`, read it normally. If we see `0x09`, don't try to parse it. Instead, zero out the memory and pretend the list is empty.

```c
if (fp_cmd->code == 0x04)
    memcpy (&data->enrolled_info->items[0], items,
            FOCALTECH_MOC_MAX_FINGERS * sizeof (struct EnrolledInfoItem));
else if (fp_cmd->code == 0x09)
    memset (&data->enrolled_info->items[0], 0,
            FOCALTECH_MOC_MAX_FINGERS * sizeof (struct EnrolledInfoItem));

fpi_ssm_next_state (self->task_ssm);
```

I compiled, installed, and ran the test. **SUCCESS**! The driver initialized without crashing! I enrolled my finger, verified the match, and everything seemed to work. I put up a merge request and started enjoying my fingerprint logins.

> A contributor later clarified that 0x09 actually means 'Command Not Supported.' This was a revelation: The device wasn't busy; it was functionally lobotomized. It literally didn't support the command to list its own users. So the patch wasn't just bypassing an error; it was handling a missing hardware feature.

# Chapter 3: The Storage Dead End
One of the maintainers reviewed my merge request and asked me to include a test capture to verify stability. I added the tests and tried capturing, but every time I tried, the "delete fingerprint" functionality failed.

I kept tweaking the code and re-running the tests. Eventually, I hit the hardware's 10/10 storage limit. Only the first slot held my valid fingerprint; the rest were junk data from failed enrollment attempts.

I wrote a quick Python script to delete each one manually. The script returned "Success" for every command, but the prints remained on the device. Worse, in the process, I accidentally deleted the valid record from my **system's** memory.

That's when I realized the trap: To delete a fingerprint, the driver needs the correct `User ID` associated with that print. My patch in Chapter 2 (`memset 0`) wiped all the metadata to zero to prevent the crash. The driver was sending "Delete User ID 0," and the firmware saw the ID mismatch and silently rejected the deletion—while the driver blissfully reported success.

I was stuck. I couldn't enroll (storage full) and I couldn't delete (missing metadata). The hardware was bricked by its own security.

# Chapter 4: The "Ghost Print" Heist
I took a step back and looked at how verification works.

Even though the OS said "No fingerprints enrolled," the device storage was full. This is a **Match-on-Chip** device, meaning the verification happens on the hardware, not in the OS. The system's memory was empty, but the device still held all 10 prints (including my one valid finger buried among the garbage).

Fingerprint verification is usually a **1:N** operation. You place your finger, and the chip compares it against all stored templates. It doesn't ask "Is this Sid?", it asks "Is this anyone I know?"

That was the breakthrough.

This meant I didn't need to enroll a new finger. I just needed to access the ones already on the chip.

The problem was `fprintd`. The system daemon refuses to start verification unless it believes you have a finger enrolled. It checks its own internal storage (`/var/lib/fprint/...`), sees nothing, and disables the feature.

**The Plan**: Inject a fake fingerprint into the system database.

I wrote a Python script that connected to the device, cloned the raw print object stored on the chip (even with the zeroed metadata), and forced the metadata to match my User ID and a specific finger. Finally, I serialized this object into a binary file.


```py
# Access the device
prints = device.list_prints_sync()
target = prints[0] # Get the first print slot
target.set_username("sid")
target.set_finger(FPrint.Finger.RIGHT_INDEX)
target.set_description("Ghost Print") # Unnecessary but why not xD
data = target.serialize()
# ...save to disk
```

I stored this file directly into `fprintd`'s private directory: `/var/lib/fprint/sid/focaltech_moc/0/right-index-finger`. (I also created copies named 1, 2, etc., to satisfy `fprintd`'s naming conventions).

I restarted the daemon and ran `fprintd-verify`. The moment of truth. The terminal prompted: *Place your right index finger on the fingerprint reader.*

I touched the sensor...

```
Verify result: verify-match (done)
```

IT WORKED!!

The Linux daemon thought it was verifying against a local file (the injected "ghost print"), but the driver successfully triggered the hardware, which verified against the chip's internal storage.

And just like that, I have a *completely* functional... okay, maybe *mostly* functional... fingerprint sensor.

Sometimes, you don't need to reverse-engineer the entire firmware. You just need to trick the poor machine into letting you win ;)

> If you are stuck with the same sensor or just want to see my messy code in all its glory, you can check out my [Merge Request on GitLab](https://gitlab.freedesktop.org/libfprint/libfprint/-/merge_requests/554).