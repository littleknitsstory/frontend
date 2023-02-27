import CardReview from "./CardReview";
import { useTranslation } from "react-i18next";
import { useGetReviewsQuery } from "../features/api/apiSlice";
// Temporary for generating reviewID
import { nanoid } from '@reduxjs/toolkit'
import Page404 from "./Page404";

const Reviews = () => {
  const { t } = useTranslation();
  const {
    data: reviews,
    isLoading,
    isError,
    error
  } = useGetReviewsQuery()
  // console.log(error)

  return (
    <section className="reviews">
      <h3 className="title">{t("reviews")}</h3>
      {isError && <Page404 />}
      {reviews?.map(review => <CardReview key={nanoid()} {...review}/>)}
    </section>
  );
};

export default Reviews;
