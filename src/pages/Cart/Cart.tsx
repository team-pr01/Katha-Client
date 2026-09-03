import { FiTrash2, FiShoppingBag } from "react-icons/fi";
import Container from "../../components/Reusable/Container/Container";
import CartItems from "../../components/CartPage/CartItems/CartItems";
import EmptyCart from "../../components/CartPage/EmptyCart/EmptyCart";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";
import { useCart } from "../../providers/CartProvider/CartProvider";

const Cart = () => {

  const {
    cartItems,
    clearCart,
    getCartItemCount,
  } = useCart();

  // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Shopping Cart",
    description: "Review your items and proceed to checkout",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "Cart", item: "/cart" },
      ],
    },
  };

  return (
    <>
      {/* SEO */}
      <title>Cart | Katha</title>
      <meta
        name="description"
        content="Review your items, apply coupons, and proceed to checkout. Secure and fast checkout process."
      />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <div className="bg-neutral-20 min-h-screen py-6 md:py-8 font-Manrope">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", path: "/" },
              { label: "Cart", isActive: true },
            ]}
          />

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-neutral-10 flex items-center gap-3">
                <FiShoppingBag className="text-primary-10" size={28} />
                Shopping Cart
              </h1>
              <p className="text-sm text-neutral-45 mt-1">
                {cartItems?.length > 0
                  ? `${getCartItemCount()} item${getCartItemCount() > 1 ? "s" : ""} in your cart`
                  : "Your cart is empty"}
              </p>
            </div>
            {cartItems?.length > 0 && (
              <button
                onClick={clearCart}
                className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
              >
                <FiTrash2 size={16} />
                Clear Cart
              </button>
            )}
          </div>

          {cartItems?.length > 0 ? (
            <CartItems cartItems={cartItems} />
          ) : (
            <EmptyCart />
          )}
        </Container>
      </div>
    </>
  );
};

export default Cart;
