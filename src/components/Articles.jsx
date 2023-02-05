import React, { useState, useEffect, useContext } from "react"
import { Container, Row, Col } from "react-bootstrap";
import { Language } from "../App";
import CardArticle from "./CardArticle";

const Articles = () => {
  const [articles, setArticles] = useState([])
  const languageContext = useContext(Language)

  useEffect(() => {
    (async () => {
      const res = await fetch("http://dev.backend.littleknitsstory.com:26363/api/v1/posts/", {
        headers: {
          "Accept-Language": languageContext
        }
      })
      const data = await res.json()

      setArticles(data.results)
    })()
  },[languageContext])

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
