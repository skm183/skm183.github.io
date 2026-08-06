---
title: "Counting Bytes - Blind SQLi ft. Binary Search"
date: "06-08-2026"
excerpt: "Turning a 3 KB difference into a data leak."
category: "CYBERSEC"
readTime: "6 min"
---

> **TL;DR:** Found a boolean based blind SQL injection on an `iitk.ac.in` subdomain. Bypassed quote restrictions, turned a subtle response length difference into a yes/no oracle, and optimized the data extraction using binary search. Reported, patched, and verified within 48 hours.

So I've been practicing web exploitation for quite a while now. And I think its the time to start maintaining a digital diary here of my reports in the form of these blogs. I'll start from scratch so you don't need to know literally anything beforehand.

At its core, most web vulnerabilities occur when some unsanitized user input flows directly into the system, when the server trusts the user too much. A malicious user can then modify these usual inputs into something totally different and trick the system into doing something unintended.

With that mind let's dive into the details of the report now. 

# The Entry Point
There was this one endpoint in of the subdomains of `iitk.ac.in`. Let's start with understanding what is an SQLi (SQL Injection) first.
```
https://<redacted>.iitk.ac.in/some_path?id=1
```
That part after the `?` is called a **query parameter**. Web apps use parameters like `id=1` to request specific data from the backend database for example, *"fetch article #1"* or *"display category #1"*.

 I tried changing it to `?id=1'`, notice the `'` after `1`. If this was being passed into SQL directly the query would become something like
```sql
SELECT something FROM some_table WHERE id=1'
```
Because SQL expects quotes to open and close string literals, leaving a trailing single quote breaks the query's syntax. 

And yes indeed that was the case and instead of the normal response I got 500 internal server error.

There we have it, an SQLi. 


# The Blind Oracle
Now normally what we could do is after this inject some payload to get more information like say,
```sql
?id=-1 UNION SELECT 1, @@version, database() --
```
and the page would display those details after breaking out of the intended query. But this one doesn't reflect any result from the queries. So how do you exploit it? 

Enter the blind SQLi. 

So we can't read data directly but often there are other side channels which we can use. So I tried these next and noticed the difference in response size:
1. `?id=1 AND 1=1` -> 7,75,328 bytes (same as original)
2. `?id=1 AND 1=2` -> 7,72,228 bytes (hmm some data got stripped off)
3. `?id=1 OR 1=1` -> 8,30,294 bytes (a lot more data)

There is our side channel the response length. Blind SQLi confirmed.

# Okay, so what?
Now before we report any vulnerability we need to demonstrate impact if it all it actually has some.

So how do we exploit it?

You must have a played this yes/no game as a child where you try to guess some info just by asking yes no questions. That's exactly what we'll do.

Suppose we want to guess the database name character by character. We can inject:
```sql
?id=1 AND ASCII(SUBSTRING(DATABASE(),1,1))=97
```
This asks: *"Is the ASCII value of the 1st character of the database name equal to 97 (`'a'`)?"*.

Notice that we're using numerical ASCII codes instead of string quotes like `'a'`. The application actually tried to block SQLi by filtering single quotes (which caused 500 errors). Bypassing these input filters was as simple as using integer comparisons and functions like `ASCII()` and `SUBSTRING()`.

# Optimizing...
Let's do some quick math on extracting data character by character.

Suppose the database name is 40 characters long. If we restrict our search space to alphanumeric characters (26 lowercase + 26 uppercase + 10 digits = 62 possibilities per character):

$$\text{Linear Brute Force} = 40 \times 62 = 2,480 \text{ requests}$$

2,480 HTTP requests just for a database name is slow, noisy, and practical only for smaller targets.

If you remember your ESC111 trauma/nostagia or have done some competitive programming, you probably will be screaming internally for **Binary Search** by now.

Since ASCII values are naturally sorted numbers ($32$ to $126$), we don't need to check every character one by one. Instead of asking *"Is it 97?"*, we ask higher/lower questions:

```sql
-- Is the ASCII value greater than 80?
?id=1 AND ASCII(SUBSTRING(DATABASE(), 1, 1)) > 80
```
Each question cuts our search space in half:

$$\log_2(62) \approx 6 \text{ queries per character}$$

$$\text{Binary Search Total} = 40 \times 6 = 240 \text{ requests}$$

That's a **10x reduction in requests** taking data extraction from minutes down to seconds.

Competitive programming does have some real life applications I guess. ~~joke ofc~~.

# Verification & Responsible Disclosure
Using all this, I confirmed the database name, current user, DBMS version, and total table count. 

All testing was ended once sufficient proof of concept evidence was gathered. No credentials, sensitive user data was dumped or modified.

### Timeline

| Event | Date & Time |
| :--- | :--- |
| **Reported** | July 20, 2026 - 19:03 IST |
| **First Triage Response** | July 20, 2026 - 21:55 IST |
| **Patched** | July 22, 2026 - 10:18 IST |
| **Patch verified, requested public disclosure** | July 22, 2026 - 15:00 IST |
| **Public Disclosure Granted** | July 23, 2026 - 10:13 IST |

### Fix
The affected parameter now only accepts integers and strictly rejects any other values.

Huge thanks to ddia@iitk.ac.in, cybersecurity@iitk.ac.in and the concerned department for the blazing fast triage.

This is a reminder that SQL injection, one of the oldest vulnerabilities in the book, remains alive and well, hiding in plain sight behind a page that looks like it was built decades ago.

Happy Hacking.

