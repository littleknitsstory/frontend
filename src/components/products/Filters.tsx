import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { IProduct } from "../../app/types";
import arrowRight from "../../assets/icons/arrow-right.svg";

interface Category {
  title: string;
  slug: string;
}

interface FilterProps {
  products: IProduct[];
  setFilteredProducts: (products: IProduct[]) => void;
}

const Filters = ({ products, setFilteredProducts }: FilterProps) => {
  const { t } = useTranslation();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [colors, setColors] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");

  useEffect(() => {
    // get all categories from products
    const categoriesSet: { [key: string]: string } = products.reduce(
      (result: { [key: string]: string }, product: IProduct) => {
        product.categories.forEach((category) => {
          if (!result[category.title]) {
            result[category.title] = category.slug;
          }
        });
        return result;
      },
      {},
    );
    const allCategories: Category[] = Object.entries(categoriesSet).map(([title, slug]) => ({
      title,
      slug,
    }));
    setCategories(allCategories);
    // get all colors from products
    const allColors: string[] = products.reduce((result: string[], product: IProduct) => {
      product.colors.forEach((color: { color: string }) => {
        if (!result.includes(color.color)) {
          result.push(color.color);
        }
      });
      return result;
    }, [] as string[]);
    setColors(allColors);
  }, [products]);

  useEffect(() => {
    const filteredByCategory: IProduct[] = products.filter((product) =>
      selectedCategory
        ? product.categories.some((category) => category.slug === selectedCategory)
        : true,
    );
    const filteredByColor: IProduct[] = filteredByCategory.filter((product) =>
      selectedColor ? product.colors.some((color) => color.color === selectedColor) : true,
    );
    setFilteredProducts(filteredByColor);
  }, [products, selectedCategory, selectedColor, setFilteredProducts]);

  // filtering by category
  const selectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.currentTarget.value;
    setSelectedCategory(selectedCategory);
  };

  // filtering by color
  const selectColor = (e: React.MouseEvent<HTMLElement>) => {
    const selectedColor = e.currentTarget.dataset.color!;
    setSelectedColor(selectedColor);
  };

  const handleClear = (): void => {
    setSelectedCategory("");
    setSelectedColor("");
  };

  const clearColorFilter = (): void => {
    setSelectedColor("");
  };

  const categoryOptions = categories.map((category) => (
    <option key={category.slug} value={category.slug}>
      {category.title}
    </option>
  ));

  const colorOptions = colors.map((color) => (
    <div
      key={color}
      style={{ backgroundColor: color }}
      className={`filter__color-circle ${color === selectedColor ? "active" : ""}`}
      data-color={color}
      onClick={(e: React.MouseEvent<HTMLElement>) => selectColor(e)}
    ></div>
  ));

  return (
    <div className="filters">
      <h2>{t("Filter.title")}</h2>
      {/* <div className="filters__wrapper-price">
        <div className="filters__title">{t("Filter.price")}</div>
        <MultiRangeslider
          min={0}
          max={1000}
          onChange={({ min, max }) =>
            console.log(`min = ${min}, max = ${max}`)
          }
        />
      </div> */}
      <div className="filters__category-wrapper">
        <h6 className="filter__title">{t("Filter.categories")}</h6>
        <select
          className="form-select"
          aria-label="Select category"
          value={selectedCategory}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => selectCategory(e)}
        >
          <option value="">{t("Filter.selectCategory")}</option>
          {categoryOptions}
        </select>
      </div>

      <div className="filters__category-wrapper">
        <h6 className="filter__title">{t("Filter.colors")}</h6>
        <div className="filter__color-palette">{colorOptions}</div>
        <button className="btn filter__clear-filter btn_center" onClick={clearColorFilter}>
          {t("Filter.clear")}
        </button>
      </div>

      <button className="btn btn_border btn_center" onClick={handleClear}>
        {t("Filter.buttonText")}
        <img src={arrowRight} alt="arrowWhite" />
      </button>
    </div>
  );
};

export default Filters;
