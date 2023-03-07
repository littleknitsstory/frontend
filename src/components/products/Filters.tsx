import { useTranslation } from "react-i18next";
import MultiRangeslider from "./multi-range-slider/MultiRangeSlider";
import arrowRight from "../../assets/icons/arrow-right.svg";
import { useGetProductsQuery } from "../features/api/apiSlice";
import { useEffect, useState } from "react";
import { IProduct } from "../../app/types";

interface Category {
  title: string;
  slug: string;
}

interface FilterProps {
  clearFilters: () => void;
  setFilteredCategories: (arg: IProduct[]) => void;
  setFilteredColors: (arg: IProduct[]) => void;
}

const Filters = (props: FilterProps) => {
  const { t, i18n } = useTranslation();
  const { data: products } = useGetProductsQuery({ lang: i18n.language });

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [colors, setColors] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");

  useEffect(() => {
    if (products) {
      // get all categories from products
      let allCategories: Category[] = [];
      products?.results.forEach((product) => {
        product.categories.forEach((category) => {
          if (allCategories.every((item) => item.title !== category.title)) {
            allCategories.push(category);
          }
        });
      });
      setCategories(allCategories);
      // get all colors from products
      let allColors: string[] = [];
      products.results.forEach((product) => {
        product.colors.forEach((color) => {
          if (allColors.every((item) => item !== color.color)) {
            allColors.push(color.color);
          }
        });
      });
      setColors(allColors);
    }
  }, [products]);

  // filtering by category
  const selectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.currentTarget.value;
    setSelectedCategory(selectedCategory);
    if (products) {
      if (selectedCategory === "clear") {
        props.setFilteredCategories([]);
      } else {
        const filtered: IProduct[] = products?.results.filter((product) =>
          product.categories.some((category) => category.slug === selectedCategory),
        );
        props.setFilteredCategories(filtered);
      }
    }
  };

  // filtering by color
  const selectColor = (e: React.MouseEvent<HTMLElement>) => {
    const selectedColor = e.currentTarget.dataset.color!;
    setSelectedColor(selectedColor);
    if (products) {
      if (selectedColor === "clear") {
        props.setFilteredColors([]);
      } else {
        const filtered: IProduct[] = products?.results.filter((product) =>
          product.colors.some((color) => color.color === selectedColor),
        );
        props.setFilteredColors(filtered);
      }
    }
  };

  const clearFilters = (): void => {
    props.clearFilters();
    setSelectedCategory("clear");
    setSelectedColor("clear");
  };

  const clearColorFilter = (): void => {
    setSelectedColor("clear");
    props.setFilteredColors([]);
  };

  const categoryOptions = categories.map((category) => (
    <option key={category.slug} value={category.slug}>
      {category.title}
    </option>
  ))

  const colorOptions = colors.map((color) => (
    <div
      key={color}
      style={{ backgroundColor: color }}
      className={`filter__color-circle ${color === selectedColor ? "active" : ""}`}
      data-color={color}
      onClick={(e: React.MouseEvent<HTMLElement>) => selectColor(e)}
    ></div>
  ))

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
          <option selected>All categories</option>
          {categoryOptions}
        </select>
      </div>

      <div className="filters__category-wrapper">
        <h6 className="filter__title">{t("Filter.colors")}</h6>
        <div className="filter__color-palette">
          {colorOptions}
        </div>
        <button className="btn filter__clear-filter btn_center" onClick={clearColorFilter}>
          {t("Filter.clear")}
        </button>
      </div>

      <button className="btn btn_border btn_center" onClick={clearFilters}>
        {t("Filter.buttonText")}
        <img src={arrowRight} alt="arrowWhite" />
      </button>

    </div>
  );
};

export default Filters;
