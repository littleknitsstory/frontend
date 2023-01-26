import React from "react";

import Card from "react-bootstrap/Card";

import cardImg from "../images/card-img.png";

const Cardlks = () => {
  return (
    <div className="card-lks">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={cardImg} />
        <Card.Body>
          <Card.Title>
            White shark monkeyface prickleback bluefish kuhli loach; large-e
          </Card.Title>

          <div className="card-lks__text">
            Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру
            сгенерировать несколько абзацев более менее осмысленного текста рыбы
            на русском языке, а начинающему оратору отточить навык публичных
            выступлений в домашних условиях. Сайт рыбат навык публичных
            выступлений в домашних условиях.
          </div>
          <div className="card-lks__footer">
            <div className="card-lks__author">
              Автор:
              <br /> Катя Анаприенко
            </div>
            <div className="card-lks__created_at">
              17:56 <br /> 13 ноября 2018 г.
            </div>
            <div className="card-lks__btn">
              <button className="btn btn_vinous btn_center ">
                <div className="btn__text btn__text_center">Читать</div>
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Cardlks;
