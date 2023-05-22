import cheerio from "cheerio";

//5

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { url } = req.body;

    try {
      const response = await fetch(url);
      const html = await response.text();
      const $ = cheerio.load(html);
      const title = $("title").text();
      const firstImgSrc = $("img").eq(0).attr("src");
      const description = $('meta[name="description"]').attr("content");
      const data = { title, firstImgSrc, description };

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
        padding:12px;
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
        color:rgba(0,0,0,0.85);
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        text-overflow: ellipsis;
        word-break: break-all;
        white-space: nowrap;
   
      }
      
      h2 {
        color:rgba(0,0,0,0.85);
        font-size:20px;
        text-overflow:ellipsis;
                
      }
     p{
      color:rgba(0,0,0,0.65);
      font-size:12px;
      text-overflow:ellipsis;
      
              
    
     }
      img {
        padding:20px;
        width: 90px;
        text-align: center;
        margin-button: 20px;
        float: left;
      }
      
      .wx-card-content {
        font-size:14;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 120px;     
        padding: 12px;
        overflow: hidden;
       
      }      
      .wx-card-description {
        margin:10;
        font-size:12;
        width: 60%;
        word-break: break-all;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 7;
        -webkit-box-orient: vertical;
      }
    </style>
  `;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.status(200).send(card);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error" });
    }
  }
}
