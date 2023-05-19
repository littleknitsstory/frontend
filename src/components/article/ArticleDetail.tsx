"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Locale } from "@/i18n-config";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { ToastContainer, toast } from "react-toastify";
import { IArticle, IFeaturesFlags } from "@/styles/types";
import { PICTURE_BASE_URL } from "@/services/constants";

import telegram from "@/assets/icons/social/telegram.svg";
import facebook from "@/assets/icons/social/facebook.svg";
import pinterest from "@/assets/icons/social/pinterest.svg";
import chain from "@/assets/icons/chain.svg";
import shareIcon from "@/assets/icons/share.svg";
import tempAvatar from "@/assets/temp-avatar.png";
import arrowLeftSVG from "@/assets/icons/arrow-left-nd.svg";
import arrowRightSVG from "@/assets/icons/arrow-right-nd.svg";
import handIcon from "@/assets/icons/reactions/hand.svg";
import heartIcon from "@/assets/icons/reactions/heart.svg";
import speechBubbleIcon from "@/assets/icons/reactions/speech-bubble.svg";
import shareIconGrey from "@/assets/icons/reactions/share.svg";
import Bookmark from "../bookmark/Bookmark";
import { dateFromLang, getDisplayedName } from "../articles/CardArticle";

interface Props {
  article: IArticle;
  features: IFeaturesFlags;
  lang: Locale;
  dictionary: IDictionary;
}

interface IDictionary {
  back: string;
  article: {
    tempRead: string;
    copyLink: string;
    CopiedToClipboard: string;
  };
}

const ArticleDetail = ({ article, features, dictionary, lang }: Props) => {
  const router = useRouter();

  function randomReadTime() {
    return Math.floor(Math.random() * 15) + 1;
  }
  const copyToClipboard = (): void => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    toast.success(dictionary.article.CopiedToClipboard);
  };

  const style = {
    backgroundImage: `url(${PICTURE_BASE_URL + article?.image_preview})`,
    backgroundColor: "rgba(0,0,0,0.4)",
    height: "560px",
    backgroundBlendMode: "darken",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  const popoverShare = (
    <Popover className="popover-share">
      <Popover.Body>
        <div className="text text--18 text--bold d-flex flex-column gap-3">
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
            className="d-flex align-items-center gap-2 p-1 cursor-pointer"
          >
            <Image src={facebook} alt="facebook" />
            <p className="m-0">Facebook</p>
          </a>
          <a
            href={`https://t.me/share/url?url=${window.location.href}`}
            target="_blank"
            rel="noreferrer"
            className="d-flex align-items-center gap-2 post__share-btn p-1"
          >
            <Image src={telegram} alt="telegram" />
            <p className="m-0">Telegram</p>
          </a>
          <div className="d-flex align-items-center gap-2 post__share-btn p-1">
            <Image src={pinterest} alt="pinterest" />
            <p className="m-0">Pinterest</p>
          </div>
          <div
            className="d-flex align-items-center gap-2 post__share-btn p-1"
            onClick={copyToClipboard}
          >
            <Image src={chain} alt="chain" role="button" />
            <p className="m-0" role="button">
              {dictionary.article.copyLink}
            </p>
          </div>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      {features.blog && (
        <section className="container-lg p-0 pb-5">
          <button
            onClick={() => router.back()}
            className="btn link link--with-icon m-0 mt-5 ms-2 text text--md text--bold"
          >
            <Image src={arrowLeftSVG} alt="arrowLeftSVG" /> {dictionary.back}
          </button>
          <div
            className="d-flex flex-column p-3 p-md-5 mt-4 w-100"
            style={style}
          >
            <div className="d-flex align-items-center gap-2">
              <h2 className="me-auto text text--md text--bold text--white my-0">
                {article.title}
              </h2>
              <Bookmark slugPost={article.slug} />
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={popoverShare}
                rootClose={true}
              >
                <Image src={shareIcon} alt="shareIcon" role="button" />
              </OverlayTrigger>
            </div>
            <div className="d-flex align-items-center gap-3 mt-2">
              <Image
                src={tempAvatar}
                alt="Avatar"
                className="rounded-circle"
                width={50}
                height={50}
              />
              <p className="text text--white m-0">
                {getDisplayedName(article.author)}
              </p>
            </div>

            <div className="d-flex gap-3 mt-3">
              <p className="text--white">
                {dateFromLang(article.created_at, lang)}
              </p>
              <p className="text--white">&bull;</p>
              <p className="text--white">
                {randomReadTime()} {dictionary.article.tempRead}
              </p>
            </div>
          </div>

          <div className="container-lg mt-4">{article.content}</div>
          <div className="post__footer container-lg">
            <div className=" post__reactions d-flex gap-5 mt-3 ">
              <div className="d-flex flex-column align-items-center">
                <Image src={handIcon} alt="handIcon" />
                <p className="m-0 ">50</p>
              </div>
              <div className="d-flex flex-column align-items-center">
                <Image src={heartIcon} alt="heartIcon" />
                <p className="m-0">23</p>
              </div>
              <div className="d-flex flex-column align-items-center">
                <Image src={speechBubbleIcon} alt="speechBubbleIcon" />
                <p className="m-0">32</p>
              </div>
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={popoverShare}
                rootClose={true}
              >
                <Image src={shareIconGrey} alt="shareIconGrey" role="button" />
              </OverlayTrigger>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ArticleDetail;
