import React from 'react';

class ProgressStatus extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="progress-status-container">
				<div className="spinner">
				  <div className="double-bounce1"></div>
				  <div className="double-bounce2"></div>
				</div>
				<p className="progress-message">{this.props.message}...</p>
			</div>
		);
	}
}
//
export default ProgressStatus;