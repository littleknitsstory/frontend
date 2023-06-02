"use client";

import { useRouter } from "next/navigation";

export default function PageError404() {
  const router = useRouter();
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
          <button className="btn--link" onClick={() => router.back()}>
            Go back
          </button>
        </span>
      </div>
    </section>
  );
}
