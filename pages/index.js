import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [cardHTML, setCardHTML] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/fetch-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.text();
      setCardHTML(data);
    } catch (error) {
      console.error(error);
      setCardHTML("An error occurred");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="输入url按回车键确认"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Fetch Data</button>
      </form>
      {cardHTML && (
        <div
          dangerouslySetInnerHTML={{ __html: cardHTML }}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "300px",
            height: "160px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
            overflow: "hidden",
          }}
        ></div>
      )}
    </div>
  );
}
