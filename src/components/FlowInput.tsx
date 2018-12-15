import * as React from 'react';

interface InputProps {
	label?: string
	value: string
	placeholder: string
	type: 'text' | 'number' | 'password' | 'email';
	color: string
	primaryColor: string
	secondaryColor: string
	fontSize: number
	shrinkAmount: number
	onChange(name: string, value: string): void
	onComplete(name: string, value: string): void
}

interface State {
	value: string
	selected: boolean
}

/**
 * Flow Form Input
 *
 * @desc Managed form input element with dynamic floating label.
 * @version 0.1.1
 * @author [Mitch Pierias](https://github.com/mitchpierias)
 * @param {Props} props
 */
export default class FlowInput extends React.Component<InputProps, State> {

	static state: State = {
		value:"",
		selected:false
	}

	constructor(props: InputProps) {
		super(props);
		// Bindings
		this.didSelectInput = this.didSelectInput.bind(this);
		this.didDeselectInput = this.didDeselectInput.bind(this);
		this.didChangeInput = this.didChangeInput.bind(this);
	}

	componentDidMount() {
		const labelElem = document.getElementById('float-label');
		const inputElem = document.getElementById('float-input');
		
		console.log(inputElem.offsetHeight, inputElem.offsetLeft, inputElem.offsetTop);
		console.log(labelElem.offsetHeight, labelElem.offsetLeft, labelElem.offsetTop);

		const scale = 1.5;
		const xPosition = (labelElem.offsetWidth * (scale-1)) / 2;
		const yPosition = (labelElem.offsetHeight * (scale-1)) / 2;
		console.log(xPosition, yPosition)
		//labelElem.style.webkitTransform = "matrix("+scale+", 0, 0, "+scale+", "+xPosition+", "+yPosition+")"
		labelElem.style.animation = "initial";
	}

	/**
	 * Form element selected
	 *
	 * @brief Called when an element is selected or enters the focus state
	 * @param {FormData} event - Element Click or Focus event
	 * @private
	 */
	didSelectInput(event: React.FormEvent<any>) {
		const labelElem = document.getElementById('float-label');
		labelElem.style.animation = "scaleMe 0.3s ease-in-out 0s 1 normal forwards running";
		// Check selected element type
		if (event.currentTarget.tagName.toLowerCase()=='label') {
			let inputElem = event.currentTarget.parentNode.children[0];
			inputElem.focus();
			return;
		}

		this.setState({ selected:true });
	}

	/**
	 * Form element deselected
	 *
	 * @brief Called when an element enters the blur state
	 * @param {object} event - Element blur event
	 * @private
	 */
	didDeselectInput(event: React.FormEvent<any>) {
		const labelElem = document.getElementById('float-label');
		labelElem.style.animation = "scaleMe 0.3s ease-in-out 0s 1 reverse forwards running";
		// Update values if required
		let { name, value } = event.currentTarget;
		if (value == "" || value == this.props.value || 'function' !== typeof this.props.onComplete) {
			// Return to initial state
			this.setState({ selected:(value && value.length > 0) });
		} else {
			// Input value has changed
			this.props.onComplete(name, value);
		}
	}

	/**
	 * Element value changed
	 *
	 * @brief Called when an element's value attribute changes
	 * @param {HTMLInputElement} event - Element change event
	 * @private
	 */
	didChangeInput(event: React.ChangeEvent<any>) {
		let { name, value } = event.target;
		// Validate value change and notify
		if (value != "" && value != this.props.value && 'function' === typeof this.props.onChange) {
			this.setState({ value });
			this.props.onChange(name, value);
		}
	}
	
	render() {
		return (
			<div style={{position:"relative"}}>
				<input id="float-input" name="name" type={this.props.type||'text'} placeholder="Insert value" defaultValue={this.props.value||null} onFocus={this.didSelectInput} onBlur={this.didDeselectInput} onChange={this.didChangeInput}/>
				<label id="float-label" htmlFor="name" style={{position:"absolute",top:0,left:0}}>{this.props.label||"No label"}</label>
			</div>
		)
	}
}