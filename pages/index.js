import Head from "next/head";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

export default function Home() {
  const [cardData, setCardData] = useState({});
  const [loading, setLoading] = useState(true);

  const cardPlaceholderColor = "#f2f2f2";
  const cardTitleColor = "rgba(0, 0, 0, 0.95)";
  const cardDescriptionColor = "rgba(0, 0, 0, 0.95)";
  const cardImagePaddingColor = "#e6e6e6";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const url = urlParams.get("url");
    if (!url) {
      setLoading(false);
      return;
    }
    if (!isValidURL(url)) {
      setCardHTML("Invalid URL");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/fetch-url?url=${url}`);
        const data = await response.json();
        document.title = data.title;
        setCardData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setCardData({ error: "An error occurred" });
        setLoading(false);
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
        <div className="wx-card">
          <div className="wx-card-title">
            {loading ? (
              <Skeleton
                className="wx-card-skeleton"
                count={1}
                height={40}
                width={300}
                style={{ backgroundColor: cardPlaceholderColor }}
              />
            ) : cardData.title ? (
              <h2 style={{ color: cardTitleColor }}>{cardData.title}</h2>
            ) : null}
          </div>
          <div className="wx-card-content">
            <div className="wx-card-description">
              {loading ? (
                <Skeleton
                  className="wx-card-skeleton"
                  count={1}
                  height={120}
                  width={300}
                  style={{ backgroundColor: cardPlaceholderColor }}
                />
              ) : cardData.description ? (
                <p style={{ color: cardDescriptionColor }}>
                  {cardData.description}
                </p>
              ) : null}
            </div>
            <div className="wx-card-image">
              {loading ? (
                <Skeleton
                  className="wx-card-skeleton"
                  count={1}
                  height={80}
                  width={80}
                  style={{ backgroundColor: cardPlaceholderColor }}
                />
              ) : cardData.firstImgSrc ? (
                <img
                  src={cardData.firstImgSrc}
                  alt="图片"
                  style={{
                    padding: "20px",
                    width: "90px",
                    backgroundColor: cardImagePaddingColor,
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .wx-card {
          padding: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 300px;
          height: 160px;
          background-color: #f2f2f2;
          border-radius: 10px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }

        .wx-card-title {
          background-color: #e6e6e6;
          display: flex;
          align-items: center;
          width: 100%;
          height: 40px;
          text-overflow: ellipsis;
          word-break: break-all;
          white-space: nowrap;
          padding: 0 10px;
        }

        h2 {
          font-size: 20px;
          text-overflow: ellipsis;
        }

        p {
          font-size: 12px;
          text-overflow: ellipsis;
        }

        img {
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
          margin: 0 10px 0 0;
          font-size: 12;
          width: 60%;
          word-break: break-all;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 7;
          -webkit-box-orient: vertical;
        }

        .wx-card-skeleton {
          border-radius: 10px;
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
