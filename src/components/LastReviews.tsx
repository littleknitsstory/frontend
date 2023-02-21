import { Container } from "react-bootstrap";
import CardReview from "./CardReview";
import { useTranslation } from "react-i18next";

const LastReviews = () => {
  const { t } = useTranslation();

  return (
    <section className="last-reviews">
      <Container>
        <h3 className="title">{t("lastReviews")}</h3>
        <CardReview />
      </Container>
    </section>
  );
};

export default LastReviews;
