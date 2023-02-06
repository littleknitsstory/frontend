import { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Language } from "../App";
import CardReview from "./CardReview";
import { Trans } from "react-i18next";
import fetcher from "../utils/fetcher";

const LastReviews = () => {
  const [reviews, setReviews] = useState([])
  const language = useContext(Language)

  useEffect(() => {
    const endPoint = "/api/v1/reviews/"
    fetcher(endPoint, language).then(data => setReviews(data))
    
  },[language])

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
