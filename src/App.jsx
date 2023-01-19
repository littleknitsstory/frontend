import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Promo from "./components/Promo";
import SchemasCard from "./components/SchemasCard";
import AboutMe from "./components/AboutMe";
import LastReviews from "./components/LastReviews";
import Instagram from "./components/Instagram";
import Footer from "./components/Footer";

import "./css/style.css";

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Promo />
      <SchemasCard />
      <AboutMe />
      <LastReviews />
      <Instagram />
      <Footer />
    </>
  );
}

export default App;
