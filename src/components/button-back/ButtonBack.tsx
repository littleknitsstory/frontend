"use client";

import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/services/constants";

import arrowLeftSVG from "@/assets/icons/arrow-left-nd.svg";
import { useRouter } from "next/navigation";
interface Props {
  back: string;
}

export default function ButtonBack({ back }: Props) {
  const router = useRouter();
  return (
    <div className="container-lg p-0 text-start">
      {/* <Link
        href={ROUTES.ARTICLES}
        className="linkArrow d-inline-flex align-items-center gap-3 mt-5 p-0 text--bold text--md"
        role="button"
      >
        <Image src={arrowLeftSVG} alt="arrowLeftSVG" /> {back}
      </Link> */}
      <button onClick={() => router.back()}>click</button>
    </div>
  );
}
