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
      <div className="mt-4"></div>
      {children}
    </>
  );
}
