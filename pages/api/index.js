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
      <button onClick={handleClick} className="button-primary">
        Say hello!
      </button>
      {message && <p>{message}</p>}

      <style jsx>{`
        .button-primary {
          background-color: #1fa3ec;
          border: none;
          border-radius: 4px;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          text-align: center;
          text-decoration: none;
          transition: background-color 0.2s ease;
        }

        .button-primary:hover {
          background-color: #0a78b9;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default Home;
