const electron = require('electron');
const { ipcRenderer } = electron;
const addform = document.getElementById('addForm');
const itemInput = document.getElementById('item');

addform.addEventListener('submit', (e) => {
	e.preventDefault();
	const item = document.getElementById('item');
	if (item.value.trim().length) {
		ipcRenderer.send('item:add', item.value);
		item.value = '';
	}
});

itemInput.addEventListener('keypress', (e) => {
	if (e.keyCode === '13') {
		addform.submit();
	}
});
