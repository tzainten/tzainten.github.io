---
title: UnrealSharp
description: A tool that implements modern C# into Unreal Engine 5. It features full packaging support, as well as blazing fast hot-loading.
role: 4 Contributions
tools: C#, Unreal Engine 5, Git
source: "[One](https://github.com/UnrealSharp/UnrealSharp/pull/49), [Two](https://github.com/UnrealSharp/UnrealSharp/pull/50), [Three](https://github.com/UnrealSharp/UnrealSharp/pull/160), [Four](https://github.com/UnrealSharp/UnrealSharp/pull/169)"
---

### The Goal

I found this plugin in the [Unreal Source](https://discord.com/invite/unrealsource) Discord. The purpose of this plugin is to sit between C++ and Blueprints.

It was very early in development at this time, so I decided to help out where I could.

### Reducing Hot Reload Spam

While coding in C#, I found myself saving my changes quite frequently. Everytime I would save, UnrealSharp would reload my code.

If I had saved an error in my code, fixed it and then saved again, an error prompt would still be waiting for me in Unreal Engine.

So, I added an editor setting that would only hot-load changes when the editor has focus.

<video class="fit-video" src="videos/backdrop.mp4#t=0.1" type="video/mp4" preload="metadata" controls muted></video>

### Changes Weren't Loaded At First Startup

If you had Unreal Engine closed, and you made a change to your C# code, Unreal Engine would not load these changes until you saved a file.

This was a pretty simple fix, but a vital one!

```c#
WeaveProject weaveProject = new WeaveProject();
if (!weaveProject.RunAction())
{
    return false;
}
```

### Compile Error

UnrealSharp switched to using a UnrealHeaderTool extension, and with this there was a small bug that some people were experiencing.

It was a simple fix, the .csproj file was just missing the following:

```xml
<Import Project="UnrealSharpScriptGenerator.ubtplugin.csproj.props" 
        Condition="Exists('UnrealSharpScriptGenerator.ubtplugin.csproj.props')" />
```

### Compile Time Code Generation

There was a commit that switched over to generating reflection code at compile time, rather than when the project is loaded.

This was a great feature to add, but I noticed something missing. The .csproj file wouldn't be generated at compile time.

This was a pretty simple fix. All I had to do was invoke the UnrealSharpBuildTool to generate the file, and it was good to go!

```c#
string? projectName = Path.GetFileNameWithoutExtension(factory.Session.ProjectFile);
if (projectName != null && !File.Exists("{factory.Session.ProjectDirectory}/Script/Managed{projectName}.csproj"))
{
    string dotNetExe = DotNetUtilities.FindDotNetExecutable();

    string args = string.Empty;
    args += "\"{PluginDirectory}/Binaries/Managed/UnrealSharpBuildTool.dll\"";
    args += " --Action GenerateProject";
    args += " --EngineDirectory \"{factory.Session.EngineDirectory}/\"";
    args += " --ProjectDirectory \"{factory.Session.ProjectDirectory}/\"";
    args += " --ProjectName {projectName}";
    args += " --PluginDirectory \"{PluginDirectory}\"";
    args += " --DotNetPath \"{dotNetExe}\"";

    Process process = new Process();
    ProcessStartInfo startInfo = new ProcessStartInfo
    {
        WindowStyle = ProcessWindowStyle.Hidden,
        FileName = DotNetUtilities.FindDotNetExecutable(),
        Arguments = args
    };
    process.StartInfo = startInfo;
    process.Start();
}
```

### Summary

This was my first time contributing to somebody else's work. Contributing to this plugin helped me learn a bit about how pull requests work.

One thing I think I could've done better is communicate the ideas I had before actually submitting a pull request. I think I got lucky here, but going forward I'm definitely going to communicate my changes better!