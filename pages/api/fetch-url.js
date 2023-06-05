import fetch, { Request } from "node-fetch";
import { parse } from "node-html-parser";

export default async function handler(req, res) {
  const { url } = req.query;
  const requestOptions = {
    redirect: "follow",
  };
  try {
    let response = await fetch(new Request(url, requestOptions));
    let finalUrl = response.url;
    if (url !== finalUrl) {
      console.log(`Redirected to: ${finalUrl}`);
    }

    const html = await response.text();
    const root = parse(html);
    const title = root.querySelector("title").text;
    const description =
      root.querySelector("meta[name='description']")?.getAttribute("content") ??
      "";
    const firstImg = root.querySelector("main img");
    const firstImgSrc = firstImg ? firstImg.getAttribute("src") : null;

    res.json({ title, description, firstImgSrc, url: finalUrl });
  } catch (e) {
    console.error(`Failed to fetch ${url}: ${e.message}`, e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
