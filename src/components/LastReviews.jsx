import { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Language } from "../App";
import CardReview from "./CardReview";
import { Trans } from "react-i18next";

const LastReviews = () => {
  const [reviews, setReviews] = useState([])
  const languageContext = useContext(Language)

  useEffect(() => {
    (async () => {
      const res = await fetch("http://dev.backend.littleknitsstory.com:26363/api/v1/reviews/", {
        headers: {
          "Accept-Language": languageContext
        }
      })
      const data = await res.json()

      setReviews(data)
    })()
  },[languageContext])

  return (
    <section className="last-reviews">
      <Container>
        <h3 className="title">
          <Trans i18nKey="LastReviews.title">
            Последние отзывы
          </Trans>
        </h3>
        {reviews.map((review, i) => <CardReview key={i} { ...review }/>).slice(0, 4)}
      </Container>
    </section>
  );
};

export default LastReviews;
