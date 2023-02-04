import React from "react";
import { Container } from "react-bootstrap";
import SchemaCard from "./SchemaCard";
import PopularProducts from "./PopularProducts";
import Reviews from "./Reviews";

const Product = () => {
  return (
    <section className="product">
      <Container>
        <SchemaCard />
        <PopularProducts />
        <Reviews />
      </Container>
    </section>
  );
};

export default Product;
