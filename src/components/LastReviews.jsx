import React from "react";
import { Container } from "react-bootstrap";
import Stars from "./Stars";
import rabbit from "../images/rabbit.png";

const LastReviews = () => {
  return (
    <section className="last-reviews">
      <Container>
        <h3 className="title">Последние отзывы</h3>
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-xs-12 ">
            <div className="last-reviews__card">
              <div className="last-reviews__title">Схема “Зайка”</div>
              <Stars />
              <div className="row">
                <div className="col-xl-6 col-lg-12 col-md-12 col-xs-12">
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
                </div>
                <div className="col-xl-6 col-lg-12 col-md-12 col-xs-12 last-reviews__img-wrapper">
                  <img
                    className="last-reviews__img"
                    src={rabbit}
                    alt="rabbit"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LastReviews;
