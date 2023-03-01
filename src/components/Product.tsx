import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import PopularProducts from "./PopularProducts";
import Reviews from "./Reviews";
import SchemaCard from "./SchemaCard";
import Spinner from "./Spinner";

import { useGetProductDetailsQuery } from "../store/apiSlice";
import PageError from "./PageError";

const Product = () => {
  const { slug } = useParams<string>();

  const {
    data: product,
    isError,
    isLoading,
    error,
  } = useGetProductDetailsQuery({ slug });

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
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
