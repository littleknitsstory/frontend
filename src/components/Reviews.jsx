import React from "react";
import CardReview from "./CardReview";
import { useTranslation } from "react-i18next";

const Reviews = () => {
  const { t } = useTranslation()

  return (
    <section className="reviews">
      <h3 className="title">
        {t("reviews")}
      </h3>
      <CardReview />
    </section>
  );
};

export default Reviews;
