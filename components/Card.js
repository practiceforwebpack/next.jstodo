import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import styles from "./styles.module.css";
import * as gtag from "../lib/gtag";
const Card = ({ cardData, loading }) => {
  useEffect(() => {
    if (cardData.url) {
      document.title = cardData.title;
    }
  }, [cardData]);

  function handleClick(url) {
    const decodedUrl = decodeURIComponent(url);
    gtag("event", "cardClick", {
      event_category: "cardClick",
      event_label: decodedUrl,
      value: 1,
    });
  }

  return (
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
  );
};

export default Card;
