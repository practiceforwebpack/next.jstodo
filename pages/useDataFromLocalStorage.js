import { useState, useEffect } from "react";

const useDataFromLocalStorage = (url, urlTitle, yhParams) => {
  const [error, setError] = useState(false);
  const [cardData, setCardData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(urlTitle);
    const decodedYhParams = decodeURIComponent(yhParams);

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
  }, [url, urlTitle, yhParams]);

  return { error, cardData, loading };
};

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

export default useDataFromLocalStorage;
