import React, { useState, useEffect, useContext } from "react"
import { Container, Row, Col } from "react-bootstrap";
import { Language } from "../App";
import fetcher from "../utils/fetcher";
import CardArticle from "./CardArticle";

const Articles = () => {
  const [articles, setArticles] = useState([])
  const language = useContext(Language)

  useEffect(() => {
    const endPoint = "/api/v1/posts/"
    fetcher(endPoint, language).then(data => setArticles(data.results))
  },[language])

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
