import React from "react";
import { Container } from "react-bootstrap";

const Instagram = () => {
  return (
    <section className="instagram">
      <Container>
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-12 col-xs-12">
            <div className="instagram__left-side"></div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 col-xs-12">
            <div className="instagram__mid-side">
              <h2>@littleknitsstory</h2>
              <a
                href="https://www.instagram.com/littleknitsstory/"
                target="_blank"
                rel="noreferrer"
              ></a>
              <button className="btn btn_vinous instagram__btn">
                <div className="btn__text btn__text_center">Follow</div>
              </button>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 col-xs-12">
            <div className="instagram__right-side"></div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Instagram;
