/*
  Imaginary Teleprompter
  Copyright (C) 2015, 2020 Imaginary Sense Inc.

  This file is part of Imaginary Teleprompter.

  Imaginary Teleprompter is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  Imaginary Teleprompter is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with Imaginary Teleprompter.  If not, see <https://www.gnu.org/licenses/>.
*/

"use strict";

const { electron,
  app, // Module to control application's life.
  BrowserWindow, // Module to create native browser window.
  Menu, // The menu class is used to create native menus that can be used as application menus and context menus.
  ipcMain, // The ipcMain module, when used in the main process, handles asynchronous and synchronous messages sent from a renderer process (web page).
  shell, // Module that provides functions related to desktop integration.
  globalShortcut // Module can register/unregister a global keyboard shortcut with the operating system so that you can customize the operations for various shortcuts.
  // Keep a global reference of the window object, if you don't, the window will be closed automatically when the JavaScript object is garbage collected.
} = require('electron');
const nativeImage = require('electron').nativeImage;
const path = require('path');
const url = require('url');
const appDataFolder = app.getPath('appData') + '/ImaginarySense/Teleprompter';

// Set Global window variable.
let mainWindow = null,
	externalPrompt = null,
	licenseWindow = null;

function createMainWindow () {
	if (process.platform === 'win32' || process.platform === 'linux')
		mainWindow = new BrowserWindow({webPreferences: {nodeIntegration: true}, width: 1280, height: 800, javascript: true, title: 'Imaginary Teleprompter', useContentSize: true, nodeIntegration: true, icon: __dirname + '/build/icon.ico'});
	else
		mainWindow = new BrowserWindow({webPreferences: {nodeIntegration: true}, show: false, width: 1280, height: 800, javascript: true, title: 'Imaginary Teleprompter', useContentSize: true, nodeIntegration: true, icon: __dirname + '/build/icon.ico'});
	mainWindow.loadURL('http://localhost:7313/');
	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
	});
	// Close Window
	mainWindow.on('closed', () =>{
		if (externalPrompt!==null)
			externalPrompt.close();
		// Dereference the windows object, usually you would store  windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
		if (process.platform !== 'darwin')
			app.quit();
	});

	// Debug tools
	let contents = mainWindow.webContents;
	contents.on('devtools-opened', () => {
		contents.executeJavaScript('enterDebug()');
	});
	contents.on('devtools-closed', () => {
		contents.executeJavaScript('exitDebug()');
	});
}

app.on('activate', () => {
	if (!mainWindow)
		createMainWindow();
});

// This method will be called when Electron has finished initialization and is ready to create browser windows.
app.on('ready', () => { 

	// Create the browser window.
	createMainWindow();

	// Setup menu
	setupMenu();

	// Image Server
	// imageServer();
});

