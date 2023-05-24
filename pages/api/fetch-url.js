import cheerio from "cheerio";

const isValidURL = (str) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}" + // domain name
      "|((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(str);
};

export default async function handler(req, res) {
  let url = req.query.url || req.body.url;
  if (!url && req.method === "GET") {
    const urlParams = new URLSearchParams(req.url.slice(req.url.indexOf("?")));
    url = urlParams.get("url");
  }
  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }
  url = decodeURIComponent(url);
  if (!isValidURL(url)) {
    return res.status(400).json({ message: "Invalid URL" });
  }
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const title = $("title").text();
    const firstImgSrc = $("img").eq(0).attr("src");
    const description = $('meta[name="description"]').attr("content");
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
    const data = { title, firstImgSrc, description, html }; // 将数据和卡片 HTML 代码分别保存在一个对象中
    const result = { data, card }; // 将它们保存在一个对象中
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result); // 返回对象
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error", error: error.message });
  }
}
