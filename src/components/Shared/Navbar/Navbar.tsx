import { Link, useLocation } from "react-router-dom";
import { ICONS, IMAGES } from "../../../assets";
import Container from "../../Reusable/Container/Container";
import Button from "../../Reusable/Button/Button";
import Login from "../../AuthComponents/Login/Login";
import { useState, useEffect, useRef } from "react";
import Modal from "../../Reusable/Modal copy/Modal";
import Signup from "../../AuthComponents/Signup/Signup";

const Navbar = () => {
  const pathname = useLocation().pathname;
  const [authModalType, setAuthModalType] = useState<"login" | "signup">(
    "login",
  );
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  
  // Search placeholder animation
  const [productIndex, setProductIndex] = useState<number>(0);
  const [displayText, setDisplayText] = useState<string>("Search for ");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const typingTimeoutRef = useRef<any | null>(null);

  const productNames = [
    "Brass Elephant",
    "Wooden Decor",
    "Handcrafted Jewelry",
    "Home Decor Items",
    "Traditional Gifts",
    "Brass Diya Set",
    "Wooden Showpiece",
    "Handmade Crafts",
    "Brass Wall Art",
    "Decorative Items",
  ];

  const staticPrefix = "Search for ";

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

  // Typing animation effect
  useEffect(() => {
    const currentProduct = productNames[productIndex];
    const fullText = staticPrefix + currentProduct;

    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    // If paused, wait before continuing
    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 3000); // Hold for 3 seconds
      typingTimeoutRef.current = timeout;
      return () => {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
      };
    }

    // If deleting
    if (isDeleting) {
      // Only delete if text is longer than the static prefix
      if (displayText.length > staticPrefix.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
        }, 30);
        typingTimeoutRef.current = timeout;
        return () => {
          if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
          }
        };
      } else {
        // Finished deleting, move to next product
        setIsDeleting(false);
        const nextIndex = (productIndex + 1) % productNames.length;
        setProductIndex(nextIndex);
        // Start typing the next product immediately
        return;
      }
    }

    // If typing
    if (displayText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => fullText.slice(0, prev.length + 1));
      }, 60);
      typingTimeoutRef.current = timeout;
      return () => {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
      };
    } else if (displayText.length === fullText.length) {
      // Complete text displayed, pause before deleting
      setIsPaused(true);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [displayText, isDeleting, isPaused, productIndex, productNames]);

  // Reset animation when component mounts
  useEffect(() => {
    setDisplayText("Search for ");
    setProductIndex(0);
    setIsDeleting(false);
    setIsPaused(false);
  }, []);

  return (
    <div className="bg-white shadow-navbar font-Manrope py-4">
      <Container>
        <div className="flex items-center justify-between">
          <img src={IMAGES.logo} alt="Logo" className="w-40" />

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

            {/* Search with animated placeholder */}
            <div className="flex py-2.5 items-center rounded-md bg-neutral-20 px-4 w-75 relative overflow-hidden">
              <img src={ICONS.search} alt="Search" className="shrink-0" />
              <input
                type="text"
                placeholder=""
                className="w-full text-sm bg-transparent text-neutral-10 outline-none placeholder:text-neutral-500 ml-1"
                aria-label="Search for handcrafted products"
              />
              {/* Animated placeholder overlay */}
              <div 
                className="absolute left-10 text-sm text-neutral-500 pointer-events-none whitespace-nowrap"
              >
                <span className="inline-block">
                  {displayText}
                  <span 
                    className="inline-block w-0.5 h-4 ml-0.5 bg-neutral-500 animate-blink"
                    style={{
                      display: 'inline-block',
                      opacity: isDeleting ? 0 : 1,
                    }}
                  />
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Cart */}
              <Link
                to="/cart"
                className="bg-neutral-20 size-10 rounded-full flex justify-center items-center text-sm font-medium text-neutral-10 hover:bg-neutral-50 transition-colors"
                aria-label="Cart"
              >
                <img src={ICONS.cart} alt="Cart" className="size-5" />
              </Link>
              <Link
                to="/wishlist"
                className="bg-neutral-20 size-10 rounded-full flex justify-center items-center text-sm font-medium text-neutral-10 hover:bg-neutral-50 transition-colors"
                aria-label="Wishlist"
              >
                <img src={ICONS.wishlist} alt="Wishlist" className="size-5" />
              </Link>

              {/* Profile */}
              <Button
                onClick={() => {
                  setAuthModalType("signup");
                  setIsAuthModalOpen(true);
                }}
                label="Register Now"
              />
            </div>
          </div>
        </div>
      </Container>

      <Modal isModalOpen={isAuthModalOpen} setIsModalOpen={setIsAuthModalOpen}>
        <h2 className="text-2xl font-Satoshi font-semibold text-center text-neutral-5">
          {authModalType === "login" ? "Welcome Back!" : "Create an Account"}
        </h2>
        <p className="text-sm text-center mt-1 mb-8">
          {authModalType === "login"
            ? "Enter your details to login"
            : "Enter your details to create an account"}
        </p>

        {authModalType === "login" && (
          <Login setAuthModalType={setAuthModalType} />
        )}
        {authModalType === "signup" && (
          <Signup setAuthModalType={setAuthModalType} />
        )}
      </Modal>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </div>
  );
};

export default Navbar;