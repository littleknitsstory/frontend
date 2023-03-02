import AboutMe from "../components/AboutMe"
import Instagram from "../components/Instagram"
import LastReviews from "../components/LastReviews"
import Promo from "../components/Promo"
import SchemasCard from "../components/SchemasCard"

const Home = () => {
  return (
    <>
      <Promo />
      <SchemasCard />
      <AboutMe />
      <LastReviews />
      <Instagram />
    </>
  )
}
export default Home