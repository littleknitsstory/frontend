import AboutMe from "../components/home/AboutMe";
import Instagram from "../components/Instagram";
import LastReviews from "../components/reviews/LastReviews";
import Promo from "../components/home/Promo";
import SchemasCard from "../components/home/SchemasCard";

const Home = () => {
  return (
    <>
      <Promo />
      <SchemasCard />
      <AboutMe />
      <LastReviews />
      <Instagram />
    </>
  );
};
export default Home;
