---
title: "Drafting a Data Leak"
date: "04-09-2026"
excerpt: "Exploiting an email preview API to bypass CRM access controls"
category: "CYBERSEC"
readTime: "10 min"
---

> **TL;DR:** Found a template rendering vulnerability in a CRM application, which gave a low privileged user access to admin owned PII.

Since January, my HackerOne inbox had turned into: Duplicate, Duplicate, Duplicate. Over 15 reports straight. This time I was hunting on a program that had just rolled out a massive new version with shiny new features. More over the older version was not completely deprecated, which meant even more complex systems handling both of these. This is exactly a hacker's playground.

# As Always...
And indeed that was the case, one of the older endpoints for retrieving all the contacts of customers and employees had no auth checks. Meaning any low privileged employee could access complete PII of hundreds of victims in one API call. I found a few more such endpoints missing auth checks and reported them all and... *marked as duplicate*. That was too easy, not just for me but for other hackers and automated scanners continuously hammering these programs 24x7. I kind of expected that since it had been a while since they migrated to newer version, it was natural for these simple findings to be found.

Then I started looking deeper for more complex interactions and then stumbled across this innocent looking email template functionality. 

# A Template for Disaster
Like other enterprise CRMs (Customer Relationship Management applications), it had robust visibility model. Say there is a super admin, Alice, and some sales rep Bob. If Alice owns some customer or employee records, Bob won't even know if they exist let alone access.

So back to email templates.
The way it worked was, Bob could create templates for emails and use them for sending mass emails to contacts he has access to. So something like,

```
Dear {{contact.name}}
Your order will be delivered to {{contact.address}} blah blah
Thank you
```

And there was a preview option, which allowed Bob to view this email for any of his owned contacts without actually sending it.
I captured this request, it was something like this.
```http
POST /api/v2/template-preview
{
  "templateId": 13371337,
  "contactEmail": "contact123@example.com"
}
```
I tried modifying the `contactEmail` field to some admin owned contact's email, but it gave `403` forbidden. The auth checks were set up correctly. But then through their documentation, I discovered a similar endpoint from the older version. I tried the same thing, and guess what? No checks, `200 OK` with all the fields filled in.

And I also found that there were over 100 fields ranging from first, last names, mobile phone numbers to city, zip code, address, etc. So Bob could now just create a template like

```
Name: {{contact.firstname}} {{contact.lastname}}
Phone: {{contact.phone}}
City: {{contact.city}}
Zip: {{contact.zip}}
Address: {{contact.address}}
...
(all the fields available in the documentation)
```

So by simply iterating through known employee or customer emails, a low privileged user could script this endpoint to systematically harvest PII they were explicitly unauthorized to access.

# Triage (~~severity rollercoaster~~)
I submitted it on HackerOne, and a triage analyst picked up the report. Over the next few days discussing a few things, he assigned a `CVSS vector` and a score of **7.1 (High)**, the report was forwarded to the program for internal review.

A week later the company staff acknowledged the missing authorization checks and promised a fix, but downgraded the severity from **High** to **Low**. I did ask about the assessment, and mentioned the severity suggested by the HackerOne analyst. But the staff simply stated, "This requires prior portal access". Well sure, but that doesn't change the `CVSS vector` and the score, not to **Low** at least. They never provided their CVSS assessment or precise reasoning behind the downgrade.

The program rewarded with a bounty, and there it was, my first triaged report on HackerOne. 
Didn't quite match the expectations, but honestly it wasn't a duplicate, so yeah... 

# The Takeaway

Nevertheless it was a new experience coordinating with the h1 triagers and the program staff.

If you are also into bug bounty hunting or web security, these are the kind of vulnerabilities you should look for. Automated AI scanner agents are good at finding low hanging fruits, but exploiting a weird broken access control or a business logic flaw requires human reasoning and creativity.

Happy Hacking.