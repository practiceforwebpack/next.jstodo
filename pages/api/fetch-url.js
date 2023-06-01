import fetch from "node-fetch";
import { parse } from "node-html-parser";

export default async function handler(req, res) {
  const { url } = req.query;

  try {
    const response = await fetch(url);
    const html = await response.text();
    const root = parse(html);
    const title = root.querySelector("title").text;
    const description =
      root.querySelector("meta[name='description']")?.getAttribute("content") ??
      "";
    const firstImg = root.querySelector("main img");
    const firstImgSrc = firstImg ? firstImg.getAttribute("src") : null;

    res.json({ title, description, firstImgSrc, url });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
