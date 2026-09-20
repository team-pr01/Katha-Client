import Container from "../../components/Reusable/Container/Container";
import { FiLock } from "react-icons/fi";
import { ContactInfo, PolicySection } from "../TermsAndCondition/TermsAndCondition";

const PrivacyPolicy = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy - Katha",
    description:
      "Privacy Policy explaining how Katha collects, uses, and protects your personal information.",
  };

  return (
    <>
      <title>Privacy Policy - Katha</title>
      <meta
        name="description"
        content="Read Katha's Privacy Policy. Learn how we collect, use, and protect your personal information."
      />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <div className="bg-neutral-20 min-h-screen font-Manrope pb-20">
        {/* Hero */}
        <div className="bg-neutral-10 py-16 md:py-20">
          <Container>
            <div className="flex items-center gap-3 mb-4">
              <FiLock className="text-primary-10" size={20} />
              <span className="text-[11px] tracking-[0.3em] uppercase text-white/60 font-medium">
                Legal
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-white/60 text-sm md:text-base mt-3 max-w-2xl">
              Your privacy matters. This policy explains what data we collect,
              why, and how we protect it.
            </p>
            <p className="text-white/40 text-xs mt-4">
              Last updated: 15 September 2026
            </p>
          </Container>
        </div>

        <Container>
          <div className="max-w-4xl mx-auto -mt-8 relative z-10">
            <div className="bg-white rounded-3xl shadow-sm border border-neutral-20 p-6 md:p-10 space-y-8">
              <PolicySection number="1" title="Introduction">
                <p>
                  Katha ("we", "us", "our") respects your privacy and is
                  committed to protecting the personal information you share
                  with us. This Privacy Policy describes how we collect, use,
                  and safeguard your information when you visit our website or
                  make a purchase.
                </p>
                <p>
                  By using our Services, you consent to the practices described
                  in this policy.
                </p>
              </PolicySection>

              <PolicySection number="2" title="Information We Collect">
                <p>We collect the following types of information:</p>
                <p>
                  <strong>Personal Information:</strong>
                </p>
                <ul>
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Shipping and billing address</li>
                  <li>Order history and preferences</li>
                </ul>
                <p>
                  <strong>Payment Information:</strong>
                </p>
                <ul>
                  <li>
                    Payment method details are processed directly by our
                    payment gateway partner, <strong>Razorpay</strong>
                  </li>
                  <li>
                    We <strong>do not store</strong> your full card number, CVV,
                    or UPI credentials on our servers
                  </li>
                </ul>
                <p>
                  <strong>Automatically Collected Data:</strong>
                </p>
                <ul>
                  <li>IP address, browser type, device information</li>
                  <li>Pages visited, time spent, referring URLs</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </PolicySection>

              <PolicySection number="3" title="How We Use Your Information">
                <p>Your information is used for:</p>
                <ul>
                  <li>Processing and fulfilling your orders</li>
                  <li>Communicating order status and delivery updates</li>
                  <li>Responding to customer service enquiries</li>
                  <li>Personalizing your shopping experience</li>
                  <li>Sending promotional offers (only with your consent)</li>
                  <li>Preventing fraud and securing our platform</li>
                  <li>Complying with legal and regulatory requirements</li>
                </ul>
              </PolicySection>

              <PolicySection number="4" title="How We Share Your Information">
                <p>
                  We <strong>do not sell, rent, or trade</strong> your personal
                  information. We may share it only with trusted third parties
                  strictly for the purposes below:
                </p>
                <ul>
                  <li>
                    <strong>Payment Processors:</strong> Razorpay (for secure
                    payment processing)
                  </li>
                  <li>
                    <strong>Logistics Partners:</strong> Courier companies (for
                    order delivery)
                  </li>
                  <li>
                    <strong>Service Providers:</strong> Cloud hosting, email,
                    SMS, analytics
                  </li>
                  <li>
                    <strong>Legal Authorities:</strong> When required by law
                  </li>
                </ul>
                <p>
                  All third parties are bound by strict confidentiality
                  agreements and only receive the minimum information necessary.
                </p>
              </PolicySection>

              <PolicySection number="5" title="Cookies & Tracking">
                <p>
                  We use cookies and similar technologies to enhance your
                  browsing experience. Cookies help us:
                </p>
                <ul>
                  <li>Remember your login and cart contents</li>
                  <li>Understand how you navigate our website</li>
                  <li>Personalize product recommendations</li>
                  <li>Measure the effectiveness of our marketing</li>
                </ul>
                <p>
                  You can disable cookies through your browser settings, though
                  some features may not work properly.
                </p>
              </PolicySection>

              <PolicySection number="6" title="Data Security">
                <p>
                  We implement industry-standard security measures, including:
                </p>
                <ul>
                  <li>
                    <strong>SSL/TLS encryption</strong> for all data transmission
                  </li>
                  <li>
                    <strong>PCI-DSS compliant</strong> payment processing via
                    Razorpay
                  </li>
                  <li>Secure servers with firewalls and access controls</li>
                  <li>Regular security audits and monitoring</li>
                </ul>
                <p>
                  While we take reasonable precautions, no method of
                  transmission over the internet is 100% secure. We cannot
                  guarantee absolute security.
                </p>
              </PolicySection>

              <PolicySection number="7" title="Your Rights">
                <p>You have the right to:</p>
                <ul>
                  <li>Access the personal information we hold about you</li>
                  <li>Request corrections to inaccurate data</li>
                  <li>Request deletion of your account and data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Object to certain types of data processing</li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us at{" "}
                  <a
                    href="mailto:support.katha@gmail.com"
                    className="text-primary-10 hover:underline"
                  >
                    support.katha@gmail.com
                  </a>
                  .
                </p>
              </PolicySection>

              <PolicySection number="8" title="Third-Party Links">
                <p>
                  Our website may contain links to third-party websites. We are
                  not responsible for the privacy practices or content of those
                  sites. We encourage you to review their policies before
                  sharing any information.
                </p>
              </PolicySection>

              <PolicySection number="9" title="Children's Privacy">
                <p>
                  Our Services are not directed to individuals under the age of
                  18. We do not knowingly collect personal information from
                  children. If you believe we have inadvertently collected such
                  information, please contact us so we can delete it.
                </p>
              </PolicySection>

              <PolicySection number="10" title="Changes to This Policy">
                <p>
                  We may update this Privacy Policy from time to time. When we
                  do, we will revise the "Last updated" date at the top of this
                  page. Continued use of our Services after changes constitutes
                  acceptance.
                </p>
              </PolicySection>

              <PolicySection number="11" title="Contact Us">
                <p>
                  For questions or concerns about this Privacy Policy, please
                  reach out to us:
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

export default PrivacyPolicy;