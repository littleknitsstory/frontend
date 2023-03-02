import CardReview from "./CardReview";
import { useTranslation } from "react-i18next";
import { useGetReviewsQuery } from "../features/api/apiSlice";

import { nanoid } from '@reduxjs/toolkit' /* Temporary for generating reviewID */
import PageError from "../pages/PageError";
import Spinner from "./Spinner";

const Reviews = () => {
  const { t } = useTranslation();
  const {
    data: reviews,
    isLoading,
    isError,
    error
  } = useGetReviewsQuery()

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    if ("originalStatus" in error) {
      return <PageError errorStatus={error.originalStatus} />;
    }
  }

  return (
    <section className="reviews">
      <h3 className="title">{t("reviews")}</h3>
      {reviews?.map(review => <CardReview key={nanoid()} {...review}/>)}
    </section>
  );
};

export default Reviews;
