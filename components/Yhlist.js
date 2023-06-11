import styles from "./styles.module.css";

const YhList = ({ urls }) => {
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

export default YhList;
