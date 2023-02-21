import React, { useState, useEffect, useContext } from "react"
import { IMenu, IMenuResponse } from "../../../api/models"
import { getMenu } from "../../../api";
import { NavLink } from "react-router-dom";

import { LanguageContext } from "../../../App"

import "./primary-nav.scss"

interface propTypes {
    type: "footer" | "header";
  }

const PrimaryNav = (props: propTypes) => {
  const [menu, setMenu] = useState<IMenu[] | []>([]);
  const {language} = useContext(LanguageContext)

  useEffect(() => {
    const fetchMenu = async (): Promise<void> => {
      const data: IMenuResponse | void = await getMenu({headers: {"Accept-Language": language}});
      if (data) {
        console.log(data)
        // Filtering and ordering menu items
        const filteredMenu: IMenu[] = data.results.filter(item => item.menu.hint === props.type)
          .sort((a, b) => a.ordering - b.ordering)
        setMenu(filteredMenu)
      }
    };
    fetchMenu()
  },[language])

  return (
    <>
    {menu.map(item => (
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