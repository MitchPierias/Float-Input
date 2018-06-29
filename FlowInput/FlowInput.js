import React from 'react';
import { string, number, func, bool } from 'prop-types';
/**
 * Form input with dynamic floating label.
 *
 * @brief Creates and manages a form input element with a dynamic floating label.
 * @version 1.0.0
 * @author [Mitch Pierias](https://github.com/mitchpierias)
 */
export default class FlowInput extends React.Component {

	static propTypes = {
		/** The input 'name' value. */
		name:string,
		/** Input's initial value. */
		value:string,
		/** Input's placeholder and labels text. */
		placeholder:string,
		/** Input type, defaults to text. */
		type:string,
		/** Input text color. */
		color:string,
		/** Label text color in a floating position. */
		primaryColor:string,
		/** Label text color in a placeholder position. */
		secondayColor:string,
		/** Input font size. */
		fontSize:number,
		/** Label shrink amount. */
		shrinkAmount:number,
		/** Input padding. */
		padding:number,
		/** Value change event handler. */
		onChange:func,
		/** Editing end event handler. */
		onComplete:func,
		/** Debug toggle. */
		debug:bool
	}

	static defaultProps = {
		name:"",
		value:"",
		placeholder:"",
		type:"text",
		color:"#424242",
		primaryColor:"#F1773B",
		secondayColor:"rgba(0,0,0,0.25)",
		fontSize:16,
		shrinkAmount:0.6,
		padding:0.6160335,
		bordered:true,
		debug:false
	}

	state = {
		value:"",
		selected:false
	}

	componentWillMount() {
		const value = this.props.value;
		const selected = this.isSelected();
		this.setState({ value, selected });
	}

	isSelected() {
		const { value } = this.props;
		return (value != 0 && value.length > 0);
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
			let inputElem = event.target.parentNode.children[0];
			inputElem.focus();
			return;
		}

		this.setState({ selected:true });
	}

	/**
	 * Form element deselected
	 *
	 * @brief Called when an element enters the blur state
	 * @param {object} Element blur event
	 * @private
	 */
	didDeselectInput(event) {
		// Update values if required
		let { name, value } = event.target;
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
	 * @param {object} Element change event
	 * @private
	 */
	didChangeInput(event) {
		let { name, value } = event.target;
		// Validate value change and notify
		if (value != "" && value != this.props.value && 'function' === typeof this.props.onChange) {
			this.setState({ value });
			this.props.onChange(name, value);
		}
	}
	
	render() {
		// Data variables
		const { name, placeholder, type } = this.props;
		// Config variables
		const { fontSize, color, primaryColor, secondayColor, debug, bordered } = this.props;
		const labelFontSize = fontSize * this.props.shrinkAmount;
		// State variables
		const { value, selected } = this.state;
		// Container <div/> style
		const containerStyle = {
			height:(fontSize+(labelFontSize*3)-(Number(bordered)*2))+"px",
			borderBottom:((bordered)?"2px solid #EEEEEE":"none"),
			backgroundColor:(debug)?"#FF1744":"transparent",
			//overflow:"hidden",
			marginBottom:"7px"
		}
		// Initial <input/> style
		const inputStyle = {
			color:(debug)?"#FFFFFF":color,
			width: "96%",
			padding: "0px 2%",
			margin: 0,
			fontSize: fontSize+"px",
			lineHeight: fontSize+labelFontSize+"px",
		    borderRadius: "none",
		    outline: "none",
		    border:"none",
		    top: (labelFontSize)+"px",
		    position: "relative",
		    borderBottom: "none",
		    border:"none",
		    backgroundColor:(debug)?"#424242":"transparent"
		}
		// Initial <label/> style
		const labelStyle = {
			fontSize: ((selected) ? labelFontSize : fontSize)+"px",
			position: "relative",
			top: ((selected) ? -(fontSize*2) : -((fontSize/2)))+"px",
			left: (selected) ? 0 : "2%",
			color: (selected) ? primaryColor : secondayColor,
			padding: 0,
			margin: 0,
			backgroundColor: "transparent",
			cursor: (selected) ? "default" : "text",
			WebkitTransition: ".333s ease top, .333s ease left, .333s ease font-size, .333s ease color",
			transition: ".333s ease top, .333s ease left, .333s ease font-size, .333s ease color",
			backgroundColor:(debug)?"#FAFAFA":"transparent"
		}
		// Initial <textbox/> style
		const textboxStyle = {
			...labelStyle,
			height: "16em",
			resize: "none"
		}

		return (
			<div id="float-input" style={containerStyle}>
				<input name={name} type={type} placeholder="" value={(value.length>0)?value:""} onFocus={this.didSelectInput.bind(this)} onBlur={this.didDeselectInput.bind(this)} onChange={this.didChangeInput.bind(this)} style={inputStyle}/>
				<label forhtml={name} style={labelStyle} onClick={this.didSelectInput.bind(this)}>{placeholder}</label>
			</div>
		)
	}
}