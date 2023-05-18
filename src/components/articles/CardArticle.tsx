"use client";

import { ROUTES, baseUrl } from "@/services/constants";
import { IArticle } from "@/styles/types";
import Image from "next/image";
import Link from "next/link";

import tempAvatar from "@/assets/temp-avatar.png";
import tempArticleImage from "@/assets/temp-article-image.png";

import classes from "./cart-article.module.scss";
import { Locale } from "@/i18n-config";

interface Props {
  article: IArticle;

  lang: Locale;
}

export default function CardArticle({ article, lang }: Props) {
  const hasImage = article.image_preview;

  const date = new Date(article.created_at).toLocaleDateString(lang, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  function getDisplayedName() {
    if (article.author) {
      const { first_name, last_name, username } = article.author;

      if (first_name && last_name) {
        return first_name + " " + last_name;
      }

      if (username) {
        return username;
      }
    }
    return "Unknown author";
  }

  return (
    <>
      <Link
        href={`/${lang}` + ROUTES.ARTICLES + "/" + article.slug}
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
              <p className="m-0">{getDisplayedName()}</p>
              <span>•</span>
              <p className="card-article__text m-0">{date}</p>
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
      </Link>
      <hr />
    </>
  );
}
