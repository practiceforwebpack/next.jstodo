import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import ShareCard from "./components/ShareCard";

const App = () => {
  const [cardData, setCardData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://mywebsite.com/api/get-card-data";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ url: "https://www.example.com" }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setCardData(data);
    };
    fetchData();
  }, []);

  return (
    <div className="app">
      <ShareCard
        title={cardData.title}
        description={cardData.description}
        image={cardData.firstImgSrc}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
