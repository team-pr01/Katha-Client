import { useState } from "react";
import { FiTrash2, FiShoppingBag } from "react-icons/fi";
import Container from "../../components/Reusable/Container/Container";
import { IMAGES } from "../../assets";
import CartItems from "../../components/CartPage/CartItems/CartItems";
import EmptyCart from "../../components/CartPage/EmptyCart/EmptyCart";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";

const Cart = () => {
  const [cartItems, setCartItems] = useState<any>([
    {
      id: "1",
      name: "The Jewel Embedded Brass Elephant",
      image: IMAGES.anniversary,
      price: 200,
      originalPrice: 2000,
      quantity: 1,
      size: "Medium",
      color: "Brass",
      inStock: true,
      maxQuantity: 10,
    },
    {
      id: "2",
      name: "Handcrafted Brass Diya Set",
      image: IMAGES.anniversary,
      price: 899,
      quantity: 2,
      size: "Classic",
      color: "Brass",
      inStock: true,
      maxQuantity: 5,
    },
    {
      id: "3",
      name: "Brass Peacock Showpiece",
      image: IMAGES.anniversary,
      price: 3499,
      originalPrice: 4200,
      quantity: 1,
      size: "Large",
      color: "Brass",
      inStock: false,
      maxQuantity: 3,
    },
  ]);

  const handleClearCart = (): void => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      setCartItems([]);
    }
  };

  const itemCount = cartItems.reduce(
    (sum: any, item: any) => sum + item.quantity,
    0,
  );

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
                {cartItems.length > 0
                  ? `${itemCount} item${itemCount > 1 ? "s" : ""} in your cart`
                  : "Your cart is empty"}
              </p>
            </div>
            {cartItems.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
              >
                <FiTrash2 size={16} />
                Clear Cart
              </button>
            )}
          </div>

          {cartItems.length > 0 ? (
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
