import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { getProductDetails } from "../api";
import PopularProducts from "./PopularProducts";
import Reviews from "./Reviews";
import SchemaCard from "./SchemaCard";

const Product = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    getProductDetails(slug).then((data) => setProduct(data));
  }, [slug]);

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
