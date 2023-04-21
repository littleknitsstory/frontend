import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";
import { PICTURE_BASE_URL, useGetArticleQuery } from "../features/api/apiSlice";
import { ROUTES } from "../../app/routes";
import Spinner from "../utils/Spinner";
import PageError from "../../pages/PageError";
import Bookmark from "./Bookmark";
import avatar from "../../assets/images/test-avatar.png";
import { useAppDispatch } from "../../app/hooks";
import { removeSavedPost } from "../features/posts/postsSlice";

const CardArticle = ({ slug }: { slug: string }) => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useGetArticleQuery({ slug, lang: i18n.language });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    dispatch(removeSavedPost(slug));
    if ("originalStatus" in error) {
      return <PageError errorStatus={error.originalStatus} />;
    }
  }

  return (
    <>
      {post && (
        <>
          <div className="card-article p-2 d-md-flex gap-3 flex-row-reverse align-items-center">
            <Link to={ROUTES.ARTICLES + "/" + slug} className=" my-3">
              <img
                src={PICTURE_BASE_URL + post.image_preview}
                alt={post.image_alt}
                className="card-article__image rounded-4"
              />
            </Link>
            <div className="">
              <Link
                to={ROUTES.ARTICLES + "/" + slug}
                className="d-flex align-items-center gap-3 mt-3"
              >
                <img src={avatar} alt="" className="rounded-circle" width="50px" />
                <p className="card-article__text m-0">{post.author}</p>
                <p className="card-article__text m-0">{post.created_at}</p>
              </Link>
              <div className="d-flex justify-content-between align-items-center">
                <Link to={ROUTES.ARTICLES + "/" + slug}>
                  <h2 className="card-article__title text text--md text--bold my-2">
                    {post.title}
                  </h2>
                </Link>
                <Bookmark slugPost={post.slug} />
              </div>
              <Link to={ROUTES.ARTICLES + "/" + slug}>
                {post && parse(post.content)}
                <small>3 минуты на чтение (HC)</small>
              </Link>
            </div>
          </div>
          <div className="card-article__divider my-4"></div>
        </>
      )}
    </>
  );
};

export default CardArticle;
