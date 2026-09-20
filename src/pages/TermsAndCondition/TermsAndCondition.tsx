import Container from "../../components/Reusable/Container/Container";
import { Link } from "react-router-dom";
import { FiFileText } from "react-icons/fi";

const TermsAndCondition = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms and Conditions - Katha",
    description: "Terms and Conditions for shopping with Katha.",
  };

  return (
    <>
      <title>Terms and Conditions - Katha</title>
      <meta
        name="description"
        content="Read the Terms and Conditions for shopping with Katha. Covers orders, payments, shipping, returns, and more."
      />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <div className="bg-neutral-20 min-h-screen font-Manrope pb-20">
        {/* Hero header */}
        <div className="bg-neutral-10 py-16 md:py-20">
          <Container>
            <div className="flex items-center gap-3 mb-4">
              <FiFileText className="text-primary-10" size={20} />
              <span className="text-[11px] tracking-[0.3em] uppercase text-white/60 font-medium">
                Legal
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-white/60 text-sm md:text-base mt-3 max-w-2xl">
              Please read these terms carefully before using our website or
              placing an order with Katha.
            </p>
            <p className="text-white/40 text-xs mt-4">
              Last updated: 15 September 2026
            </p>
          </Container>
        </div>

        {/* Content */}
        <Container>
          <div className="max-w-4xl mx-auto -mt-8 relative z-10">
            <div className="bg-white rounded-3xl shadow-sm border border-neutral-20 p-6 md:p-10 space-y-8">
              <PolicySection number="1" title="Introduction">
                <p>
                  Welcome to <strong>Katha</strong>. These Terms and Conditions
                  ("Terms") govern your access to and use of our website,
                  products, and services (collectively, the "Services"). By
                  accessing or using the Services, you agree to be bound by
                  these Terms.
                </p>
                <p>
                  Throughout this document, "we", "us", "our", and "Company"
                  refer to Katha. "You", "your", and "Customer" refer to the
                  person accessing the Services.
                </p>
              </PolicySection>

              <PolicySection number="2" title="Eligibility">
                <p>
                  By using our Services, you confirm that you are at least 18
                  years of age, or you are accessing the Services under the
                  supervision of a parent or legal guardian. You must provide
                  accurate, current, and complete information when creating an
                  account or placing an order.
                </p>
              </PolicySection>

              <PolicySection number="3" title="Account Registration">
                <p>
                  You may be required to create an account to access certain
                  features. You are responsible for:
                </p>
                <ul>
                  <li>
                    Maintaining the confidentiality of your account credentials
                  </li>
                  <li>Restricting unauthorized access to your account</li>
                  <li>All activities that occur under your account</li>
                </ul>
                <p>
                  Please notify us immediately of any unauthorized use or
                  security breach.
                </p>
              </PolicySection>

              <PolicySection number="4" title="Products & Pricing">
                <p>
                  All products listed on Katha are described as accurately as
                  possible. However, we do not warrant that product
                  descriptions, colors, images, or other content is completely
                  accurate, complete, reliable, or error-free.
                </p>
                <ul>
                  <li>
                    All prices are listed in <strong>Indian Rupees (INR)</strong>{" "}
                    and are inclusive of applicable GST unless stated otherwise.
                  </li>
                  <li>
                    We reserve the right to change prices at any time without
                    prior notice.
                  </li>
                  <li>
                    In the event of a pricing error, we reserve the right to
                    cancel the order and refund any payment received.
                  </li>
                </ul>
              </PolicySection>

              <PolicySection number="5" title="Orders & Acceptance">
                <p>
                  Placing an order constitutes an offer to purchase. All orders
                  are subject to acceptance by us. We may refuse or cancel any
                  order for reasons including, but not limited to:
                </p>
                <ul>
                  <li>Product availability</li>
                  <li>Errors in product or pricing information</li>
                  <li>Suspected fraudulent activity</li>
                  <li>Failure to authorize payment</li>
                </ul>
                <p>
                  If your order is cancelled, we will refund any amount already
                  paid.
                </p>
              </PolicySection>

              <PolicySection number="6" title="Payments">
                <p>
                  We accept the following payment methods:
                </p>
                <ul>
                  <li>Credit & Debit Cards (via Razorpay)</li>
                  <li>UPI (Unified Payments Interface)</li>
                  <li>Net Banking</li>
                  <li>Wallets (subject to availability)</li>
                  <li>Cash on Delivery (COD) — where applicable</li>
                </ul>
                <p>
                  All online payments are processed through our secure payment
                  partner, <strong>Razorpay</strong>. We do not store your card
                  details on our servers. By making a payment, you agree to
                  Razorpay's terms of service and privacy policy.
                </p>
                <p>
                  In case of failed transactions, the amount will typically be
                  reversed to the original payment method within{" "}
                  <strong>5-7 business days</strong>, as per bank policies.
                </p>
              </PolicySection>

              <PolicySection number="7" title="Shipping & Delivery">
                <p>
                  Orders are processed within{" "}
                  <strong>1-3 business days</strong> from the date of
                  confirmation. Estimated delivery timelines are:
                </p>
                <ul>
                  <li>Metro cities: 3-5 business days</li>
                  <li>Tier 2 & Tier 3 cities: 5-7 business days</li>
                  <li>Remote areas: 7-10 business days</li>
                </ul>
                <p>
                  Delivery timelines may vary due to unforeseen circumstances
                  including courier delays, natural events, or public holidays.
                  Once shipped, tracking details will be shared via email/SMS.
                </p>
              </PolicySection>

              <PolicySection number="8" title="Cancellations & Returns">
                <p>
                  Please refer to our{" "}
                  <Link
                    to="/refund-cancellation-policy"
                    className="text-primary-10 underline hover:text-[#d4892a]"
                  >
                    Refund & Cancellation Policy
                  </Link>{" "}
                  for complete details on order cancellations, returns,
                  replacements, and refunds.
                </p>
              </PolicySection>

              <PolicySection number="9" title="Intellectual Property">
                <p>
                  All content on this website — including logos, product
                  images, text, graphics, and design — is the property of Katha
                  and is protected by Indian and international copyright,
                  trademark, and intellectual property laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, or use any content
                  without our prior written permission.
                </p>
              </PolicySection>

              <PolicySection number="10" title="Prohibited Activities">
                <p>You agree not to:</p>
                <ul>
                  <li>Use the Services for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Post false, misleading, or harmful content</li>
                  <li>Interfere with the proper functioning of the website</li>
                  <li>Resell our products without authorization</li>
                </ul>
              </PolicySection>

              <PolicySection number="11" title="Limitation of Liability">
                <p>
                  To the maximum extent permitted by law, Katha shall not be
                  liable for any indirect, incidental, special, or consequential
                  damages arising from your use of the Services. Our total
                  liability shall not exceed the amount paid by you for the
                  specific order in question.
                </p>
              </PolicySection>

              <PolicySection number="12" title="Governing Law">
                <p>
                  These Terms are governed by the laws of India. Any disputes
                  arising shall be subject to the exclusive jurisdiction of the
                  courts in{" "}
                  <strong>[Your City], [Your State], India</strong>.
                </p>
              </PolicySection>

              <PolicySection number="13" title="Changes to Terms">
                <p>
                  We may update these Terms from time to time. Changes will be
                  effective immediately upon posting. Your continued use of the
                  Services after any change constitutes acceptance of the
                  revised Terms.
                </p>
              </PolicySection>

              <PolicySection number="14" title="Contact Information">
                <p>For questions about these Terms, please contact us:</p>
                <ContactInfo />
              </PolicySection>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

// ─── Reusable sub-components ──────────────────────────────
export const PolicySection = ({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="scroll-mt-24">
    <div className="flex items-baseline gap-3 mb-3">
      <span className="text-xs font-mono text-primary-10 font-bold">
        {number.padStart(2, "0")}
      </span>
      <h2 className="text-lg md:text-xl font-bold text-neutral-10 tracking-tight">
        {title}
      </h2>
    </div>
    <div className="text-sm md:text-[15px] text-neutral-45 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_strong]:text-neutral-10 [&_strong]:font-semibold [&_p]:leading-relaxed">
      {children}
    </div>
  </section>
);

export const ContactInfo = () => (
  <div className="bg-neutral-20 rounded-xl p-4 mt-3 not-prose">
    <div className="space-y-1.5 text-sm">
      <p>
        <strong className="text-neutral-10">Katha</strong>
      </p>
      <p className="text-neutral-45">
        Email:{" "}
        <a
          href="mailto:support@katha.com"
          className="text-primary-10 hover:underline"
        >
          support@katha.com
        </a>
      </p>
      <p className="text-neutral-45">
        Phone:{" "}
        <a href="tel:+919876500000" className="text-primary-10 hover:underline">
          +91 98765 00000
        </a>
      </p>
      <p className="text-neutral-45">
        Address: [Your Business Address], India
      </p>
      <p className="text-neutral-45">
        Business Hours: Mon-Sat, 9:00 AM - 6:00 PM IST
      </p>
    </div>
  </div>
);

export default TermsAndCondition;