import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";
import ScrollToTop from "../../components/utils/ScrollToTop";

const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};
export default RootLayout;
