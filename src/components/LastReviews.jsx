import React, {useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardReview from "./CardReview";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {getReviewsThunk, selectReviews} from "../store/apiTestSlice";

const LastReviews = () => {
    const dispatch = useAppDispatch()
    const reviews = useAppSelector(selectReviews)

    useEffect(() => {
        dispatch(getReviewsThunk())
    }, [])
    console.log(reviews)
    console.log('555')

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
