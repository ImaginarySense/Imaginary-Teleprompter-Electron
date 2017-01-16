![Teleprompter](https://github.com/imaginaryfilms/Teleprompter-Electron/raw/master/build/install-spinner.png)

# Teleprompter-Electron
Build standalone cross-platform instances of our Teleprompter using Electron.

Introduction
-------------
"Teleprompter" is a professional grade, multi-platform, free software teleprompter for anyone to use.

It's built with web technologies so anyone can customize it to their needs. It may be run on a web browser or as a standalone application for additional features.

Installer Building Instructions
-------------

##Every platform
Make sure you have `NodeJS` with `npm` installed on your system before you begin.
One you've got npm, follow these steps in every platform, then proceed to run the corresponding platform specific command:

1. Open a `Terminal` or `Command Prompt` at your desired build location.
2. Clone this repository and its submodules.
```
git clone --recursive https://github.com/imaginaryfilms/Teleprompter-Electron.git
cd Teleprompter-Electron
```
3. Download dependencies and submodules with npm install. Do this step both in the root folder and `app` submodule.
```
npm install
cd app
npm install
cd ..
```
3. Follow platform specific building steps. If it builds successfully, you should find your binaries in the `dist` folder.

##Windows
* Run `npm run dist:win64` to create a 64 bit installer.
* Run `npm run dist:win32` to create a 32 bit installer.
* Run `npm run dist:win` to create both 32 bit and 64 bit installers.

##Linux and BSD
1. Install Electron dependencies specified at [Electron-Builder's Linux documentation](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build#linux).
2. Open `package.json` in a text editor of your preference.
3. Find the following lines:
```
    "linux": {
      "target":
```
4. Under `target`, remove all targets that don't correspond to your distribution. (For example, you would leave `deb` for Ubuntu, rpm for OpenSuse, and pacman for Arch.) Also, leave `AppImage` if you wish to create a universal portable Linux app. You may just use `AppImage` if your system supports it.
5. Save your changes to `package.json`.
6. Run `npm run dist:linux`.

##OS X
Run `npm run dist:osx`.

##Build binaries for all platforms from OS X
1. Install all dependencies specified at [Electron-Builder's OS X documentation](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build#macos).
2. Run `npm run dist`.

Help & Support
-------------
If you have an issue, please write it to us, we will help you or fix the bug.

##Creators:
*  Javier O. Cordero Pérez <javier.cordero@upr.edu>
*  Victor Ortiz <va2ron1@gmail.com>

##Contributors:
*  Rafael Sierra <rafael.sierra2@upr.edu> 
*  Keyvan Pérez <keyvan.perez2@gmail.com>

##Copyright: 
[Imaginary Films LLC](http://imaginary.tech/) & Contributors

##License: 
This software is shared under the [GPL3](https://github.com/imaginaryfilms/Teleprompter-Electron/blob/master/LICENSE) license.
