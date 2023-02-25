import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../features/api/apiSlice";

import Page404 from "./Page404";
import PopularProducts from "./PopularProducts";
import Reviews from "./Reviews";
import SchemaCard from "./SchemaCard";
import Spinner from "./Spinner";

const Product = () => {
  const { slug } = useParams<string>();
  const { i18n } = useTranslation()
  const {
    data: product,
    isLoading,
    isError
  } = useGetProductQuery({ slug: slug, lang: i18n.language })
  
  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <Page404 />
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
