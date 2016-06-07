# How to develop?
Assuming you've got your development machine set up (see **[Set up dev machine]**(SETUP-DEV-MACHINE.md)), and you want to contribute. How to do that? Which tools will help making you achieve this faster?

First of all, there must be an issue for the feature or bug you want to work on. If it's a feature, it most likely needs a design. Don't just start working on a cool feature, or a bug you've found, without an issue. Otherwise someone else may work on it, which would be a waste of time.

The rest of this guide focuses on the technical part of the development. E.g. if you need to know how to branch, create forks, submit pull requests, please have a look at the [contribution workflow](CONTRIB-WORKFLOW.md).

## Development environment
Everything will work on a Mac, Windows, or Linux machine. I'm working on Windows 10 with the following tools installed:
- [ConEmu](https://conemu.github.io/) just because cmd.exe has no colors, intellisense, and tabs.
- [Code](https://code.visualstudio.com/) IMO one of the best code editors out there at the moment. If you want to work in Notepad, be my guest.

And of course a browser.

## How to verify your changes
Currently there are no automated component tests as this is prone to change, we're waiting until Angular2 has finalized how this will look like. But in any case, you will need to see how your changes work. Therefore a folder called demo is included. How to use this?
- Open a command prompt and navigate to the folder where you cloned the repo
- Run "gulp connect:demo"
- This will open a browser with the /demo folder. Every time you make a change to either the demo (e.g. add your newly created directive), **or** to the ng2-bingmaps source code, the browser will reload and reflect your changes!





