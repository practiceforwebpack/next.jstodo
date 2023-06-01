const cheerio = require("cheerio");
const axios = require("axios");

export default async function handler(req, res) {
  const { url } = req.query;

  try {
    // 发送 GET 请求获取网站 HTML 内容
    const response = await axios.get(url);

    // 使用 cheerio 将 HTML 文本转换成 DOM 对象
    const $ = cheerio.load(response.data);

    // 获取标题、描述和第一张图片链接
    const title = $("head title").text();
    const description = $('head meta[name="description"]').attr("content");
    const firstImgSrc = $("img").first().attr("src");

    // 直接返回结果
    res.json({ title, description, firstImgSrc, url });
  } catch (error) {
    // 处理异常情况，并返回错误信息
    res.status(500).json({ message: "Internal Server Error" });
  }
}
