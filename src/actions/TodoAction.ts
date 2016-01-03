import Dispatcher from "../dispatcher/AppDispatcher";
import TodoActionConstants from "../constants/TodoActionConstants";

export default class TodoAction {

	static getAll() {
		Dispatcher.dispatch({
			actionType: TodoActionConstants.GET_ALL
		});
	}

	static create(text: string) {
		Dispatcher.dispatch({
			actionType: TodoActionConstants.CREATE,
			text: text
		});
	}

	static toggleComplete(todo) {
		Dispatcher.dispatch({
			actionType: TodoActionConstants.TOGGLE_COMPLETE,
			todo: todo
		});
	}
}