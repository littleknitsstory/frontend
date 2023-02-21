import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import mermaid from "../images/mermaid.png";

const MiniCardProduct = () => {
  return (
    <div className="mini-card-product">
      <Card style={{ width: "18rem" }}>
        <Card.Title>Cхема "Русалочка"</Card.Title>
        <Card.Body>
          <Link to="/product">
            <Card.Img variant="top" src={mermaid} />
          </Link>
          <Card.Title>2 555</Card.Title>
        </Card.Body>
        <div className="mini-card-product__circle">+</div>
      </Card>
    </div>
  );
};

export default MiniCardProduct;
