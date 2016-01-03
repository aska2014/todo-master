import * as React from "react";
import TodoAction from "../../actions/TodoAction";

interface IState {
	newText: string;
}

export default class FormComponent extends React.Component<any, IState> {

	constructor(props?, context?) {
		super(props, context);

		// Set inital state
		this.setInitialState();
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		return (
			this.state.newText !== nextState.newText
		);
	}

	setInitialState() {
		this.state = {
			newText: ""
		};
	}

	onChange(e) {
		this.setState({ newText: e.target.value });
	}

	createTodo() {
		TodoAction.create(this.state.newText);
		
		this.setState({ newText: "" })
	}

	render() {
		return (
			<div>
				<input type="text" value={this.state.newText} onChange={(e) => this.onChange(e)} />
				<button onClick={() => this.createTodo()}>Create todo</button>
			</div>
		);
	}
}