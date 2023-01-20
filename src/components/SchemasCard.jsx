import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import arrowRight from "../icons/arrow-right.svg";
import mermaid from "../images/mermaid.png";
import cartWhite from "../icons/cart-white.svg";
import like from "../icons/like.svg";

const SchemasCard = () => {
  return (
    <section className="schemas-card">
      <Container>
        <h3 className="title">Схемы вязания</h3>
        <Row className="schemas-card__card">
          <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
            <div className="schemas-card__img-wrapper">
              <img className="schemas-card__img" src={mermaid} alt="mermaid" />
              <a href="#">
                <img className="schemas-card__like" src={like} alt="like" />
              </a>
            </div>
          </Col>
          <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
            <div className="title schemas-card__title">Схема “Русалочка”</div>
            <Row>
              <Col className="schemas-card__wrapper">
                <div className="schemas-card__property">Фигура</div>
              </Col>
              <Col className="schemas-card__wrapper">
                <div className="schemas-card__property">Русалка</div>
              </Col>
            </Row>
            <Row>
              <Col className="schemas-card__wrapper">
                <div className="schemas-card__property">Размер</div>
              </Col>
              <Col className="schemas-card__wrapper">
                <div className="schemas-card__property">25 см</div>
              </Col>
            </Row>
            <Row>
              <Col className="schemas-card__wrapper">
                <div className="schemas-card__property">Материал</div>
              </Col>
              <Col className="schemas-card__wrapper">
                <div className="schemas-card__property">
                  Хлопок и мериносовая шерсть
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="schemas-card__wrapper">
                <div className="schemas-card__property">Сложность</div>
              </Col>
              <Col className="schemas-card__wrapper">
                <div className="schemas-card__property">Базовая</div>
              </Col>
            </Row>
            <Row>
              <Col className="schemas-card__wrapper">
                <div className="schemas-card__property">Инструменты</div>
              </Col>
              <Col className="schemas-card__wrapper">
                <div className="schemas-card__property">
                  Крючок, пряжа, наполнитель, иголка с большим ушком, замочек
                  для обозначения ряда
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="schemas-card__descr">
                  Важно: не предусмотрено для тех, кто не умеет вязать
                </div>
              </Col>
            </Row>
            <div className="row">
              <div className="schemas-card__wrapper-btn">
                <div className="col-xl-6 col-lg-6 col-md-6 col-xs-12">
                  <button className="btn btn_border">
                    <div className="btn__text">Добавить в корзину</div>
                  </button>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 offset-xl-2 offset-lg-2 offset-md-2 col-xs-12">
                  <a href="#">
                    Подробнее <img src={arrowRight} alt="arrowRight" />
                  </a>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <div className="schemas-card__btn">
          <button className="btn btn_vinous">
            <div className="btn__text">Перейти в каталог</div>
            <div className="btn__icon">
              <img src={cartWhite} alt="cartWhite" />
            </div>
          </button>
        </div>
      </Container>
    </section>
  );
};

export default SchemasCard;
