import { Row, Col } from "react-bootstrap";
import Stars from "./Stars";
import { IReviewsResponse } from "../../app/types";
import { PICTURE_BASE_URL } from "../features/api/apiSlice";

const CardReview = (props: IReviewsResponse) => {
  const { title, author, comment, rating, image_preview } = props;
  return (
    <div className="review">
      <Row>
        <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
          <div className="review__card">
            <div className="review__title">{title}</div>
            <Stars rating={rating} />
            <Row>
              <Col xs={12} md={12} lg={12} xl={6} xxl={6}>
                <div className="review__descr">{comment}</div>
                <div className="review__author">Автор</div>
                <div className="review__author-name">{author}</div>
              </Col>
              <Col xs={12} md={12} lg={12} xl={6} xxl={6} className="review__img-wrapper">
                <img className="review__img" src={PICTURE_BASE_URL + image_preview} alt="rabbit" />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CardReview;
