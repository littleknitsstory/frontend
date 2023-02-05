import { useContext } from "react";
import Container from "react-bootstrap/Container";
import { NavLink, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import user from "../icons/user.svg";
import logout from "../icons/logout.svg";
import heart from "../icons/heart.svg";
import shoppingBag from "../icons/shopping-bag.svg";
import { Language } from "../App";
import { Trans } from "react-i18next";

const NavBar = (props) => {
  const language = useContext(Language)

  return (
    <section className="lks-navbar">
      <Navbar expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="lks-navbar__links">
              <Nav.Link as={NavLink} to="/">
                <Trans i18nKey="NavBar.home">
                  ГЛАВНАЯ
                </Trans>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/shop">
                <Trans i18nKey="NavBar.shop">
                  МАГАЗИН
                </Trans> 
              </Nav.Link>
              <Nav.Link as={NavLink} to="/blog">
                <Trans i18nKey="NavBar.blog">
                  БЛОГ
                </Trans>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contacts">
                <Trans i18nKey="NavBar.contacts">
                  КОНТАКТЫ
                </Trans>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <div className="lks-navbar__icons">
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
          </div>
          <NavDropdown
            title={language}
            id="basic-nav-dropdown"
            className="lks-navbar__lang"
          >
            <NavDropdown.Item as="button" onClick={props.selectLanguage}>EN</NavDropdown.Item>
            <NavDropdown.Item as="button" onClick={props.selectLanguage}>RU</NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
    </section>
  );
};

export default NavBar;
