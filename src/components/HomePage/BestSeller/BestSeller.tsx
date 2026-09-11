import { FiPackage } from "react-icons/fi";
import { useGetAllProductsQuery } from "../../../redux/Features/Product/productApi";
import type { TProduct } from "../../../types/product.type";
import Container from "../../Reusable/Container/Container";
import ProductCardSkeletonLoader from "../../SkeletonLoaders/ProductCardSkeletonLoader/ProductCardSkeletonLoader";
import ProductCard from "./ProductCard";

const BestSeller = () => {
  const { data, isLoading, isFetching } = useGetAllProductsQuery({});
  const products = data?.data?.data || [];
  return (
    <Container>
      <div className="py-16 font-Manrope">
        <h2 className="text-3xl font-bold text-neutral-5">Bestseller</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mt-6">
          {isLoading || isFetching ? (
            // Show skeleton loaders
            Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeletonLoader key={index} />
            ))
          ) : products?.length === 0 ? (
            // Show no products found
            <div className="col-span-1 sm:col-span-2 xl:col-span-3 flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="w-20 h-20 rounded-full bg-neutral-20 flex items-center justify-center mb-4">
                <FiPackage className="text-neutral-45 text-3xl" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-10 mb-1">
                No Products Found
              </h3>
              <p className="text-neutral-45 text-sm max-w-sm">
                Try adjusting your filters or search criteria.
              </p>
            </div>
          ) : (
            // Show products
            products?.map((product: TProduct) => (
              <ProductCard key={product?._id} product={product} />
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default BestSeller;
