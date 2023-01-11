import React from "react";
import { Container } from "react-bootstrap";
import arrowRight from "../icons/arrow-right.svg";
import mermaid from "../images/mermaid.png";
import cartWhite from "../icons/cart-white.svg";
import like from "../icons/like.svg";

const SchemasCard = () => {
  return (
    <section className="schemas-card">
      <Container>
        <div className="row">
          <h3 className="title ">Схемы вязания</h3>
          <div className="col-xl-6 col-lg-6 col-md-12 col-xs-12">
            <div className="schemas-card__img-wrapper">
              <img className="schemas-card__img" src={mermaid} alt="mermaid" />
              <a href="#">
                <img className="schemas-card__like" src={like} alt="like" />
              </a>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-xs-12">
            <div className="title schemas-card__title">Схема “Русалочка”</div>
            <div className="row ">
              <div className="col-6 schemas-card__wrapper">
                <div className="schemas-card__property">Фигура</div>
              </div>
              <div className="col-6 schemas-card__wrapper">
                <div className="schemas-card__property">Русалка</div>
              </div>
            </div>
            <div className="row">
              <div className="col-6 schemas-card__wrapper">
                <div className="schemas-card__property">Размер</div>
              </div>
              <div className="col-6 schemas-card__wrapper">
                <div className="schemas-card__property">25 см</div>
              </div>
            </div>
            <div className="row">
              <div className="col-6 schemas-card__wrapper">
                <div className="schemas-card__property">Материал</div>
              </div>
              <div className="col-6 schemas-card__wrapper">
                <div className="schemas-card__property">
                  Хлопок и мериносовая шерсть
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6 schemas-card__wrapper">
                <div className="schemas-card__property">Сложность</div>
              </div>
              <div className="col-6 schemas-card__wrapper">
                <div className="schemas-card__property">Базовая</div>
              </div>
            </div>
            <div className="row">
              <div className="col-6 schemas-card__wrapper">
                <div className="schemas-card__property">Инструменты</div>
              </div>
              <div className="col-6 schemas-card__wrapper">
                <div className="schemas-card__property">
                  Крючок, пряжа, наполнитель, иголка с большим ушком, замочек
                  для обозначения ряда
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="schemas-card__descr">
                  Важно: не предусмотрено для тех, кто не умеет вязать
                </div>
              </div>
            </div>
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
          </div>
        </div>
        <button className="btn btn_vinous">
          <div className="btn__text">Перейти в каталог</div>
          <div className="btn__icon">
            <img src={cartWhite} alt="cartWhite" />
          </div>
        </button>
      </Container>
    </section>
  );
};

export default SchemasCard;
