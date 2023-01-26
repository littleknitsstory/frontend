import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import articleImg from "../images/article-img.png";
import Articles from "./Articles";
import arrowRight from "../icons/arrow-right.svg";
import { Link } from "react-router-dom";

const Article = () => {
  return (
    <section className="article">
      <Container>
        <h3 className="title">
          White shark monkeyface prickleback bluefish kuhli loach; large-e
        </h3>
        <div className="article__wrapper-article">
          <Row>
            <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
              <div className="article__text">
                Таким образом постоянный количественный рост и сфера нашей
                активности позволяет выполнять важные задания по разработке
                существенных финансовых и административных условий. Значимость
                этих проблем настолько очевидна, что начало повседневной работы
                по формированию позиции способствует подготовки и реализации
                направлений прогрессивного развития. Повседневная практика
                показывает, что реализация намеченных плановых заданий позволяет
                выполнять важные задания по разработке позиций, занимаемых
                участниками в отношении поставленных задач. Идейные соображения
                высшего порядка, а также начало повседневной работы по
                формировани
              </div>
            </Col>
            <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
              <img src={articleImg} alt="" className="article__img" />
            </Col>
          </Row>
        </div>
        <div className="article__wrapper-text">
          <Row>
            <Col xs={12} md={9} lg={9} xl={9} xxl={9}>
              <div className="title">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor.
              </div>
              <div className="article__text">
                Задача организации, в особенности же укрепление и развитие
                структуры способствует подготовки и реализации направлений
                прогрессивного развития. Товарищи! постоянное
                информационно-пропагандистское обеспечение нашей деятельности
                представляет собой интересный эксперимент проверки дальнейших
                направлений развития. Идейные соображения высшего порядка, а
                также дальнейшее развитие различных форм деятельности требуют
                определения и уточнения системы обучения кадров, соответствует
                насущным потребностям. Равным образом дальнейшее развитие
                различных форм деятельности способствует подготовки и реализации
                направлений прогрессивного развития.
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="article__wrapper-author">
                <div className="article__created-at">
                  13 ноября 2018 г. 17:56
                </div>

                <div className="article__author">Автор: Катя Анаприенко</div>
              </div>
            </Col>
          </Row>
        </div>
        <h3 className="title">Другие блоги</h3>
        <Articles />
        <div className="btn__link btn__link_end">
          <Row>
            <Col>
              <Link
                to="/blog"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                Смотреть все <img src={arrowRight} alt="arrowRight" />
              </Link>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Article;
