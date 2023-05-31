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
    const data = { title, firstImgSrc, description, url };
    res.status(200).json(data);
    console.log(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error", error: error.message });
  }
}
