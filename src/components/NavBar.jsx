import React from "react";
import Container from "react-bootstrap/Container";
import { NavLink, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import user from "../icons/user.svg";
import logout from "../icons/logout.svg";
import heart from "../icons/heart.svg";
import shoppingBag from "../icons/shopping-bag.svg";

const NavBar = () => {
  return (
    <section className="lks-navbar">
      <Navbar expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="lks-navbar__links">
              <Nav.Link as={NavLink} to="/">
                Главная
              </Nav.Link>
              <Nav.Link as={NavLink} to="/shop">
                МАГАЗИН
              </Nav.Link>
              <Nav.Link as={NavLink} to="/blog">
                БЛОГ
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contacts">
                КОНТАКТЫ
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
            <a href="#">
              <img src={shoppingBag} alt="shoppingBag" />
            </a>
          </div>
          <NavDropdown
            title="Ru"
            id="basic-nav-dropdown"
            className="lks-navbar__lang"
          >
            <NavDropdown.Item>En</NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
    </section>
  );
};

export default NavBar;
