---
title: "Slack’s threads are terrible for accessibility"
description: "Slack’s threads might as well not exist — just like an accessible education for disabled students at Brandeis."
date: 2020-10-23
updated: 2020-10-25
---

*Note: This article was originally written as an analysis of Slack's
collaborative features.*

Slack's lackluster implementation of threading shapes the rest of its
collaborative features, largely nullifying them. Slack gives users the
*ability* to reply to messages, creating a thread. I say *ability* because
that's all it is: a possibility that technically exists.

But what do Slack's threads give us, and what do we want from them? They can't
be organized; for one, there's no way to move a thread from one channel to
another where it might more accurately belong, and there's also no way to
categorize, sort, or browse threads. Slacks' threads are branches off of a
*conversation,* not groups and bases of knowledge like they can become in a
[phpbb][phpbb] or similar. For instance, threads can't be tagged, and it's
difficult to add additional context to a thread — messages can't be pinned to a
thread, not that it would really matter, because there's no way to search a
thread. The link between a thread and its channel is tenuous as well; there's
no notifications for new threads or messages in threads you're not "following,"
so unless you never miss a Slack message (difficult in general, especially if
you're attempting to enforce any sort of work-life boundaries) it's easy to
miss even large, active threads. On the flip side, when participating in a
thread, replies are easily lost for the rest of the channel among a flurry of
other messages unless you (tediously) check “also send to channel” every time
you message — and these downfalls are compounded by the plethora of niche
single-purpose channels Slack encourages users to create; users have to check
each channel manually without the advantages of a unified feed where they can
see, sort, and filter all messages.

It's not like I'm the first person to point out these flaws, either;
[Twist][Twist], the Slack-replacement messaging and communication software from
Doist (the company behind [Todoist][Todoist]), capitalizes on Slack's
shortcomings by prominently advertising searchability, organization, threading,
and archival features in Twist — it's just too easy to lose information in
Slack.

Slack's tools for coreferencing — that is, enabling two or more people to
"point to" the same thing — are rudimentary at best, largely because Slack has
no concept of context within the application. There's no concept of tabs and
the “history” feature, which I discovered while writing this article — is
next-to-useless because it browses through the entire application's state;
there's no way to go back and forward within a chat, panel, or sidebar. Even
early browsers understood that we'd want to look at multiple webpages at once
by opening multiple windows, but modern communication applications refuse the
possibility entirely — Slack, Discord, Signal, Telegram, and even Tinder
flat-out-refuse to be viewed twice at once; the idea that a user would want to
carry on multiple conversations at once without having to switch windows or
views has seemingly never occurred to the designers or developers.

As a result, coreferencing is nearly-impossible, because Slack and its ilk
prevent users from talking to a person or group of people while looking at
something else — and especially while looking at multiple other things.

These shortcomings seem particularly ironic given that Slack is allegedly
designed to “bring teams together” and to enhance and streamline collaboration
within corporations — did Slack's developers not notice all the ways their own
application got in the way of actually collaborating? (It wouldn't be too
surprising, though, coming from a company which branded itself an expert on
remote work at the start of a pandemic despite having previously forbidden
remote work entirely.)

All of these particular faults make Slack inaccessible for people with ADHD and
other disabilities — each place I need to check for messages takes more
[spoons][spoon-theory], until some days even the concept of opening Slack is
more daunting and tiring than my disability allows. William Dodson M.D. notes
[in an article for Additude][adhd-in-adults] that “when people with ADHD are
not in The Zone, in hyperfocus, they have four or five things rattling around
in their minds, all at once and for no obvious reason, like five people talking
to you simultaneously. Nothing gets sustained, undivided attention. Nothing
gets done well.” Slack compounds this effect by presenting notifications in a
chaotic, largely unordered interface, where there's no way to check items off
(or control how items get checked off), where each notification is presented
largely without context (because — remember? — threads can't be titled,
renamed, or tagged), and where notifications are scattered across the
application in an unpredictable, high-effort spread — threads, mentions, and
reactions only account for a small portion of what I'm expected to “keep up
with” in a Slack workspace; I need to check each channel with new messages
(which, usually, is all of them) manually, as well as direct messages, and
perhaps I additionally have to follow up on other tasks that people haven't
replied to (and, of course, Slack gives me no tools for managing these).

[ADHD is a life-altering disability on its own,][gravis-adhd] and it's
frustrating to be surrounded by tools and systems — particularly those, like
Slack, that I'm forced to use for school or work, and particularly those, like
Slack, which have proprietary applications and no other way to connect through
more accessible services (like the IRC bridge [that Slack shut down in
2018,][slack-irc-eol] long before [even attempting to make the first-party
Slack applications usable for blind people with screen
readers][slack-screen-reader-a11y]). And honestly, I'm tired of being pushed
out of spaces — like this class, for instance — that I should be able to
participate in, vibrantly and frequently, because the tools and platforms are
so hostile to [the fundamental way my brain works.][why-i-procrastinate] I want
to participate. I want to talk. And I'm sick of being told to just deal with
inaccessible classes, both by professors unwilling to put in extra work or
restructure a class to allow the most vulnerable students to engage and by a
student accessibility services department uninterested in doing anything except
shunting responsibility for fixing accessibility issues onto students already
overworked and exhausted from our disabilities and classwork. Just like I said
in The Hoot this Spring, Brandeis — *all* of Brandeis, from the students and
staff to the faculty and administration — [is failing our disabled
students.][brandeis-failing-disabled-students] Or, in other words, looking back
in the archives, [nothing has changed in 14 years][brandeis-fight-song-parody],
as Michael Sitzman lamented in a 2006 parody of the Brandeis fight song, “Why,
at a school committed to equality, / Have I now lost three friends to
disability?” There's a reason that [a 2013 study published in the Journal of
Abnormal Child Psychology][adhd-graduation-rates] found that “15% of the young
adults \[ages 23–32\] with ADHD held a four-year degree compared to 48% of the
control group” (i.e. that young adults with ADHD are 3 times less likely to
hold a four-year degree), with even worse disparity for graduate degrees (0.06%
for young adults with ADHD and 5.4% otherwise, a 90-fold difference).

[phpbb]: https://www.phpbb.com/
[Twist]: https://twist.com/home
[Todoist]: https://todoist.com/home
[spoon-theory]: https://butyoudontlooksick.com/articles/written-by-christine/the-spoon-theory/
[adhd-in-adults]: https://www.additudemag.com/adhd-in-adults-nervous-system/
[gravis-adhd]: https://gekk.info/articles/adhd.html
[slack-irc-eol]: https://web.archive.org/web/20180307125841/https://get.slack.help/hc/en-us/articles/201727913-Connect-to-Slack-over-IRC-and-XMPP
[slack-screen-reader-a11y]: https://web.archive.org/web/20190325002116/https://www.reddit.com/r/Blind/comments/80ql6f/slack_taking_steps_to_improve_screen_reader/
[why-i-procrastinate]: https://invisibleup.com/articles/27/
[brandeis-failing-disabled-students]: /brandeis/brandeis-is-failing-its-disabled-students/
[brandeis-fight-song-parody]: http://www.thebrandeishoot.com/articles/1301
[adhd-graduation-rates]: https://link.springer.com/article/10.1007/s10802-012-9658-z#Sec8
