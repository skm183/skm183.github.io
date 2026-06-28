---
title: "The Ghost Print 2"
date: "28-06-2026"
excerpt: "From a hacky fix to a mainline Linux driver."
category: "KERNEL"
readTime: "4 min"
---

> **TL;DR:** My "Ghost Print" hack worked for me, but to get it accepted into `libfprint`, well a *little* more had to be done. And when I say a little I mean, discovering an undocumented `0xac` mass-erase command, writing a proper subclass, fighting meson build systems, and surviving CI failures. Five months later, the driver is merged and running on Linux distros worldwide.

In my last blog, I bruteforced my way into my locked Samsung fingerprint reader (`Focaltech 0x6553`) by injecting a fake fingerprint file. It tricked the Linux daemon into letting me log in. 

It was a fun reverse engineering heist, but open-source maintainers do not merge hacky fixes. To get this upstreamed into `libfprint` and mainline Linux, I had to solve the root problem. The device's storage was full, and it fundamentally lacked the hardware feature to list or delete individual prints.

I had to figure out how Windows handles this broken hardware. So, I fired up `wireshark` to sniff the USB packets on a Windows VM, installed the drivers, and triggered a fingerprint wipe but the sensor didn't respond. I have no idea why this won't work even today, but I'm guessing it requires the host to have a working driver to allow pass through, I'm not really sure. Let me know in the comments if you have an idea about it. So I was stuck, until another contributor shared a clear storage command, `0xac`.

Now I had the magic byte. But integrating it into a massive, strict C codebase like `libfprint` was a different beast. I couldn't just throw the `0xac` payload into the main Focaltech driver. Doing so would break older sensors that *do* support individual deletes. I wrote some code that was still very hacky. It was in the same class as the original supported driver, a bunch of `if` statements everywhere to keep the logic of this device separated, and I basically just overwrote the `delete callback` to perform mass erase instead. This was not how open source libraries maintain code, so the maintainer suggested a few structural changes.

Honestly sometime around this, the MR review process felt tiring. Going back and forth on C architecture and hardware testing was exhausting and I had almost stopped caring. 

Then I saw a few different developers actively testing the GitLab MR, reporting back with their device details, and confirming it brought their dead hardware back to life. One of them even created [a GitHub repo](https://github.com/xCaptaiN09/samsung-galaxybook4-fingerprint-linux) citing my username and the MR. They had taken my patch, compiled it, and created step by step workarounds to get it running on Arch, Ubuntu, and Fedora.

I wasn't just writing code to fix my laptop's sensor anymore. A whole community of Linux users was struggling with the same exact problem. That was all the motivation I needed to get this across the finish line.

Five months in. The code was perfect. I pushed the final commit. The GitLab pipeline spun up, basic checks passed, now all that was left was to wait. Shortly after that, the email came in. 

**Merged.**

The maintainer added a few fixes, and merged it finally. They pointed out a few additional changes to make it better but for now it is functional.

It took a few months of building, debugging and questioning my existence. But today, if you install Linux on one of these laptops, the fingerprint reader just works natively. I guess now I can say that I have finally left my *fingerprint* on upstream Linux... 

[View merge request on GitLab](https://gitlab.freedesktop.org/libfprint/libfprint/-/merge_requests/554)