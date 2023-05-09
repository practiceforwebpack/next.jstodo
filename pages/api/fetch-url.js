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
    const card = `
    <div class="wx-card">
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
        align-items: center;
        width: 300px;
        height: 160px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        overflow: hidden;
      }
      
      .wx-card-title {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 40px;
        font-size: 16px;
      }
      
      h2, p {
        margin: 10px;
      }
     
      img {
        width: 80px;
        height: 80px;
        margin-right: 10px;
        float: left;
      }
      
      .wx-card-content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 120px;     
        padding: 10px;

      }
      
      .wx-card-description {
        width: 60%;
      }
    </style>
  `;
    res.status(200).send(card);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
}
