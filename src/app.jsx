import React from 'react';
import {render} from 'react-dom';
import { ipcRenderer } from 'electron';
//import { createStore } from 'redux'

import InstallSteps from './installsteps';

class App {
	constructor() {
		this.progress = 0;
		this.message = 'Initialising';
		//this._store = createStore();
		console.log('beginning listening');
		ipcRenderer.on('progress',
			function (event, store) {
			    this.progress = store;
			    this._render();
			}.bind( this )
		);
		ipcRenderer.on('progress-message',
			function (event, store) {
			    this.message = store;
			    this._render();
			}.bind( this )
		);
		/*ipcRenderer.on('progress',
			function (event, store) {
			    this.progress = store;
			    this._render();
			}.bind( this )
		);*/
	}

	_render() {
		//{this._store.getState()}progress={this.progress} />,
		render(
	  	<InstallSteps progress={this.progress} message={this.message} />,
		  document.getElementById('root')
		);
	}
}


export default App;