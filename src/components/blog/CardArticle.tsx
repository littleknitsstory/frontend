import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";
import { PICTURE_BASE_URL, useGetArticleQuery } from "../features/api/apiSlice";
import { addToSavedPost, removeSavedPost } from "../../components/features/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IArticle } from "../../app/types";
import Spinner from "../utils/Spinner";
import PageError from "../../pages/PageError";
import { ReactComponent as BookmarkIcon } from "../../assets/icons/bookmark.svg";
import avatar from "../../assets/images/test-avatar.png";
import Bookmark from "./Bookmark";

const CardArticle = ({ article }: { article: IArticle }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useGetArticleQuery({ slug: article.slug, lang: i18n.language });

  const [isAddedPost, setIsAddedPost] = useState<Boolean>(false);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    if ("originalStatus" in error) {
      return <PageError errorStatus={error.originalStatus} />;
    }
  }

  return (
    <>
      {post && (
        <>
          <div className="card-article">
            <div className="card-article__header">
              <img src={avatar} alt="" className="card-article__avatar" />
              <p className="card-article__text">{post.author}</p>
              <p className="card-article__text">{post.created_at}</p>
            </div>

            <div className="card-article__title-wrapper">
              <h2 className="card-article__title">{post.title}</h2>
              <Bookmark slugPost={post.slug} />
            </div>
            {/* TODO: magic articles */}
            <Link to={`/articles/${post?.slug}`}>
              <div className="card-article__content-wrapper">
                <div className="card-article__content">
                  {post && parse(post.content)}
                  <p className="card-article__text--small">3 минуты на чтение (HC)</p>
                </div>

                <img
                  src={PICTURE_BASE_URL + post.image_preview}
                  alt={post?.image_alt}
                  className="card-article__image"
                />
              </div>
            </Link>
          </div>
          <div className="card-article__divider"></div>
        </>
      )}
    </>
  );
};

export default CardArticle;
