import { useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // 防止表单默认提交行为
    const url = e.target.url.value;
    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="text" name="url" placeholder="Enter url" />
        <button type="submit">Scrape</button>
      </form>

      {data && (
        <div
          className="wx-card"
          dangerouslySetInnerHTML={{ __html: data.html }}
        />
      )}

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 20px;
        }
        input {
          padding: 8px;
          margin: 10px;
          border-radius: 5px;
          border: none;
        }
        button {
          padding: 8px 16px;
          border-radius: 5px;
          border: none;
          color: #fff;
          background-color: #333;
          cursor: pointer;
        }
        button:hover {
          background-color: #555;
        }
        .wx-card {
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 300px;
          height: 160px;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }
        h2,
        p {
          margin: 10px;
        }
        img {
          width: 100px;
          height: 100px;
          margin-right: 10px;
        }
        .wx-card-content {
          flex: 1;
          width: 100%;
          padding: 10px;
        }
      `}</style>
    </div>
  );
}
