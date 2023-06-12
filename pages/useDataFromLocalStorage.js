import { useState, useEffect } from "react";

const useDataFromLocalStorage = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let localStorageData = localStorage.getItem(url);

    if (localStorageData) {
      setData(JSON.parse(localStorageData));
      setLoading(false);
    } else {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `/api/fetch-url?url=${url}&redirect=false`
          );
          const data = await response.json();
          setData(data);
          localStorage.setItem(url, JSON.stringify(data));
        } catch (error) {
          console.error(error);
          setError(true);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [url]);

  return { data, loading, error };
};

export default useDataFromLocalStorage;
