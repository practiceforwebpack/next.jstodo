import React, { useState } from "react";

function Home() {
  const [message, setMessage] = useState(null);

  async function handleClick() {
    const response = await fetch("/api/hello", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setMessage(data.message);
  }

  return (
    <div>
      <button onClick={handleClick}>Say hello!</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Home;
