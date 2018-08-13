import { isFunction, debounce } from "lodash";
import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
//import SearchIcon from '@material-ui/icons/Search';

class InputFilter extends Component {
	constructor() {
		super();
		this.state = { search: "" };
		this.sendNotification = this.sendNotification.bind(this);
	}

	sendNotification() {
		if (isFunction(this.props.onChange)) {
			this.props.onChange(this.state.search);
		}
	}

	render() {
		const { placeholder = "" } = this.props;
		const onChange = (event) => {
      const search = event.target.value;
			this.setState({ search }, debounce(this.sendNotification, 500));
		};
		return (
			<div style={{ position: "relative" }}>
				<TextField
					value={this.state.search}
					onChange={onChange}
					placeholder={placeholder}
					fullWidth
				/>
			</div>
		);
	}
}

export default InputFilter;
