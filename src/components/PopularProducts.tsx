import { Row, Col } from "react-bootstrap";
import MiniCardProduct from "./MiniCardProduct";
import { useTranslation } from "react-i18next";
import { useGetProductsQuery } from "../features/api/apiSlice"; 
import Spinner from "./Spinner";
import PageError from "./PageError";

const PopularProducts = () => {
  const { t, i18n } = useTranslation();
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetProductsQuery({ lang: i18n.language, limit: 4});

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
        }
      </Row>
    </section>
  );
};

export default PopularProducts;
