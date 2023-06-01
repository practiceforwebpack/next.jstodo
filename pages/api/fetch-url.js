const cheerio = require("cheerio");
const axios = require("axios");

export default async function handler(req, res) {
  const { url } = req.query;

  try {
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    const [title, description, firstImgSrc] = await Promise.all([
      $("head > title").text(),
      $('head meta[name="description"]').attr("content"),
      $("main img").first().attr("src"),
    ]);

    res.json({ title, description, firstImgSrc, url });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
