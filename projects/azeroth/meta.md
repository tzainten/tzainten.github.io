---
title: "Azeroth: Minecraft Modpack"
description: Azeorth is a private Minecraft 1.20 modpack that adds progression elements to guide players towards the end.
role: Bug Fixing
tools: java, git, mcfunction
source: "[BedrockIfy](https://github.com/tzainten/BedrockIfy/tree/1.20), [Stellarity](https://github.com/tzainten/Stellarity-Lite-True-Ending-Compat)"
---

### The Goal
I wanted this modpack to feel somewhat like an RPG. The goal was to motivate players to explore the world, and try to gear up for the final boss.

### Crash Fix
While I was putting this together, the [BedrockIfy](https://modrinth.com/mod/bedrockify) mod had a fatal bug: whenever you held a Bundle in your hand, your game would crash!

@[video](media/1.mp4)

This was quite a simple fix: all I had to do was add in two additional checks for tooltips on both Bundles and Ender Chests. Voila!

@[video](media/9.mp4)

### End Island Generation

There was also 2 more mods that were very important to me: [Stellarity Lite](https://modrinth.com/datapack/stellarity-lite) & [True Ending: Ender Dragon Overhaul](https://modrinth.com/datapack/true-ending).

These mods were conflicting. The end towers had problems with generation, and the Ender Dragon wasn't spawning correctly.

@[video](media/2.mp4)

Stellarity was causing the issues, so I decided to tinker around with it. It took a bit of trial and error here, but it was honestly pretty easy!

After I made my changes, I managed to keep the decorations from Stellarity while also keeping the changed Boss AI behavior from True Ending!

@[video](media/z.mp4)

### Summary

Fixing these bugs felt nice. I feel more comfortable navigating other people's code now.

I used to struggle a lot reading other people's code, because I hadn't wrote it. But this project helped me to grow a bit!