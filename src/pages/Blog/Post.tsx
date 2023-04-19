import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Store } from "react-notifications-component";
import parse from "html-react-parser";
import {
  PICTURE_BASE_URL,
  useAddCommentMutation,
  useGetCommentsQuery,
  useGetFeaturesQuery,
} from "../../components/features/api/apiSlice";
import { useGetArticleQuery, useGetArticlesQuery } from "../../components/features/api/apiSlice";
import PageError from "../PageError";
import Spinner from "../../components/utils/Spinner";
import avatar from "../../assets/images/test-avatar.png";
import CardArticleSmall from "../../components/blog/CardArticleSmall";
import { notificationError, notificationSuccess } from "../../components/modal/Notification";
import { ReactComponent as ArrowLeftSVG } from "../../assets/icons/arrow-left-nd.svg";
import { ReactComponent as TelegramIcon } from "../../assets/icons/social/telegram.svg";
import { ReactComponent as FacebookIcon } from "../../assets/icons/social/facebook.svg";
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
import Comment from "../../components/blog/Comment";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

export const COMMENTS_PER_PAGE = 5;

const Post = () => {
  const { data: feature } = useGetFeaturesQuery();
  const { slug } = useParams<string>();
  const { t, i18n } = useTranslation();
  const [offset, setOffset] = useState<number>(0);
  const [offsetCommentsRequest, setOffsetCommentsRequest] = useState<number>(0);
  const [offsetCommentsPage, setOffsetCommentsPage] = useState<number>(0);
  const [currentCommentsPage, setCurrentCommentsPage] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const {
    data: article,
    isLoading,
    isError,
    error,
  } = useGetArticleQuery({ slug, lang: i18n.language });

  const { data: articles } = useGetArticlesQuery({ limit: 10, offset, lang: i18n.language });
  const navigate = useNavigate();

  const {
    data: comments,
    isFetching: commentsIsFetching,
    isError: commentsIsError,
  } = useGetCommentsQuery({ offset: offsetCommentsRequest });
  const [postComment] = useAddCommentMutation();

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

  /* Randomize "Time to read" until we have calculated time */
  function randomReadTime() {
    return Math.floor(Math.random() * 15) + 1;
  }

  const copyToClipboard = (): void => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);

    Store.addNotification({
      ...notificationSuccess,
      title: "Copied to clipboard",
    });
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

  function goToCommentsPage(e: React.MouseEvent<HTMLElement>) {
    const pageNumber = e.currentTarget.dataset.page;

    if (pageNumber) {
      setOffsetCommentsRequest(+pageNumber * COMMENTS_PER_PAGE);
      setCurrentCommentsPage(+pageNumber);
    }
  }

  function slideCommentsPage(direction: string): void {
    const pagesAmount = comments?.count! / COMMENTS_PER_PAGE;
    const lastPage = pagesAmount <= offsetCommentsPage + 5;

    if (direction === "next" && !lastPage) {
      setOffsetCommentsPage((prev) => prev + 1);
    } else if (direction === "prev" && offsetCommentsPage > 0) {
      setOffsetCommentsPage((prev) => prev - 1);
    }
  }

  const popoverShare = (
    <Popover className="post__popover-share">
      <Popover.Body>
        <div className="text text--18 text--bold d-flex flex-column gap-3">
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
            className="d-flex align-items-center gap-2 p-1 post__share-btn"
          >
            <FacebookIcon />
            <p className="m-0">Facebook</p>
          </a>
          <a
            href={`https://t.me/share/url?url=${window.location.href}`}
            target="_blank"
            rel="noreferrer"
            className="d-flex align-items-center gap-2 post__share-btn p-1"
          >
            <TelegramIcon />
            <p className="m-0">Telegram</p>
          </a>
          <div className="d-flex align-items-center gap-2 post__share-btn p-1">
            <PinterestIcon />
            <p className="m-0">Pinterest</p>
          </div>
          <div
            className="d-flex align-items-center gap-2 post__share-btn p-1"
            onClick={copyToClipboard}
          >
            <ChainIcon />
            <p className="m-0">Копировать ссылку</p>
          </div>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      {feature?.blog && (
        <section className="post container-lg p-0">
          <button
            onClick={() => navigate(-1)}
            className="btn link link--with-icon m-0 mt-5 ms-2 text text--md text--bold"
          >
            <ArrowLeftSVG /> {t("posts.back")}
          </button>

          <div className="post__header d-flex flex-column p-3 p-md-5 mt-4" style={styles}>
            <div className="d-flex align-items-center gap-2">
              <h2 className="post__title me-auto text text--md text--bold text--white my-0">
                {article?.title}
              </h2>
              {article && <Bookmark slugPost={article?.slug} />}
              <OverlayTrigger trigger="click" placement="bottom" overlay={popoverShare}>
                <ShareIcon />
              </OverlayTrigger>
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
                <p key={tag.slug} className="text--white">
                  #{tag.title}
                </p>
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
              <OverlayTrigger trigger="click" placement="bottom" overlay={popoverShare}>
                <ShareIconGrey />
              </OverlayTrigger>
            </div>
          </div>
          {feature?.comments && (
            <div className="container-lg">
              <form className="post__comments d-flex flex-column mt-5 col-md-8 col-lg-6 mx-0">
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
                  className="btn btn--primary mt-3 d-sm-block align-self-sm-end"
                  disabled={message.length === 0}
                  onClick={(e: React.FormEvent) => handleSubmit(e)}
                >
                  {t("posts.send")}
                </button>
              </form>
              <div className="mt-5 col-md-8 col-lg-6 mx-0">
                {commentsIsFetching && <Spinner />}
                {comments?.results.map((comment) => (
                  <Comment key={comment.id} {...comment} />
                ))}
                <div className="d-flex gap-1 justify-content-evenly align-items-center text text--md mx-auto">
                  <button
                    className="btn btn--transparent post__comments-page-btn--slider"
                    onClick={() => slideCommentsPage("prev")}
                  >
                    <ArrowLeftSVG />
                  </button>
                  {comments &&
                    /* Creating an array of pages number */
                    [...Array(Math.ceil(comments?.count / COMMENTS_PER_PAGE)).keys()]
                      .slice(offsetCommentsPage, offsetCommentsPage + 5)
                      .map((number: number) => (
                        <button
                          key={number}
                          data-page={number}
                          onClick={goToCommentsPage}
                          className={`btn btn--transparent post__comments-page-btn ${
                            currentCommentsPage === number ? "post__comments-page-btn--active" : ""
                          }`}
                        >
                          {number + 1}
                        </button>
                      ))}
                  <button
                    className="btn btn--transparent post__comments-page-btn--slider"
                    onClick={() => slideCommentsPage("next")}
                  >
                    <ArrowRightSVG />
                  </button>
                </div>
              </div>
              <div className="post__comments--buttons"></div>
            </div>
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
