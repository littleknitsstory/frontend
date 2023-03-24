import { Container, Row, Col } from "react-bootstrap";

const Instagram = () => {
  return (
    <section className="instagram">
      <Container>
        <Row>
          <Col xs={12} md={12} lg={4} xl={4} xxl={4}>
            <div className="instagram__left-side"></div>
          </Col>
          <Col xs={12} md={12} lg={4} xl={4} xxl={4}>
            <div className="instagram__mid-side">
              <h2>@littleknitsstory</h2>
              <a
                href="https://www.instagram.com/littleknitsstory/"
                target="_blank"
                rel="noreferrer"
              >
                <button className="btn btn--primary">Follow</button>
                {/* <button className="btn btn_vinous instagram__btn">
                  <div className="btn__text btn__text_center">Follow</div>
                </button> */}
              </a>
            </div>
          </Col>
          <Col xs={12} md={12} lg={4} xl={4} xxl={4}>
            <div className="instagram__right-side"></div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Instagram;
