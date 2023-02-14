import React from "react";
import CardReview from "./CardReview";
import { Trans } from "react-i18next";

const Reviews = () => {
  return (
    <section className="reviews">
      <h3 className="title">
        <Trans i18nKey="reviews">
          Отзывы
        </Trans>
      </h3>
      <CardReview />
    </section>
  );
};

export default Reviews;
