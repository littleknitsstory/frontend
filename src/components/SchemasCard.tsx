import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import cartWhite from "../icons/cart-white.svg";
import SchemaCard from "./SchemaCard";
import Spinner from "./Spinner";
import Page404 from "./Page404";
import { useGetProductQuery } from "../features/api/apiSlice";

const SchemasCard = () => {
  const { t, i18n } = useTranslation();

  const {
    data: product,
    isLoading,
    isError
  } = useGetProductQuery({ slug: "pattents_5", lang: i18n.language })
  
  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <Page404 />
  }
  // const [product, setProduct] = useState<IProductDetails | null>(null);
  // useEffect(() => {
  //   const fetchProductDetails = async (): Promise<void> => {
  //     const data = await getProductDetails("pattents_5");
  //     if (data) {
  //       setProduct(data);
  //     }
  //   };
  //   fetchProductDetails();
  // }, []);

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
