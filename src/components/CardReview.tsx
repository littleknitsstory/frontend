import { Row, Col } from "react-bootstrap";
import Stars from "./Stars";
import rabbit from "../images/rabbit.png";

const CardReview = () => {
  return (
    <div className="review">
      <Row>
        <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
          <div className="review__card">
            <div className="review__title">Схема “Зайка”</div>
            <Stars />
            <Row>
              <Col xs={12} md={12} lg={12} xl={6} xxl={6}>
                <div className="review__descr">
                  Etiam eu molestie eros, commodo hendrerit sapien. Maecenas
                  tempus leo ac nisi iaculis porta. Sed sapien tortor, aliquet a
                  velit ut. Etiam eu molestie eros, commodo hendrerit sapien.
                  Maecenas tempus leo ac nisi iaculis porta. Sed sapien
                </div>
                <div className="review__author">Автор</div>
                <div className="review__author-name">Валерия Анаприенко</div>
              </Col>
              <Col
                xs={12}
                md={12}
                lg={12}
                xl={6}
                xxl={6}
                className="review__img-wrapper"
              >
                <img className="review__img" src={rabbit} alt="rabbit" />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CardReview;
