import Head from "next/head";
import { useState, useEffect } from "react";

export default function Home() {
  const [cardHTML, setCardHTML] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const url = urlParams.get("url");
    if (!url) {
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
        const parsedHTML = new DOMParser().parseFromString(data, "text/html");
        const h2 = parsedHTML.querySelector("h2");
        document.title = h2.textContent;
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

      <style jsx>{`
        // your CSS styles
      `}</style>
    </div>
  );
}

const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
