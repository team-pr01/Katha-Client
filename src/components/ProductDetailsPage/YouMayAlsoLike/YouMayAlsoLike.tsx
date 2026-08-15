import { IMAGES } from "../../../assets";
import ProductCard from "../../HomePage/BestSeller/ProductCard";

const YouMayAlsoLike = () => {
  const suggestedProducts = [
    {
      id: 1,
      name: "Brass Ganesha Statue",
      price: 2499,
      originalPrice: 3200,
      discount: 22,
      rating: 4.8,
      reviews: 156,
      image: IMAGES.anniversary,
    },
    {
      id: 2,
      name: "Handcrafted Brass Diya",
      price: 899,
      originalPrice: 1200,
      discount: 25,
      rating: 4.6,
      reviews: 89,
      image: IMAGES.babyShower,
    },
    {
      id: 3,
      name: "Brass Peacock Showpiece",
      price: 3499,
      originalPrice: 4200,
      discount: 17,
      rating: 4.7,
      reviews: 203,
      image: IMAGES.birthday,
      isNew: true,
    },
    {
      id: 4,
      name: "Brass Temple Bells Set",
      price: 1299,
      rating: 4.4,
      reviews: 67,
      image: IMAGES.festival,
    },
  ];
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-[#333] mb-4">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
      </div>
    </div>
  );
};

export default YouMayAlsoLike;
