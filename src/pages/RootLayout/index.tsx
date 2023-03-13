import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";
import ScrollToTop from "../../components/utils/ScrollToTop";
import { ReactNotifications } from "react-notifications-component";
import { useGetFeaturesQuery } from "../../components/features/api/featuresSlice";

const RootLayout = () => {
  const { data } = useGetFeaturesQuery();

  return (
    <>
      <ReactNotifications />
      <ScrollToTop />
      <Header />
      {data?.menu ? <NavBar /> : null}
      <Outlet />
      <Footer />
    </>
  );
};
export default RootLayout;
