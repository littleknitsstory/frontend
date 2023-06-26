import { Locale } from "@/i18n-config";
import { PICTURE_BASE_URL } from "@/services/constants";

export function getDisplayedName(
  author: {
    first_name: string;
    last_name: string;
    username: string;
  } | null
) {
  if (author) {
    const { first_name, last_name, username } = author;

    if (first_name && last_name) {
      return first_name + " " + last_name;
    }

    if (username) {
      return username;
    }
  }

  return "Unknown author";
}

export function getLocaleDate(date: string, lang: Locale) {
  // Date coming in "DD-MM-YYYY HH:MM" format (need ISO 8601)

  // formatting date to ISO 8601
  let separatedDate = date.split(" ");
  separatedDate[0] = separatedDate[0].split("-").reverse().join("-");
  const formattedDate = separatedDate.join(" ");

  const changedDate = new Date(formattedDate).toLocaleDateString(lang, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return changedDate;
}

export function getStyleBackground(image: string) {
  const style = {
    backgroundImage: `url(${image})`,
    backgroundColor: "rgba(0,0,0,0.4)",
    height: "560px",
    backgroundBlendMode: "darken",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };
  return style;
}
