---
title: VividPanels
tagline: A library for <a href="https://www.sbox.game">s&box</a> which adds WorldPanels that skip Post Processing effects
language: C#
year: 2025
rating: 40
size: ~300 LOC
license: MIT
deps: <a href="https://www.sbox.game">s&box</a>
source: https://github.com/tzainten/VividPanels
---

**VividPanels** allows you to render UI within world-space at it's true color, completely unaffected by the engine's tonemapping.

It has all the same settings that WorldPanel gives you. It's an exact drop-in replacement for your UI.

![Left: Built-in WorldPanel. Right: Custom VividPanel](/upload/vividpanels_comparison.png)

## Why I built it

I wanted to use WorldPanels to display health bars above enemies in a game. This allowed me to have health bars be occluded by world geometry, but at the cost of looking dim and "blending in with the world". Ew.

This library completely solved that issue. My health bars are full bright colors now, the way God intended.