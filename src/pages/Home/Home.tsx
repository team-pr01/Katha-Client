import BestSeller from "../../components/HomePage/BestSeller/BestSeller";
import Hero from "../../components/HomePage/Hero/Hero";
import ShopByOccasion from "../../components/HomePage/ShopByOccasion/ShopByOccasion";

const Home = () => {
  return (
    <div>
      <Hero />
      <ShopByOccasion />
      <BestSeller />
    </div>
  );
};

export default Home;
