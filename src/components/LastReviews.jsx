import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardReview from "./CardReview";

const LastReviews = () => {
  return (
    <section className="last-reviews">
      <Container>
        <h3 className="title">Последние отзывы</h3>
        <CardReview />
      </Container>
    </section>
  );
};

export default LastReviews;
