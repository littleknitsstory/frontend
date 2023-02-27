import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IProduct } from "../api/models";

const MiniCardProduct = ({ product }: { product: IProduct }) => {
  return (
    <div className="mini-card-product">
      <Link to={`/product/${product.slug}`}>
        <Card style={{ width: "18rem" }}>
          <Card.Title>{product.title}</Card.Title>
          <Card.Body>
            <Card.Img
              variant="top"
              alt={product.image_alt}
              src={`${product.image_preview}`}
            />

            <Card.Title>{product.price}</Card.Title>
          </Card.Body>
          <div className="mini-card-product__circle">+</div>
        </Card>
      </Link>
    </div>
  );
};

export default MiniCardProduct;
