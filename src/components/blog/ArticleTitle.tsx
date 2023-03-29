import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { IArticle } from "../../app/types";
import { useGetArticleQuery } from "../features/api/apiSlice";
import avatar from "../../assets/images/test-avatar.png";
import Spinner from "../utils/Spinner";
import PageError from "../../pages/PageError";

const ArticleTitle = ({ post }: { post: IArticle }) => {
  const { i18n } = useTranslation();
  const { data, isLoading, isError, error } = useGetArticleQuery({
    slug: post.slug,
    lang: i18n.language,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    if ("originalStatus" in error) {
      return <PageError errorStatus={error.originalStatus} />;
    }
  }
{/* TODO: magic str articles */}
  return (
    <Link to={`/articles/${data?.slug}`} className="posts__saved-post" key={data?.slug}>
      <div className="posts__aside--header">
        <img src={avatar} alt={post.image_alt} className="posts__aside--avatar" />
        <p className="posts__aside--author">{data?.author}</p>
      </div>
      <p className="posts__aside--title">{data?.title}</p>
    </Link>
  );
};
export default ArticleTitle;
