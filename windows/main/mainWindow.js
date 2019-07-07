const electron = require('electron');
const path = require('path');
const url = require('url');
const { app, BrowserWindow, Menu } = electron;

const createMainWindow = () => {
	const mainWin = new BrowserWindow({
		webPreferences:{
			nodeIntegration:true
		}
	});
	mainWin.loadURL(
		url.format({
			pathname: path.join(__dirname, 'mainWindow.html'),
			protocol: 'file:',
			slashes: true
		})
    );
    return mainWin
};
module.exports = {createMainWindow}