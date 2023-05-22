"use client";
import Image from "next/image";
import bookmark from "@/assets/icons/bookmark.svg";

const Bookmark = () => {
  return <Image src={bookmark} alt="bookmark" role="button" />;
};

export default Bookmark;
