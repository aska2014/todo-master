import * as React from "react";
import TodoItemComponent from "./TodoItemComponent";
import {List, Map} from "immutable";
import {ITodos} from "../../store/TodoStore";

interface IProps {
	todos: ITodos;
}

export default class TodoListComponent extends React.Component<IProps, any> {

	shouldComponentUpdate(nextProps, nextState) {
		return (
			this.props.todos !== nextProps.todos
		);
	}

	render() {
		return (
			<ul>
				{this.props.todos.map((todo, key) => {
					return <TodoItemComponent
						key={key} 
						todo={todo} />
				})}
			</ul>
		);
	}
}