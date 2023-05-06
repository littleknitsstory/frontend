import Link from "next/link";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";
import { PICTURE_BASE_URL } from "@/services/features/api/apiSlice";
import { ROUTES } from "@/services/routes";
// import Spinner from "../utils/Spinner";
// import PageError from "../../pages/PageError";
// import Bookmark from "./Bookmark";
// import avatar from "../../assets/images/test-avatar.png";
import { useAppDispatch } from "@/services/hooks";
import { removeSavedPost } from "@/services/redux/posts/postsSlice";
import { IArticle } from "@/services/types";
import Image from "next/image";
import Bookmark from "./Bookmark";

const CardArticle = ({ article }: { article: IArticle }) => {
  const dispatch = useAppDispatch();

  // const {
  //   data: post,
  //   isLoading,
  //   isError,
  //   error,
  // } = useGetArticleQuery({ slug, lang: i18n.language });

  // if (isLoading) {
  //   return <Spinner />;
  // }

  // if (isError) {
  //   dispatch(removeSavedPost(slug));
  //   if ("originalStatus" in error) {
  //     return <PageError errorStatus={error.originalStatus} />;
  //   }
  // }

  return (
    <>
      {/* {article && ( */}
      <div className="card-article d-md-flex px-3 py-1 gap-3 flex-row-reverse align-items-center">
        <Link href={ROUTES.ARTICLES + "/" + article.slug} className=" my-3">
          <Image
            src={PICTURE_BASE_URL + article.image_preview ?? ""}
            alt={article.image_alt}
            className="card-article__image rounded-4"
            width={200}
            height={200}
          />
        </Link>
        <div className="">
          <Link
            href={ROUTES.ARTICLES + "/" + article.slug}
            className="d-flex align-items-center gap-3 mt-3"
          >
            <Image src="/testAvatar.png" alt="" className="rounded-circle" width={50} height={50} />
            <p className="card-article__text m-0">{article.author}</p>
            <p className="card-article__text m-0">{article.created_at}</p>
          </Link>
          <div className="d-flex justify-content-between align-items-center">
            <Link href={ROUTES.ARTICLES + "/" + article.slug}>
              <h2 className="card-article__title text text--md text--bold my-2">{article.title}</h2>
            </Link>
            <Bookmark slugPost={article.slug} />
          </div>
          <Link href={ROUTES.ARTICLES + "/" + article.slug}>
            <div className="mb-2">{article.content}</div>
            <small>3 минуты на чтение (HC)</small>
          </Link>
        </div>
      </div>
      <div className="card-article__divider my-4"></div>
      {/* )} */}
    </>
  );
};

export default CardArticle;
