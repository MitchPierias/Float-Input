import React from 'react';
import { string } from 'prop-types';

/**
 * Form input with dynamic floating label.
 *
 * @brief Creates and manages a form input element with a dynamic floating label.
 * @version 1.0.0
 * @author [Mitch Pierias](https://github.com/mitchpierias)
 */
export default class FloatInput extends React.Component {

	static propTypes = {
		/** The input 'name' value. */
		name:string,
		/** Input's initial value. */
		value:string,
		/** Input's placeholder and labels text. */
		placeholder:string,
		/** Label's color in a floating position. */
		primaryColor:string,
		/** Label's color in a placeholder position. */
		secondayColor:string
	}

	static defaultProps = {
		name:"",
		value:"",
		placeholder:"",
		primaryColor:"#F1773B",
		secondayColor:"rgba(0,0,0,0.25)"
	}

	componentWillMount() {
		this.setState({ value:this.props.value });
	}

	/**
	 * Form element selected
	 *
	 * @brief Called when an element is selected or enters the focus state
	 * @param {object} Element Click or Focus event
	 * @private
	 */
	didSelectInput(event) {
		// Check selected element type
		if (event.target.tagName.toLowerCase()=='label') {
			let inputElem = event.target.parentNode.children[1];
			inputElem.focus();
			inputElem.select();
			return;
		}
		// Update the label view layout
		let labelElem = event.target.parentNode.children[0];
		labelElem.style["color"] = this.props.primaryColor;
		labelElem.style["top"] = "0.60625em";
		labelElem.style["font-size"] = "0.8125em";
		labelElem.style["cursor"] = "default";
	}

	/**
	 * Form element deselected
	 *
	 * @brief Called when an element enters the blur state
	 * @param {object} Element blur event
	 * @private
	 */
	didDeselectInput(event) {
		// Extract label element
		let labelElem = event.target.parentNode.children[0];
		// Update view if required
		if (event.target.value.length == 0) {
			labelElem.style["color"] = this.props.secondayColor;
			labelElem.style["top"] = "1.8125em";
			labelElem.style["font-size"] = "1em";
			labelElem.style["cursor"] = "text";
		}
		// Update values if required
		let { name, value } = event.target;
		if (value == "" || value == this.props.value) return;
		// Notify value change
		console.log("Input value changed! Should notify the parent controller");
	}

	/**
	 * Element value changed
	 *
	 * @brief Called when an element's value attribute changes
	 * @param {object} Element change event
	 * @private
	 */
	didChangeInput(event) {
		let input = event.target.value;
		this.setState({value:input});
	}
	
	render() {
		// Local variables
		const { name, placeholder } = this.props;
		const { value } = this.state;
		const hasValue = (value != "" && value.length > 0);
		// Initial <input/> style
		let inputStyle = {
			display: "block",
			width: "98%", 
		    height: "100%",
			padding: "0.60625em 1%",
			fontSize: "1em",
		    borderRadius: "none",
		    outline: "none",
		    border:"none",
		    borderBottom: "2px solid #EEEEEE"
		}
		// Initial <label/> style
		let labelStyle = {
			fontSize: (hasValue) ? "0.8125em" : "1em",
			lineHeight: "1em",
			position: "relative",
			top: (hasValue) ? "0.60625em" : "1.8125em",
			left: "-1%",
			color: (hasValue) ? this.props.primaryColor : this.props.secondayColor,
			display: "inline-block",
			padding: "0 0.8125em 0 0.40625em",
			margin: "0px",
			opacity: 1,
			backgroundColor: "transparent",
			cursor: (hasValue) ? "default" : "text",
		}

		return (
			<div className="float-input">
				<label forhtml={name} style={labelStyle} onClick={this.didSelectInput.bind(this)}>{placeholder}</label>
				<input name={name} type="text" placeholder="" value={(value.length>0)?value:""} onFocus={this.didSelectInput.bind(this)} onBlur={this.didDeselectInput.bind(this)} onChange={this.didChangeInput.bind(this)} style={inputStyle}/>
			</div>
		)
	}
}