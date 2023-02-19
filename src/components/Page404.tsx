import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";
import { ErrorType } from "./Hooks/useFetch";

type Props = {
  error?: ErrorType
}

const Page404 = ({error}: Props) => {
  return (
    <section className="page404">
      <Container>
        <Row>
          <Col>
            <div className="page404__error">{error?.status}</div>
            <div className="page404__subtitle">{error?.text}</div>
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
