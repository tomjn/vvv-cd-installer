import React from 'react';
import ProgressBar from './progressbar';
import ProgressStatus from './progressstatus';
var path = require('path');

class InstallSteps extends React.Component {
	constructor(props) {
		super(props);
		this.install_path = path.join(process.env.HOME, 'vagrant-local');
	}
	render() {
		return (
			<div className="container-installing">
				<div className="header">
					<ProgressBar progress={this.props.progress} />
					<ProgressStatus message={this.props.message} />
					<p>We're going to do some checks and install some things! Some steps may require you to restart your machine</p>
					<p>When done, VVV will be installed at:<br/><strong>{this.install_path}</strong></p>
				</div>
			</div>
		);
	}
}
//
export default InstallSteps;