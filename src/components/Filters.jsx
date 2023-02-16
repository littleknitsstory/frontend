import React from "react";
import MultiRangeslider from "./multi-range-slider/MultiRangeSlider";
import arrowRight from "../icons/arrow-right.svg";
import { useTranslation } from "react-i18next";

const Filters = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="filters">
        <div className="title">
          {t("Filter.title")}
        </div>

        <div className="filters__wrapper-price">
          <div className="filters__title">
            {t("Filter.price")}
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
              {t("Filter.buttonText")}
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
