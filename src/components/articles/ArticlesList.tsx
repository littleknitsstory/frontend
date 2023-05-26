"use client";
import { IArticle } from "../../services/types";

interface Props {
  articles: IArticle[];
  children: React.ReactNode;
}

export default function ArticlesList({ children }: Props) {
  return (
    <>
      <div className="mt-4"></div>
      {children}
    </>
  );
}
