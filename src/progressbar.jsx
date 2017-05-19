import React from 'react';

class ProgressBar extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="progress-bar-container">
				<div className="progress-bar" style={{ 'width': this.props.progress + '%' }}>
					&nbsp;{this.props.progress}%
				</div>
			</div>
		);
	}
}
//
export default ProgressBar;