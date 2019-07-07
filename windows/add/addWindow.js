const electron = require('electron');
const path = require('path');
const url = require('url');
const { app, BrowserWindow, Menu } = electron;
let win=null;
const createAddWindow = () => {
	 win = new BrowserWindow({
		width: 300,
		height: 200,
		maxWidth: 300,
		maxHeight: 200,
		title: 'Add Shopping List Item',
		show: false,
		modal: true,
		webPreferences: {
			nodeIntegration: true
		}
	});
	win.loadURL(
		url.format({
			pathname: path.join(__dirname, 'addWindow.html'),
			protocol: 'file:',
			slashes: true
		})
	);
	win.on('ready-to-show', () => {
		win.show();
		win.setMenu(Menu.buildFromTemplate(menuTemplate))
		
	});
	return win;
};

const menuTemplate = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Exit',
				accelerator: process.platform === 'darwin' ? 'Comman+Shift+Q' : 'Ctrl+Shift+Q',
				click: () => {
					win.close();
				}
			}
		]
	}
];

module.exports = { createAddWindow };
