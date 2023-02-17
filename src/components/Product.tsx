import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { getProductDetails } from "../api";
import { IProductDetails } from "../api/models";
import PopularProducts from "./PopularProducts";
import Reviews from "./Reviews";
import SchemaCard from "./SchemaCard";

const Product = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<IProductDetails | null>(null);
  useEffect(() => {
    const fetchProductDetails = async (): Promise<void> => {
      if (!slug) return;
      const data: IProductDetails | void = await getProductDetails(slug);
      if (data) {
        setProduct(data);
      }
    };
    fetchProductDetails();
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
