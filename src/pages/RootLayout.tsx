import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import NavBar from "../components/NavBar"
import ScrollToTop from "../components/ScrollToTop"

const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}
export default RootLayout