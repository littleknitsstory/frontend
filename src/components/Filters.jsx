import React from "react";
import { Row, Col } from "react-bootstrap";
import MultiRangeslider from "./multi-range-slider/MultiRangeSlider";
import arrowRight from "../icons/arrow-right.svg";
import { Trans } from "react-i18next";

const Filters = () => {
  return (
    <>
      <div className="filters">
        <div className="title">
          <Trans i18nKey="Filter.title">
            Фильтры
          </Trans>
        </div>

        <div className="filters__wrapper-price">
          <div className="filters__title">
            <Trans i18nKey="Filter.price">
              Цена
            </Trans>
          </div>

          <MultiRangeslider
            min={0}
            max={1000}
            onChange={({ min, max }) =>
              console.log(`min = ${min}, max = ${max}`)
            }
          />
        </div>
        <div className="filters__btn">
          <button className="btn btn_border">
            <div className="btn__text">
              <Trans i18nKey="Filter.buttonText">
                Очистить фильтры
              </Trans>
            </div>
            <div className="btn__icon">
              <img src={arrowRight} alt="arrowWhite" />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Filters;
