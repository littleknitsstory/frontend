"use client";
import { IArticle } from "../../styles/types";
import CardArticle from "./CardArticle";

interface Props {
  articles: IArticle[];
  children: React.ReactNode;
}

export default function ArticlesList({ children, articles }: Props) {
  return (
    <>
      <div>
        <h2>Client Component </h2>
      </div>

      <div className="border bg-grey mt-5">
        <h2>Server Component</h2>

        {children}
      </div>
    </>
  );
}
