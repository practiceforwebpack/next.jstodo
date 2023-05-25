import Head from "next/head";
import { useState, useEffect } from "react";

export default function Home() {
  const [cardData, setCardData] = useState({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const url = urlParams.get("url");
    if (!url) {
      return;
    }
    if (!isValidURL(url)) {
      setCardHTML("Invalid URL");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/fetch-url?url=${url}`);
        const data = await response.json();
        document.title = data.title;
        setCardData(data);
      } catch (error) {
        console.error(error);
        setCardData({ error: "An error occurred" });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>{cardData.title}</title>
        <meta name="description" content="Fetch URL Card" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {cardData.title ? (
          <div className="wx-card">
            <div className="wx-card-title">
              <h2>{cardData.title}</h2>
            </div>
            <div className="wx-card-content">
              <div className="wx-card-description">
                <p>{cardData.description}</p>
              </div>
              <div className="wx-card-image">
                <img src={cardData.firstImgSrc} alt="图片" />
              </div>
            </div>
          </div>
        ) : (
          <p>No URL was provided in the query parameter.</p>
        )}
      </main>

      <style jsx>{`
        .wx-card {
          padding: 12px;
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
          color: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          width: 100%;
          height: 40px;
          text-overflow: ellipsis;
          word-break: break-all;
          white-space: nowrap;
        }

        h2 {
          color: rgba(0, 0, 0, 0.85);
          font-size: 20px;
          text-overflow: ellipsis;
        }

        p {
          color: rgba(0, 0, 0, 0.65);
          font-size: 12px;
          text-overflow: ellipsis;
        }

        img {
          padding: 20px;
          width: 90px;
          text-align: center;
          margin-button: 20px;
          float: left;
        }

        .wx-card-content {
          font-size: 14;
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
          margin: 10;
          font-size: 12;
          width: 60%;
          word-break: break-all;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 7;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  );
}

const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
