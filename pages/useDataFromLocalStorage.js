import { useState, useEffect } from "react";

const useDataFromLocalStorage = (url, title, yhParams) => {
  const [cardData, setCardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
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
          const urls = decodeURIComponent(yhParams).split(",");
          data.urls = urls;
        }

        setCardData(data);
        localStorage.setItem(url, JSON.stringify(data));
      } catch (error) {
        console.error(error);
        setError(true);
        setCardData({ error: "An error occurred" });
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return { cardData, loading, error };
};

export default useDataFromLocalStorage;
