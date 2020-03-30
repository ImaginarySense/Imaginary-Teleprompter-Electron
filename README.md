![Imaginary Teleprompter](https://github.com/ImaginarySense/Imaginary-Teleprompter-Electron/raw/master/build/install-spinner.png)

[![GitHub license](https://img.shields.io/badge/license-GPL3-blue.svg)](https://raw.githubusercontent.com/ImaginarySense/Imaginary-Teleprompter/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/ImaginarySense/Imaginary-Teleprompter-Electron.svg)](https://github.com/ImaginarySense/Imaginary-Teleprompter-Electron/releases)
[![GitHub contributors](https://img.shields.io/github/contributors/ImaginarySense/Imaginary-Teleprompter.svg)](https://github.com/ImaginarySense/Imaginary-Teleprompter/graphs/contributors)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/ImaginarySense/Imaginary-Teleprompter.svg)](http://isitmaintained.com/project/ImaginarySense/Imaginary-Teleprompter "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/ImaginarySense/Imaginary-Teleprompter.svg)](http://isitmaintained.com/project/ImaginarySense/Imaginary-Teleprompter "Percentage of issues still open")
[![SourceForge](https://img.shields.io/sourceforge/dw/teleprompter-imaginary-films.svg)](https://sourceforge.net/projects/teleprompter-imaginary-films/)
[![Twitter Follow](https://img.shields.io/twitter/follow/imaginary_tech.svg?style=social&label=Follow)](https://twitter.com/user/imaginary_tech)
# Imaginary Teleprompter Electron
Build standalone cross-platform instances of our Teleprompter using Electron.

Introduction
-------------
"Imaginary Teleprompter" is a professional grade, multi-platform, free software teleprompter for anyone to use.

It's built with web technologies so anyone can customize it to their needs. It may be run on a web browser or as a standalone application for additional features.

Installer/Package Building Instructions
-------------

## Every platform
Make sure you have `NodeJS` with `npm` installed on your system before you begin.
One you've got npm, follow these steps in every platform, then proceed to run the corresponding platform specific command:

1. Install Git and NodeJS on your system.
2. Open a `Terminal` or `Command Prompt` at your desired build location.
3. Clone this repository and its submodules.
```
git clone --recursive https://github.com/ImaginarySense/Imaginary-Teleprompter-Electron.git
```
4. 4. Move to the root folder of the Imaginary-Teleprompter-Electron project.
```
cd Imaginary-Teleprompter-Electron
```
5. Download dependencies and submodules.
```
npm run setup
```
6. Follow platform specific building steps. If builds are successful, you should find your binaries inside the `dist` folder.

## Windows
* To build 32 bit packages: `npm run dist:win32`
* To build 64 bit packages: `npm run dist:win64`
* To build both 32 and 64 bit packages: `npm run dist:win`

## Linux and BSD
1. If you’re building for Linux, depending what packages you intend to build you should install their dependencies as shown at: https://www.electron.build/multi-platform-build#linux. Commands and dependency names may vary across distributions. The following instructions assume you're using a Debian/Ubuntu derivative.
```
sudo apt-get install --no-install-recommends -y icnsutils graphicsmagick
sudo apt-get install --no-install-recommends -y rpm              # To build rpm
sudo apt-get install --no-install-recommends -y bsdtar           # To build pacman
sudo apt-get install --no-install-recommends -y libarchive-tools # Alternative to bsdtar
sudo apt-get install --no-install-recommends -y snapcraft        # To build snap
```
2. Open `package.json` in the text editor of your preference.
3. Locate the following lines:
```
    "linux": {
      "target":
```
4. Under `target`, remove all targets that don't correspond to your distribution. (For example, you would leave `deb` for Ubuntu, `rpm` for Fedora, and `pacman` for Arch.) Use `tar.gz` for any other distros and `AppImage` if you wish to create a universal, portable, Linux app.
5. Save your changes.
6. Run the command that corresponds to your operating system's architecture:
    * To build 32 bit packages: `npm run dist:linux32`
    * To build 64 bit packages: `npm run dist:linux64`
	* To build both 32 and 64 bit packages: `npm run dist:linux`
    * To build ARM7l packages: `npm install -g electron-builder` (followed by) `npm run dist:linuxarm`

## OS X
* Run `npm run dist:macos`.

Help & Support
-------------
If you have an issue, please write it to us, we will help you or fix the bug.
*  Support e-mail <teleprompter@imaginary.tech>

## Creators:
*  Javier Cordero <javier@imaginary.tech>
*  Victor Ortiz <va2ron1@imaginary.tech>

## Contributors:
*  Rafael Sierra <rafael.sierra2@upr.edu> 
*  Keyvan Pérez <keyvan.perez2@gmail.com>

## Copyright: 
[Imaginary Sense Inc.](https://imaginary.tech/) & Contributors

## License: 
This software is shared under the [GPL3](https://github.com/ImaginarySense/Imaginary-Teleprompter-Electron/blob/master/LICENSE) license.
