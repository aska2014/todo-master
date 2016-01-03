import * as React from "react";
import {List, Map} from "immutable";
import TodoAction from "../actions/TodoAction";
import {todoStore, ITodos} from "../store/TodoStore";
import TodoListComponent from "./todos/TodoListComponent";
import FormComponent from "./todos/FormComponent";

interface IState {
	todos: ITodos;
}

export default class TodoAppComponent extends React.Component<any, IState> {

	private todosSubscriber;

	componentWillMount() {
		// Set inital state
		this.setInitialState();

		// Subscribe to changes
		this.subscribeToChanges();

		// Get all todos
		TodoAction.getAll();
	}

	componentWillUnmount() {
		this.todosSubscriber.dispose();
	}

	setInitialState() {
		this.state = { todos: List([]) }
	}

	subscribeToChanges() {
		this.todosSubscriber = todoStore.getTodosObservable()
			.subscribe((todos) => {
				this.setState({ todos: todos });
			});
	}

	render() {
		return (
			<div>
				<h1>Typescript, React, Flux, Immutable in a Todo Application!</h1>
				<hr/>
				<FormComponent />
				<TodoListComponent todos={this.state.todos} />
			</div>
		);
	}
}