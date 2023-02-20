import { useEffect, useState, MouseEvent, Dispatch, SetStateAction } from "react";
import MultiRangeslider from "./multi-range-slider/MultiRangeSlider";
import arrowRight from "../icons/arrow-right.svg";
import { useTranslation } from "react-i18next";
import { IProduct, IProductsResponse } from "../api/models";
import { useGet } from "./Hooks/useFetch";
import { Namespace } from "i18next";

interface FilterProps {
  setUpdateProducts: Dispatch<SetStateAction<boolean>>
  setProducts: Dispatch<SetStateAction<IProduct[]>>
}

const Filters = ({ setUpdateProducts, setProducts }: FilterProps) => {
  const { t } = useTranslation<Namespace<"translation">>()
  const [colorsData, setColorsData] = useState<string[]>([])

  const {data, loading, error} = useGet<IProductsResponse>({
    url: "PRODUCTS",
    method: "GET",

  })

  useEffect(() => {
    let productsColors: string[] = []
    if (data) {
      data.results.forEach((product) => {
        product.colors.forEach(color => {
          productsColors.push(color.color)
        })
      })
      const sorted = new Set(productsColors)
      setColorsData([...sorted])
    }
  }, [data])

  const selectColor = (e: MouseEvent<HTMLDivElement>) => {
    const { color } = e.currentTarget?.dataset
    
    if (data) {
      setProducts(data?.results.filter(product => {
        return product.colors.some(item => item.color === color)
      }))
    }
  }

  const clearFilters = () => {
    setUpdateProducts(prevState => !prevState)
  }

  const palette = colorsData?.map(color => {
    return (
      <div 
        key={color} 
        style={{backgroundColor: color}} 
        className="filters__color-circle"
        data-color={color}
        onClick={(e) => selectColor(e)}
      >
      </div>
    )
  })

  return (
    <>
      <div className="filters">
        <div className="title">
          {t("Filter.title")}
        </div>

        <div className="filters__wrapper-price">
          <div className="filters__title">
            {t("Filter.price")}
          </div>

          <MultiRangeslider
            min={0}
            max={1000}
            onChange={({ min, max }) =>
              console.log(`min = ${min}, max = ${max}`)
            }
          />
        </div>

        <div className="filters__wrapper-color">
          {palette}
        </div>

        <div className="filters__btn">
          <button className="btn btn_border" onClick={clearFilters}>
            <div className="btn__text">
              {t("Filter.buttonText")}
            </div>
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
