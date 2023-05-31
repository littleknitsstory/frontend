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
      <button
        className="btn--link d-inline-flex align-items-center gap-3 mt-5 p-0 text--bold text--md"
        onClick={() => router.back()}
      >
        <Image src={arrowLeftSVG} alt="arrowLeftSVG" /> {back}
      </button>
    </div>
  );
}