// // Inter Process Communication
// // Send a message to the renderer process...
// ipcMain.on('asynchronous-message', (event, arg) => {
// 	// console.log(arg);
// 	if (arg === "network") {
// 		// runSocket(event);
// 	}
// 	else if (arg === "openInstance") {
// 		externalPrompt = new BrowserWindow({
// 			webPreferences: {
// 				title: 'Teleprompter Instance',
// 				// blinkFeatures: 'KeyboardEventKey',
// 				// titleBarStyle: 'hidden-inset',
// 				offscreen: true
// 			}
// 		});
// 		const indexPath = path.resolve(__dirname, '.', 'teleprompter.html')
// 		const indexURL = url.format({
// 			protocol: 'file',
// 			pathname: indexPath,
// 			slashes: true,
// 			// hash: encodeURIComponent(JSON.stringify(someArgs))
// 		})
// 		console.log(indexPath);
// 		console.log(indexURL);
// 		externalPrompt.loadURL(indexURL);
// 		externalPrompt.setIgnoreMouseEvents(false);
// 		externalPrompt.webContents.setFrameRate(30);
// 		externalPrompt.webContents.on('paint', (updateEvent, dirty, image) => {
// 			// Frame sipping on canvas
// 			if (frameSkip()) {
// 				// Get pointer to image from canvas.
// 				const size = externalPrompt.getSize(),
// 					bitmap = image.getBitmap();
// 				event.sender.send('asynchronous-reply',{ 'option':'c', 'dirty':dirty, 'size':size, 'bitmap':bitmap });
// 				// Documentation
// 				// https://electron.atom.io/docs/tutorial/offscreen-rendering/
// 				// Known issues
// 				// https://github.com/electron/electron/issues/7350
// 				// https://github.com/electron/electron/issues/8051
// 			}
// 		});
// 		externalPrompt.on('closed', () =>{
// 			externalPrompt = null;
// 			if (mainWindow!==null)
// 				mainWindow.webContents.send('asynchronous-reply', {option:'restoreEditor'});
// 		});
// 	}
// 	else if (arg === "closeInstance") {
// 		if (externalPrompt!==null)
// 			externalPrompt.close();
// 	}
// 	else if (arg === "prepareLinks")
// 		event.sender.send('asynchronous-reply',{'option':'prepareLinks'});
// 	else {
// 		if (externalPrompt!==null) {
// 			console.log(arg);
// 			externalPrompt.webContents.send('asynchronous-reply', {option:'message', data:arg} );
// 		}
// 	}
// });

// Multiplatform menu configurations

function setupMenu() {
	// Create our menu entries so that we can use MAC shortcuts
	const {app, Menu} = require('electron');

	// Prepare menu
	const template = [
	{
		label: 'Edit',
		submenu: [
			{role: 'undo'},
			{role: 'redo'},
			{type: 'separator'},
			{role: 'cut'},
			{role: 'copy'},
			{role: 'paste'},
			{role: 'pasteandmatchstyle'},
			{role: 'delete'},
			{role: 'selectall'}
		]
	},
	{
		label: 'View',
		submenu: [
			{role: 'togglefullscreen'}
		]
	},
	{
		role: 'window',
		submenu: [
			{role: 'minimize'},
			{role: 'close'}
		]
	},
	{
		role: 'help',
		submenu: [
			{
				label: 'About Electron',
				click () { require('electron').shell.openExternal('https://electron.atom.io') }
			},
			{
				label: 'About CKEditor',
				click () { require('electron').shell.openExternal('http://ckeditor.com/') }
			},
			{type: 'separator'},
			{
				label: 'View License',
				click () {
					if (!licenseWindow) {
						licenseWindow = new BrowserWindow({width: 640, height: 480, javascript: false, title: 'General Public License v3', useContentSize: false, nodeIntegration: false, icon: __dirname + '/icon.ico'});
						licenseWindow.loadURL('file://' + __dirname + '/LICENSE');
						licenseWindow.on('closed', () => {
							licenseWindow = null;
						});
					}
					else
						licenseWindow.focus();
				}
			},
			{
				label: 'About Imaginary Sense',
				click () { require('electron').shell.openExternal('http://imaginary.tech/teleprompter') }
			}
		]
	},
	];
	
	// Personalize menu for OS X
	if (process.platform === 'darwin') {
		template.unshift({
			label: app.getName(),
			submenu: [
				{role: 'about'},
				{role: 'quit'}
			]
		})
		// Remove Start Dictation, Emoji & Symbols from Edit submenu
		const {systemPreferences} = require('electron');

		systemPreferences.setUserDefault('NSDisabledDictationMenuItem', 'boolean', true);
		systemPreferences.setUserDefault('NSDisabledCharacterPaletteMenuItem', 'boolean', true);
	}

	// Enable menu on the following platforms
	if (process.platform === 'darwin') {
		const menu = Menu.buildFromTemplate(template);
		Menu.setApplicationMenu(menu);
	} else {
		// Disables menu in systems where it can be disabled and doesn't need it'.
		Menu.setApplicationMenu(null);
	}
}
