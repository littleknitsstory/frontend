import { ROUTES } from "@/services/constants";
import { notFound } from "next/navigation";

export default function page({ params }: { params: { slug: string } }) {
  if (params.slug !== "slug-1") {
    notFound();
  }

  return <div>This is article</div>;
}

export function generateStaticParams() {
  return [{ slug: "slug-1" }, { slug: "slug-2" }];
}
