"use client";

import Image from "next/image";
import { Locale } from "@/i18n-config";

import { Article, CommentsData, FeaturesFlags } from "@/services/types";
import {
  getLocaleDate,
  getDisplayedName,
  getStyleBackground,
} from "@/helpers/utils";

import Bookmark from "../bookmark/Bookmark";
import CommentsList from "../comments/CommentsList";
import PopoverOverlay from "../popover-overlay/PopoverOverlay";

import tempAvatar from "@/assets/temp-avatar.png";
import handIcon from "@/assets/icons/reactions/hand.svg";
import heartIcon from "@/assets/icons/reactions/heart.svg";
import speechBubbleIcon from "@/assets/icons/reactions/speech-bubble.svg";
import shareIcon from "@/assets/icons/share.svg";
import shareIconGrey from "@/assets/icons/reactions/share.svg";

interface Props {
  article: Article;
  features: FeaturesFlags;
  lang: Locale;
  articles: Article[];
  dictionary: Dictionary;
  comments: CommentsData[];
}

interface Dictionary {
  back: string;
  article: {
    tempRead: string;
    copyLink: string;
    CopiedToClipboard: string;
  };
  comments: {
    send: string;
    comments: string;
    noAuthorize: string;
    successSend: string;
    reply: string;
    placeholderComments: string;
  };
  notification: {
    somethingWrong: string;
  };
}

export default function ArticleDetail({
  article,
  features,
  dictionary,
  lang,
  articles,
  comments,
}: Props) {
  return (
    <>
      {features.blog && (
        <section className="container-lg p-0">
          <div
            className="d-flex flex-column p-3 p-md-5 mt-4 w-100"
            style={getStyleBackground(article.image_preview)}
          >
            <div className="d-flex align-items-center gap-2">
              <h2 className="me-auto text text--md text--bold text--white my-0">
                {article.title}
              </h2>
              {/* <Bookmark /> */}
              <PopoverOverlay icon={shareIcon} dictionary={dictionary} />
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
                {getLocaleDate(article.created_at, lang)}
              </p>
              <p className="text--white">&bull;</p>
              <p className="text--white">
                {article.time_for_read} {dictionary.article.tempRead}
              </p>
            </div>
            <div className="d-flex gap-4 mt-auto">
              {article.tags.map((tag) => (
                <p key={tag.slug} className="text--white">
                  #{tag.title}
                </p>
              ))}
            </div>
          </div>
          <div className="container-lg mt-4">{article.content}</div>comments
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
              <PopoverOverlay icon={shareIconGrey} dictionary={dictionary} />
            </div>
          </div>
          <CommentsList
            comments={comments}
            features={features}
            dictionary={dictionary}
          />
        </section>
      )}
    </>
  );
}
