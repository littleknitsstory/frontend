import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import parse from 'html-react-parser'
import { PICTURE_BASE_URL } from "../features/api/apiSlice";
import { IArticle } from "../../app/types";
import { ReactComponent as BookmarkIcon} from "../../assets/icons/bookmark.svg"
import avatar from "../../assets/images/test-avatar.png"

const CardArticle = ({ article }: { article: IArticle }) => {
  const { t } = useTranslation();

  return (
    <>
      <Link to={`/posts/${article.slug}`}>
        <div className="card-article">
          <div className="card-article__header">
            <img src={avatar} alt="" className="card-article__avatar" />
            <p className="card-article__text">{article.author}</p>
            <p className="card-article__text">{article.created_at}</p>
          </div>

          <div className="card-article__title-wrapper">
            <h2 className="card-article__title">{article.title}</h2>
            <BookmarkIcon />
          </div>

          <div className="card-article__content-wrapper">
            <div className="card-article__content">
              {parse(article.content)}
              <p className="card-article__text--small">3 минуты на чтение (HC)</p>
            </div>

            <img src={PICTURE_BASE_URL + article.image_preview} alt={article.image_alt} className="card-article__image"/>
          </div>
        </div>
      </Link>
      <div className="card-article__divider"></div>
    </>
  );
};

export default CardArticle;
