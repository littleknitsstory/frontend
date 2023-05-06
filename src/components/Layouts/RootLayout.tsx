import Header from "../Header/Header";
import HeaderNav from "../MainNav/HeaderNav";
import Footer from "../Footer/Footer";
import { ReactNotifications } from "react-notifications-component";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-md">
      <Header />
      <HeaderNav />
      {children}
      <Footer />
      <ReactNotifications />
    </div>
  );
}
export default RootLayout;
