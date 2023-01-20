import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import arrowWhite from "../icons/arrow-right-white.svg";
import kateSlider from "../images/kate-slider.png";

const Slider = () => {
  return (
    <section className="slider">
      <Container>
        <Carousel>
          <Carousel.Item>
            <Row>
              <Col xs={12} md={12} lg={4} xl={4} xxl={4}>
                <div className="slider__wrapper-img">
                  <img
                    className="slider__img"
                    src={kateSlider}
                    alt="First slide"
                  />
                </div>
              </Col>
              <Col xs={12} md={12} lg={8} xl={8} xxl={8}>
                <div className="slider__wrapper">
                  <div className="title slider__title">
                    White shark monkeyface prickleback bluefish kuhli loach;
                    large-e
                  </div>
                  <div className="slider__text">
                    Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру
                    сгенерировать несколько абзацев более менее осмысленного
                    текста рыбы на русском языке, а начинающему оратору отточить
                    навык публичных выступлений в домашних условиях. Сайт рыбат
                    навык публичных выступлений в домашних условиях.
                  </div>
                  <div className="slider__author">Автор: Катя Анаприенко</div>
                  <div className="slider__created_at">
                    13 ноября 2018 г. 17:56
                  </div>
                  <div className="col-12">
                    <div className="slider__btn">
                      <button className="btn btn_vinous">
                        <div className="btn__text">Читать</div>
                        <div className="btn__icon">
                          <img src={arrowWhite} alt="arrowWhite" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item>
            <Row>
              <Col xs={12} md={12} lg={4} xl={4} xxl={4}>
                <div className="slider__wrapper-img">
                  <img
                    className="slider__img"
                    src={kateSlider}
                    alt="First slide"
                  />
                </div>
              </Col>
              <Col xs={12} md={12} lg={8} xl={8} xxl={8}>
                <div className="slider__wrapper">
                  <div className="title slider__title">
                    White shark monkeyface prickleback bluefish kuhli loach;
                    large-e
                  </div>
                  <div className="slider__text">
                    Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру
                    сгенерировать несколько абзацев более менее осмысленного
                    текста рыбы на русском языке, а начинающему оратору отточить
                    навык публичных выступлений в домашних условиях. Сайт рыбат
                    навык публичных выступлений в домашних условиях.
                  </div>
                  <div className="slider__author">Автор: Катя Анаприенко</div>
                  <div className="slider__created_at">
                    13 ноября 2018 г. 17:56
                  </div>
                  <div className="col-12">
                    <div className="slider__btn">
                      <button className="btn btn_vinous">
                        <div className="btn__text">Читать</div>
                        <div className="btn__icon">
                          <img src={arrowWhite} alt="arrowWhite" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Carousel.Item>
          <Carousel.Item>
            <Row>
              <Col xs={12} md={12} lg={4} xl={4} xxl={4}>
                <div className="slider__wrapper-img">
                  <img
                    className="slider__img"
                    src={kateSlider}
                    alt="First slide"
                  />
                </div>
              </Col>
              <Col xs={12} md={12} lg={8} xl={8} xxl={8}>
                <div className="slider__wrapper">
                  <div className="title slider__title">
                    White shark monkeyface prickleback bluefish kuhli loach;
                    large-e
                  </div>
                  <div className="slider__text">
                    Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру
                    сгенерировать несколько абзацев более менее осмысленного
                    текста рыбы на русском языке, а начинающему оратору отточить
                    навык публичных выступлений в домашних условиях. Сайт рыбат
                    навык публичных выступлений в домашних условиях.
                  </div>
                  <div className="slider__author">Автор: Катя Анаприенко</div>
                  <div className="slider__created_at">
                    13 ноября 2018 г. 17:56
                  </div>

                  <div className="slider__btn">
                    <button className="btn btn_vinous">
                      <div className="btn__text">Читать</div>
                      <div className="btn__icon">
                        <img src={arrowWhite} alt="arrowWhite" />
                      </div>
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </Carousel.Item>
        </Carousel>
      </Container>
    </section>
  );
};

export default Slider;
