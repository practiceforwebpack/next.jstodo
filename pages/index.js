import Head from "next/head";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import styles404 from "./404.module.css";
import styles from "./styles.module.css";
import { gtag } from "../lib/gtag"; // 导入 gtag 函数

export default function Home() {
  const [cardData, setCardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.time("fetchData");

    const urlParams = new URLSearchParams(window.location.search);
    const url = urlParams.get("url");
    let data = localStorage.getItem(url);

    if (!url) {
      setLoading(false);
      setError(true);
      console.timeEnd("fetchData"); // 分别在每个判断中加上计时结束
      return;
    }

    if (!isValidURL(url)) {
      setCardHTML("Invalid URL");
      setLoading(false);
      setError(true);
      console.timeEnd("fetchData");
      return;
    }

    if (data) {
      setCardData(JSON.parse(data));
      setLoading(false);
      console.timeEnd("fetchData");
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
        localStorage.setItem(url, JSON.stringify(data)); // 缓存数据
      } catch (error) {
        console.error(error);
        setCardData({ error: "An error occurred" });
        setError(true);
      }
      setLoading(false);
      console.timeEnd("fetchData");
    };
    fetchData();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = cardData.url;

    window.gtag("G-43HNXJP55G", "1", {
      event_category: "cardClick",
      event_label: cardData.url,
    });
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
              src="404.webp"
              alt="404 image"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    ); // render error message
  }

  console.timeEnd("页面"); // 在最后的return中加上计时结束

  return (
    <div>
      <Head>
        <title>{cardData.title}</title>
        <meta name="description" content="Fetch URL Card" />
        <link rel="icon" href="znz.png" />
      </Head>

      <main>
        <a className={styles.a} href={cardData.url} onClick={handleClick}>
          <div className={styles.wxcard}>
            <div
              className={
                loading
                  ? `${styles.wxcardtitle} ${styles.wxcardtitleloading}`
                  : styles.wxcardtitle
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
              <div className={styles.wxcardimage}>
                {loading ? (
                  <Skeleton width={90} height={90} />
                ) : (
                  <img
                    className={styles.img}
                    src={cardData.firstImgSrc}
                    alt="图片"
                  />
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
        </a>
      </main>
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

console.time("页面"); // 页面开始计时
