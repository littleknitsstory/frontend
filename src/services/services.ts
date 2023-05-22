import { Locale } from "@/i18n-config";

export const request = async (
  url: string,
  method = "GET",
  body = null,
  headers = { "Content-Type": "application/json" },
  ...args: any
) => {
  try {
    const response = await fetch(url, { method, body, headers, ...args });

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (e) {
    throw e;
  }
};

export async function getArticle(slug: string, lang: Locale) {
  const headers = {
    "Content-Type": "application/json",
    "Accept-Language": lang,
  };
  const next = {
    revalidate: 60,
  };
  const res = await request(
    process.env.API_BASE_URL + `/articles/${slug}`,
    "GET",
    null,
    headers,
    next
  );
  return res;
}
// дефолтное значение???
export async function getAllArticles(lang: Locale = "en") {
  const headers = {
    "Content-Type": "application/json",
    "Accept-Language": lang,
  };
  const next = {
    revalidate: 60,
  };
  const res = await request(
    process.env.API_BASE_URL + "/articles/",
    "GET",
    null,
    headers,
    next
  );
  return res;
}

export async function getFeatures() {
  const next = {
    revalidate: 60,
  };
  const res = await request(
    process.env.API_BASE_URL + "/features/",
    "GET",
    null,
    { "Content-Type": "application/json" },
    next
  );
  return res;
}
export async function getComments() {
  const next = {
    revalidate: 60,
  };
  const res = await request(
    process.env.API_BASE_URL + "/comments/",
    "GET",
    null,
    { "Content-Type": "application/json" },
    next
  );
  return res;
}
