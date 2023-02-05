import React, {FC} from "react";

import {Row, Col} from "react-bootstrap";

import Stars from "./Stars";
import rabbit from "../images/rabbit.png";

type CardReviewProps = {
  title: string
  description: string
  authorName: string
  image?: string
}

const CardReview: FC<CardReviewProps> = ({
   title,
   description,
   authorName,
   image = rabbit
 }) => {

  return (
    <div className="review">
      <Row>
        <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
          <div className="review__card">
            <div className="review__title">{title}</div>
            <Stars/>
            <Row>
              <Col xs={12} md={12} lg={12} xl={6} xxl={6}>
                <div className="review__descr">{description}</div>
                <div className="review__author">Автор</div>
                <div className="review__author-name">{authorName}</div>
              </Col>
              <Col
                xs={12}
                md={12}
                lg={12}
                xl={6}
                xxl={6}
                className="review__img-wrapper"
              >
                <img className="review__img" src={image} alt="rabbit"/>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CardReview;
