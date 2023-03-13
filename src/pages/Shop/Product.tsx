import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../components/features/api/apiSlice";
// components
import PageError from "../PageError";
import PopularProducts from "../../components/products/PopularProducts";
import Reviews from "../../components/reviews/Reviews";
import SchemaCard from "../../components/product/SchemaCard";
import Spinner from "../../components/utils/Spinner";
import { useGetFeaturesQuery } from "../../components/features/api/featuresSlice";

const Product = () => {
  const { data } = useGetFeaturesQuery();
  const { slug } = useParams<string>();
  const { i18n } = useTranslation();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductQuery({ slug: slug, lang: i18n.language });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    if ("status" in error) {
      return <PageError errorStatus={error.status} />;
    }
  }

  return (
    <section className="product">
      <Container>
        {product && <SchemaCard product={product} />}
        <PopularProducts />
        {data?.reviews ? <Reviews /> : null}
      </Container>
    </section>
  );
};

export default Product;
