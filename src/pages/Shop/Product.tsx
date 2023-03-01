import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../features/api/apiSlice";
// components
import PageError from "../PageError";
import PopularProducts from "../../components/PopularProducts";
import Reviews from "../../components/Reviews";
import SchemaCard from "../../components/SchemaCard";
import Spinner from "../../components/Spinner";

const Product = () => {
  const { slug } = useParams<string>();
  const { i18n } = useTranslation()
  const {
    data: product,
    isLoading,
    isError,
    error
  } = useGetProductQuery({ slug: slug, lang: i18n.language })
  
  if (isLoading) {
    return <Spinner />
  }
  
  if (isError) {
    if ("originalStatus" in error) {
      return <PageError errorStatus={error.originalStatus} />;
    }
  }

  return (
    <section className="product">
      <Container>
        {product && <SchemaCard product={product} />}
        <PopularProducts />
        <Reviews />
      </Container>
    </section>
  );
};

export default Product;
