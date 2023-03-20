import sanitizeHtml from "sanitize-html";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { PICTURE_BASE_URL } from "../features/api/apiSlice";
import { IArticle } from "../../app/types";

const CardArticle = ({ article }: { article: IArticle }) => {
  const { t } = useTranslation();
  return (
    <div className="card-lks">
      <Link to={`/posts/${article.slug}`}>
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={PICTURE_BASE_URL + article.image_preview}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          />

          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <div className="card-lks__text">
              {sanitizeHtml(article.content, {
                allowedTags: ["p"],
              }).slice(14, -1)}
            </div>
            <div className="card-lks__footer">
              <div className="card-lks__author">
                {t("AboutMe.author")}:
                <br /> Катя Анаприенко
              </div>
              <div className="card-lks__created_at">
                {article.created_at.slice(8, 10)}:{article.created_at.slice(11, 13)}
                <br /> {article.created_at.slice(0, 8)}
              </div>
              <button
                className="btn btn--primary card-lks__btn"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                {t("read")}
              </button>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default CardArticle;
