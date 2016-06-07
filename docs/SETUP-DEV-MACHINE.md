#Set up your development machine
## Prerequisites
- Node / NPM
- Text editor like Visual Studio Code
- Global packages (npm install -g)
  - typings (> 1.0)

## First time install
- Fork the repository
- Clone it to your desktop
- Open a command prompt, navigate to the folder, and run "npm install"

## Gulp tasks
- *build* - Runs the build, transpiles the TS to JS, vets the code, and packages it to the dist folder.
- *test* - Runs all the unit tests.
- *connect:demo* - Starts a server for the /demo folder, and a watcher to automatically update the demo if required. See [How to develop](HOW-TO-DEVELOP.md) for more information.
