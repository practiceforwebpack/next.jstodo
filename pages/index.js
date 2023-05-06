import React, { useEffect } from "react";
import { useState } from "react";
import App, { TodoListItem } from "@2chaos/webpack_react_todolist";
import * as cheerio from "cheerio";
const TodolistPage = () => {
  const [url, setUrl] = useState("");
  const [state, updateState] = useState("");

  return (
    <div>
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      ></meta>
      <App />

      <input
        style={{ width: 1293 }}
        placeholder="请输入网址并按下回车"
        value={state}
        onChange={(e) => {
          updateState(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setUrl(state);
          }
        }}
        onKeyUp={async (e) => {
          if (e.key === "Enter") {
            console.log(url);
            try {
              const response = await fetch("/api/fetch-url-input", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
              });
              const data = await response.json();
              console.log(data);
            } catch (error) {
              console.error(error);
            }
            updateState("");
          }
        }}
      ></input>

      <button
        onClick={() =>
          fetch("/api/hello")
            .then((e) => e.json())
            .then((e) => console.log(e))
        }
      >
        test
      </button>
    </div>
  );
};

export default TodolistPage;
