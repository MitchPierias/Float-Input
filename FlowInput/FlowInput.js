import React from 'react';
import { string, number, func } from 'prop-types';
// CSS
import './FlowInput.css';
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
		onChange:func
	}

	static defaultProps = {
		name:"",
		value:"",
		placeholder:"",
		color:"#424242",
		primaryColor:"#F1773B",
		secondayColor:"rgba(0,0,0,0.25)",
		fontSize:1,
		shrinkAmount:0.8,
		padding:0.6160335
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
			return;
		}
		let labelFontSize = (this.props.fontSize*this.props.shrinkAmount);
		// Update the label view layout
		let labelElem = event.target.parentNode.children[0];
		labelElem.style["color"] = this.props.primaryColor;
		labelElem.style["top"] = "0.60625em";
		labelElem.style["left"] = 0;
		labelElem.style["font-size"] = labelFontSize+"em";
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
		const { fontSize, padding } = this.props;
		const paddingTop = padding+((fontSize*this.props.shrinkAmount)/4);
		const paddingBottom = padding;
		// Update view if required
		if (event.target.value.length == 0) {
			labelElem.style["color"] = this.props.secondayColor;
			labelElem.style["top"] = ((fontSize/2)+paddingTop+paddingBottom)+"em";
			labelElem.style["left"] = "2%";
			labelElem.style["font-size"] = fontSize+"em";
			labelElem.style["cursor"] = "text";
		}
		// Update values if required
		let { name, value } = event.target;
		if (value == "" || value == this.props.value || 'function' !== typeof this.props.onChange) return;
		// Notify value change
		this.props.onChange(name, value);
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
		const { name, placeholder, fontSize, color, primaryColor, secondayColor, padding } = this.props;
		const paddingTop = padding+((this.props.fontSize*this.props.shrinkAmount)/4);
		const paddingBottom = padding;
		const { value } = this.state;
		const hasValue = (value != "" && value.length > 0);
		// Initial <input/> style
		const inputStyle = {
			color:color,
			display: "block",
			width: "96%", 
		    height: "100%",
			padding: paddingTop+"em 2% "+paddingBottom+"em 2%",
			fontSize: fontSize+"em",
		    borderRadius: "none",
		    outline: "none",
		    border:"none",
		    borderBottom: "2px solid #EEEEEE"
		}
		// Initial <label/> style
		const labelStyle = {
			fontSize: (hasValue) ? (fontSize*this.props.shrinkAmount)+"em" : fontSize+"em",
			lineHeight: fontSize+"em",
			position: "relative",
			top: (hasValue) ? "0.60625em" : ((fontSize/2)+paddingTop+paddingBottom)+"em",
			left: (hasValue) ? 0 : "2%",
			color: (hasValue) ? primaryColor : secondayColor,
			display: "inline-block",
			padding: 0,
			margin: "0px",
			opacity: 1,
			backgroundColor: "transparent",
			cursor: (hasValue) ? "default" : "text"
		}
		// Initial <textbox/> style
		const textboxStyle = {
			height: "16em",
			resize: "none"
		}

		return (
			<div className="float-input">
				<label forhtml={name} style={labelStyle} onClick={this.didSelectInput.bind(this)}>{placeholder}</label>
				<input name={name} type="text" placeholder="" value={(value.length>0)?value:""} onFocus={this.didSelectInput.bind(this)} onBlur={this.didDeselectInput.bind(this)} onChange={this.didChangeInput.bind(this)} style={inputStyle}/>
			</div>
		)
	}
}