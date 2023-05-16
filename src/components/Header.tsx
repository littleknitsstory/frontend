import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/app/routes";

import logoMobile from "@/assets/images/logo-mobile.svg";
import logoDesktop from "@/assets/images/logo-desktop.svg";
import { getDictionary } from "@/get-dictionaries";
import { Locale, i18n } from "@/i18n-config";

interface Dictionary {
  header: {
    title: string;
  };
}

export default function Header({ dictionary }: { dictionary: Dictionary }) {
  return (
    <header>
      <nav className="navbar header-navbar">
        <div className="container-lg justify-content-md-center flex-md-column">
          <Link className="navbar-brand" href={ROUTES.HOME}>
            <Image
              src={logoMobile}
              alt="Little Knit Story Logo"
              width={250}
              height={30}
              priority
              className="d-sm-block d-md-none"
            />
            <Image
              src={logoDesktop}
              alt="Little Knit Story Logo"
              className="d-none d-md-inline"
              width={416}
              height={112}
            />
          </Link>
        </div>
        <h1 className="d-none d-md-block mt-2 text--md mx-auto">
          {dictionary.header.title}
        </h1>
      </nav>
    </header>
  );
}
