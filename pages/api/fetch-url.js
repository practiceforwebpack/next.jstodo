const cheerio = require("cheerio");
const axios = require("axios");

// 定义路由处理函数
async function handler(req, res) {
  const { url } = req.query; // 获取参数中的 url

  try {
    // 发送 GET 请求获取网站 HTML 内容
    const response = await axios.get(url);

    // 使用 cheerio 将 HTML 文本转换成 DOM 对象
    const $ = cheerio.load(response.data);

    // 获取标题、描述和第一张图片链接
    const title = $("title").text();
    const description = $('meta[name="description"]').attr("content");
    const firstImgSrc = $("img").first().attr("src");
    // 返回结果
    res.status(200).json({ title, description, firstImgSrc, url });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default handler;
