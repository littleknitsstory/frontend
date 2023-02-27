import { Container, Row, Col } from "react-bootstrap";
import CardProduct from "./CardProduct";
import arrowRight from "../icons/arrow-right.svg";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../app/hooks";
import { Link } from "react-router-dom";

const SavedProducts = () => {
  const { t } = useTranslation();
  const favoriteProducts = useAppSelector(state => state.products.favorite)

  return (
    <section className="saved-products">
      <Container>
        <Row xs={1} md={2} lg={3} xl={3} xxl={4}>
          {favoriteProducts.map((item) => {
            return (
              <Col key={item.id}>
                <CardProduct product={item} />
              </Col>
            );
          })}
        </Row>
        <Link className="btn btn_border" to="/cart">
          <div className="btn__text">{t("Footer.cart")}</div>
          <div className="btn__icon">
            <img src={arrowRight} alt="arrowWhite" />
          </div>
        </Link>
      </Container>
    </section>
  );
};

export default SavedProducts;
