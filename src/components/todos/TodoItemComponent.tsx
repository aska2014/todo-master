import * as React from "react";
import TodoAction from "../../actions/TodoAction";
import {Map} from "immutable";
import {ITodo} from "../../store/TodoStore";

interface IProps extends React.Props<TodoItemComponent> {
	todo: ITodo;
}

export default class TodoItemComponent extends React.Component<IProps, any> {

	toggleComplete() {
		TodoAction.toggleComplete(this.props.todo);
	}

	render() {
		let todo = this.props.todo, 
			completedLink,
			style = {};

		if(todo.get('completed')) {
			completedLink = <a href="#" onClick={() => this.toggleComplete()}>Mark uncompleted</a>;
			style['textDecoration'] = "line-through";

		} else {
			completedLink = <a href="#" onClick={() => this.toggleComplete()}>Mark completed</a>;
			style['textDecoration'] = "none";
		}

		return (
			<li>
				<span style={style}>{todo.get('text')}</span> {completedLink}
			</li>
		);
	}
}