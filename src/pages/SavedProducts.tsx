import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../app/hooks";
// components
import CardProduct from "../components/products/CardProduct";
// assets
import arrowRight from "../assets/icons/arrow-right.svg";

const SavedProducts = () => {
  const { t } = useTranslation();
  const favoriteProducts = useAppSelector((state) => state.products.favorite);

  if (favoriteProducts.length === 0) {
    return (
      <Container>
        <div className="empty-favorites">{t("Saved.empty")}</div>
        <Link to="/shop" className="empty-cart-link">
          {t("Saved.buttonText")} 🛒
        </Link>
      </Container>
    );
  }

  return (
    <section className="saved-products">
      <Container>
        <Row xs={1} md={2} lg={3} xl={3} xxl={4}>
          {favoriteProducts.map((product) => {
            return (
              <Col key={product.id}>
                <CardProduct productSlug={product.slug} />
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
