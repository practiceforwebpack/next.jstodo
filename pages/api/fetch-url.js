import cheerio from "cheerio";
import got from "got";
//5
export default async function handler(req, res) {
  const { url } = req.body;
  try {
    const options = {
      headers: {
        Connection: "keep-alive",
        "Cache-Control": "max-age=0",
        "sec-ch-ua":
          '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-User": "?1",
        "Sec-Fetch-Dest": "document",
        Referer: "https://bj.ke.com/",
        "Accept-Language": "zh-CN,zh;q=0.9",
      },
    };

    const response = await got(url, options);
    const $ = cheerio.load(response.body);
    const title = $("title").text();
    console.log(title);
    console.log("1");
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
