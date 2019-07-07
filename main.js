const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;
const { mainWindow, addWindow } = require('./windows');
let _mainWin, _addWin;

process.env.NOD_ENV = "production";

app.on('ready', () => {
	// createWindow();
	_mainWin = mainWindow.createMainWindow();
	_mainWin.on('close', () => {
		app.quit();
		_mainWin = null;
	});
	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
	Menu.setApplicationMenu(mainMenu);
});

ipcMain.on('item:add', (e, item) => {
	_mainWin.webContents.send('item:add', item);
});

const mainMenuTemplate = [
	{
		label: 'File',
		submenu: [
			{
                label: 'Add Item',
                accelerator: process.platform === 'darwin' ? 'Cmd+Shift+A' : 'Ctrl+Shift+A',
				click: () => {
					_addWin = addWindow.createAddWindow();
				}
			},
			{
                label: 'Clear Items',
                accelerator: process.platform === 'darwin' ? 'Cmd+Shift+C' : 'Ctrl+Shift+C',
				click: () => {
					_mainWin.webContents.send('items:clear');
				}
			},
			{
				label: 'Quit',
				accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
				click: () => {
					app.quit();
				}
			}
		]
	}
];

// If mac, add empty object to menu
if (process.platform === 'darwin') {
	mainMenuTemplate.unshift({});
}

// Add dev tools to menu if it is not it production
if (process.env.NOD_ENV !== 'production') {
	mainMenuTemplate.push({
		label: 'Developer Tools',
		submenu: [
			{
				label: 'Toggle DevTools',
				accelerator: process.platform === 'darwin' ? 'Comman+I' : 'Ctrl+I',
				click: (item, focusedWindow) => {
					focusedWindow.toggleDevTools();
				}
			},
			{
				role: 'reload'
			}
		]
	});
}
