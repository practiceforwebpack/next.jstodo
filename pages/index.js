import Head from "next/head";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import styles404 from "./404.module.css";
import styles from "./styles.module.css";
import { gtag } from "../lib/gtag";

export default function Home() {
  const [cardData, setCardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const url = urlParams.get("url");
    const urlTitle = urlParams.get("title"); // 获取 URL 中的 title
    const yhParams = urlParams.get("yh"); // 获取 URL 中的 yh

    let data = localStorage.getItem(url);

    if (!url) {
      setLoading(false);
      setError(true);

      return;
    }

    if (!isValidURL(url)) {
      setLoading(false);
      setError(true);
      return;
    }
    if (data) {
      setCardData(JSON.parse(data));
      setLoading(false);
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
        console.log(data);
        document.title = data.title;

        // 如果 URL 中有 title，则使用 URL 中的 title 覆盖返回的 title
        if (urlTitle) {
          data.title = urlTitle;
        }

        // 获取多个网址并解析为数组
        if (yhParams) {
          const urls = decodeURIComponent(yhParams).split(",");
          data.urls = urls;
        }

        setCardData(data);
        localStorage.setItem(url, JSON.stringify(data)); // 缓存数据
      } catch (error) {
        console.error(error);
        setCardData({ error: "An error occurred" });
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  function handleClick(url) {
    const encodedUrl = encodeURIComponent(url);
    gtag("event", "cardClick", {
      event_category: "cardClick",
      event_label: encodedUrl,
      value: 1,
    }),
      function () {
        window.location.href = decodeURIComponent(encodedUrl);
      };
  }

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
              src="404.webp"
              alt="404 image"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{cardData.title}</title>
        <meta name="description" content="Fetch URL Card" />
        <link rel="icon" href="znz.png" />
      </Head>

      <main>
        <a
          className={styles.a}
          href={cardData.url}
          onClick={() => handleClick(cardData.url)}
        >
          <div className={styles.wxcard}>
            <div className={styles.wxcardleft}>
              <div
                className={
                  loading
                    ? `${styles.wxcardtitle} ${styles.wxcardtitleloading}`
                    : styles.wxcardleft
                }
              >
                {loading ? (
                  <>
                    <Skeleton width={200} height={24} />
                  </>
                ) : (
                  <h2 className={styles.h2}>{cardData.title}</h2>
                )}
              </div>
              <div className={styles.wxcardcontent}>
                <div className={styles.wxcarddescription}>
                  {loading ? (
                    <>
                      <Skeleton count={7} />
                    </>
                  ) : (
                    <p
                      className={
                        loading ? styles.p : `${styles.p} ${styles.ploading}`
                      }
                    >
                      {cardData.description}
                    </p>
                  )}
                </div>
              </div>
              {loading && (
                <div
                  className={
                    loading
                      ? `${styles.wxcardoverlay} ${styles.wxcardoverlayloading}`
                      : styles.wxcardoverlay
                  }
                >
                  <div className={styles.wxcardloader} />
                </div>
              )}
            </div>
            <div className={styles.wxcardright}>
              <div className={styles.wxcardimg}>
                {loading ? (
                  <Skeleton width={90} height={90} />
                ) : (
                  <img
                    className={`${styles.img} ${styles.wxcardright}`}
                    src={cardData.firstImgSrc}
                    alt="图片"
                  />
                )}
              </div>
            </div>
          </div>
        </a>

        {/* 如果有多个网址，则显示到页面下方 */}
        {cardData.urls && (
          <div className={styles.urls}>
            <h3></h3>
            <ul className={""}>
              {cardData.urls.map((url, index) => (
                <li className={styles.urlsli} key={index}>
                  <div className={""}>
                    <a
                      className={styles.urlsa}
                      href={url}
                      onClick={() => handleClick(url)}
                    >
                      {url}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}

const isValidURL = (url) => {
  let regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/;

  if (!url.match(regex)) {
    return false;
  }

  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
