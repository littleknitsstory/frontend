import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { getProductDetails } from "../api";
import { IProductDetails } from "../api/models";
import cartWhite from "../icons/cart-white.svg";
import SchemaCard from "./SchemaCard";

const SchemasCard = () => {
  const [product, setProduct] = useState<IProductDetails | null>(null);
  useEffect(() => {
    const fetchProductDetails = async () => {
      const data = await getProductDetails("pattents_5");
      if (data) {
        setProduct(data);
      }
    };
    fetchProductDetails();
  }, []);

  return (
    <section className="schemas-card">
      <Container>
        <h3 className="title">Схемы вязания</h3>
        {product && <SchemaCard product={product} />}
        <Link to={`/shop`}>
          <div className="schemas-card__btn">
            <button className="btn btn_vinous">
              <div className="btn__text">Перейти в каталог</div>
              <div className="btn__icon">
                <img src={cartWhite} alt="cartWhite" />
              </div>
            </button>
          </div>
        </Link>
      </Container>
    </section>
  );
};

export default SchemasCard;
