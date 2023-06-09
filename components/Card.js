import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { gtag } from "../lib/gtag";
import styles from "../components/styles.module.css";

const Card = ({ url, title, description, firstImgSrc, urls }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [url]);

  function handleClick(url) {
    const decodedUrl = decodeURIComponent(url);
    gtag("event", "cardClick", {
      event_category: "cardClick",
      event_label: decodedUrl,
      value: 1,
    });
    window.location.href = decodedUrl;
  }

  useEffect(() => {
    setLoading(false);
  }, [title, description, firstImgSrc]);

  return (
    <a className={styles.a} href={url} onClick={() => handleClick(url)}>
      <div className={styles.wxcard}>
        <div className={styles.wxcardleft}>
          <div className={styles.wxcardtitle}>
            {loading ? (
              <Skeleton width={200} height={24} />
            ) : (
              <h2 className={styles.h2}>{title}</h2>
            )}
          </div>
          <div className={styles.wxcardcontent}>
            <div className={styles.wxcarddescription}>
              {loading ? (
                <Skeleton count={7} />
              ) : (
                <p className={styles.p}>{description}</p>
              )}
            </div>
          </div>
          {loading && (
            <div className={styles.wxcardoverlay}>
              <div className={styles.wxcardloader} />
            </div>
          )}
        </div>
        <div className={styles.wxcardright}>
          <div className={styles.wxcardimg}>
            {loading ? (
              <Skeleton width={90} height={90} />
            ) : (
              <img className={styles.img} src={firstImgSrc} alt="图片" />
            )}
          </div>
        </div>
      </div>
    </a>
  );
};

export default Card;
