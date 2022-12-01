import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useLksService from "../assests/api";
import Spinner from "./Spinner";

import mainPhoto from "../static/images/Holidays_Easter_Rabbits_Carrots_Teddy_bear_Eggs_544385_1920x1080.png";
import secondPhoto from "../static/images/Holidays_Easter_Rabbits_Carrots_Teddy.png";
import shoppingCart from "../static/images/shopping-cart.svg";

const MainSlider = () => {
  const [slides, setSlides] = useState([]);
  const { getSliders, error, _apiPictures, loaded } = useLksService();

  useEffect(() => {
    getSliders().then((data) => setSlides(data));
  }, []);

  return (
    <div className="lks-container">
      <div className="main-slider">
        <div className="row">
          <div className="col-12">
            {error || !loaded ? (
              <Spinner />
            ) : (
              <Carousel variant="dark">
                {slides.map((slide, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100 slider__mainImg"
                      src={`${_apiPictures}${slide.image_preview}`}
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <div className="circle">
                        <div>
                          <h5>{slide.title}</h5>
                          <p>{slide.sub_title}</p>
                          <Link to={`/shop`}>
                            <button className="lks-btn btn-shop">
                              <div className="lks-btn-icon-text">
                                Перейти в каталог
                              </div>
                              <img
                                className="lks-btn-icon lks-btn-icon-icon "
                                src={shoppingCart}
                                alt="shoppingCart"
                              />
                            </button>
                          </Link>
                        </div>
                      </div>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
                {/* <Carousel.Item>
      <img
        className="d-block w-100 slider__mainImg"
        src={secondPhoto}
        alt="Second slide"
      />
      <Carousel.Caption>
        <div className="circle">
          <div>
            <h5>Little Kniths Story</h5>
            <p>
              22 Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру
              сгенерировать несколько абзацев более менее осмысленного текста
              рыбы на русском языке, а начинающему оратору отточить навык
              публичных выступлений в домашних условиях.
            </p>
            <Link to={`/shop`}>
              <button className="lks-btn btn-shop">
                <div className="lks-btn-icon-text"> Перейти в каталог</div>

                <img
                  className="lks-btn-icon lks-btn-icon-icon "
                  src={shoppingCart}
                  alt="shoppingCart"
                />
              </button>
            </Link>
          </div>
        </div>
      </Carousel.Caption>
    </Carousel.Item> */}
              </Carousel>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSlider;
