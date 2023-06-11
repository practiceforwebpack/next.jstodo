import Head from "next/head";
import { useState } from "react";
import Card from "../components/Card";
import YhList from "../components/YhList";
import Icon from "../components/Icon";
import NotFound from "../components/NotFound";

export default function Home() {
  const [error, setError] = useState(false);
  const [urlParams, setUrlParams] = useState({});

  if (!error && Object.keys(urlParams).length === 0) {
    const urlParamsTmp = new URLSearchParams(window.location.search);
    const url = urlParamsTmp.get("url");
    const urlTitle = urlParamsTmp.get("title");
    const yhParams = urlParamsTmp.get("yh");

    if (!url) {
      setError(true);
    } else if (!isValidURL(url)) {
      setError(true);
    } else {
      setUrlParams({ url, urlTitle, yhParams });
    }
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <div>
      <Head>
        <title>{urlParams.urlTitle}</title>
        <meta name="description" content="Fetch URL Card" />
        <Icon />
      </Head>

      <main>
        <Card
          url={urlParams.url}
          urlTitle={urlParams.urlTitle}
          yhParams={urlParams.yhParams}
        />
        {urlParams.yhParams && <YhList urls={urlParams.yhParams.split(",")} />}
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
