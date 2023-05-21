"use client";

import { ROUTES, baseUrl } from "@/services/constants";
import { IArticle } from "@/styles/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import tempAvatar from "@/assets/temp-avatar.png";
import tempArticleImage from "@/assets/temp-article-image.png";

import classes from "./cart-article.module.scss";
import { Locale } from "@/i18n-config";
import Bookmark from "../bookmark/Bookmark";
import { MouseEvent } from "react";

interface Props {
  article: IArticle;

  lang: Locale;
}

export function getDisplayedName(author: any) {
  if (author) {
    const { first_name, last_name, username } = author;

    if (first_name && last_name) {
      return first_name + " " + last_name;
    }

    if (username) {
      return username;
    }
  }
  return "Unknown author";
}

export function dateFromLang(date: string, lang: Locale) {
  const changedDate = new Date(date).toLocaleDateString(lang, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return changedDate;
}

export default function CardArticle({ article, lang }: Props) {
  const hasImage = article.image_preview;
  const router = useRouter();
  const handleCardClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    router.push(`${ROUTES.ARTICLES + "/" + article.slug}`);
  };

  const handleBookmarkClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    router.push("/bookmarks");
  };
  return (
    <>
      <div
        onClick={handleCardClick}
        role="button"
        className={classes.cardWrapper + " py-3"}
      >
        <div className="d-md-flex gap-3 flex-md-row-reverse align-items-center">
          <div className="">
            {hasImage && (
              <Image
                src={baseUrl + article.image_preview}
                alt={article.image_alt}
                className="rounded-4 "
                width={360}
                height={220}
              />
            )}

            {/* TODO: Temporary image for articles without image */}
            {!hasImage && (
              <Image
                src={tempArticleImage}
                alt=""
                width={360}
                height={220}
                className={classes.image}
              />
            )}
          </div>
          <div className="">
            <div className="d-flex gap-2 align-items-center text mt-3 md-mt-0">
              <Image
                src={tempAvatar}
                alt="Avatar"
                className="rounded-circle"
                width={50}
                height={50}
              />
              <p className="m-0">{getDisplayedName(article.author)}</p>
              <span>•</span>
              <p className="card-article__text m-0">
                {dateFromLang(article.created_at, lang)}
              </p>
              <p onClick={handleBookmarkClick} role="button">
                <Bookmark />
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="card-article__title text text--md text--bold mt-3">
                {article.title}
              </h2>
            </div>
            <p>{article.content}</p>
            <small>3 минуты на чтение (HC)</small>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
