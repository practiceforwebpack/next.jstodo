import Head from "next/head";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

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
  console.log(cardData.url);
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = cardData.url;
  };

  if (error) {
    return (
      <div className="container">
        <Head>
          <title>404 Not Found</title>
          <meta name="description" content="404 Not Found" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="content">
          <h1>Oops! Page Not Found</h1>
          <div className="img-wrapper">
            <img
              src="404.png"
              alt="404 image"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>

        <style jsx>{`
          .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .content {
            text-align: center;
          }

          h1 {
            font-size: 3rem;
          }

          p {
            font-size: 1.5rem;
            margin-bottom: 2rem;
          }

          .img-wrapper {
            position: relative;
            width: 300px;
            height: 300px;
            margin: 0 auto;
          }

          @media screen and (max-width: 600px) {
            h1 {
              font-size: 2rem;
            }

            p {
              font-size: 1rem;
            }

            .img-wrapper {
              width: 200px;
              height: 200px;
            }
          }
        `}</style>
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
          margin: 50px auto;
          position: relative;
          padding: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 300px;
          height: 170px;

          background-color: #f7f7f7;
          border-radius: 10px;
          box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
            rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
          overflow: hidden;
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
}

const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
