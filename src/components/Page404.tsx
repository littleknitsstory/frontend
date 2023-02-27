import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <section className="page404">
      <Container>
        <Row>
          <Col>
            <div className="page404__error"></div>
            <div className="page404__subtitle"></div>
            <div className="page404__text">
              The page you are trying to reach does not exist or has been
              deleted. <br />
              Click to
              <span>
                <Link to="/"> home</Link>
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Page404;
