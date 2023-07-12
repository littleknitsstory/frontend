"use client";

import { PICTURE_BASE_URL, ROUTES } from "@/services/constants";
import { Articles } from "@/services/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import tempAvatar from "@/assets/temp-avatar.png";
import tempArticleImage from "@/assets/temp-article-image.png";

import classes from "./cart-article.module.scss";
import { Locale } from "@/i18n-config";
import Bookmark from "../bookmark/Bookmark";
import { MouseEvent, useId } from "react";
import { getLocaleDate, getDisplayedName } from "@/helpers/utils";
import LinkLocale from "../utils/LinkLocale";

interface Props {
  article: Articles;
  lang: Locale;
}

export default function CardArticle({ article, lang }: Props) {
  //const hasImage = article.contents[0].image;
  const router = useRouter();

  const handleBookmarkClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    router.push("/bookmarks");
  };

  return (
    <div className={classes.cardWrapper + " py-2"}>
      <LinkLocale href={ROUTES.ARTICLES + "/" + article.slug} className="">
        <div className="d-md-flex gap-3 flex-md-row-reverse align-items-center justify-content-between">
          <div className="">
            {/* {hasImage && (
              <Image
                src={article.contents[0].image}
                alt={article.contents[0].image_alt}
                className={classes.image}
                width={360}
                height={220}
              />
            )} */}

            {/* TODO: Temporary image for articles without image */}
            {/* {!hasImage && (
              <Image
                src={tempArticleImage}
                alt=""
                width={360}
                height={220}
                className={classes.image}
              />
            )} */}
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
                {getLocaleDate(article.created_at, lang)}
              </p>

              {/* <p onClick={handleBookmarkClick} role="button">
                <Bookmark />
              </p> */}
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="card-article__title text text--md text--bold mt-3 ">
                {article.title}
              </h2>
            </div>
            <p>{article.description}</p>
            <small>Time to read! (change API to get data)</small>
          </div>
        </div>
      </LinkLocale>
    </div>
  );
}
