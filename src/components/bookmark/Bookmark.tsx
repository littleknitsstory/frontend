"use client";
import Image from "next/image";
import bookmark from "@/assets/icons/bookmark.svg";

export default function Bookmark() {
  return <Image src={bookmark} alt="bookmark" role="button" />;
}
