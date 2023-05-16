import Script from "next/script";
import { getDictionary } from "@/get-dictionaries";
import { Locale } from "@/i18n-config";

interface Props {
  params: {
    lang: Locale;
  };
}

export default async function Home({ params }: Props) {
  const dictionary = await getDictionary(params.lang);

  return (
    <>
      <div>
        {dictionary.hello}
        <button className="btn btn-primary">Test</button>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown button
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
