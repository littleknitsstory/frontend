import { React, useState } from "react";
import { Row, Col } from "react-bootstrap";
import arrowRight from "../icons/arrow-right.svg";
import mermaid from "../images/mermaid.png";
import like from "../icons/like.svg";
import Social from "./Social";
import questionInfo from "../icons/question.svg";

const SchemaCard = () => {
  const [countProduct, setCountProduct] = useState(1);
  const increaseCountProduct = () => {
    setCountProduct((countProduct) => countProduct + 1);
  };
  const price = 2555;
  const oldPrice = 2950;

  const decreaseCountProduct = () => {
    if (countProduct == 1) {
      return;
    }
    setCountProduct((countProduct) => countProduct - 1);
  };
  return (
    <div className="schema-card">
      <Row className="schema-card__card">
        <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
          <div className="schema-card__img-wrapper">
            <img className="schema-card__img" src={mermaid} alt="mermaid" />
            <a href="#">
              <img className="schema-card__like" src={like} alt="like" />
            </a>
          </div>
          <div className="schema-card__counter">
            <button
              className="schema-card__counter-control-btn"
              onClick={decreaseCountProduct}
            >
              -
            </button>
            {countProduct}
            <button
              className="schema-card__counter-control-btn"
              onClick={increaseCountProduct}
            >
              +
            </button>
          </div>
          <Social />
        </Col>
        <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
          <div className="schema-card__wrapper-title">
            <div className="title schema-card__title">Схема “Русалочка”</div>
            <div className="schema-card__dicount">-15%</div>
          </div>

          <Row>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">Фигура</div>
            </Col>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">Русалка</div>
            </Col>
          </Row>
          <Row>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">Размер</div>
            </Col>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">25 см</div>
            </Col>
          </Row>
          <Row>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">Материал</div>
            </Col>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">
                Хлопок и мериносовая шерсть
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">Сложность</div>
            </Col>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">Базовая</div>
            </Col>
          </Row>
          <Row>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">Инструменты</div>
            </Col>
            <Col className="schema-card__wrapper">
              <div className="schema-card__property">
                Крючок, пряжа, наполнитель, иголка с большим ушком, замочек для
                обозначения ряда
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="schema-card__descr">
                Важно: не предусмотрено для тех, кто не умеет вязать
              </div>{" "}
              <div className="schema-card__price">
                {price.toLocaleString()} ₽
              </div>
              <div className="schema-card__old-price">
                {oldPrice.toLocaleString()} ₽
              </div>
              <div className="schema-card__region">
                Ваш регион: Екатериновка
              </div>
              <div className="schema-card__delivery">
                Доставка почтой: 16– 19 июня — 99 ₽
                <img src={questionInfo} alt="question-info" />
              </div>
            </Col>
          </Row>
          <div className="row">
            <div className="btn__link">
              <div className="col-xl-6 col-lg-6 col-md-6 col-xs-12">
                <button className="btn btn_border">
                  <div className="btn__text">Добавить в корзину</div>
                </button>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 offset-xl-2 offset-lg-2 offset-md-2 col-xs-12 ">
                <a href="#">
                  Подробнее <img src={arrowRight} alt="arrowRight" />
                </a>
              </div>
            </div>
            <div className="schema-card__product-btn">
              <Col>
                <button className="btn btn_border">
                  <div className="btn__text">Добавить в корзину</div>
                </button>
              </Col>
              <Col>
                <button className="btn btn_vinous schema-card__quick-purchase">
                  <div className="btn__text btn__text_center">
                    Быстрый заказ
                  </div>
                </button>
              </Col>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SchemaCard;
