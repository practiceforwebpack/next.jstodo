import Head from "next/head";
import styles404 from "./404.module.css";
import { Button } from "antd";

const NotFound = () => {
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
        <Button
          type="primary"
          onClick={() => {
            window.location.href = "/Encodeurl";
          }}
        >
          Encode URL
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
