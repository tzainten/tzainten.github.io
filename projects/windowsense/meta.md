---
title: WindowSense
description: A small program that automatically blanks out empty monitor screens.
role: Sole Developer
dev-time: 1 week
dev-time-extra: ~2 months occasional bug fixing
tools: C++, Windows API, Git
source: "[GitHub](https://github.com/tzainten/windowsense)"
---

### The Goal

I made this program because I found myself putting things like YouTube on my extra monitors just because they were empty. 

I felt like I was making up excuses to make "full use" of my monitors that I paid for.

### How I Made It

There's a really neat program called [MultiscreenBlank](https://multiscreenblank.nookkin.com/). It lets you manually blank out any monitor!

So, I made a program that compliments that. Any monitor that doesn't contain any windows on it will be blanked out <i>automatically</i>.

### Some Goofs I Made

There were 2 notable moments during development that made me laugh.

1. The main monitor would be blanked out upon startup because my machine didn't have any apps open! Crazy oversight!
2. Whenever you minimized a window on a monitor, that monitor would then be considered empty! So then you would have to go out of your way to open that app again.

Both of these issues were easily fixed, but I still found them funny.

### Summary

This is probably a niche piece of software, but I've been using this software for over a year now! I'm extremely thankful to my past self for making it!

In the future, I'm going to try getting rid of the MultiscreenBlank dependency. I think it'd be cool if this was it's own independent thing!