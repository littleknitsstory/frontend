"use client";
import { Article } from "../../services/types";

interface Props {
  articles: Article[];
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
