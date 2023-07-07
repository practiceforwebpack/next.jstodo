import React from "react";
import { useState } from "react";
import styles from "../components/404.module.css";

const YHList = ({ urls }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={styles.urls}>
      <h3></h3>
      <ul className={""}>
        {urls.map((url, index) => (
          <li className={styles.urlsli} key={index}>
            <div className={""}>
              <a className={styles.urlsa} href={url}>
                {url}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YHList;
