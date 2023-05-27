import Head from "next/head";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

const Home = () => {
  const [cardData, setCardData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const url = urlParams.get("url");
    if (!url) {
      setLoading(false);
      setCardData({});
      return;
    }
    if (!isValidUrl(url)) {
      handleError("Invalid URL");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/fetch-url?url=${url}`);
        const data = await response.json();
        document.title = data.title;
        setCardData(data);
      } catch (error) {
        console.error(error);
        handleError("An error occurred");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleError = (errorMessage) => {
    setCardData({ error: errorMessage });
    setLoading(false);
  };

  return (
    <div>
      <Head>
        <title>{cardData?.title || "Fetch URL Card"}</title>
        <meta name="description" content="Fetch URL Card" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {Object.keys(cardData).length > 0 && ( // 新增：只有 data 不为空对象时才显示卡片
          <div className="wx-card">
            <div className="wx-card-title">
              {loading ? (
                <Skeleton width={200} height={24} />
              ) : (
                <h2>{cardData?.title}</h2>
              )}
            </div>
            <div className="wx-card-content">
              <div className="wx-card-description">
                {loading ? (
                  <Skeleton count={7} />
                ) : (
                  <p>{cardData?.description}</p>
                )}
              </div>
              <div className="wx-card-image">
                {loading ? (
                  <Skeleton width={90} height={90} />
                ) : (
                  <img src={cardData?.firstImgSrc} alt="图片" />
                )}
              </div>
            </div>
            {loading && (
              <div className="wx-card-overlay">
                <div className="wx-card-loader" />
              </div>
            )}
          </div>
        )}
      </main>

      <style jsx>{`
        .wx-card {
          position: relative;
          padding: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 300px;
          height: 170px;
          background-color: ${loading ? "#F2F2F2" : "#fff"};
          border-radius: 10px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }

        .wx-card-title {
          color: ${loading ? "#D8D8D8" : "rgba(0, 0, 0, 0.85)"};
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
          height: 40px;
          text-overflow: ellipsis;
          word-break: break-all;
          text-align: left;
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
          font-size: 20px;
          text-overflow: ellipsis;
        }

        p {
          color: ${loading ? "#D8D8D8" : "rgba(0, 0, 0, 0.65)"};
          font-size: 12px;
          text-overflow: ellipsis;
        }

        img {
          padding: 20px;
          width: 90px;
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
};

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export default Home;
