import React from 'react';
import ReactDOM from 'react-dom';
// Components
import { FlowInput } from '../../src/index';
// CSS
import './index.css';

const App = (
	<div style={{width:"100vw",height:"100vh"}}>
		<h1>Flow Input Example</h1>
		<FlowInput label="Given Name" type="text"/>
	</div>
)

/*
<FlowInput label="Surname" type="text"/>
<FlowInput label="Email" type="email"/>
*/

ReactDOM.render(App, document.getElementById("root"));