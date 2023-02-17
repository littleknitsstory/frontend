import { Container, Row, Col } from "react-bootstrap";
import CardArticle from "./CardArticle";

const Articles = () => {
  const array: {id: number}[] = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];
  return (
    <Container>
      <div className="articles">
        <Row xs={1} md={2} lg={3} xl={3} xxl={4}>
          {array.map((item) => {
            return (
              <Col key={item.id}>
                <CardArticle />
              </Col>
            );
          })}
        </Row>
      </div>
    </Container>
  );
};

export default Articles;
