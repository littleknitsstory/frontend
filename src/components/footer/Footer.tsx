import { SOCIAL } from "@/app/constants";
import Link from "next/link";
import SubscribeForm from "./Subscribe";

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
    <footer className="mt-auto">
      <ul className="nav flex-column">
        <h2 className="text--md">{dictionary.about}</h2>
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

      <ul className="nav flex-column">
        <h2 className="text--md">{dictionary.contacts}</h2>
        <li className="nav-item">
          <Link className="nav-link" href={SOCIAL.FACEBOOK}>
            Facebook
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href={SOCIAL.INSTAGRAM}>
            Instagram
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href={SOCIAL.PINTEREST}>
            Pinterest
          </Link>
        </li>
      </ul>
      <SubscribeForm dictionary={dictionary.subscribe} />
    </footer>
  );
}
