export const convertToNumber = (num: string, locale: string): number => {
  const { format } = new Intl.NumberFormat(locale);
  const decimalSign = /^0(.)1$/.exec(format(0.1))![1];

  return +num.replace(new RegExp(`[^${decimalSign}\\d]`, "g"), "").replace(decimalSign, ".");
};

export const convertToCurrency = (price: number, lang: string): string => {
  if (lang === "en") {
    return price.toLocaleString("en-EU", { style: "currency", currency: "EUR" });
  } else if (lang === "ru") {
    return price.toLocaleString("ru-RU", { style: "currency", currency: "RUB" });
  } else {
    return price.toLocaleString("en-EU", { style: "currency", currency: "EUR" });
  }
};
