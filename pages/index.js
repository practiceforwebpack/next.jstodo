import React from "react";

import App, { TodoListItem } from "@2chaos/webpack_react_todolist";
const TodolistPage = () => {
  return (
    <div>
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      ></meta>
      <App />
      <button
        onClick={() =>
          fetch("/api/hello")
            .then((e) => e.json())
            .then((e) => console.log(e))
        }
      >
        XXX
      </button>
    </div>
  );
};
export default TodolistPage;
