import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button } from "react-bootstrap";

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
              <Nav.Link href="#">Главная</Nav.Link>
              <Nav.Link href="#">МАГАЗИН</Nav.Link>
              <Nav.Link href="#">БЛОГ</Nav.Link>
              <Nav.Link href="#">КОНТАКТЫ</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <div className="lks-navbar__icons">
            <a href="#">
              <img src={user} alt="user" />
            </a>
            <a href="#">
              <img src={logout} alt="logout" />
            </a>
            <a href="#">
              <img src={heart} alt="heart" />
            </a>
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
