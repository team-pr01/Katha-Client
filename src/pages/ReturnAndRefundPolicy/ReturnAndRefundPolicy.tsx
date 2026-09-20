import Container from "../../components/Reusable/Container/Container";
import { FiRefreshCw } from "react-icons/fi";
import { ContactInfo, PolicySection } from "../TermsAndCondition/TermsAndCondition";

const ReturnAndRefundPolicy = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Return & Refund Policy - Katha",
    description:
      "Return and Refund Policy for orders placed with Katha. 7-day return window with clear conditions.",
  };

  return (
    <>
      <title>Return & Refund Policy - Katha</title>
      <meta
        name="description"
        content="Read Katha's Return & Refund Policy. We accept returns within 7 days of delivery. Learn about eligibility, process, and refund timelines."
      />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <div className="bg-neutral-20 min-h-screen font-Manrope pb-20">
        {/* Hero */}
        <div className="bg-neutral-10 py-16 md:py-20">
          <Container>
            <div className="flex items-center gap-3 mb-4">
              <FiRefreshCw className="text-primary-10" size={20} />
              <span className="text-[11px] tracking-[0.3em] uppercase text-white/60 font-medium">
                Legal
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Return & Refund Policy
            </h1>
            <p className="text-white/60 text-sm md:text-base mt-3 max-w-2xl">
              We offer a hassle-free 7-day return window on eligible products.
              Here's everything you need to know.
            </p>
            <p className="text-white/40 text-xs mt-4">
              Last updated: 15 September 2026
            </p>
          </Container>
        </div>

        <Container>
          <div className="max-w-4xl mx-auto -mt-8 relative z-10">
            <div className="bg-white rounded-3xl shadow-sm border border-neutral-20 p-6 md:p-10 space-y-8">
              <PolicySection number="1" title="Overview">
                <p>
                  At <strong>Katha</strong>, we want you to be completely
                  satisfied with your purchase. If for any reason you are not
                  happy with your order, we offer a{" "}
                  <strong>7-day return window</strong> from the date of
                  delivery.
                </p>
                <p>
                  <strong>Important:</strong> Returns are{" "}
                  <strong>strictly not accepted after 7 days</strong> from the
                  date of delivery, regardless of the reason.
                </p>
              </PolicySection>

              <PolicySection number="2" title="Return Window">
                <div className="bg-primary-10/5 border border-primary-10/20 rounded-xl p-4 not-prose">
                  <p className="text-sm text-neutral-10 leading-relaxed">
                    <strong className="text-primary-10">7-Day Return Window</strong>
                    <br />
                    You must initiate a return request within{" "}
                    <strong>7 calendar days</strong> from the date of delivery.
                    Requests raised after this window will not be accepted.
                  </p>
                </div>
              </PolicySection>

              <PolicySection number="3" title="Return Eligibility">
                <p>
                  To be eligible for a return, the following conditions must be
                  met:
                </p>
                <ul>
                  <li>
                    Return request is raised within{" "}
                    <strong>7 days of delivery</strong>
                  </li>
                  <li>
                    The product is <strong>unused, undamaged, and in its
                    original condition</strong>
                  </li>
                  <li>
                    Original packaging, tags, invoices, and accessories are
                    intact
                  </li>
                  <li>
                    Proof of purchase (order ID or invoice) is available
                  </li>
                  <li>
                    The item is <strong>not</strong> from the{" "}
                    <strong>non-returnable category</strong> (see Section 5)
                  </li>
                </ul>
              </PolicySection>

              <PolicySection number="4" title="How to Initiate a Return">
                <p>To request a return, follow these steps:</p>
                <ol>
                  <li>
                    Email{" "}
                    <a
                      href="mailto:support.katha@gmail.com"
                      className="text-primary-10 hover:underline"
                    >
                      support.katha@gmail.com
                    </a>{" "}
                    within <strong>7 days of delivery</strong> with your Order
                    ID and reason for return.
                  </li>
                  <li>
                    Our team will review your request and respond within{" "}
                    <strong>24-48 hours</strong>.
                  </li>
                  <li>
                    Upon approval, we will arrange a{" "}
                    <strong>free pickup</strong> from your delivery address
                    (where available).
                  </li>
                  <li>
                    Pack the item securely in its original packaging and hand
                    it over to the pickup partner.
                  </li>
                  <li>
                    Once we receive and inspect the item, we will process your
                    refund or replacement.
                  </li>
                </ol>
              </PolicySection>

              <PolicySection number="5" title="Non-Returnable Items">
                <p>The following items cannot be returned or exchanged:</p>
                <ul>
                  <li>
                    Customized or personalized products (unless defective or
                    damaged)
                  </li>
                  <li>
                    Items damaged due to misuse, improper handling, or normal
                    wear and tear
                  </li>
                  <li>
                    Products without original packaging, tags, or accessories
                  </li>
                  <li>Hygiene-sensitive or intimate products</li>
                  <li>Items marked as "Final Sale" or "Non-Returnable"</li>
                  <li>
                    Returns requested <strong>after the 7-day window</strong>
                  </li>
                </ul>
              </PolicySection>

              <PolicySection number="6" title="Refund Process & Timelines">
                <p>
                  Once your returned item is received and inspected, we will
                  notify you of the approval or rejection of your refund.
                </p>
                <p>
                  <strong>Approved refunds will be processed as follows:</strong>
                </p>
                <ul>
                  <li>
                    <strong>UPI / Net Banking / Cards:</strong> 5-7 business
                    days after approval
                  </li>
                  <li>
                    <strong>Cash on Delivery orders:</strong> Refunded via bank
                    transfer (please share your bank details with our support
                    team)
                  </li>
                  <li>
                    <strong>Katha Store Credit:</strong> Instant credit if you
                    choose store credit instead of a refund
                  </li>
                </ul>
                <p>
                  Refund timelines may vary based on your bank or payment
                  provider. If you do not receive your refund within{" "}
                  <strong>10 business days</strong> after approval, please
                  contact us.
                </p>
              </PolicySection>

              <PolicySection number="7" title="Damaged or Defective Products">
                <p>
                  If you receive a damaged or defective product, please:
                </p>
                <ul>
                  <li>
                    Contact us within{" "}
                    <strong>48 hours of delivery</strong>
                  </li>
                  <li>
                    Provide clear photos/videos of the damage along with your
                    order ID
                  </li>
                  <li>
                    Do not use, wash, or alter the product before reporting the
                    issue
                  </li>
                </ul>
                <p>
                  We will arrange a <strong>free replacement</strong> or a{" "}
                  <strong>full refund</strong> at no additional cost to you.
                </p>
              </PolicySection>

              <PolicySection number="8" title="Wrong Item Received">
                <p>
                  If you receive an incorrect item, please notify us within{" "}
                  <strong>48 hours of delivery</strong>. We will arrange a free
                  pickup of the wrong item and dispatch the correct item at the
                  earliest.
                </p>
              </PolicySection>

              <PolicySection number="9" title="Return Shipping Charges">
                <ul>
                  <li>
                    <strong>Damaged / defective / wrong item:</strong> We bear
                    all shipping costs
                  </li>
                  <li>
                    <strong>Change of mind / other returns:</strong> Free pickup
                    is available for most pin codes; in rare cases, a nominal
                    return shipping fee may apply
                  </li>
                </ul>
              </PolicySection>

              <PolicySection number="10" title="Cancellation">
                <p>
                  Orders can be cancelled <strong>free of charge within 12 hours</strong>{" "}
                  of placement, provided they have not been dispatched. Once
                  shipped, cancellation is not possible — you may refuse
                  delivery or initiate a return as per this policy.
                </p>
                <p>
                  If Katha cancels an order due to stock unavailability or
                  other internal reasons, a{" "}
                  <strong>100% refund</strong> will be issued to the original
                  payment method.
                </p>
              </PolicySection>

              <PolicySection number="11" title="Chargebacks & Disputes">
                <p>
                  We request that you contact us directly before initiating a
                  chargeback with your bank or payment provider. We will always
                  try to resolve any issue fairly and quickly. Unwarranted
                  chargebacks may result in account suspension.
                </p>
              </PolicySection>

              <PolicySection number="12" title="Contact Us">
                <p>
                  For any questions about returns, refunds, or cancellations,
                  please reach out to us:
                </p>
                <ContactInfo />
              </PolicySection>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ReturnAndRefundPolicy;