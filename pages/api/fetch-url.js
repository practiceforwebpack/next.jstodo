import { isValidURL, decodeURI, fetchHTML, extractData } from "./helpers.js";

export default async function handler(req, res) {
  let url = req.query.url || req.body.url;
  if (!url && req.method === "GET") {
    const urlParams = new URLSearchParams(req.url.slice(req.url.indexOf("?")));
    url = urlParams.get("url");
  }
  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  url = decodeURI(url);
  if (!isValidURL(url)) {
    return res.status(400).json({ message: "Invalid URL" });
  }

  try {
    const html = await fetchHTML(url);
    const data = extractData(html);

    const result = { ...data, url };
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error", error: error.message });
  }
}
