import { PICTURE_BASE_URL, ROUTES } from "@/services/constants";
import { IArticle } from "@/styles/types";
import Image from "next/image";
import Link from "next/link";
import { getDisplayedName } from "../articles/CardArticle";
import tempAvatar from "@/assets/temp-avatar.png";
import classes from "./card-article-small.module.scss";

const CardArticleSmall = ({ ...article }: IArticle) => {
  return (
    <div
      className={
        classes.cardArticleSmall + " rounded bg-body text-start shadow"
      }
    >
      <Link href={ROUTES.ARTICLES + "/" + article.slug}>
        <div className="p-3">
          <h2 className="text text--md text--bold">{article.title}</h2>
          <div
            className={
              classes.cardArticleSmall__content +
              " my-2 text text--sm overflow-hidden"
            }
          >
            {article.content}
          </div>

          <small className="text--grey">3 минуты на чтение</small>
          <div className="border border-1 border-light my-3"></div>
          <div className="d-flex justify-content-between align-items-center">
            <Image
              src={tempAvatar}
              alt="Avatar"
              className="rounded-circle"
              width={50}
              height={50}
            />
            <p className="text text--sm text--grey m-0">
              {getDisplayedName(article.author)}
            </p>

            <p className="text text--sm text--grey m-0">·</p>
            <p className="text text--sm text--grey m-0">
              {article?.created_at}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default CardArticleSmall;
