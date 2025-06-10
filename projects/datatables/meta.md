---
title: Data Tables
description: A tool built for s&box that adds similar functionality as Data Tables in Unreal Engine
role: Sole Developer
dev-time: 1 month
tools: C#, s&box, Git
source: "[GitHub](https://github.com/tzainten/DataTables), [s&box](https://sbox.game/tzainten/datatables)"
---

### The Goal

s&box hosted a [Tech Jam](https://sbox.game/news/techjam1-726b8bbf) at the end of 2024. This event's main goal was for participants to work on whatever they found interesting, and this is what I decided to work on!

### Starting Out

Coming from Unreal Engine 5, I wondered how Data Tables would work in s&box. In Unreal Engine, I used Data Tables to setup different spells in a side project I was working on.

Data Tables are assets that you create in the editor. They hold multiple rows of a struct type that you define yourself. For example:

```c#
struct Item
{
    public Texture Icon { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
}
```

### The Journey

I had my first working version of the tool at the end of Week 1. It was very bare bones, and was not at all ready to be used seriously.

<video class="fit-video" src="media/week1.mp4#t=0.1" type="video/mp4" preload="metadata" controls muted></video>

There was still a couple of things missing that I wanted to add:
- Hotloading Support
- Undo System
- Proper Saving Dialogs

### JSON Serialization

Unfortunately for me, s&box doesn't automatically serialize the type of an object. This wasn't going to work for my tool, so I had to implement my own solution!

Luckily though, this was pretty straight forward. All I had to do was use simple recursion, iterate over an object's properties and fields, and use the built in Json.ToNode provided by s&box.

```json
"StructEntries": [
{
    "RowName": "NewEntry_0",
    "List": [
    {
        "Boolean": true,
        "__type": "Sandbox.B"
    },
    {
        "Integer": 55,
        "__type": "Sandbox.A"
    }
    ],
    "__type": "Sandbox.ExampleStruct"
},
{
    "RowName": "NewEntry_1",
    "List": [],
    "__type": "Sandbox.ExampleStruct"
},
],
```

### Hotloading

Changes that you made in the tool were not being reflected in game until you restarted. 

I also had to use reflection heavily here. I had already implemented my own JSON Serialization solution at this point, so I was well equipped to tackle this problem!

```c#
for ( int i = 0; i < InternalEntries.Count; i++ )
{
    var internalRow = InternalEntries[i];
    var row = _dataTable.StructEntries.Find( x => x.RowName == internalRow.RowName );

    if ( row is not null )
    {
        // This is where the hotload actually happens
        TypeLibrary.Merge( row, internalRow );
    }
    else
    {
        if ( _weakTable.TryGetValue( internalRow.RowName, out WeakReference weakReference ) )
        {
            if ( !weakReference.IsAlive )
            {
                _weakTable.Remove( internalRow.RowName );
                _dataTable.StructEntries.Insert( i, TypeLibrary.Clone( internalRow ) );
                continue;
            }

            RowStruct weakRow = (RowStruct)weakReference.Target;
            // This is where the hotload actually happens
            TypeLibrary.Merge( weakRow, internalRow );
            _dataTable.StructEntries.Insert( i, weakRow );
            continue;
        }

        _dataTable.StructEntries.Insert( i, TypeLibrary.Clone( internalRow ) );
    }
}
```

I got a bit confused when implementing support for Collections, but after some thought and tinkering with it I ended up figuring that out too.

### Saving Dialogs

Saving dialogs were fairly simple to implement. All I had to do was check if the serialized version of the asset had changed at any point, and then not let the user close the window until they decide what to do about it.

<video class="fit-video" src="media/saving.mp4#t=0.1" type="video/mp4" preload="metadata" controls muted></video>

### Undo System

Implementing an Undo System was pretty tricky at first. A big problem I was running into was trying to get it to work with Nested Lists. The outer layer of a List would work just fine, but anything further wouldn't serialize properly.

I ended up looking at some of the tools s&box provides, low-and-behold the Shader Graph has a generic Undo System that's pretty much plug and play!

<video class="fit-video" src="media/undo.mp4#t=0.1" type="video/mp4" preload="metadata" controls muted></video>

From what I understand, all it's doing is saving serialized states everytime you make a change. If you want to traverse to a specific state in the changelog, you just deserialize that state into your current instance of your tool and voila!

### Summary

I'm really happy with how the tool turned out! I'm really proud of myself for pulling through and actually submitting this before the deadline.

Garry mentioned the idea of doing a VR specific jam in the future, which has me excited! I've been meaning to try out VR development, so having a VR centered jam would be the perfect opportunity!

You can view all of the submitted entries [here.](https://sbox.game/c/tech1/list)