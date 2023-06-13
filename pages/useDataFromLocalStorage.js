import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

const Card = ({ cardData, loading }) => {
  const [imgLoadFailed, setImgLoadFailed] = useState(false);

  useEffect(() => {
    if (cardData && cardData.title) {
      document.title = cardData.title;
    }
  }, [cardData]);

  const handleImgLoadError = () => {
    setImgLoadFailed(true);
  };

  const cardImageUrl =
    cardData &&
    cardData.images &&
    cardData.images.length > 0 &&
    !imgLoadFailed &&
    cardData.images[0];

  return (
    <div className="card">
      <div className="card-header">
        {loading ? (
          <Skeleton height={30} width={200} />
        ) : (
          <h2 className="card-title">{cardData.title}</h2>
        )}
      </div>
      <a
        href={cardData.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-body"
      >
        {loading ? (
          <Skeleton height={150} />
        ) : (
          <div className="card-image-container">
            {cardImageUrl ? (
              <img
                src={cardImageUrl}
                alt={cardData.title}
                className="card-image"
                onError={handleImgLoadError}
              />
            ) : (
              <div className="card-image-failed">Image not found</div>
            )}
          </div>
        )}
        <div className="card-content">
          {!loading && cardData && cardData.description && (
            <p className="card-description">{cardData.description}</p>
          )}
          <span className="card-url">{cardData.url}</span>
        </div>
      </a>
    </div>
  );
};

Card.propTypes = {
  cardData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
  }),
  loading: PropTypes.bool.isRequired,
};

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
      } catch (error) {
        console.error(error);
        setError(true);
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
