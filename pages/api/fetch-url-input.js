import cheerio from "cheerio";

export default async function handler(req, res) {
  const { url } = req.body;

  try {
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);

    const title = $("title").text();
    const firstImgSrc = $("img").eq(0).attr("src");
    const description = $('meta[name="description"]').attr("content");
    const data = {
      title,
      firstImgSrc,
      description,
    };

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
}
