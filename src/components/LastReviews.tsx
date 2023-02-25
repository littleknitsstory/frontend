import { Container } from "react-bootstrap";
import CardReview from "./CardReview";
import { useTranslation } from "react-i18next";
import { useGetReviewsQuery } from "../features/api/apiSlice";
import { nanoid } from "@reduxjs/toolkit";

const LastReviews = () => {
  const { t } = useTranslation();
  const {
    data: reviews,
    isLoading,
    isError,
    error
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
