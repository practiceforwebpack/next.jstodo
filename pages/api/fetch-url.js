import cheerio from "cheerio";
import got from "got";

//5

export default async function handler(req, res) {
  const { url } = req.body;
  try {
    const options = {
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.5",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        Cookie:
          "__cfduid=abcd1234; _ga=GA1.2.1234567890.1234567890; __gads=ID=1234567890abcdef:T=1234567890:S=ALNI_Mbabcdefg",
        DNT: "1",
        Referer: "https://www.google.com",
        TE: "Trailers",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",

        //Referer: url,
      },
    };

    const response = await got(url, options);
    const $ = cheerio.load(response.body);
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
    res.status(200).send(card);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error" });
  }
}
