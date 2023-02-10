import React, {FC, useEffect} from "react";
import {Container} from "react-bootstrap";
import CardReview from "./CardReview";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {getReviewsThunk, selectReviews} from "../store/apiTestSlice";

const LastReviews: FC = () => {
  const dispatch = useAppDispatch()
  const reviews = useAppSelector(selectReviews)

  useEffect(() => {
    dispatch(getReviewsThunk())
  }, [dispatch])

  return (
    <section className="last-reviews">
      <Container>
        <h3 className="title">Последние отзывы</h3>
        {reviews.map((r, i) => <CardReview key={i}
                                           title={r.title}
                                           authorName={r.author}
                                           description={r.comment}/>)}
      </Container>
    </section>
  );
};

export default LastReviews;
