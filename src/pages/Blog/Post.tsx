import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Store } from "react-notifications-component";
import parse from "html-react-parser";
import {
  PICTURE_BASE_URL,
  useAddCommentsMutation,
  useGetFeaturesQuery,
} from "../../components/features/api/apiSlice";
import { useGetArticleQuery, useGetArticlesQuery } from "../../components/features/api/apiSlice";
import PageError from "../PageError";
import Spinner from "../../components/utils/Spinner";
import avatar from "../../assets/images/test-avatar.png";
import CardArticleSmall from "../../components/blog/CardArticleSmall";
import { notificationError, notificationSuccess } from "../../components/modal/Notification";
import { ReactComponent as ArrowLeftSVG } from "../../assets/icons/arrow-left-nd.svg";
import { ReactComponent as VKIcon } from "../../assets/icons/social/vkontakte.svg";
import { ReactComponent as FacebookIcon } from "../../assets/icons/social/facebook.svg";
import { ReactComponent as InstagramIcon } from "../../assets/icons/social/instagram.svg";
import { ReactComponent as PinterestIcon } from "../../assets/icons/social/pinterest.svg";
import { ReactComponent as ChainIcon } from "../../assets/icons/chain.svg";
import { ReactComponent as HandIcon } from "../../assets/icons/reactions/hand.svg";
import { ReactComponent as HeartIcon } from "../../assets/icons/reactions/heart.svg";
import { ReactComponent as SpeechBubbleIcon } from "../../assets/icons/reactions/speech-bubble.svg";
import { ReactComponent as ShareIconGrey } from "../../assets/icons/reactions/share.svg";
import { ReactComponent as ArrowRightSVG } from "../../assets/icons/arrow-right-nd.svg";
import { ReactComponent as ShareIcon } from "../../assets/icons/share.svg";
import { ROUTES } from "../../app/routes";
import Bookmark from "../../components/blog/Bookmark";

const Post = () => {
  const { data: feature } = useGetFeaturesQuery();
  const { slug } = useParams<string>();
  const { t, i18n } = useTranslation();
  const [offset, setOffset] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const {
    data: article,
    isLoading,
    isError,
    error,
  } = useGetArticleQuery({ slug, lang: i18n.language });

  console.log(article);

  const { data: articles } = useGetArticlesQuery({ limit: 10, offset, lang: i18n.language });
  const navigate = useNavigate();

  const [postComment] = useAddCommentsMutation();

  const sliderForward = () => {
    if (articles) {
      if (offset === articles.count - 3) {
        setOffset(0);
      } else {
        setOffset((prevOffset) => prevOffset + 1);
      }
    }
  };

  const sliderBackward = () => {
    if (articles) {
      if (offset === 0) {
        setOffset(articles.count - 3);
      } else {
        setOffset((prevOffset) => prevOffset - 1);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      await postComment(message).unwrap();
      setMessage("");
      Store.addNotification({
        ...notificationSuccess,
        title: t("posts.successSend"),
      });
    } catch (error) {
      Store.addNotification({
        ...notificationError,
        title: t("posts.noAuthorize"),
      });
    }
  };

  const styles = {
    backgroundImage: `url(${PICTURE_BASE_URL + article?.image_preview})`,
    backgroundColor: "rgba(0,0,0,0.4)",
    width: "100%",
    height: "560px",
    backgroundBlendMode: "darken",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  console.log(article);

  /* Randomize "Time to read" until we have calculated time */
  function randomReadTime() {
    return Math.floor(Math.random() * 15) + 1;
  }

  const copyToClipboard = (): void => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    if ("originalStatus" in error) {
      return <PageError errorStatus={error.originalStatus} />;
    }
  }
  if (!feature?.blog) {
    return <PageError errorStatus={404} />;
  }

  return (
    <>
      {feature?.blog && (
        <section className="post container-lg p-0">
          {/* TODO Change to Link */}
          <p
            onClick={() => navigate(-1)}
            className="link link--with-icon m-0 mt-5 ms-2 text text--md text--bold"
          >
            <ArrowLeftSVG /> {t("posts.back")}
          </p>

          <div className="post__header d-flex flex-column p-3 p-md-5 mt-4" style={styles}>
            <div className="d-flex align-items-center gap-2">
              <h2 className="post__title me-auto text text--md text--bold text--white my-0">
                {article?.title}
              </h2>
              {article && <Bookmark slugPost={article?.slug} />}
              <ShareIcon />
            </div>
            <div className="d-flex align-items-center gap-3 mt-2">
              <img src={avatar} alt="avatar" className="rounded-circle" width="50" />
              <p className="text text--white m-0">{article?.author}</p>
            </div>

            <div className="d-flex gap-3 mt-3">
              <p className="text--white">{article?.created_at} </p>
              <p className="text--white">&bull;</p>
              <p className="text--white">
                {randomReadTime()} {t("posts.tempRead")}
              </p>
            </div>

            <div className="d-flex gap-4 mt-auto">
              {article?.tags.map((tag) => (
                <p className="text--white">#{tag.title}</p>
              ))}
            </div>
          </div>

          <div className="container-lg mt-4">{article && parse(article.content)}</div>

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
                <HandIcon />
                <p className="m-0 ">50</p>
              </div>
              <div className="d-flex flex-column align-items-center">
                <HeartIcon />
                <p className="m-0">23</p>
              </div>
              <div className="d-flex flex-column align-items-center">
                <SpeechBubbleIcon />
                <p className="m-0">32</p>
              </div>
              <ShareIconGrey />
            </div>
          </div>
          {feature?.comments && (
            <form className="post__comments d-flex flex-column container-lg mt-4 col-md-8 col-lg-6 mx-0">
              <h4 className="text text--md text--bold">{t("posts.comments")}</h4>
              <textarea
                name="postContent"
                rows={5}
                value={message}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChange(e)}
                placeholder={t("posts.placeholderComments")}
                className="w-100 rounded-4 p-3"
              />
              <button
                className="btn btn--primary mt-2 align-self-end"
                disabled={message.length === 0}
                onClick={(e: React.FormEvent) => handleSubmit(e)}
              >
                {t("posts.send")}
              </button>
              <div className="post__comments--buttons">
                <div className="post__comments--wrapper"></div>
              </div>
            </form>
          )}

          <div className="container-md text-center">
            <h4 className="text text--md text--bold text-center mt-5 mb-3">
              {t("posts.readAlso")}
            </h4>

            <div className="d-flex overflow-scroll gap-5">
              {articles &&
                articles.results.map((article) => (
                  <CardArticleSmall key={article.slug} {...article} />
                ))}
            </div>
            <Link to={ROUTES.ARTICLES} className="link link--with-icon mt-3">
              {t("posts.watchAll")} <ArrowRightSVG />
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

export default Post;
