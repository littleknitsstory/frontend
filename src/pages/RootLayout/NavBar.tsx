import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
// components
import PrimaryNav from "../../components/primary-nav/PrimaryNav";
// assets
import heart from "../../assets/icons/heart.svg";
import shoppingBag from "../../assets/icons/shopping-bag.svg";
//? Temporary unused assets
// import logout from "../icons/logout.svg";
import { ReactComponent as ProfileIcon} from "../../assets/icons/user.svg";
import { ReactEventHandler, useState } from "react";

const NavBar = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState("English")

  const changeLang = (e: React.MouseEvent) => {
    if (e.currentTarget.textContent === "English") {
      setLang("Русский")
      i18n.changeLanguage("ru")
    } else {
      setLang("English")
      i18n.changeLanguage("en")
    }
  }
  return (
    <section className="navbar">
      <Container>
        <Navbar expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* <div className="lks-navbar__right"> */}
          <nav className="navbar__aside">
            <NavLink to="/login" id="profile-icon">
              <ProfileIcon id="profile-icon-svg"/>
            </NavLink>
            {/* <a href="#">
              <img src={logout} alt="logout" />
            </a> */}
            <Link to="/saved">
              <img src={heart} alt="heart" />
            </Link>
            <Link to="/cart">
              <img src={shoppingBag} alt="shoppingBag" />
            </Link>
            <p className="navbar__change-lang"onClick={changeLang}>{lang}</p>
          </nav>

          {/* </div> */}

          <Navbar.Collapse className="navbar__main">
            {/* <Nav className="navbar__main"> */}
              <PrimaryNav type={"header"} className="navbar__main-link"/>
            {/* </Nav> */}
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </section>
  );
};

export default NavBar;
