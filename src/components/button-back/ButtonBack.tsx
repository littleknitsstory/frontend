"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import arrowLeftSVG from "@/assets/icons/arrow-left-nd.svg";

interface Props {
  back: string;
}

export default function ButtonBack({ back }: Props) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="btn link link--with-icon m-0 mt-5 ms-2 text text--md text--bold"
    >
      <Image src={arrowLeftSVG} alt="arrowLeftSVG" /> {back}
    </button>
  );
}
