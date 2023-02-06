import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import articleImg from "../images/article-img.png";
import Articles from "./Articles";
import arrowRight from "../icons/arrow-right.svg";
import { Link, useParams } from "react-router-dom";
import { Language } from "../App";
import fetcher from "../utils/fetcher";

const Article = () => {
  const { id } = useParams()
  const [article, setArticle] = useState([])
  const language = useContext(Language)

  useEffect(() => {
    const endPoint = `/api/v1/posts/${id}`
    fetcher(endPoint, language).then(data => setArticle(data))
    
  }, [language, id])
  
  return (
    <section className="article">
      <Container>
        <h3 className="title">
          {article.title}
        </h3>
        <div className="article__wrapper-article">
          <Row>
            <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
              <div className="article__text">
                {article.content}
              </div>
            </Col>
            <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
              <img src={"http://dev.backend.littleknitsstory.com" + article.image_preview} alt="" className="article__img" />
            </Col>
          </Row>
        </div>
        <div className="article__wrapper-text">
          <Row>
            <Col xs={12} md={9} lg={9} xl={9} xxl={9}>
              <div className="title">
                
              </div>
              <div className="article__text">
                
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="article__wrapper-author">
                <div className="article__created-at">
                  {article.created_at}
                </div>

                <div className="article__author">Автор: {article.author}</div>
              </div>
            </Col>
          </Row>
        </div>
        <h3 className="title">Другие блоги</h3>
        <Articles limit={6}/>
        <div className="btn__link btn__link_end">
          <Row>
            <Col>
              <Link
                to="/blog"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                Смотреть все <img src={arrowRight} alt="arrowRight" />
              </Link>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Article;
