import { useState, useEffect } from "react";

const useDataFromLocalStorage = (dataKey, fetchData) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let data = localStorage.getItem(dataKey);

    if (data) {
      setData(JSON.parse(data));
      setLoading(false);
      return;
    }

    const fetchDataAndSaveToLocalStorage = async () => {
      setLoading(true);
      try {
        const response = await fetchData();
        const data = await response.json();
        setData(data);
        localStorage.setItem(dataKey, JSON.stringify(data));
      } catch (error) {
        console.error(error);
        setData({ error: "An error occurred" });
      }
      setLoading(false);
    };
    fetchDataAndSaveToLocalStorage();
  }, [dataKey, fetchData]);

  return [data, loading];
};
export default useDataFromLocalStorage;
