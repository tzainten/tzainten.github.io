---
title: IgnitionHeaderTool
description: A tool built for Unreal Engine 5 that implements a custom Event Function Specifier
role: Sole Developer
dev-time: 2 weeks
tools: cs, git
source: "[Legacy](https://github.com/tzainten/IgnitionHeaderTool/tree/legacy), [Main](https://github.com/tzainten/IgnitionHeaderTool)"
---

### The Goal

While I was using Unreal Engine 5, I felt disappointed to learn there isn't a UFUNCTION Event System built-in.

[Multi-cast Delegates](https://dev.epicgames.com/documentation/en-us/unreal-engine/multicast-delegates-in-unreal-engine) do exist, but they're a bit more maintenance than what I ended up making.

```c++
UCLASS()
class ASuperActor : public AActor
{
    GENERATED_BODY();

    // Subscribe to this event
    UFUNCTION(Event = "MySuperCoolEvent")
    void SuperDuperAwesome();
}
```

```c++
void SomeAmazingFunction()
{
    // Broadcast this event to all listeners
    EVENT_RUN("MySuperCoolEvent");
}
```

### The Pain

For the first version, I wrote a parser myself. It was an interesting problem to solve, and I'm glad I did it; though it was pretty painful to get working.

The problem with this approach is that I had to be able to parse Unreal Engine's API as well. I thought to myself: why can't I just extend Unreal Engine's parser?

### UnrealHeaderTool

I learned that Unreal Engine uses something called [UnrealHeaderTool](https://dev.epicgames.com/documentation/en-us/unreal-engine/unrealheadertool?application_version=4.27) to parse your C++ header files.

This seemed like exactly what I wanted, and eventually I was able to find an article detailing how to [Extend the Unreal Header Tool with Plugins.](https://unrealist.org/uht-plugins/)

### Custom Properties

In C++, Unreal Engine provides you with types such as:

- uint64
- int64
- int8

I think this is a much better way to represent how big your data types are, but they don't provide this kind of convention for floats. Turns out you can extend this with UHT as well!

```cs
[UnrealHeaderTool]
[UhtEngineClass( Name = "Float32Property", IsProperty = true )]
public class UhtFloat32Property : UhtNumericProperty
{
    public override string EngineClassName => "FloatProperty";
    protected override string CppTypeText => "float32";

    // ...culled for the sake of brevity...
}

[UnrealHeaderTool]
[UhtEngineClass( Name = "Float64Property", IsProperty = true )]
public class UhtFloat32Property : UhtNumericProperty
{
    public override string EngineClassName => "DoubleProperty";
    protected override string CppTypeText => "float64";

    // ...culled for the sake of brevity...
}
```

This adds UFUNCTION support for the types:

- float32
- float64

### Custom Function Specifiers

Unreal Engine has a list of [Function Specifiers](https://unreal-garden.com/docs/ufunction/) you can use by default. Appending your own is really simple:

```cs
[UhtSpecifier( Extends = UhtTableNames.Function,
               ValueType = UhtSpecifierValueType.String,
               When = UhtSpecifierWhen.Immediate )]
public static void EventSpecifier( UhtSpecifierContext specifierContext, StringView value )
{
    UhtFunction function = (UhtFunction)specifierContext.Type;

    EFunctionFlags flag = (EFunctionFlags)0x00000010; // Internally unused function flag
    function.FunctionFlags |= flag;
}
```

Keep in mind, there was only one unused function flag at the time of making this. If this hasn't changed, then that means you can only have 1 custom function specifier!

### The Final Result

After reverse-engineering the generated code that UnrealHeaderTool spits out, I was able to add functionality to my custom Function Specifier.

I basically step in after UHT generates code, and then inject my own code afterwards. This works really well, but it's not as clean as I'd like it to be.

### Function Parameter Support

I did add partial support for this. However, it is a very poor implementation. I stopped using Unreal Engine shortly after s&box started maturing.

Going back in and finishing up this feature could be a fun weekend project though. We'll see!

### Summary

UnrealHeaderTool is really powerful! It was a blast experimenting with it to see what I could do.

It's really unfortunate that a lot of the C++ API is poorly documented. I felt like I was uncovering an ancient scroll when I discovered you can extend UnrealHeaderTool.

But it seems to be getting better. Epic Games seems to be starting to take their documentation much more seriously.