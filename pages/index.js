import Head from "next/head";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import Icon from "../components/Icon";
import YHList from "../components/YHList";
import Error from "../components/Error";

export default function Home() {
  const [cardData, setCardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isValidURL = (str) => {
    try {
      new URL(str);
      return true;
    } catch (_) {
      return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const url = urlParams.get("url");
      const urlTitle = urlParams.get("title");
      const yhParams = urlParams.get("yh");
      const encodedUrl = encodeURIComponent(url);
      const encodedTitle = encodeURIComponent(urlTitle);

      if (!url || !isValidURL(url)) {
        setLoading(false);
        setError(true);
        return;
      }

      let data = localStorage.getItem(url);

      if (data) {
        setCardData(JSON.parse(data));
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(false);

      try {
        const response = await fetch(
          `/api/fetch-url?url=${encodedUrl}&redirect=false&title=${encodedTitle}`
        );
        const data = await response.json();
        console.log(data);
        document.title = data.title;

        if (urlTitle) {
          data.title = urlTitle;
        }

        if (yhParams) {
          const urls = decodeURIComponent(yhParams).split(",");
          data.urls = urls;
        }

        setCardData(data);
        localStorage.setItem(url, JSON.stringify(data));
      } catch (error) {
        console.error(error);
        setCardData({ error: "An error occurred" });
        setError(true);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>{cardData.title || "Fetch URL Card"}</title>
        <meta name="description" content="Fetch URL Card" />
      </Head>

      <Icon />

      <main>
        {error && <Error />}
        {!error && cardData.url && (
          <Card
            url={cardData.url}
            title={cardData.title}
            description={cardData.description}
            firstImgSrc={cardData.firstImgSrc}
          />
        )}

        {cardData.urls && <YHList urls={cardData.urls} />}
      </main>
    </div>
  );
}
