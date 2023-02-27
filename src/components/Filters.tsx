import MultiRangeslider from "./multi-range-slider/MultiRangeSlider";
import arrowRight from "../icons/arrow-right.svg";
import { useTranslation } from "react-i18next";
import { useGetProductsQuery } from "../features/api/apiSlice";
import { useEffect, useState } from "react";

interface Category {
  title: string;
  slug: string
}

interface FilterProps {
  clearFilters: () => void;
  filterCategories: (selectedCategory: string) => void;
  filterColors: (selectedColor: string) => void;
}

const Filters = (props: FilterProps) => {
  const { t, i18n } = useTranslation();
  const {
  data: products,
  isLoading,
  isSuccess,
  isError,
  error
} = useGetProductsQuery({lang: i18n.language})

  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [colors, setColors] = useState<string[]>([])
  const [selectedColor, setSelectedColor] = useState<string>("")

  useEffect(() => {
    if (products) {
      // get all categories from products
      let allCategories: Category[] = []
      products?.results.forEach(product => {
        product.categories.forEach(category => {
          if (allCategories.every(item => item.title !== category.title)) {
            allCategories.push(category)
          }
        })
      })
      setCategories(allCategories)
      // get all colors from products
      let allColors: string[] = []
      products.results.forEach(product => {
        product.colors.forEach(color => {
          if (allColors.every(item => item !== color.color)) {
            allColors.push(color.color)
          }
        })
      })
      setColors(allColors)
    }
  }, [products])

  const selectCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.filterCategories(e.currentTarget.value)
    setSelectedCategory(e.currentTarget.value)
  }

  const selectColor = (e: React.MouseEvent<HTMLElement>) => {
    props.filterColors(e.currentTarget.dataset.color!)
    setSelectedColor(e.currentTarget.dataset.color!)
  }

  const clearFilters = (): void => {
    props.clearFilters()
    setSelectedColor("clear")
    setSelectedCategory("clear")
  }

  const clearColorFilter = (): void => {
    props.filterColors("clear")
    setSelectedColor("clear")
  }

  return (
    <>
      <div className="filters">
        <div className="title">{t("Filter.title")}</div>

        <div className="filters__wrapper-price">
          <div className="filters__title">{t("Filter.price")}</div>
          <MultiRangeslider
            min={0}
            max={1000}
            onChange={({ min, max }) =>
              console.log(`min = ${min}, max = ${max}`)
            }
          />
        </div>
        
        <div className="filters__wrapper-category">
          <div className="filters__title">{t("Filter.categories")}</div>
          <select 
            className="filters__select" 
            name="categories" 
            id="categories" 
            value={selectedCategory}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => selectCategoryHandler(e)}
          >
            <option value="clear">{t("Filter.selectCategory")}</option>
            {categories.map(category => 
              <option 
                key={category.slug}
                value={category.title}
              >
                {category.title}
              </option>
            )}
          </select>
          {/* <button 
            className="btn btn_clear-filter"
            onClick={clearColorFilter}
          >
            Clear
          </button> */}
        </div>

        <div className="filters__wrapper-category">
          <div className="filters__title">{t("Filter.colors")}</div>
            <div className="filters__color-palette">
              {colors.map(color => 
                <div 
                  key={color} 
                  style={{backgroundColor: color}} 
                  className={`color-circle ${color === selectedColor ? "active" : ""}`}
                  data-color={color}
                  onClick={(e: React.MouseEvent<HTMLElement>) => selectColor(e)}
                >
                </div>
              )}
              <button 
                className="btn clear-filter"
                onClick={clearColorFilter}
              >
                {t("Filter.clear")}
              </button>
            </div>
        </div>

        <div className="filters__btn">
          <button className="btn btn_border" onClick={clearFilters}>
            <div className="btn__text" >{t("Filter.buttonText")}</div>
            <div className="btn__icon">
              <img src={arrowRight} alt="arrowWhite" />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Filters;
