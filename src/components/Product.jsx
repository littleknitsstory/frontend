import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import SchemaCard from "./SchemaCard";

const Product = () => {
  return (
    <section className="product">
      <Container>
        <SchemaCard />
      </Container>
    </section>
  );
};

export default Product;
