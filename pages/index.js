import React, { useState, useEffect } from "react";
import Head from "next/head";

const isValidURL = (str) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}" + // domain name
      "|((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(str);
};

export default function Home() {
  const [cardHTML, setCardHTML] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const url = urlParams.get("url");
    if (!url) {
      // If no URL is in the query parameter, do not attempt to fetch
      return;
    }
    if (!isValidURL(url)) {
      setCardHTML("Invalid URL");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/fetch-url?url=${url}`);
        const data = await response.text();
        setCardHTML(data);
      } catch (error) {
        console.error(error);
        setCardHTML("An error occurred");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>Fetch URL Card</title>
        <meta name="description" content="Fetch URL Card" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {cardHTML ? (
          <div dangerouslySetInnerHTML={{ __html: cardHTML }} />
        ) : (
          <p>No URL was provided in the query parameter.</p>
        )}
      </main>
    </div>
  );
}
