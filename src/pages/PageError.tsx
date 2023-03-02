import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const PageError = ({ errorStatus }: { errorStatus: number }) => {
  return (
    <section className="page-error">
      <Container>
        <Row>
          <Col>
            <div className="page-error__status">{errorStatus}</div>
            <div className="page-error__subtitle">Not found</div>
            <div className="page-error__text">
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

export default PageError;
