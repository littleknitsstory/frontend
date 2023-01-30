import React from "react";
import { Card } from "react-bootstrap";
import mermaid from "../images/mermaid.png";

const MiniCardProduct = () => {
  return (
    <div className="mini-card-product">
      <Card style={{ width: "18rem" }}>
        <Card.Title>Cхема "Русалочка"</Card.Title>
        <Card.Body>
          <Card.Img variant="top" src={mermaid} />
          <Card.Title>2 555</Card.Title>
        </Card.Body>
        <div className="mini-card-product__circle">+</div>
      </Card>
    </div>
  );
};

export default MiniCardProduct;
