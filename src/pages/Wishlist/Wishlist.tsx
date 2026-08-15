import { Link } from "react-router-dom";
import Container from "../../components/Reusable/Container/Container";
import { FiShoppingBag, FiTrash2 } from "react-icons/fi";
import ProductCard from "../../components/HomePage/BestSeller/ProductCard";

const Wishlist: React.FC = () => {
  // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Wishlist",
    description: "Save your favorite products for later",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Wishlist",
          item: "/wishlist",
        },
      ],
    },
  };

  const wishlistItems = [1, 2, 3, 4];
  const items = 2;

  return (
    <>
      {/* SEO */}
      <title>My Wishlist - Hanji Finance</title>
      <meta
        name="description"
        content="Save and manage your favorite products. View your wishlist, move items to cart, and never miss out on your desired items."
      />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <div className="bg-neutral-20 min-h-screen py-6 md:py-8">
        <Container>
          {/* Breadcrumbs */}
          <nav
            className="flex items-center gap-2 text-sm mb-6"
            aria-label="Breadcrumb"
          >
            <Link
              to="/"
              className="text-neutral-45 hover:text-primary-10 transition-colors"
            >
              Home
            </Link>
            <span className="text-neutral-45">/</span>
            <span className="text-neutral-10 font-medium">Wishlist</span>
          </nav>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-neutral-10 flex items-center gap-3">
                <FiShoppingBag className="text-primary-10" size={28} />
                My Wishlist
              </h1>
              <p className="text-sm text-neutral-45 mt-1">
                {wishlistItems.length > 0
                  ? `${items} item${items > 1 ? "s" : ""} in your favorite list`
                  : "Your wishlist is empty"}
              </p>
            </div>
            {wishlistItems.length > 0 && (
              <button className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors">
                <FiTrash2 size={16} />
                Clear Wishlist
              </button>
            )}
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
                {[1, 2, 3, 4, 5, 6].map((item: number) => (
                  <ProductCard key={item} />
                ))}
              </div>
        </Container>
      </div>
    </>
  );
};

export default Wishlist;
