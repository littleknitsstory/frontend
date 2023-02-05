import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import SchemaCard from "./SchemaCard";
import PopularProducts from "./PopularProducts";
import Reviews from "./Reviews";

const Product = () => {
  const productId = useParams()

  return (
    <section className="product">
      <Container>
        <SchemaCard id={productId.id}/>
        <PopularProducts />
        <Reviews />
      </Container>
    </section>
  );
};

export default Product;
