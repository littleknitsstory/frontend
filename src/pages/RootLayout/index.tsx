import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";
import ScrollToTop from "../../components/utils/ScrollToTop";
import { ReactNotifications } from "react-notifications-component";
const RootLayout = () => {
  return (
    <>
      <ReactNotifications />
      <ScrollToTop />
      <Header />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};
export default RootLayout;
