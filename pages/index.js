import Head from "next/head";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import styles404 from "./404.module.css";
export default function Home() {
  const [cardData, setCardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const url = urlParams.get("url");
    if (!url) {
      setLoading(false);
      setError(true);
      return;
    }
    if (!isValidURL(url)) {
      setCardHTML("Invalid URL");
      setLoading(false);
      setError(true);
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      setError(false); // reset error status
      try {
        const response = await fetch(
          `/api/fetch-url?url=${url}&redirect=false`
        );
        const data = await response.json();
        document.title = data.title;
        setCardData(data);
      } catch (error) {
        console.error(error);
        setCardData({ error: "An error occurred" });
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = cardData.url;
  };
  if (error) {
    return (
      <div className={styles404.container}>
        <Head>
          <title>404 Not Found</title>
          <meta name="description" content="404 Not Found" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles404.content}>
          <h1 className={styles404.h1}>Oops! Page Not Found</h1>
          <div className={styles404.imgwrapper}>
            <img
              src="404.png"
              alt="404 image"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    ); // render error message
  }
  return (
    <div>
      <Head>
        <title>{cardData.title}</title>
        <meta name="description" content="Fetch URL Card" />
        <link rel="icon" href="znz.png" />
      </Head>
      <main>
        <a href={cardData.url} onClick={handleClick}>
          <div className="wx-card">
            <div className="wx-card-title">
              {loading ? (
                <>
                  <Skeleton width={200} height={24} />
                </>
              ) : (
                <h2>{cardData.title}</h2>
              )}
            </div>
            <div className="wx-card-content">
              <div className="wx-card-description">
                {loading ? (
                  <>
                    <Skeleton count={7} />
                  </>
                ) : (
                  <p>{cardData.description}</p>
                )}
              </div>
              <div className="wx-card-image">
                {loading ? (
                  <Skeleton width={90} height={90} />
                ) : (
                  <img src={cardData.firstImgSrc} alt="图片" />
                )}
              </div>
            </div>
            {loading && (
              <div className="wx-card-overlay">
                <div className="wx-card-loader" />
              </div>
            )}
          </div>
        </a>
      </main>
      <style jsx>{`
        a {
          text-decoration: none;
        }
        .wx-card a {
          pointer-events: auto;
        }
        .wx-card {
          transition: transform 0.3s ease-in-out;
          margin: 25px auto;
          position: relative;
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 80vw;
          max-width: 480px;
          height: 144px;
          background-color: #f7f7f7;
          box-shadow: rgba(0, 0, 0, 0.01) 0px 1px 3px 0px,
            rgba(0, 0, 0, 0.04) 0px 0px 0px 1px;
          overflow: hidden;
          border-radius: 20px;
          border: 1px solid #f7f7f7;
        }
        .wx-card:hover {
          cursor: pointer;
          transform: scale(1.03);
          transition: transform 0.3s ease-in-out;
        }
        .wx-card-title {
          color: ${loading ? "#D8D8D8" : "rgba(0, 0, 0, 0.85)"};
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
          height: 16px; /* 减小高度 */
          margin: 10px 5px 5px; /* 减小标题与下面部分的间距 */
          text-overflow: ellipsis;
          word-break: break-all;
          text-align: left;
          padding: 0 5px; /* 减小左右 padding */
        }
        .wx-card-loader {
          content: "";
          display: block;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #ccc;
          border-top-color: #333;
          animation: spin 0.8s ease-in-out infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        h2 {
          color: rgba(0, 0, 0, 0.85);
          font-size: 18px;
          text-overflow: ellipsis;
          margin: 10px 5px;
        }
        p {
          color: ${loading ? "#D8D8D8" : "rgba(0, 0, 0, 0.65)"};
          font-size: 12px;
          text-overflow: ellipsis;
          margin: 5px 2px;
        }
        img {
          padding: 8px;
          width: 90px;
        }
        .wx-card-content {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 110px;
          padding: 5px;
          overflow: hidden;
        }
        .wx-card-description {
          margin: 2px;
          width: 80%;
          word-break: break-all;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
        }
        .wx-card-overlay {
          display: ${loading ? "flex" : "none"};
          position: absolute;
          align-items: center;
          justify-content: center;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.7);
          z-index: 1;
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
