import { Link } from "react-router-dom";
import { useRef } from "react";
import Container from "../../components/Reusable/Container/Container";
import OrderSummary from "../../components/CheckoutPage/OrderSummary/OrderSummary";
import CheckoutForm, { type CheckoutFormRef } from "../../components/CheckoutPage/CheckoutForm/CheckoutForm";

const Checkout: React.FC = () => {
  const formRef = useRef<CheckoutFormRef>(null);

  // SEO Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Checkout - Complete Your Order",
    description: "Review your order and complete your purchase securely.",
  };

  return (
    <>
      <title>Checkout - Complete Your Order | Katha</title>
      <meta
        name="description"
        content="Complete your purchase securely. Enter your shipping details and review your order before placing."
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
            <Link
              to="/cart"
              className="text-neutral-45 hover:text-primary-10 transition-colors"
            >
              Cart
            </Link>
            <span className="text-neutral-45">/</span>
            <span className="text-neutral-10 font-medium">Checkout</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column - Form */}
            <CheckoutForm ref={formRef} />

            {/* Right Column - Order Summary */}
            <OrderSummary formRef={formRef} />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Checkout;