import React from "react";
import { withTranslation } from "react-i18next";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { t } = useTranslation();
  return (
    <section className="cart">
      <div className="lks-container">
        <div className="row">
          <div className="col">
            <div className="cart__empty">{t("Cart is empty")}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withTranslation()(Cart);
