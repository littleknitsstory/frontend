import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Stars from "./Stars";
import rabbit from "../images/rabbit.png";

const LastReviews = () => {
  return (
    <section className="last-reviews">
      <Container>
        <h3 className="title">Последние отзывы</h3>
        <Row>
          <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
            <div className="last-reviews__card">
              <div className="last-reviews__title">Схема “Зайка”</div>
              <Stars />
              <Row>
                <Col xs={12} md={12} lg={12} xl={6} xxl={6}>
                  <div className=" last-reviews__descr">
                    Etiam eu molestie eros, commodo hendrerit sapien. Maecenas
                    tempus leo ac nisi iaculis porta. Sed sapien tortor, aliquet
                    a velit ut. Etiam eu molestie eros, commodo hendrerit
                    sapien. Maecenas tempus leo ac nisi iaculis porta. Sed
                    sapien
                  </div>
                  <div className="last-reviews__author">Автор</div>
                  <div className="last-reviews__author-name">
                    Валерия Анаприенко
                  </div>
                </Col>
                <Col
                  xs={12}
                  md={12}
                  lg={12}
                  xl={6}
                  xxl={6}
                  className="last-reviews__img-wrapper"
                >
                  <img
                    className="last-reviews__img"
                    src={rabbit}
                    alt="rabbit"
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default LastReviews;
