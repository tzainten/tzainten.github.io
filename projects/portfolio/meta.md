---
title: Portfolio
description: A website built to showcase all of my documented projects.
role: Sole Developer
dev-time: 1 week
tools: html, css, javascript, nodejs
source: "[GitHub](https://github.com/tzainten/tzainten.github.io)"
---

### The Goal

I needed a website that I could link people towards whenever they want to see my capabilities.

I wanted something very simple. I didn't need anything fancy, this shouldn't require an entire pipeline. It just needs to be simple HTML pages.

### Figuring It Out

At first, I did try using [Blazor](https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor), [Next.js](https://nextjs.org/), and then [11ty](https://www.11ty.dev/) before I eventually landed on just writing most of this website myself.

The things I enjoyed about Blazor and Next.js were the ability to write reusable components. But it felt like I had so much overhead just to use 1 simple feature.

I wanted to keep things as simple as possible while writing this website. 11ty was close, but I felt like it wasn't quite the perfect fit for me. Honorable mention though!

### What I Ended Up Doing

I wrote a simple node.js script that scans html files in my src folder for <span class="brown">#include</span> directives, which allowed me to write reusable HTML code that can be put anywhere.

```html
<!DOCTYPE html>
<html lang="en">

#include "components/head.html"

<body style="visibility: hidden;">
<div class="body-container">
<div class="page-container">

#include "components/masthead.html"

#include "components/breadcrumbs.html"

<div class="projects">
    {projects}
</div>

</div>
</div>

#include "components/footer.html"

</body>
</html>
```

Then all I have to do is run the script, and it will compile everything into a publish folder. Then, I just upload that to GitHub!

I admit, it's jank, but it's simple to use!

### Summary

I really enjoyed making this website! Using razor in s&box equipped me with enough know-how to piece everything together.

I would like to try Blazor or Next.js sometime in the future, so maybe I can come up with a better use case for them!