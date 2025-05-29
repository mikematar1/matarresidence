import { useEffect, useState, useRef } from "react";

const Slideshow = ({ data, type }) => {
  const delay = 10000;

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === data.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className={type === "Room" ? "slideshow rooms" : "slideshow"}>
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {data.map((item, index) => (
          <div className="slide" key={index}>
            <div
              className={
                type === "Room" ? "slide-content rooms" : "slide-content"
              }
            >
              <img src={item.image_url} alt="" className="slide-image" />
              <div className="slide-info">
                <h2 className="slide-title">{item.title}</h2>
                <p className="slide-description">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="slideshowDots">
        {data.map((_, idx) => (
          <div
            key={idx}
            className={
              type === "Room"
                ? `slideshowDot rooms${index === idx ? " active" : ""}`
                : `slideshowDot${index === idx ? " active" : ""}`
            }
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
