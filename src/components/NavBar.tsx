import React, { useCallback, useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

import { LanguageContext } from "../App";
import apiClient from "../api/apiClient";
import heart from "../icons/heart.svg";
import logout from "../icons/logout.svg";
import shoppingBag from "../icons/shopping-bag.svg";
import user from "../icons/user.svg";
import PrimaryNav from "./atoms/primary-nav/PrimaryNav";

const NavBar = () => {
  const { language, selectLanguage } = useContext(LanguageContext);

  const handleLanguageSelect = useCallback(
    (value: string) => () => {
      selectLanguage(value);
      apiClient.updateHeaders({ "Accept-Language": value });
    },
    [selectLanguage]
  );

  return (
    <section className="lks-navbar">
      <Navbar expand="lg">
        <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <div className="lks-navbar__right">
              {/* Hiding accounts links */}
              {/* <div className="lks-navbar__icons">
                <a href="#">
                  <img src={user} alt="user" />
                </a>
                <a href="#">
                  <img src={logout} alt="logout" />
                </a>
                <Link to="/saved">
                  <img src={heart} alt="heart" />
                </Link>
                <Link to="/cart">
                  <img src={shoppingBag} alt="shoppingBag" />
                </Link>
              </div> */}
              <NavDropdown 
                title={language.toUpperCase()}
                id="basic-nav-dropdown"
                className="lks-navbar__lang"
              >
                <NavDropdown.Item 
                  onClick={(e) => selectLanguage?.(e.currentTarget.textContent!)} 
                  data-lang="en"
                >EN
                </NavDropdown.Item>

                <NavDropdown.Item 
                  onClick={(e) => selectLanguage?.(e.currentTarget.textContent!)} 
                  data-lang="ru"
                >RU
                </NavDropdown.Item>
              </NavDropdown>
            </div>

            <Navbar.Collapse>
              <Nav className="lks-navbar__links">
                <PrimaryNav type={"header"}/>
              </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  )
}

export default NavBar;
