import CardReview from "./CardReview";
import { useTranslation } from "react-i18next";
import { useGetReviewsQuery } from "../features/api/apiSlice";
// Temporary for generating reviewID
import { nanoid } from '@reduxjs/toolkit'


const Reviews = () => {
  const { t } = useTranslation();
  const {
    data: reviews,
    isLoading,
    isError,
    error
  } = useGetReviewsQuery()

  return (
    <section className="reviews">
      <h3 className="title">{t("reviews")}</h3>
      {reviews?.map(review => <CardReview key={nanoid()} {...review}/>)}
    </section>
  );
};

export default Reviews;
