import React, { useCallback, useEffect, useState } from "react";
import sanitizeHtml from "sanitize-html";
import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { getArticles } from "../api";
import { IArticle } from "../api/models";
import arrowWhite from "../icons/arrow-right-white.svg";
import kateSlider from "../images/kate-slider.png";

const MainSlider = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [limit, setLimit] = useState<number>(0);

  useEffect(() => {
    const fetchArticles = async (): Promise<void> => {
      const data = await getArticles(0, limit);
      if (data) {
        setArticles(data.results);
      }
    };
    fetchArticles();
  }, [limit]);

  return (
    <section className="main-slider">
      <Container>
        <Carousel fade={true}>
          {articles
            .map((item) => {
              return (
                <Carousel.Item interval={1800} key={item.slug}>
                  <Row>
                    <Col xs={12} md={12} lg={4} xl={4} xxl={4}>
                      <div className="main-slider__wrapper-img">
                        <img
                          className="main-slider__img"
                          src={kateSlider}
                          alt="First slide"
                        />
                      </div>
                    </Col>
                    <Col xs={12} md={12} lg={8} xl={8} xxl={8}>
                      <div className="main-slider__wrapper">
                        <div className="title main-slider__title">
                          {item.title}
                        </div>
                        <div className="main-slider__text">
                          {sanitizeHtml(item.content, {
                            allowedTags: ["p"],
                          }).slice(14, -1)}
                        </div>
                        <div className="main-slider__author">
                          Автор: Катя Анаприенко
                        </div>
                        <div className="main-slider__created_at">
                          {item.created_at}
                        </div>
                        <div className="col-12">
                          <div className="main-slider__btn">
                            <Link to={`/posts/${item.slug}`}>
                              <button className="btn btn_vinous">
                                <div className="btn__text">Читать</div>
                                <div className="btn__icon">
                                  <img src={arrowWhite} alt="arrowWhite" />
                                </div>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Carousel.Item>
              );
            })
            .slice(0, 3)}
        </Carousel>
      </Container>
    </section>
  );
};

export default MainSlider;
