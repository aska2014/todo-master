import * as React from "react";
import * as ReactDOM from "react-dom";
import TodoAppComponent from "./Components/TodoAppComponent";
import {todoStore} from "./store/TodoStore";

// Activate todo store
todoStore.registerActionHandler();

ReactDOM.render(
	<TodoAppComponent />,
	document.getElementById("todoApp")
)