import React from 'react';

class Header extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div id="top-header">
<p id="vvv_logo">
<span className="v1">__     _</span><span className="v2">__     _</span><span className="v3">__     __</span> <span className="v4"> ____  </span><br/>
<span className="v1">\ \   / </span><span className="v2">\ \   / </span><span className="v3">\ \   / /</span> <span className="v4">|___ \ </span><br/>
<span className="v1"> \ \ / /</span><span className="v2"> \ \ / /</span><span className="v3"> \ \ / / </span> <span className="v4">  __) |</span><br/>
<span className="v1">  \ V / </span><span className="v2">  \ V / </span><span className="v3">  \ V /  </span> <span className="v4"> / __/ </span><br/>
<span className="v1">   \_/  </span><span className="v2">   \_/  </span><span className="v3">   \_/   </span> <span className="v4">|_____|</span><br/>

</p>
				<div id="top-header-status-icon" className={ "status-"+this.props.status }>
					<div className="spinner">
					  <div className="double-bounce1"></div>
					  <div className="double-bounce2"></div>
					</div>
				</div>
			</div>
		);
	}
}
//
export default Header;