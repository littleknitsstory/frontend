import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/services/constants";
import { Articles } from "@/services/types";
import CardArticleSmall from "../card-article-small/CardArticleSmall";
import arrowRightSVG from "@/assets/icons/arrow-right-nd.svg";

interface Props {
  articles: Articles[];
  dictionary: Dictionary;
}

interface Dictionary {
  article: {
    readAlso: string;
    watchAll: string;
  };
}

export default function ReadMoreArticles({ articles, dictionary }: Props) {
  return (
    <section className="container-lg p-0 pb-5">
      <div className="container-md text-center">
        <h4 className="text text--md text--bold text-center mt-5 mb-3">
          {dictionary.article.readAlso}
        </h4>

        <div className="d-flex justify-content-center gap-5">
          {articles.map((article) => (
            <CardArticleSmall key={article.slug} {...article} />
          ))}
        </div>
        <Link
          href={ROUTES.ARTICLES}
          className="linkArrow d-inline-flex align-items-center gap-3 mt-5 p-0 text--bold text--md"
          role="button"
        >
          {dictionary.article.watchAll}
          <Image src={arrowRightSVG} alt="arrowRightSVG" />
        </Link>
      </div>
    </section>
  );
}
