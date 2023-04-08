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
import { ReactComponent as ArrowRightSVG } from "../../assets/icons/arrow-right-nd.svg";
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

  const { data: articles } = useGetArticlesQuery({ limit: 3, offset, lang: i18n.language });
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

  const handleSubmit = async (): Promise<void> => {
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
        <section className="post">
          <p onClick={() => navigate(-1)} className="link link--with-icon">
            <ArrowLeftSVG /> {t("posts.back")}
          </p>

          <article className="post__wrapper">
            <h2 className="post__title">
              {article?.title} {article && <Bookmark slugPost={article?.slug} />}
            </h2>

            <div className="post__about">
              <img src={avatar} alt="avatar" className="post__avatar" />
              <p>{article?.author}</p>
              <p>·</p>
              <p>{article?.created_at}</p>
              <p>·</p>
              <p>{t("posts.tempRead")}</p>
            </div>
            <div className="post__content-wrapper">
              {article && parse(article.content)}
              <img
                src={PICTURE_BASE_URL + article?.image_preview}
                alt={article?.image_alt}
                className="post__image"
              />
            </div>
            <div className="post__footer">
              <h4 className="post__footer-text">{t("posts.share")}</h4>
              <div className="post__footer--wrapper">
                <div className="post__share-links">
                  <VKIcon />
                  <FacebookIcon />
                  <InstagramIcon />
                  <PinterestIcon />
                  <ChainIcon onClick={copyToClipboard} />
                </div>
                <div className="post__reactions">
                  <HandIcon />
                  <p>50</p>
                  <HeartIcon />
                  <p>23</p>
                  <SpeechBubbleIcon />
                  <p>32</p>
                </div>
              </div>
            </div>
            <div className="post__divider"></div>
          </article>
          {feature?.comments && (
            <section className="post__comments">
              <h4>{t("posts.comments")}</h4>
              <div className="post__comments--wrapper">
                <textarea
                  name="postContent"
                  rows={5}
                  value={message}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChange(e)}
                  placeholder={t("posts.placeholderComments")}
                />
                <div className="post__comments--buttons">
                  <button
                    className="btn btn--primary"
                    disabled={message.length === 0}
                    onClick={handleSubmit}
                  >
                    {t("posts.send")}
                  </button>
                </div>
              </div>
            </section>
          )}

          <section className="post__more-posts">
            <h4 className="post__subtitle">{t("posts.readAlso")}</h4>
            <div className="post__slider">
              <ArrowLeftSVG className="posts__btn--arrow" onClick={sliderBackward} />
              <div className="post__card-container">
                {articles &&
                  articles.results.map((article) => (
                    <CardArticleSmall key={article.slug} {...article} />
                  ))}
              </div>
              <ArrowRightSVG className="posts__btn--arrow" onClick={sliderForward} />
            </div>
            <Link to={ROUTES.ARTICLES} className="link link--with-icon link--centered">
              {t("posts.watchAll")} <ArrowRightSVG />
            </Link>
          </section>
        </section>
      )}
    </>
  );
};

export default Post;
