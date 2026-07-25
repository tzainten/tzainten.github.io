---
title: Flux
tagline: A code-injector for <a href="https://sbox.game/">s&box</a> that lets you inject code directly into a package.
language: C#
rating: 100
size: ~940 LOC
license: MIT
deps: none
source: https://github.com/tzainten/Flux
---

**Flux** allows users to modify the source code of any game they play within the s&box platform. You get full support for type safety and intellisense.

This significantly reduced the friction I was experiencing when experimenting with [BepInSbox](https://github.com/CiarenceW/BepInSbox) and reflection.

![An example mod that logs how many Physguns are in the scene.](/upload/sandbox_mod.png)

## Source Code Modification

![Direct modification of the game's source code &mdash; extremely powerful for exploiting vulnerabilities](/upload/source_code_modification.mp4)

As a developer, it can be a critical mistake to not consider what a modified client can do.

```c#
[Rpc.Host]
public void AddMoney( int amount )
{
    var newAmount = Cash + amount;
    UpdateCash( newAmount );
}
```

In the method above, `Rpc.Host` means this method will run on the host whenever a connection invokes it. There's no safe-guards here at all; a modified client can tell the host to run this method at any moment to give themselves money to their heart's desire.

## Why I built it

I wanted an easy way for myself to crack my own games. Hardening your RPCs is great, but this tool allows you to iterate exploits and prove your own security quickly.

<p><span class="tagline">s&box has since <a href="https://sbox.game/news/update-26-06-17#removed-code-archives">moved away from shipping raw source code</a> and now compiles games on their backend, completely killing this tool.</span></p>
