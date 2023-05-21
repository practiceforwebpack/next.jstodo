import { useState } from "react";
import puppeteer from "puppeteer";

export default function Home() {
  const [url, setUrl] = useState("");
  const [cardHTML, setCardHTML] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "networkidle0" });

      const title = await page.title();
      console.log(title);
      console.log("1");
      const firstImgSrc = await page.$eval("img", (img) =>
        img.getAttribute("src")
      );
      const description = await page.$eval('meta[name="description"]', (meta) =>
        meta.getAttribute("content")
      );

      const card = `
      <div class="wx-card">
        <div class="wx-card-title">
          <h2>${title}</h2>
        </div>
        <div class="wx-card-content">
          <div class="wx-card-description">
            <p>${description}</p>
          </div>
          <div class="wx-card-image">
            <img src="${firstImgSrc}" alt="图片" />
          </div>
        </div>
      </div>
      <style>
        .wx-card {
          padding: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 300px;
          height: 160px;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }

        .wx-card-title {
          color: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          width: 100%;
          height: 40px;
          text-overflow: ellipsis;
          word-break: break-all;
          white-space: nowrap;
        }

        h2 {
          color: rgba(0, 0, 0, 0.85);
          font-size: 20px;
          text-overflow: ellipsis;
        }

        p {
          color: rgba(0, 0, 0, 0.65);
          font-size: 12px;
          text-overflow: ellipsis;
        }

        img {
          padding: 20px;
          width: 90px;
          text-align: center;
          margin-button: 20px;
          float: left;
        }

        .wx-card-content {
          font-size: 14;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 120px;
          padding: 12px;
          overflow: hidden;
        }

        .wx-card-description {
          margin: 10;
          font-size: 12;
          width: 60%;
          word-break: break-all;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 7;
          -webkit-box-orient: vertical;
        }
      </style>
    `;

      setCardHTML(card);
      await browser.close();
    } catch (error) {
      console.log(error);
      setCardHTML("An error occurred");
    }
  }

  return (
    <div class="flex flex-col items-center">
      <form class="mt-4 flex flex-col" onSubmit={handleSubmit}>
        <input
          class="h-10 px-2 border rounded-lg"
          type="text"
          placeholder="输入url按回车键确认"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          class="h-10 bg-blue-500 text-white rounded-lg px-4 ml-2"
          type="submit"
        >
          Fetch Data
        </button>
      </form>
      {cardHTML && (
        <div
          class="w-320 h-160 flex items-center bg-white rounded-lg shadow-md overflow-hidden justify-center"
          dangerouslySetInnerHTML={{ __html: cardHTML }}
        ></div>
      )}
    </div>
  );
}
