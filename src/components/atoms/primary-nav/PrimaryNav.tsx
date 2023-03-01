import React, { useState, useEffect } from "react"
import { IMenu } from "../../../app/types"
import { NavLink } from "react-router-dom";

import i18next from "../../../i18n"

import "./primary-nav.scss"
import { useGetMenuQuery } from "../../../features/api/apiSlice";

interface propTypes {
    type: "footer" | "header";
  }

const PrimaryNav = (props: propTypes) => {
  const {
    data: menu,
    isError,
  } = useGetMenuQuery({lang: i18next.language})
  const [sortedMenuItem, setSortedMenuItem] = useState<IMenu[] | []>([]);
  

  useEffect(() => {
    // Filtering "Header" / "Footer" menu items
    if (menu) {
      const filteredMenu: IMenu[] = 
        menu.results.filter(item => item.menu.hint === props.type)
          .sort((a, b) => a.ordering - b.ordering)
      setSortedMenuItem(filteredMenu)
    }
  },[menu, props.type])

  if (isError) {
    return (
      <div className="error--menu">
        Cannot load menu, please refresh page!
      </div>)
  }

  return (
    <>
    {sortedMenuItem.map(item => (
    item.target ? 
      <a 
        key={item.id} 
        className="primary-nav-links" 
        href={item.url} 
        target={item.target}
      >
          {item.name}
      </a> :
      <NavLink 
        key={item.id} 
        className="primary-nav-links" 
        to={item.url}
      >
        {item.name}
      </NavLink>
    ))}
    </>
  )
}

export default PrimaryNav