import React from "react";
import { Container } from "react-bootstrap";

const Instagram = () => {
  return (
    <Container>
      <div className="row">
        <div className="col-12">
          <div className="instagram">
            <div className="left-side"></div>
            <div className="mid-side">
              <h2>@littleknitsstory</h2>
              <a
                href="https://www.instagram.com/littleknitsstory/"
                target="_blank"
              >
                <button className="lks-btn lks-btn-main">Follow </button>
              </a>
            </div>
            <div className="right-side"></div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Instagram;
