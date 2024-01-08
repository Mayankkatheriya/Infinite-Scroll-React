import React from "react";
import { nanoid } from "nanoid";

const Images = ({ data }) => {
  return (
    <div className="image-container">
      {data.map((item) => {
        return (
          <div key={nanoid()} className="img-box">
            <a
              href={item.links.download}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={item.urls.regular} alt={item.alt_description} />
            </a>
            <div className="details">
              <div className="detail-inner-div">
                <p>{item.created_at}</p>
                <a
                  href={item.links.download}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Download"
                >
                  <i className="fa-solid fa-download"></i>
                </a>
              </div>
              <h3>{item.user.name}</h3>
              <p>{item.user.bio}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Images;
