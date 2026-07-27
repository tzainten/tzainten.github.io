---
title: Data Tables
tagline: A tool built for s&box that adds similar functionality as Data Tables from Unreal Engine
language: C#
year: 2024
rating: 80
size: ~2,800 LOC
license: MIT
deps: <a href="https://sbox.game">s&box</a>
source: https://github.com/tzainten/DataTables
---

**Data Tables** lets you define a .dt file to hold a list of structs for you.

This list of structs is fully editable from the s&box editor, reducing the need to hardcode values.

## Changes Safe-Guarded Through Saving

![Modifications won't be loaded unless you explicity save the .dt file](/upload/data_tables_saving.mp4)
 
I felt it was absolutely necessary for any changes you make to only be reflected once you've saved the file.

I personally hate making a change that I want to undo, only to find out I can't go back. So having this, coupled with an undo system, prevented any of those type of headaches.

## Runtime Editing

![Changes to the .dt file can be made while the game is running. Staying true to s&box's hotloading focus.](/upload/data_tables_realtime_editing.mp4)

It's an obvious thing to implement, but this actually took up most of the development time.

At the time, I had to roll my own JSON serializer that piggy-backed off of s&box's provided API. This part was the most fun for me; it was a decently stimulating problem to solve.

## Why I made this

s&box is by far my favorite game engine to work in. When a [Tech Jam](https://sbox.game/c/tech1) was announced, I just had to participate.

It was the perfect opportunity to learn something new. I had never made an editor tool before, so this project absolutely taught me things I had never really considered before.