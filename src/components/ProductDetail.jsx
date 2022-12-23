import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { useTranslation } from "react-i18next";
import useLksService from "../assests/api";
import Spinner from "./Spinner";
import Social from "./Social";
import heart from "../assests/images/heart.svg";
import ruble from "../assests/images/ruble.svg";
import height from "../assests/images/height.svg";
import vk from "../assests/images/logo-vk_white.svg";
import instagram from "../assests/images/logo-instagram_white.svg";
import facebook from "../assests/images/logo-facebook_white.svg";
import pinterest from "../assests/images/logo-pinterest_white.svg";
import instagramPurple from "../assests/images/logo-instagram.svg";
import quickPurchase from "../assests/images/bolt-pink.svg";
import shoppingCart from "../assests/images/cart-pink.svg";
import img_product from "../assests/images/img_product.png";

const ProductDetail = () => {
  const { t } = useTranslation();
  const [product, setProduct] = useState([]);
  const { error, getProduct, _apiPictures, loaded } = useLksService();

  const { slug } = useParams();

  useEffect(() => {
    getProduct(slug).then((data) => setProduct(data));
  }, [slug]);

  return (
    <div className="lks-container">
      {error || !loaded ? (
        <Spinner />
      ) : (
        <div className="product-detail">
          <div className="row">
            <div className="col-1">
              <div className="footer social">
                <Social
                  vk={vk}
                  instagram={instagram}
                  facebook={facebook}
                  pinterest={pinterest}
                />
              </div>
            </div>
            <div className="col-11">
              <div className="product-detail-wrapper">
                <div className="product-detail-image">
                  <img
                    // src={`${_apiPictures}${product.image_preview}`}
                    src={img_product}
                    alt="img product"
                  />
                </div>
                <div className="product-detail-info">
                  <div className="product-detail-title">
                    {product.title}
                    <strong className="product-detail-sale">
                      {/* {Math.round(
                        (parseInt(product.sale) /
                          (parseInt(product.price) + parseInt(product.sale))) *
                          100
                      )} */}
                      10%
                    </strong>
                    <button className="lks-btn lks-btn-icon-main">
                      <div className="lks-btn-icon-text">
                        <a
                          href="https://www.instagram.com/littleknitsstory/"
                          target="_blank"
                        >
                          {t("Subscribe to instragram")}
                        </a>
                      </div>
                      <div className="lks-btn-icon lks-btn-icon-icon">
                        <img src={instagramPurple} alt="shoppingCart" />
                      </div>
                    </button>
                  </div>
                  <div className="product-detail-descr">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Architecto odit, maiores incidunt sequi tempore possimus
                    modi, dolores aliquam facilis animi voluptatum reiciendis
                    provident quis? Inventore suscipit vitae repellat eius
                    veritatis. Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Perferendis exercitationem accusamus
                    beatae delectus veritatis molestias optio harum modi hic
                    deserunt asperiores officia, commodi, facilis labore. Atque
                    ab consequatur fuga cumque?
                  </div>
                  <div className="price lks-flex lks-flex-jcsb lks-flex-aic">
                    <div className="product-amount lks-flex lks-flex-aic">
                      <div className="subtract lks-mod-pointer lks-roundpad">
                        -
                      </div>
                      <span className="counter">1</span>
                      <div className="add lks-mod-pointer lks-roundpad">+</div>
                    </div>
                    <div className="product-price-tag lks-flex lks-flex-aic lks-flex-jcsb">
                      <div className="price-label lks-flex lks-flex-jcsb">
                        {/* <img src={ruble} alt="" /> */}
                        <div className="lks-price-now">90€</div>
                        <strike className="lks-price-old">100€</strike>
                      </div>
                      <div className="product-color">
                        <div className="lks-color-circle">
                          <div className="lks-color-circle-color"></div>
                        </div>
                      </div>
                      <div className="product-size lks-flex lks-aic">
                        <div className="lks-product-size">
                          <img src={height} alt="height" />
                          {product.height} cm
                        </div>
                      </div>
                      <button className="lks-btn lks-btn-main favorite lks-flex lks-flex-aic lks-flex-jcc">
                        <img src={heart} alt="" />
                      </button>
                    </div>
                  </div>
                  <div className="buttons lks-mod-text-center lks-flex">
                    <button className="lks-btn lks-btn-icon lks-btn-icon-main">
                      <div className="lks-btn-icon-text">
                        {t("Quick purchase")}
                      </div>
                      <div className="lks-btn-icon-icon">
                        <img src={quickPurchase} alt="quickPurchase" />
                      </div>
                    </button>
                    <button className="lks-btn lks-btn-icon lks-btn-icon-main">
                      <div className="lks-btn-icon-text">
                        {t("Add to cart")}
                      </div>
                      <div className="lks-btn-icon-icon">
                        <img src={shoppingCart} alt="shoppingCart" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="spec">
                <div className="spec-title">{t("Specifications")}</div>
                <div className="spec-subtitle">
                  {t("General specifications")}
                </div>
                <table>
                  <tbody>
                    <tr>
                      <td>{t("Weight")}</td>
                      <td>{product.weight}gr</td>
                    </tr>
                    <tr>
                      <td>{t("Height")}</td>
                      <td>{product.height}cm</td>
                    </tr>
                    <tr>
                      <td>{t("Type")}</td>
                      <td>{product.type_product}</td>
                    </tr>
                    <tr>
                      <td> {t("Material")}</td>
                      <td>{product.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-12">
              <div className="spec popular">
                <div className="spec-title">{t("Popular")}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withTranslation()(ProductDetail);
