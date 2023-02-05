import React, { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap";
import CardArticle from "./CardArticle";

const Articles = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    (async () => {
      const res = await fetch("http://dev.backend.littleknitsstory.com:26363/api/v1/posts/")
      const data = await res.json()

      setArticles(data.results)
    })()
  },[])

  return (
    <Container>
      <div className="articles">
        <Row xs={1} md={2} lg={3} xl={3} xxl={4}>
        {/* Нет id у постов, поэтому использовал index */}
          {articles.map((article, i) => {
            return (
              <Col key={i}>
                <CardArticle { ...article }/>
              </Col>
            );
          })}
        </Row>
      </div>
    </Container>
  );
};

export default Articles;
