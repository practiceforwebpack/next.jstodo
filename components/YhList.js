import React from "react";
import { useState } from "react";
import "../components/Yhlist.module.css";

const YHList = ({ urls }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="YHList-container">
      <h3></h3>
      <ul className="YHList-item">
        {urls.map((url, index) => (
          <li key={index}>
            <div
              style={{
                left: "100px",
              }}
            >
              <a className="YHList-link" href={url}>
                {url}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YHList;
