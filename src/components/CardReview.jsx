import React from "react";
import { Row, Col } from "react-bootstrap";
import Stars from "./Stars";

const CardReview = (props) => {
  return (
    <div className="review">
      <Row>
        <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
          <div className="review__card">
            <div className="review__title">{props.title}</div>
            <Stars rating={props.rating}/>
            <Row>
              <Col xs={12} md={12} lg={12} xl={6} xxl={6}>
                <div className="review__descr">
                  {props.comment}
                </div>
                <div className="review__author">Автор</div>
                <div className="review__author-name">{props.author}</div>
              </Col>
              <Col
                xs={12}
                md={12}
                lg={12}
                xl={6}
                xxl={6}
                className="review__img-wrapper"
              >
                <img 
                  className="review__img" 
                  src={"http://dev.backend.littleknitsstory.com" + props.image_preview} 
                  alt="rabbit" 
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CardReview;
