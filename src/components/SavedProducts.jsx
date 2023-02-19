import { Container, Row, Col } from "react-bootstrap";
import CardProduct from "./CardProduct";
import arrowRight from "../icons/arrow-right.svg";
import { useTranslation } from "react-i18next";

const SavedProducts = () => {
  const { t } = useTranslation();

  const array = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  return (
    <section className="saved-products">
      <Container>
        <Row xs={1} md={2} lg={3} xl={3} xxl={4}>
          {array.map((item) => {
            return (
              <Col key={item.id}>
                <CardProduct />
              </Col>
            );
          })}
        </Row>
        <button className="btn btn_border">
          <div className="btn__text">{t("Cart")}</div>
          <div className="btn__icon">
            <img src={arrowRight} alt="arrowWhite" />
          </div>
        </button>
      </Container>
    </section>
  );
};

export default SavedProducts;
