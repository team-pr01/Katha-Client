import Container from "../../Reusable/Container/Container";
import ProductCard from "./ProductCard";

const BestSeller = () => {
  return (
    <Container>
      <div className="py-16 font-Manrope">
        <h2 className="text-3xl font-bold text-neutral-5">Bestseller</h2>

        <div className="grid grid-cols-4 gap-5 space-y-6 mt-6">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </Container>
  );
};

export default BestSeller;
