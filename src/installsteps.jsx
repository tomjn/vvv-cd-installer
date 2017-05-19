import React from 'react';
import ProgressBar from './progressbar';
import ProgressStatus from './progressstatus';

class InstallSteps extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="todoListMain">
				<div className="header">
					<ProgressBar progress={this.props.progress} />
					<ProgressStatus message={this.props.message} />
					<p>We're going to do some checks and install some things!</p>
				</div>
			</div>
		);
	}
}
//
export default InstallSteps;