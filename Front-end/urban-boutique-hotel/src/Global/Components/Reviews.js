import { useEffect, useState, useRef } from "react";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

// Componenet
import Rating from "./Rating";

const Reviews = ({ data }) => {
  const delay = 10000;
  const { t, i18n } = useTranslation();
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("Translate"));
  }, []);
  useEffect(() => {
    resetTimeout();
    if (data) {
      timeoutRef.current = setTimeout(
        () =>
          setIndex((prevIndex) =>
            prevIndex === data.length - 1 ? 0 : prevIndex + 1
          ),
        delay
      );
    }

    return () => {
      resetTimeout();
    };
  }, [index]);

  if (data) {
    return (
      <div className="reviews">
        <div className="section-title">
          <h4>{t("reviews")}</h4>
          <div />
        </div>
        <div className="review-section">
          <div
            className="slideshowSlider slider-center"
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          >
            {data.map((item) => (
              <React.Fragment key={item.id}>
                {item.featured === 1 && (
                  <div className="slide">
                    <div className="slide-content review-slider">
                      <div className="slide-info bg-change">
                        <h2 className="slide-title">{item.username}</h2>
                        <Rating rate={item.rating} />
                        <p className="slide-description">{item.comment}</p>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="slideshowDots">
            {data.map(
              (item, idx) =>
                item.featured === 1 && (
                  <div
                    key={idx}
                    className={`slideshowDot rooms${
                      index === idx ? " active" : ""
                    }`}
                    onClick={() => {
                      setIndex(idx);
                    }}
                  ></div>
                )
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Reviews;
