import { useState, useEffect } from "react";

const useDataFromLocalStrong = (url, title, yhParams) => {
  const [error, setError] = useState(false);
  const [cardData, setCardData] = useState({});
  const [loading, setLoading] = useState(true);

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
          `/api/fetch-url?url=${encodeURIComponent(
            url
          )}&redirect=false&title=${encodeURIComponent(title)}`
        );
        const data = await response.json();
        console.log(data);
        document.title = data.title;

        if (title) {
          data.title = title;
        }

        if (yhParams) {
          const urls = yhParams.split(",");
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
  }, [url, title, yhParams]);

  return {
    cardData,
    loading,
    error,
  };
};

export default useDataFromLocalStrong;
