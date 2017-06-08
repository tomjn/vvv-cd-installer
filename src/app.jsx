import React from 'react';
import {render} from 'react-dom';
import { ipcRenderer } from 'electron';
//import { createStore } from 'redux'

import InstallSteps from './installsteps';
import Success from './success';
import Problem from './problem';
import Header from './header';

class App {
	constructor() {
		this.progress = 0;
		this.error = '';
		this.message = 'Initialising';
		this.current_screen = 'installing';
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
		ipcRenderer.on('progress-error',
			function (event, store) {
			    this.error = store;
			    this._render();
			}.bind( this )
		);
		ipcRenderer.on('app-status',
			function (event, store) {
			    this.current_screen = store;
			    this._render();
			}.bind( this )
		);
		ipcRenderer.on('log',
			function (event, store) {
			    console.log( store );
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
			<div className="app-container">
				<Header status={this.current_screen} />
				<div className={ "current-screen current-screen-" + this.current_screen }>
				  	<InstallSteps progress={this.progress} message={this.message}/>
				  	<Success />
				  	<Problem  progress={this.progress} message={this.message} error={this.error} />
				</div>
			</div>,
			document.getElementById('root')
		);
	}
}


export default App;