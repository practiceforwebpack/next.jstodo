import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [cardHTML, setCardHTML] = useState("");

  // 当路由参数发生变化时更新 URL 状态
  useEffect(() => {
    setUrl(router.query.url || "");
  }, [router.query.url]);

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
    <div className="flex flex-col items-center">
      <form className="mt-4 flex flex-col" onSubmit={handleSubmit}>
        <input
          className="h-10 px-2 border rounded-lg"
          type="text"
          placeholder="Enter URL and press Enter"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className="h-10 bg-blue-500 text-white rounded-lg px-4 ml-2"
          type="submit"
        >
          Fetch Data
        </button>
      </form>
      {cardHTML && (
        <div
          className="w-320 h-160 flex items-center bg-white rounded-lg shadow-md overflow-hidden justify-center"
          dangerouslySetInnerHTML={{ __html: cardHTML }}
        ></div>
      )}
    </div>
  );
}
