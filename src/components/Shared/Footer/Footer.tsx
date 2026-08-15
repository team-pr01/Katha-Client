import { FaInstagram } from "react-icons/fa";
import { ICONS, IMAGES } from "../../../assets";
import Container from "../../Reusable/Container/Container";
import { LiaFacebook } from "react-icons/lia";
import { RiYoutubeLine } from "react-icons/ri";

const Footer = () => {
  const socialMediaDetails = [
    {
      icon: <LiaFacebook className="text-3xl" />,
      href: "https://www.facebook.com/hanjifinance/",
      label: "Facebook",
    },
    {
      icon: <FaInstagram className="text-2xl" />,
      href: "https://www.instagram.com/hanjifinance/",
      label: "Instagram",
    },
    {
      icon: <RiYoutubeLine className="text-[27px]" />,
      href: "https://www.youtube.com/hanjifinance/",
      label: "YouTube",
    },
  ];

  const quickLinks = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Products",
      path: "/products",
    },
    {
      label: "Personalized Orders",
      path: "/personalized-orders",
    },
    {
      label: "Order In Bulk",
      path: "/order-in-bulk",
    },
    {
      label: "Cart",
      path: "/cart",
    },
    {
      label: "Wishlist",
      path: "/wishlist",
    },
  ];

  const occasions = [
    {
      label: "Wedding",
      path: "/occasions/wedding",
    },
    {
      label: "Anniversary",
      path: "/occasions/anniversary",
    },
    {
      label: "Baby Shower",
      path: "/occasions/baby-shower",
    },
    {
      label: "Birthday",
      path: "/occasions/birthday",
    },
    {
      label: "Farewell",
      path: "/occasions/farewell",
    },
    {
      label: "Festival",
      path: "/occasions/festival",
    },
    {
      label: "Housewarming",
      path: "/occasions/housewarming",
    },
  ];

  const contactDetails = [
    {
      icon: ICONS.location,
      text: "Maharashtra 400001, India",
    },
    {
      icon: ICONS.phone,
      text: "+91 98765 00000",
      href: "tel:+919876500000",
    },
    {
      icon: ICONS.email,
      text: "info@kathacelebrations.com",
      href: "mailto:info@kathacelebrations.com",
    },
  ];

  return (
    <div className="py-14 font-Manrope relative h-120">
      <img
        src={IMAGES.footerBg}
        alt="Footer Background"
        className="absolute top-0 bottom-0 w-full h-full object-cover"
      />
      <Container>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-8 xl:gap-19 justify-between">
            {/* Left Column - Brand */}
            <div className="max-w-[320px]">
              <img src={IMAGES.logo} alt="Hanjifinance" className="w-20" />
              <p className="text-neutral-90 text-sm leading-5 mt-8">
                At Katha, every handcrafted piece tells a story of India's rich
                heritage and skilled craftsmanship. We create timeless designs
                that celebrate authenticity, quality, and the beauty of handmade
                artistry.
              </p>
              {/* Social links */}
              <div className="flex items-center gap-6 mt-9">
                {socialMediaDetails?.map((item, index) => (
                  <a
                    key={index}
                    href={item?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item?.label}
                    className="text-2xl text-neutral-90 hover:text-primary-20 transition-all duration-300 delay-100 transform hover:-translate-y-1"
                  >
                    {item?.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h2 className="text-neutral-90 text-[17px] font-semibold leading-5">
                Quick Links
              </h2>
              <div className="mt-6 flex flex-col gap-3">
                {quickLinks?.map((item) => (
                  <a
                    key={item?.label}
                    href={item?.path}
                    className="text-neutral-90 text-[15px] leading-6 hover:underline w-fit font-medium"
                  >
                    {item?.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Occasions Column */}
            <div>
              <h2 className="text-neutral-90 text-[17px] font-semibold leading-5">
                Occasions
              </h2>
              <div className="mt-6 flex flex-col gap-3">
                {occasions?.map((item) => (
                  <a
                    key={item?.label}
                    href={item?.path}
                    className="text-neutral-90 text-[15px] leading-6 hover:underline w-fit font-medium"
                  >
                    {item?.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info Column */}
            <div>
              <h2 className="text-neutral-90 text-[17px] font-semibold leading-5">
                Contact Us
              </h2>
              <div className="mt-6 flex flex-col gap-4 font-medium">
                {contactDetails?.map((item, index) =>
                  item?.href ? (
                    <a
                      key={index}
                      href={item?.href}
                      className={`text-neutral-90 text-[15px] leading-5 w-fit max-w-93 hover:underline flex gap-4 ${
                        index === 0 ? "items-start" : "items-center"
                      }`}
                    >
                      <img
                        src={item?.icon}
                        alt=""
                        className="size-5 mt-0.5 shrink-0"
                      />
                      <span>{item?.text}</span>
                    </a>
                  ) : (
                    <div
                      key={index}
                      className={`text-neutral-90 text-[15px] leading-6 max-w-93 flex gap-4 ${
                        index === 0 ? "items-start" : "items-center"
                      }`}
                    >
                      <img
                        src={item?.icon}
                        alt=""
                        className="size-5 mt-0.5 shrink-0"
                      />
                      <span>{item?.text}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          <img src={IMAGES.footerDivider} alt="" className="w-full my-6" />
          <p className="text-neutral-10 font-semibold text-sm leading-5 text-center">
            All rights reserved © Katha 2026
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
