---
title: Blocks
description: A voxel terrain generation project. It has texture atlas support, vertex ambient occlusion, voxel chunks, noise generation, trilinear interpolation, and terrain deformation.
role: Sole Developer
dev-time: 1 week
tools: C#, Git
---

I wanted to get familiar with s&box so that I can use it to work on any game ideas I have. Working on this project helped me realize how much potential s&box has, and I am excited to keep using it in the future!

One thing I enjoyed was implementing <a href="https://en.wikipedia.org/wiki/Trilinear_interpolation">Trilinear Interpolation</a> for the noise generation. Instead of generating noise at every voxel, I generate noise every 4th block and interpolate between those values.

My favorite part of this project was working on the ambient occlusion. I had never worked with shaders before, so this was a perfect opportunity to learn! I was lucky to have this article to reference: <a href="https://0fps.net/2013/07/03/ambient-occlusion-for-minecraft-like-worlds/">Ambient occlusion for Minecraft-like worlds</a>

After I had tackled ambient occlusion, I felt comfortable enough to implement texture atlas support. This was a great finale for the project because it breathed a bit of variety into the world, rather than everything being made up of stone.