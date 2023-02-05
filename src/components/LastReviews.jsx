import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardReview from "./CardReview";

const LastReviews = () => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    (async () => {
      const res = await fetch("http://dev.backend.littleknitsstory.com:26363/api/v1/reviews/")
      const data = await res.json()

      setReviews(data)
    })()
  },[])

  return (
    <section className="last-reviews">
      <Container>
        <h3 className="title">Последние отзывы</h3>
        {reviews.map(review => <CardReview { ...review }/>).slice(0, 4)}
      </Container>
    </section>
  );
};

export default LastReviews;
