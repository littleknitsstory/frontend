import React from "react";
import { Link } from "react-router-dom";
import useLksService from "../assests/api";
import quickPurchase from "../assests/images/lightning.svg";
import shoppingBag from "../assests/images/shopping-bag.svg";
import heart from "../assests/images/heart.svg";
import { useState } from "react";

const ProductCard = ({ title, slug, price, image_preview }) => {
  const { _apiPictures } = useLksService();

  const [isSaved, setIsSaved] = useState(false);
  const [hasProducts, setHasProducts] = useState(false);

  return (
    <div className="col-3 product" key={title}>
      <div className="lks-card product-card ">
        <div className="product-controls">
          <div className="product-control lks-mod-pointer">
            <img src={shoppingBag} alt="shoppingBag" />
            <div className={hasProducts ? "dot lit" : "dot"}></div>
          </div>
          <div className="product-control lks-mod-pointer">
            <img src={heart} alt="heart" />
            <div className={isSaved ? "dot lit" : "dot"}></div>
          </div>
        </div>
        <div className="product-info">
          <ul>
            <Link
              to={`/products/${slug}`}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              <li>
                <div className="product-image">
                  <img
                    src={`${_apiPictures}${image_preview}`}
                    alt="img product"
                  />
                </div>
                <div className="product-title">{title}</div>

                <div className="product-price">{price}</div>
              </li>
            </Link>
          </ul>
          <div className="quick-purchase">
            <button className="lks-btn lks-btn-icon lks-btn-icon-bordered quick-purchase-btn">
              <div className="lks-btn-icon-text">Быстрый заказ</div>

              <img
                className="lks-btn-icon-icon lks-btn-icon-bordered"
                src={quickPurchase}
                alt="quickPurchase"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
