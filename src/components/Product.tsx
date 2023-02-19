import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { getProductDetails } from "../api";
import { IProductDetails } from "../api/models";
import { LanguageContext } from "../App";
import { baseURL, useGet } from "./Hooks/useFetch";
import PopularProducts from "./PopularProducts";
import Reviews from "./Reviews";
import SchemaCard from "./SchemaCard";
import Page404 from "./Page404";

const Product = () => {
  const { slug } = useParams();
  const { language } = useContext(LanguageContext)
  const [product, setProduct] = useState<IProductDetails>();

  const { data, loading, error } = useGet<IProductDetails>({
    url: "PRODUCTS",
    method: "GET",
    lang: language,
    slug: slug
  })
  useEffect(() => {
    if (data) {
      setProduct({
        ...data,
        image_preview: `${baseURL}${data.image_preview}`,
      })
    }
    // const fetchProductDetails = async (): Promise<void> => {
    //   if (!slug) return;
    //   const data: IProductDetails | void = await getProductDetails(slug);
    //   if (data) {
    //     setProduct(data);
    //   }
    // };
    // fetchProductDetails();
  }, [data]);
  if (error) {
    return (
      <Page404 error={error} />
    )
  }

  return (
    <section className="product">
      <Container>
        {loading && <Spinner />}
        {product && <SchemaCard product={product} />}
        <PopularProducts />
        <Reviews />
      </Container>
    </section>
  );
};

export default Product;
