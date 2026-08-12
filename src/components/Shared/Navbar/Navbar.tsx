import { Link, useLocation } from "react-router-dom";
import { ICONS, IMAGES } from "../../../assets";
import Container from "../../Reusable/Container/Container";
import Button from "../../Reusable/Button/Button";

const Navbar = () => {
  const pathname = useLocation().pathname;

  const navLinks = [
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
      path: "/bulk-orders",
    },
  ];

  return (
    <div className="bg-white shadow-navbar font-Manrope py-4">
      <Container>
        <div className="flex items-center justify-between">
          <img src={IMAGES.logo} alt="" />

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link?.label}
                  to={link?.path}
                  className={`text-sm transition duration-300 hover hover:text-primary-10 ${pathname === link?.path ? "text-primary-10 underline font-semibold" : "font-medium text-neutral-10"}`}
                >
                  {link?.label}
                </Link>
              ))}
            </div>
            {/* Search */}
            <div className="flex py-2.5 items-center rounded-md bg-neutral-20 px-4 w-[300px]">
              <img src={ICONS.search} alt="" />

              <input
                type="text"
                placeholder="Search for handcrafted products"
                className="w-full text-sm bg-transparent text-neutral-10 outline-none placeholder:text-neutral-500 ml-1"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Cart */}
              <Link
                to="/cart"
                className="bg-neutral-20 size-10 rounded-full flex justify-center items-center text-sm font-medium text-neutral-10"
              >
                <img src={ICONS.cart} alt="" className="size-5" />
              </Link>

              {/* Profile */}
              <Link to="/products">
                <Button label="Explore Now" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
