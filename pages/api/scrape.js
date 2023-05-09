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

    if (!title || !firstImgSrc || !description) {
      res.status(400).json({ message: "Invalid url" });
      return;
    }

    const cardHTML = `<div class="wx-card">
                      <div class="wx-card-content">
                        <h2>${title}</h2>
                        <p>${description}</p>
                      </div>
                      <img src="${firstImgSrc}" alt="图片" />
                    </div>`;

    res.status(200).send(cardHTML);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
