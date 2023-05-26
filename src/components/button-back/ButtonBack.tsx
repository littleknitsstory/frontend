"use client";

import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/services/constants";

import arrowLeftSVG from "@/assets/icons/arrow-left-nd.svg";
interface Props {
  back: string;
}

export default function ButtonBack({ back }: Props) {
  return (
    <div className="container-md p-0 text-start">
      <Link
        href={ROUTES.ARTICLES}
        className="linkArrow d-inline-flex align-items-center gap-3 mt-5 p-0 text--bold text--md"
        role="button"
      >
        <Image src={arrowLeftSVG} alt="arrowLeftSVG" /> {back}
      </Link>
    </div>
  );
}
