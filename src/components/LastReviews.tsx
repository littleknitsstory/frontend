import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useGetReviewsQuery } from "../features/api/apiSlice";
import { nanoid } from "@reduxjs/toolkit";
// components
import CardReview from "./CardReview";

const LastReviews = () => {
  const { t } = useTranslation();
  const {
    data: reviews,
  } = useGetReviewsQuery()

  return (
    <section className="last-reviews">
      <Container>
        <h3 className="title">{t("lastReviews")}</h3>
        {reviews?.slice(0, 4).map(review => <CardReview key={nanoid()} {...review}/>)}
      </Container>
    </section>
  );
};

export default LastReviews;
