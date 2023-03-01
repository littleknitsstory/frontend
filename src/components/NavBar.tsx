import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
// components
import PrimaryNav from "./atoms/primary-nav/PrimaryNav";
// assets
import heart from "../assets/icons/heart.svg";
import shoppingBag from "../assets/icons/shopping-bag.svg";
//? Temporary unused assets
// import logout from "../icons/logout.svg";
// import user from "../icons/user.svg";

const NavBar = () => {
  const { i18n } = useTranslation()

  return (
    <section className="lks-navbar">
      <Navbar expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <div className="lks-navbar__right">
            <div className="lks-navbar__icons">
              {/* <a href="#">
                <img src={user} alt="user" />
              </a>
              <a href="#">
                <img src={logout} alt="logout" />
              </a> */}
              <Link to="/saved">
                <img src={heart} alt="heart" />
              </Link>
              <Link to="/cart">
                <img src={shoppingBag} alt="shoppingBag" />
              </Link>
            </div>

            <NavDropdown
              title={i18n.language.toUpperCase()}
              id="basic-nav-dropdown"
              className="lks-navbar__lang"
            >
              <NavDropdown.Item onClick={() => i18n.changeLanguage("en")}>
                EN
              </NavDropdown.Item>

              <NavDropdown.Item onClick={() => i18n.changeLanguage("ru")}>
                RU
              </NavDropdown.Item>
            </NavDropdown>
          </div>

          <Navbar.Collapse>
            <Nav className="lks-navbar__links">
              <PrimaryNav type={"header"} />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  );
};

export default NavBar;
