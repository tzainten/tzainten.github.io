---
title: Blocks
description: A voxel terrain generation project. It has texture atlas support, vertex ambient occlusion, voxel chunks, noise generation, trilinear interpolation, and terrain deformation.
role: Sole Developer
dev-time: 1 week
tools: C#, s&box, Git
---

### The Goal

I wanted to get familiar with s&box so that I can use it to work on any game ideas I have. 

I've always enjoyed trying to implement Minecraft-like worlds whenever I'm exploring a new engine, so naturally I did that here as well!

### Trilinear Interpolation

While I was making this, I wondered if it was really necessary to sample noise at every voxel. I did some research and [Trilinear Interpolation](https://en.wikipedia.org/wiki/Trilinear_interpolation) came up!

<video class="fit-video" src="media/trilinear.mp4#t=0.1" type="video/mp4" preload="metadata" controls muted></video>

Instead of generating noise at every voxel, I can space out the noise samples and then interpolate the empty space between!

### Ambient Occlusion

My favorite part of this project was working on the ambient occlusion. I had never worked with shaders before, so this was a perfect opportunity to learn! I was lucky to have this article to reference: [Ambient occlusion for Minecraft-like worlds](https://0fps.net/2013/07/03/ambient-occlusion-for-minecraft-like-worlds/)

<video class="fit-video" src="media/ao.mp4#t=0.1" type="video/mp4" preload="metadata" controls muted></video>

What I like about this technique is that the Ambient Occlusion is baked into each voxel's vertices at generation time. There's no real-time lighting calculation at all!

### Texture Atlas

After I had tackled ambient occlusion, I felt comfortable enough to implement texture atlas support.

<video class="fit-video" src="media/atlas.mp4#t=0.1" type="video/mp4" preload="metadata" controls muted></video>

This was a great finale for the project because it breathed a bit of variety into the world, rather than everything being made up of stone.

### Summary

Working on this project helped me realize how much potential s&box has, and I am excited to keep using it in the future!

I'm happy that I got to learn more about shaders. They're not so scary anymore, which means I can use them in more projects now!