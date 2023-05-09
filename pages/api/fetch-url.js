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
    const data = { title, firstImgSrc, description };

    // Generate the card
    const card = `<div class="wx-card">
      <div class="wx-card-title">
        <h2>${data.title}</h2>
      </div>
      <div class="wx-card-content">
        <div class="wx-card-description">
          <p>${data.description}</p>
        </div>
        <div class="wx-card-image">
          <img src="${data.firstImgSrc}" alt="图片" />
        </div>
      </div>
    </div>
    <style>
      .wx-card {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 160px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        overflow: hidden;
      }

      .wx-card-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 40px;
        background-color: #f2f2f2;
        padding-left: 20px;
      }

      .wx-card-title h2 {
        font-size: 18px;
        margin: 0;
      }

      .wx-card-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 120px;
        width: 100%;
        padding: 10px;
      }

      .wx-card-description {
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding-right: 20px;
        margin-right: 20px;
      }

      .wx-card-description p {
        margin: 0;
        font-size: 14px;
      }

      .wx-card-image {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .wx-card-image img {
        width: 100px;
        height: 100px;
        object-fit: cover;
      }
    </style>`;

    res.status(200).send(card);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
}
