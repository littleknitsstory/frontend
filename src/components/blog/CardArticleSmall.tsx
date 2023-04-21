import { IArticle } from "../../app/types";
import { PICTURE_BASE_URL } from "../features/api/apiSlice";
import parse from "html-react-parser";
import avatar from "../../assets/images/test-avatar.png";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes";

const CardArticleSmall = ({ ...article }: IArticle) => {
  return (
    <div className="card-article-small">
      <Link to={ROUTES.ARTICLES + "/" + article?.slug}>
        <img
          src={PICTURE_BASE_URL + article.image_preview}
          alt=""
          className="card-article-small__image"
        />
        <div className="card-article-small__body">
          <h2 className="text text--md text--bold">{article.title}</h2>
          <div className="card-article-small__content">{parse(article.content)}</div>
          <small>3 минуты на чтение</small>
          <div className="divider"></div>
          <div className="card-article-small__description">
            <img src={avatar} alt="avatar" className="avatar" />
            <p className="card-article-small__text">{article?.author}</p>
            <p className="card-article-small__text">·</p>
            <p className="card-article-small__text card-article-small__text--grey">
              {article?.created_at}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default CardArticleSmall;
