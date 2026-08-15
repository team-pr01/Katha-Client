import ProductCard from "../../HomePage/BestSeller/ProductCard";

const YouMayAlsoLike = () => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-neutral-10 mb-5">
        You May Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 space-y-5">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default YouMayAlsoLike;
