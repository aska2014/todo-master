import TodoActionConstants from "../constants/TodoActionConstants";
import Dispatcher from "../dispatcher/AppDispatcher";
import {List, Map, fromJS} from "immutable";
import {Subject, Observable} from "rx";

export interface ITodo extends Map<string, any> {}

export interface ITodos extends List<ITodo> {}

class TodoStore {

	private _todos: ITodos;
	private todosObservable: Subject<ITodos>;

	constructor() {
		this.todosObservable = new Subject<ITodos>();
	}

	public registerActionHandler() {
		Dispatcher.register((action: any) => {
			switch(action.actionType) {
				case TodoActionConstants.GET_ALL:
					this.getAll();
					break;
				case TodoActionConstants.CREATE:
					this.create(action.text);
					break;
				case TodoActionConstants.TOGGLE_COMPLETE:
					this.toggleComplete(action.todo);
					break;
			}
		})
	}

	public get todos() { 
		return this._todos;
	}
	
	public set todos(todos) {
		// Update todos if changed
		if(todos === this._todos) return;
		this._todos = List.isList(todos) ? todos: fromJS(todos);

		// Notify subscribers
		this.todosObservable.onNext(this._todos);
	}

	public getTodosObservable() {
		return this.todosObservable;
	}

	// Request all todos from server
	private requestAllFromServer() {
		return Observable.return([
			{text: "Learn how to get rich"},
			{text: "Get rich"},
			{text: "Give it all away"},
			{text: "Learn how to get rich again"},
			{text: "Get rich again"},
			{text: "Give it all away"}
		])
	}

	// They are private to make sure you call them using actions
	private getAll() {
		let requestObservable = this.requestAllFromServer();

		requestObservable
			.subscribe((todos: any) => {
				this.todos = todos;
			})
	}

	private create(text: string) {
		Observable.timer(100)
			.take(1)
			.subscribe(() => {
				this.todos = this.todos.push(Map({text: text}));
			})
	}

	private getTodoIndex(todo) {
		return this.todos.findIndex((t) => t === todo);
	}

	private updateTodo(todo, callback: (todo: Map<any, any>) => Map<any, any>) {
		let index = this.getTodoIndex(todo);

		this.todos = this.todos.update(index, callback);
	}

	private toggleComplete(todo) {
		this.updateTodo(
			todo, 
			(t) => t.set('completed', !t.get('completed'))
		);
	}
}

export var todoStore =  new TodoStore();