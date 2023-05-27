import Link from "next/link";
import { ROUTES } from "@/services/constants";

export default function PageError404() {
  return (
    <section className="container-lg p-0 pb-5">
      <div className="text--burgundy mt-5 text-uppercase fs-2 text-center">
        404
      </div>
      <div className="text--burgundy mt-2 text-uppercase fs-3 text-center">
        Not found
      </div>
      <div className="text mt-2 fs-3 text-center">
        The page you are trying to reach does not exist or has been deleted.
        <br />
        <span>
          <Link href={ROUTES.HOME}>Click to home</Link>
        </span>
      </div>
    </section>
  );
}
