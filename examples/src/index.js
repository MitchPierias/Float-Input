import React from 'react';
import ReactDOM from 'react-dom';
// Components
import FlowInput from '../../src';

class App extends React.Component {
	render() {
		return (
			<div>
				<h1>Flow Input Example</h1>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById("root"));