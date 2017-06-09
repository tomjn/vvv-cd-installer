import React from 'react';
import ProgressStatus from './progressstatus';

class Problem extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="container-problem">
				<svg version="1.0" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 55.475 100"  >
					<rect fill="#bf616a" y="22.815" width="12.191" height="11.407"></rect>
					<rect fill="#bf616a" y="66.719" width="12.191" height="11.408"></rect>
					<path fill="#bf616a" d="M55.301,0c-6.105,10.64-10.072,18.472-11.9,23.496c-2.761,7.639-4.143,16.466-4.143,26.478
	c0,10.117,1.576,19.362,4.726,27.735c1.945,5.163,5.774,12.593,11.491,22.291h-7.058c-5.678-7.954-9.198-13.03-10.56-15.228
	c-1.361-2.198-2.839-5.18-4.434-8.948c-2.178-5.163-3.694-10.675-4.55-16.535c-0.428-3.036-0.64-5.931-0.64-8.688
	c0-10.326,1.807-19.519,5.423-27.577C35.952,17.896,40.735,10.221,48.008,0H55.301z"></path>
				</svg>
				<p>Oh Dear, something went wrong, a reboot may help but<br/>
				<strong><blink>put your hand up and ask for help!</blink></strong></p>
				<p>Setup failed during this step:</p>
				<ProgressStatus message={this.props.message} />
				<p>{this.props.error}</p>
			</div>
		);
	}
}
//
export default Problem;