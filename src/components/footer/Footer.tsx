import Image from "next/image";
import Link from "next/link";

import SubscribeForm from "./Subscribe";
import { SOCIAL } from "@/services/constants";

import logoMobile from "@/assets/images/logo-mobile.svg";
import { ROUTES } from "@/services/constants";

interface Props {
  dictionary: {
    about: string;
    history: string;
    ad: string;
    contacts: string;
    title: string;
    policy: string;
    subscribe: {
      title: string;
      text: string;
      email: string;
      buttonText: string;
      required: string;
      incorrectEmail: string;
    };
  };
}

export default function Footer({ dictionary }: Props) {
  return (
    <footer className="mt-5">
      <div className="text--md  row row-cols-2 row-cols-md-3 mx-0">
        <ul className="nav flex-column gap-2 col-md-3">
          <h2 className="text--md mb-3">{dictionary.about}</h2>
          <li className="nav-item">
            <Link className="nav-link" href="#">
              {dictionary.history}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="#">
              FAQ
            </Link>
          </li>
          <li className="nav-item">
            <Link href="#" className="nav-link">
              {dictionary.ad}
            </Link>
          </li>
        </ul>

        <ul className="nav flex-column gap-2 mb-5 col-md-3">
          <h2 className="text--md mb-3">{dictionary.contacts}</h2>
          <li className="nav-item">
            <Link className="nav-link" href={SOCIAL.FACEBOOK} target="_blank">
              Facebook
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href={SOCIAL.INSTAGRAM} target="_blank">
              Instagram
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href={SOCIAL.PINTEREST} target="_blank">
              Pinterest
            </Link>
          </li>
        </ul>

        <div className="p-0 col-12 col-md-6">
          <SubscribeForm dictionary={dictionary.subscribe} />
        </div>
      </div>

      <Link
        href={ROUTES.HOME}
        className="d-flex flex-column align-items-center mt-5 link"
      >
        <Image
          src={logoMobile}
          alt="Little Knits Story logo"
          width={250}
          height={30}
          className="my-2"
        />
        <h2 className="text text--grey">{dictionary.title}</h2>
      </Link>

      <div className="mt-5 d-flex justify-content-between">
        <p className="text text--xs">
          Little Knits Story 2017 | © All Rights Reserved
        </p>
        <Link href={ROUTES.PRIVACY_POLICY} className="text text--xs link">
          {dictionary.policy}
        </Link>
      </div>
    </footer>
  );
}
