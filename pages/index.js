import Head from "next/head";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import YhList from "../components/YhList";
import Icon from "../components/Icon";
import NotFound from "../components/NotFound";
import useDataFromLocalStorage from "./useDataFromLocalStorage";
export default function Home() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const urlParamsTmp = new URLSearchParams(window.location.search);
  const url = urlParamsTmp.get("url");
  const urlTitle = urlParamsTmp.get("title");
  const yhParams = urlParamsTmp.get("yh");

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(urlTitle);
  const decodedYhParams = decodeURIComponent(yhParams);

  const [cardData, cardDataLoading] = useDataFromLocalStorage(url, async () => {
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

      return data;
    } catch (error) {
      console.error(error);
      return { error: "An error occurred" };
    }
  });

  useEffect(() => {
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
  }, [url]);

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
        <Card cardData={cardData} loading={loading || cardDataLoading} />
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
