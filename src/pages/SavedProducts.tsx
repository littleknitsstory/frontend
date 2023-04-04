import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../app/hooks";
import CardProduct from "../components/products/CardProduct";
import { ROUTES } from "../app/routes";

const SavedProducts = () => {
  const { t } = useTranslation();
  const favoriteProducts = useAppSelector((state) => state.products.favorite);

  if (favoriteProducts.length === 0) {
    return (
      <Container>
        <div className="empty-favorites">{t("Saved.empty")}</div>
        <Link to={ROUTES.PRODUCTS} className="empty-cart-link">
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
      </Container>
    </section>
  );
};

export default SavedProducts;
