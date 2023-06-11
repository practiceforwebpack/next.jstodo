import Head from "next/head";
import { useState, useEffect } from "react";
import Card from "./Card";
import YhList from "./YhList";
import Icon from "./Icon";
import NotFound from "./NotFound";

export default function Home() {
  const [error, setError] = useState(false);
  const [urlParams, setUrlParams] = useState({});
  const [cardData, setCardData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParamsTmp = new URLSearchParams(window.location.search);
    const url = urlParamsTmp.get("url");
    const urlTitle = urlParamsTmp.get("title");
    const yhParams = urlParamsTmp.get("yh");

    if (!url) {
      setError(true);
      setLoading(false);
      return;
    }

    if (!isValidURL(url)) {
      setError(true);
      setLoading(false);
      return;
    }

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(urlTitle);
    const decodedYhParams = decodeURIComponent(yhParams);

    let data = localStorage.getItem(url);

    if (data) {
      setCardData(JSON.parse(data));
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
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

        if (decodedYhParams) {
          const urls = decodedYhParams.split(",");
          data.urls = urls;
        }

        setCardData(data);
        localStorage.setItem(url, JSON.stringify(data));
      } catch (error) {
        console.error(error);
        setCardData({ error: "An error occurred" });
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (error) {
    return <NotFound />;
  }

  return (
    <div>
      <Head>
        <title>{cardData.title}</title>
        <meta name="description" content="Fetch URL Card" />
        <Icon />
      </Head>

      <main>
        <Card cardData={cardData} loading={loading} />
        {cardData.urls && <YhList urls={cardData.urls} />}
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
