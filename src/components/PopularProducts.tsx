import { Row, Col } from "react-bootstrap";
import MiniCardProduct from "./MiniCardProduct";
import { useTranslation } from "react-i18next";
import { useGetProductsQuery } from "../store/apiSlice";
import Spinner from "./Spinner";
import PageError from "./PageError";

const PopularProducts = () => {
  const { t } = useTranslation();
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetProductsQuery({ limit: 0 });

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
    if ("originalStatus" in error) {
      return <PageError errorStatus={error.originalStatus} />;
    }
  }

  return (
    <section className="popular-products">
      <h3 className="title">{t("popular")}</h3>
      <Row xs={1} md={2} lg={3} xl={3} xxl={4}>
        {products?.results
          .map((product) => {
            return (
              <Col key={product.id}>
                <MiniCardProduct product={product} />
              </Col>
            );
          })
          .slice(-4)}
      </Row>
    </section>
  );
};

export default PopularProducts;
