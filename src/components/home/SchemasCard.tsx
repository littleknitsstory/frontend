import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetProductQuery } from "../features/api/apiSlice";
// components
import SchemaCard from "../product/SchemaCard";
import Spinner from "../utils/Spinner";
import PageError from "../../pages/PageError";
// assets
import cartWhite from "../assets/icons/cart-white.svg";

const SchemasCard = () => {
  const { t, i18n } = useTranslation();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductQuery({ slug: "pattents_5", lang: i18n.language });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    if ("originalStatus" in error) {
      return <PageError errorStatus={error.originalStatus} />;
    }
  }

  return (
    <section className="schemas-card">
      <Container>
        <h3 className="title">{t("SchemasCard.title")}</h3>
        {product && <SchemaCard product={product} />}
        <Link to={`/shop`}>
          <div className="schemas-card__btn">
            <button className="btn btn_vinous">
              <div className="btn__text_center">{t("SchemasCard.button")}</div>
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
