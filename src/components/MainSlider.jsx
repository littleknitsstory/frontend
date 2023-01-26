import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import arrowWhite from "../icons/arrow-right-white.svg";
import kateSlider from "../images/kate-slider.png";

const MainSlider = () => {
  return (
    <section className="main-slider">
      <Container>
        <Carousel fade interval={1600}>
          <Carousel.Item interval={1600}>
            <Row>
              <Col xs={12} md={12} lg={4} xl={4} xxl={4}>
                <div className="main-slider__wrapper-img">
                  <img
                    className="main-slider__img"
                    src={kateSlider}
                    alt="First slide"
                  />
                </div>
              </Col>
              <Col xs={12} md={12} lg={8} xl={8} xxl={8}>
                <div className="main-slider__wrapper">
                  <div className="title main-slider__title">
                    White shark monkeyface prickleback bluefish kuhli loach;
                    large-e
                  </div>
                  <div className="main-slider__text">
                    White shark monkeyface prickleback bluefish kuhli loach;
                    large-e White shark const [min, setMin] = useState(0); const
                    [max, setMax] = useState(500); monkeyface prickleback
                    bluefish kuhli loach; large-e White shark monkeyface
                    prickleback bluefish kuhli loach; large-e White shark
                    monkeyface prickleback bluefish kuhli loach; large-e White
                    shark monkeyface prickleback bluefish kuhli loach; large-e
                    White shark monkeyface prickleback bluefish kuhli loach;
                    large-e
                  </div>
                  <div className="main-slider__author">
                    Автор: Катя Анаприенко
                  </div>
                  <div className="main-slider__created_at">
                    13 ноября 2018 г. 17:56
                  </div>
                  <div className="col-12">
                    <div className="main-slider__btn">
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
          <Carousel.Item interval={1600}>
            <Row>
              <Col xs={12} md={12} lg={4} xl={4} xxl={4}>
                <div className="main-slider__wrapper-img">
                  <img
                    className="main-slider__img"
                    src={kateSlider}
                    alt="First slide"
                  />
                </div>
              </Col>
              <Col xs={12} md={12} lg={8} xl={8} xxl={8}>
                <div className="main-slider__wrapper">
                  <div className="title main-slider__title">
                    White shark monkeyface prickleback bluefish kuhli loach;
                    large-e
                  </div>
                  <div className="main-slider__text">
                    White shark monkeyface prickleback bluefish kuhli loach;
                    large-e верстальщику, вебмастеру сгенерировать несколько
                    абзацев боле White shark monkeyface prickleback bluefish
                    kuhli loach; large-eтору отточить навык публичных
                    выступлений в домашних условиях. Сайт рыбат навык публичных
                    выступлений в домашних условиях.
                  </div>
                  <div className="main-slider__author">
                    Автор: Катя Анаприенко
                  </div>
                  <div className="main-slider__created_at">
                    13 ноября 2018 г. 17:56
                  </div>
                  <div className="col-12">
                    <div className="main-slider__btn">
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
          <Carousel.Item interval={1600}>
            <Row>
              <Col xs={12} md={12} lg={4} xl={4} xxl={4}>
                <div className="main-slider__wrapper-img">
                  <img
                    className="main-slider__img"
                    src={kateSlider}
                    alt="First slide"
                  />
                </div>
              </Col>
              <Col xs={12} md={12} lg={8} xl={8} xxl={8}>
                <div className="main-slider__wrapper">
                  <div className="title main-slider__title">
                    White shark monkeyface prickleback bluefish kuhli loach;
                    large-e
                  </div>
                  <div className="main-slider__text">
                    Са White shark monkeyface prickleback bluefish kuhli loach;
                    large-eв более менее осмысленного текста рыбы на русском
                    языке, а начинающему оратору отточить навык публичных выступ
                    White shark monkeyface prickleback bluefish kuhli loach;
                    large-eих условиях.
                  </div>
                  <div className="main-slider__author">
                    Автор: Катя Анаприенко
                  </div>
                  <div className="main-slider__created_at">
                    13 ноября 2018 г. 17:56
                  </div>

                  <div className="main-slider__btn">
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

export default MainSlider;
