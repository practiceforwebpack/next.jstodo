import { useState, useEffect } from "react";

const useDataFromLocalStrong = (url, title, yhParams) => {
  const [error, setError] = useState(false);
  const [cardData, setCardData] = useState({});
  const [loading, setLoading] = useState(true);

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

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
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

        if (title) {
          data.title = title;
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

  return {
    cardData,
    loading,
    error,
  };
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

export default useDataFromLocalStrong;
