import fetch from "node-fetch";
import { parse } from "node-html-parser";

export default async function handler(req, res) {
  const { url } = req.query;
  const requestOptions = {
    redirect: "follow",
  };

  try {
    const response = await fetch(new Request(url, requestOptions));
    const finalUrl = response.url;
    if (url !== finalUrl) {
      console.log(`Redirected to: ${finalUrl}`);
    }

    const html = await response.text();
    const root = parse(html);
    const title = root.querySelector("title")?.text || "Default Title";
    const description =
      root.querySelector("meta[name='description']")?.getAttribute("content") ||
      "";
    const firstImgSrc =
      root.querySelector("main img")?.getAttribute("src") || "default.png";

    const jsonResponse = {
      title,
      description,
      firstImgSrc,
      url: finalUrl,
    };
    res.json(jsonResponse);
    console.log(`JSON response: ${JSON.stringify(jsonResponse)}`);
  } catch (error) {
    console.error(`Failed to fetch ${url}: ${error.message}`, error);
    const jsonResponse = {
      title: "Default Title",
      description: "",
      firstImgSrc: "default.png",
      url,
    };
    res.json(jsonResponse);
  }
}
