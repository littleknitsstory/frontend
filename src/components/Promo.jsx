import React from "react";
import Container from "react-bootstrap/Container";
import cartBlack from "../icons/cart-black.svg";

const Promo = () => {
  return (
    <section className="promo">
      <Container>
        <div className="row">
          <div className="col-12">
            <h1 className="promo__title">Little Knits Story</h1>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12">
            <div className="promo__text">
              Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру
              сгенерировать несколько абзацев более менее осмысленного текста
              рыбы на русском языке, а начинающему оратору отточить навык
              публичных выступлений в домашних условиях.
            </div>
            <button className="btn">
              <div className="btn__text">Перейти в каталог</div>
              <div className="btn__icon">
                <img src={cartBlack} alt="cartBlack" />
              </div>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Promo;
