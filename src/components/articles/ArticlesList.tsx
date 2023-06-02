"use client";
import { Articles } from "../../services/types";

interface Props {
  articles: Articles[];
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
