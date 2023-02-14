import React, { useState, useEffect, useContext } from "react"
import { IMenu } from "../../../api/models"
import { getMenu } from "../../../api";
import { NavLink } from "react-router-dom";

import { LanguageContext } from "../../../App"

import "./primary-nav.scss"

const PrimaryNav = () => {
  const [menu, setMenu] = useState<IMenu[] | []>([]);
  const [language] = useContext(LanguageContext)

  useEffect(() => {
    const fetchMenu = async (): Promise<void> => {
      const data = await getMenu({headers: {"Accept-Language": language}});
      if (data) {
        setMenu(data.results)
      }
    };
    fetchMenu()
  },[language])

  return (
    menu.map(item => (
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
    ))
  )

}
export default PrimaryNav