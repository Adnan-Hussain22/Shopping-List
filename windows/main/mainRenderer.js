const electron = require('electron');
const { ipcRenderer } = electron;
const itemsList = document.getElementById('itemsList');

itemsList.addEventListener('dblclick',(e)=>{
	console.log('dblclick===>',e.target);
	e.target.remove();
})

ipcRenderer.on('item:add', (e, item) => {
	const _item = `<li class="collection-item">${item}</li>`;
	const items = itemsList.innerHTML;
	itemsList.innerHTML = _item + items;
});

ipcRenderer.on('items:clear',(e)=>{
	itemsList.innerHTML = "";
})
