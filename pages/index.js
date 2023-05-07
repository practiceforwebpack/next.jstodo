import React, { useState } from "react";
import App from "@2chaos/webpack_react_todolist";

const TodolistPage = () => {
  const [url, setUrl] = useState("");
  const [cardInfo, setCardInfo] = useState({
    title: "",
    firstImgSrc: "",
    description: "",
  });

  const handleUrlInputChange = (event) => {
    setUrl(event.target.value);
  };

  const handleUrlInputKeyDown = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await fetch("/api/fetch-url-input", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
        const data = await response.json();
        setCardInfo(data);
      } catch (error) {
        console.error(error);
      }
      setUrl("");
    }
  };

  return (
    <div>
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      />
      <App />

      <input
        style={{ width: 1293 }}
        placeholder="请输入网址并按下回车"
        value={url}
        onChange={handleUrlInputChange}
        onKeyDown={handleUrlInputKeyDown}
        onKeyUp={() => {
          // do nothing
        }}
      />

      {cardInfo.title && (
        <div>
          <h2>{cardInfo.title}</h2>
          <img src={cardInfo.firstImgSrc} alt="previewImg" />
          <p>{cardInfo.description}</p>
        </div>
      )}
    </div>
  );
};

export default TodolistPage;
