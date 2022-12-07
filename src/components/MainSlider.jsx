import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useLksService from "../assests/api";
import Spinner from "./Spinner";
import shoppingCart from "../assests/images/shopping-cart.svg";

const MainSlider = () => {
  const [slides, setSlides] = useState([]);
  const { getSliders, error, _apiPictures, loaded } = useLksService();

  useEffect(() => {
    getSliders().then((data) => setSlides(data));
  }, []);

  return (
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
                            <div className="lks-btn-icon lks-btn-icon-icon ">
                              <img src={shoppingCart} alt="shoppingCart" />
                            </div>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainSlider;
