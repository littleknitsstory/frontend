import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import cartBlack from "../icons/cart-black.svg";
import { useTranslation } from "react-i18next";

const Promo = () => {
  const { t } = useTranslation();
  return (
    <section className="promo">
      <Container>
        <Row>
          <h1 className="promo__title">Little Knits Story</h1>
          <Col xs={12} md={8} lg={6} xl={6} xxl={6}>
            <div className="promo__text">{t("Promo.text")}</div>
            <Link to={`/shop`}>
              <button className="btn">
                <div className="btn__text_center">{t("Promo.buttonText")}</div>
                <div className="btn__icon">
                  <img src={cartBlack} alt="cartBlack" />
                </div>
              </button>
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Promo;
