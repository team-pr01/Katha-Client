import BestSeller from "../../components/HomePage/BestSeller/BestSeller";
import Hero from "../../components/HomePage/Hero/Hero";
import ShopByCategory from "../../components/HomePage/ShopByCategory/ShopByCategory";
import ShopByOccasion from "../../components/HomePage/ShopByOccasion/ShopByOccasion";

const Home = () => {
  return (
    <div>
      <Hero />
      <ShopByCategory/>
      <ShopByOccasion />
      <BestSeller />
    </div>
  );
};

export default Home;
