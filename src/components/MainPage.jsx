import React from "react";
import { useEffect, useState } from "react";
import useLksService from "../assests/api";

const MainPage = () => {
  return (
    <div className="lks-container">
      <div className="slider">
        {/* {error ? (
          <h3>Что-то пошло не так, данные не получены</h3>
        ) : slides.length > 0 ? ( */}
        {/* {slides.map((slide, index) => (
                <div key={index}>
                  <div className="carousel-item active">
                    <img
                      className="d-block w-100"
                      src={`${_apiPictures}${slide.image_preview}`}
                      alt="First slide"
                    ></img>
                    <div>{slide.title}</div>
                    <div>{slide.sub_title}</div>
                  </div>
                </div>
              ))} */}

        {/* ) : (
          <h3>Нет слайдов</h3>
        )} */}
      </div>
    </div>
  );
};

export default MainPage;
