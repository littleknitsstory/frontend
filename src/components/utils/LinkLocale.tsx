import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { Locale } from "@/i18n-config";

export default function LinkLocale({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const pathname = usePathname();
  const segment = useSelectedLayoutSegment();
  const currentLanguage = pathname.split("/")[1] as Locale;
  return (
    <Link
      href={`/${currentLanguage}${href}`}
      className={`${className} ${href === `/${segment}` ? "active" : ""}`}
    >
      {children}
    </Link>
  );
}
