import React from "react";
import { Container } from "react-bootstrap";
import kate from "../images/kate.png";
import vk from "../icons/logo-vk_white.svg";
import facebook from "../icons/logo-facebook_white.svg";
import instagram from "../icons/logo-instagram_white.svg";
import telegram from "../icons/telegram.svg";

const AboutMe = () => {
  return (
    <section className="about-me">
      <Container>
        <div className="row">
          <h3 className="title ">Обо мне</h3>
          <div className="col-xl-6 col-lg-6 col-md-12 col-xs-12">
            <div className="about-me__wrapper-author">
              <div className="about-me__subtitle">Автор</div>
              <div className="about-me__title">Катя Анаприенко</div>
              <div className="row">
                <div className="col-xl-6 col-lg-12 col-md-12 col-xs-12 about-me__img-wrapper">
                  <img className="about-me__img" src={kate} alt="kate-author" />
                </div>
                <div className="col-xl-6 col-lg-12 col-md-12 col-xs-12">
                  <div className=" about-me__descr">
                    Привет! Меня зовут Катя. Я дизайнер вязаных игрушек. Мое
                    увлечение вязанием началось в 2016 году, и за это время я
                    воплотила уже 47 игрушек. В интернет-магазине Little Knits
                    Story вы можете приобрести готовые схемы для вязания.
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="about-me__social">
                      <a
                        href="https://vk.com/littleknitsstory"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={vk} alt="vk" />
                      </a>
                      <a
                        href="https://www.facebook.com/littleknitsstory/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={facebook} alt="facebook" />
                      </a>
                      <a
                        href="https://www.instagram.com/littleknitsstory/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={instagram} alt="instagram" />
                      </a>
                      <a href="#" target="_blank" rel="noreferrer">
                        <img src={telegram} alt="telegram" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 about-me__text-wrapper">
            <div className="about-me__title-text">
              Knitting makes me feel happy
            </div>
            <div className="about-me__text">
              Knitting makes me feel happy Knitting makes me feel happy Knitting
              makes me feel happy Knitting makes me feel happy Knitting makes me
              feel happy Knitting makes me feel happy Knitting makes me feel
              happy Knitting makes me feel happy Knitting makes me feel happy
              Knitting makes me feel happy Knitting makes me feel happy Knitting
              makes me feel happy Knitting makes me feel happy Knitting makes me
              feel happy Knitting makes me feel happy Knitting makes me feel
              happy Knitting makes me feel happy Knitting makes me feel happy
              Knitting makes me feel happy Knitting makes me feel happy Knitting
              makes me feel happy{" "}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutMe;
