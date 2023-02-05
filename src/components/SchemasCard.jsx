import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import arrowRight from "../icons/arrow-right.svg";
import mermaid from "../images/mermaid.png";
import cartWhite from "../icons/cart-white.svg";
import like from "../icons/like.svg";
import SchemaCard from "./SchemaCard";
import { Trans } from "react-i18next";

const SchemasCard = () => {
  return (
    <section className="schemas-card">
      <Container>
        <h3 className="title">
          <Trans i18nKey="SchemasCard.title">
            Схемы вязания
          </Trans>
        </h3>
        {/* Какие схемы отображать на главной */}
        <SchemaCard id={"knits"}/>
        <Link to={`/shop`}>
          <div className="schemas-card__btn">
            <button className="btn btn_vinous">
              <div className="btn__text">
                <Trans i18nKey="SchemasCard.button">
                  Перейти в каталог
                </Trans>
              </div>
              <div className="btn__icon">
                <img src={cartWhite} alt="cartWhite" />
              </div>
            </button>
          </div>
        </Link>
      </Container>
    </section>
  );
};

export default SchemasCard;
