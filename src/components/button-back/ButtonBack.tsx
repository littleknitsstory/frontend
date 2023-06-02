"use client";

import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/services/constants";

import arrowLeftSVG from "@/assets/icons/arrow-left-nd.svg";
import { useRouter } from "next/navigation";
interface Props {
  dictionary: string;
}

export default function ButtonBack({ dictionary }: Props) {
  const router = useRouter();
  return (
    <div className="container-lg p-0 text-start">
      <button
        className="btn--link d-inline-flex align-items-center gap-2 mt-5 p-0 text--bold text--md"
        onClick={() => router.back()}
      >
        <Image src={arrowLeftSVG} alt="arrowLeftSVG" />
        <span>{dictionary}</span>
      </button>
    </div>
  );
}
