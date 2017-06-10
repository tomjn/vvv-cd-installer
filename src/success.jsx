import React from 'react';

class Success extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="container-success">
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="125 210 366 367" >
					<path fill="#a3be8c" d="M179.221,269.221c-70.294,70.294-70.293,184.264,0,254.558s184.265,70.294,254.559,0  c70.293-70.293,70.293-184.265,0-254.558C363.485,198.927,249.514,198.928,179.221,269.221z M408.323,498.324  c-56.235,56.229-147.411,56.23-203.646,0c-56.236-56.235-56.235-147.413,0-203.647c56.236-56.236,147.411-56.235,203.647-0.001  C464.559,350.913,464.559,442.088,408.323,498.324z"/>
					<path fill="#a3be8c" d="M288.5,486.5c-4.277,0-8.446-1.525-11.73-4.348l-63-54.139c-7.54-6.479-8.4-17.844-1.921-25.384  s17.844-8.4,25.383-1.921l47.574,40.88l78.718-118.078c5.513-8.27,16.688-10.507,24.961-4.992  c8.271,5.515,10.507,16.69,4.988,24.962l-90,135c-2.86,4.29-7.421,7.146-12.528,7.849C290.132,486.444,289.313,486.5,288.5,486.5z"/>
				</svg>
				<p>Success!</p>
				<p><a href="https://varyingvagrantvagrants.org/docs/en-US/" target="_blank" >VVV documentation</a></p>
				<p>To start VVV, open a terminal/command prompt and run these commands:</p>
				<pre>
				cd vagrant-local
				vagrant up --provision
				</pre>
			</div>
		);
		//<p><a href="http://vvv.dev" target="_blank" className="button">Visit the VVV dashboard</a></p>
	}
}
//
export default Success;