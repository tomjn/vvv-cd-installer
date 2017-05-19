// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import App from './app.js';

var installer = new App();
installer._render();

var ipcRenderer = require('electron').ipcRenderer;
ipcRenderer.on('store-data', function (store) {
	console.log( "setting progress: " +store );
    installer.progress = store
    installer._render();
});
