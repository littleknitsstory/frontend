"use client";

import { useRouter } from "next/navigation";

export default function PageError404() {
  const router = useRouter();
  return (
    <section className="p-0 pb-5 text-center mt-3">
      <div className="text--burgundy text-uppercase text--lg">
        <p className="m-0">404</p>
        <p className="m-0">Not Found</p>
      </div>
      <div className="text text--md mt-3">
        <p className="m-0">
          The page you are trying to reach does not exist or has been deleted.
        </p>
        <button className="btn--link" onClick={() => router.back()}>
          Go back
        </button>
      </div>
    </section>
  );
}
