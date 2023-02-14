import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardReview from "./CardReview";
import { Trans } from "react-i18next";

const LastReviews = () => {
  return (
    <section className="last-reviews">
      <Container>
        <h3 className="title">
          <Trans i18nKey="lastReviews">
            Последние отзывы
          </Trans>
        </h3>
        <CardReview />
      </Container>
    </section>
  );
};

export default LastReviews;
