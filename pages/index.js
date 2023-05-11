import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [cardHTML, setCardHTML] = useState("");
  //.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/fetch-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    <div class="flex flex-col items-center">
      {" "}
      <form class="mt-4 flex flex-col" onSubmit={handleSubmit}>
        {" "}
        <input
          class="h-10 px-2 border rounded-lg"
          type="text"
          placeholder="输入url按回车键确认"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />{" "}
        <button
          class="h-10 bg-blue-500 text-white rounded-lg px-4 ml-2"
          type="submit"
        >
          {" "}
          Fetch Data{" "}
        </button>{" "}
      </form>{" "}
      {cardHTML && (
        <div
          class="w-320 h-160 flex items-center bg-white rounded-lg shadow-md overflow-hidden justify-center"
          dangerouslySetInnerHTML={{ __html: cardHTML }}
        ></div>
      )}{" "}
    </div>
  );
}
