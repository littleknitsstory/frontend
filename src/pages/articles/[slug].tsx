import { getArticleDetails, getArticles, getFeaturesFlags } from "@/services/api/apiClient";
import { IArticle, IArticlesResponse, IFeaturesFlags } from "@/services/types";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { PICTURE_BASE_URL } from "@/services/features/api/apiSlice";
import Image from "next/image";
// import avatar from "/testAvatar.png";
import parse from "html-react-parser";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Bookmark from "@/components/SVG/BookmarkSVG";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface Props {
  articleDetails: IArticle;
  features: IFeaturesFlags;
}

const ArticleDetails = ({ articleDetails, features }: Props) => {
  const router = useRouter();
  const { t } = useTranslation();

  const styles = {
    backgroundImage: `url(${PICTURE_BASE_URL + articleDetails?.image_preview})`,
    backgroundColor: "rgba(0,0,0,0.4)",
    width: "100%",
    height: "560px",
    backgroundBlendMode: "darken",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  return (
    <>
      {features?.blog && (
        <section className="post container-lg p-0">
          <button
            onClick={() => router.back()}
            className="btn link link--with-icon m-0 mt-5 ms-2 text text--md text--bold"
          >
            {/* <ArrowLeftSVG /> {t("posts.back")} */}
          </button>

          <div className="post__header d-flex flex-column p-3 p-md-5 mt-4" style={styles}>
            <div className="d-flex align-items-center gap-2">
              <h2 className="post__title me-auto text text--md text--bold text--white my-0">
                {articleDetails?.title}
              </h2>
              {/* {articleDetails && <Bookmark slugPost={articleDetails?.slug} />} */}
              {/* <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={popoverShare}
                rootClose={true}
              >
                <ShareIcon />
              </OverlayTrigger> */}
            </div>
            <div className="d-flex align-items-center gap-3 mt-2">
              <Image
                src="/testAvatar.png"
                alt="avatar"
                className="rounded-circle"
                width={50}
                height={50}
              />
              <p className="text text--white m-0">{articleDetails?.author}</p>
            </div>

            <div className="d-flex gap-3 mt-3">
              <p className="text--white">{articleDetails?.created_at} </p>
              <p className="text--white">&bull;</p>
              <p className="text--white">{/* {randomReadTime()} {t("posts.tempRead")} */}</p>
            </div>

            <div className="d-flex gap-4 mt-auto">
              {articleDetails?.tags.map((tag) => (
                <p key={tag.slug} className="text--white">
                  #{tag.title}
                </p>
              ))}
            </div>
          </div>

          <div className="container-lg mt-4">{articleDetails && parse(articleDetails.content)}</div>

          <div className="post__footer container-lg">
            {/* <h4 className="post__footer-text">{t("posts.share")}</h4> */}
            {/* <div className="post__footer--wrapper">
          <div className="post__share-links">
            <VKIcon />
            <FacebookIcon />
            <InstagramIcon />
            <PinterestIcon />
            <ChainIcon onClick={copyToClipboard} />
          </div>
        </div> */}
            <div className=" post__reactions d-flex gap-5 mt-3 ">
              <div className="d-flex flex-column align-items-center">
                {/* <HandIcon /> */}
                <p className="m-0 ">50</p>
              </div>
              <div className="d-flex flex-column align-items-center">
                {/* <HeartIcon /> */}
                <p className="m-0">23</p>
              </div>
              <div className="d-flex flex-column align-items-center">
                {/* <SpeechBubbleIcon /> */}
                <p className="m-0">32</p>
              </div>
              {/* <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={popoverShare}
                rootClose={true}
              >
                <ShareIconGrey />
              </OverlayTrigger> */}
            </div>
          </div>

          {/* <div className="container-md text-center">
            <h4 className="text text--md text--bold text-center mt-5 mb-3">
              {t("posts.readAlso")}
            </h4>

            <div className="d-flex overflow-scroll gap-5">
              {articleDetails &&
                articles.results.map((article) => (
                  <CardArticleSmall key={article.slug} {...article} />
                ))}
            </div>
            <Link to={ROUTES.ARTICLES} className="link link--with-icon mt-3">
              {t("posts.watchAll")} <ArrowRightSVG />
            </Link>
          </div> */}
        </section>
      )}
    </>
  );
};
export default ArticleDetails;

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const currentLanguage = context.locale ?? "en";

  const articleDetails = await getArticleDetails(slug, currentLanguage);
  const features = await getFeaturesFlags();

  if (!articleDetails.title) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      articleDetails,
      features,
      ...(await serverSideTranslations(currentLanguage, ["header", "footer"])),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const lastArticles = await getArticles("en");

  const paths = lastArticles.map((article) => {
    return {
      params: {
        slug: article.slug,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};
