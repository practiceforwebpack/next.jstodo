import Head from "next/head";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

export default function Home() {
  const [cardData, setCardData] = useState({});
  const [loading, setLoading] = useState(true);

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
      setLoading(true); // 加载开始时设置为true
      try {
        const response = await fetch(`/api/fetch-url?url=${url}`);
        const data = await response.json();
        document.title = data.title;
        setCardData(data);
      } catch (error) {
        console.error(error);
        setCardData({ error: "An error occurred" });
      }
      setLoading(false); // 加载结束时设置为false
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
            {loading ? ( // 为标题添加骨架屏
              <>
                <Skeleton width={200} height={24} />
                <div className="wx-card-loading-bar" />
              </>
            ) : (
              <h2>{cardData.title}</h2>
            )}
          </div>
          <div className="wx-card-content">
            <div className="wx-card-description">
              {loading ? ( // 为描述添加骨架屏
                <>
                  <Skeleton count={7} />
                  <div className="wx-card-loading-bar" />
                </>
              ) : (
                <p>{cardData.description}</p>
              )}
            </div>
            <div className="wx-card-image">
              {loading ? ( // 为图片添加骨架屏
                <Skeleton width={90} height={90} />
              ) : (
                <img src={cardData.firstImgSrc} alt="图片" />
              )}
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
          background-color: ${loading
            ? "#F2F2F2"
            : "#fff"}; // 根据loading状态设置背景色
          border-radius: 10px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }

        .wx-card-title {
          color: ${loading
            ? "#D8D8D8"
            : "rgba(0, 0, 0, 0.85)"}; // 根据loading状态设置颜色
          display: flex;
          align-items: center;
          width: 100%;
          height: 40px;
          text-overflow: ellipsis;
          word-break: break-all;
          white-space: nowrap;
          position: relative;
        }

        .wx-card-loading-bar {
          position: absolute;
          width: 100%;
          height: 5px;
          background-color: #d8d8d8;
          bottom: 0;
          left: 0;
          animation: loadingbar 2s infinite ease-in-out;
        }

        @keyframes loadingbar {
          0% {
            width: 0;
          }
          50% {
            width: 50%;
          }
          100% {
            width: 0;
          }
        }

        h2 {
          color: rgba(0, 0, 0, 0.85);
          font-size: 20px;
          text-overflow: ellipsis;
        }

        p {
          color: ${loading
            ? "#D8D8D8"
            : "rgba(0, 0, 0, 0.65)"}; // 根据loading状态设置颜色
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
