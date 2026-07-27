---
title: WindowSense
tagline: A small program for Windows 11 that automatically blanks out empty monitor screens.
language: C++
year: 2024
rating: 100
size: ~250 LOC
license: MIT
deps: <a href="https://multiscreenblank.nookkin.com/">MultiscreenBlank</a>
source: https://github.com/tzainten/WindowSense
---

**WindowSense** tracks all apps open on your computer. If there's no windows intersecting with a monitor's bounds, that monitor will fade to black.

Once a window does intersect with that monitor, that monitor will fade back in to full color.

![This is what happens when a monitor contains no applications.](/upload/windowsense_demo.mp4)

## Why I Built This

This started out as a random experiment. I noticed myself looking at my side monitors just because I had put Firefox or Discord over there, even though I wasn't really using them for anything.

Now, whenever I'm playing games, I find myself feeling just a little more immersed because my main screen is the only one displaying any content.