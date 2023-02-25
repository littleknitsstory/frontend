import sanitizeHtml from "sanitize-html";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { IArticle } from "../app/models";
import { useTranslation } from "react-i18next";
import { PICTURE_BASE_URL } from "../features/api/apiSlice";

const CardArticle = ({ article }: { article: IArticle }) => {
  const { t } = useTranslation();
  return (
    <div className="card-lks">
      <Link to={`/posts/${article.slug}`}>
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={`${PICTURE_BASE_URL + article.image_preview}`}
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
                {article.created_at.slice(8, 10)}:
                {article.created_at.slice(11, 13)}
                <br /> {article.created_at.slice(0, 8)}
              </div>
              <div className="card-lks__btn">
                <button
                  className="btn btn_vinous btn_center"
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                >
                  <div className="btn__text btn__text_center">{t("read")}</div>
                </button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default CardArticle;
