import React from "react";
import { useEffect, useState } from "react";
import useLksService from "../assests/api";

const MainPage = () => {
  const [slides, setSlides] = useState([]);
  const { getSliders, error, _apiPictures } = useLksService();

  useEffect(() => {
    getSliders().then((data) => setSlides(data));
  }, []);

  return (
    <div className="lks-container">
      <div className="slider">
        {error ? (
          <h3>Что-то пошло не так, данные не получены</h3>
        ) : slides.length > 0 ? (
          slides.map((slide, index) => (
            <div key={index}>
              <img src={`${_apiPictures}${slide.image_preview}`}></img>
            </div>
          ))
        ) : (
          <h3>Нет слайдов</h3>
        )}
      </div>
    </div>
  );
};

export default MainPage;
