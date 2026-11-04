import { Link, useLocation, useNavigate } from "react-router-dom";
import { ICONS, IMAGES } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import { useCart } from "../../../providers/CartProvider/CartProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  setUser,
  useCurrentUser,
  type TLoggedInUser,
} from "../../../redux/Features/Auth/authSlice";
import { useEffect, useRef, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

const HamburgerMenu = ({ isOpen, onClose, onLoginClick }: HamburgerMenuProps) => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getCartItemCount } = useCart();

  // Search state
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Search placeholder animation (same as Navbar)
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
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Personalized Orders", path: "/personalized-orders" },
    { label: "Track Order", path: "/track-order" },
  ];

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Typing animation effect
  useEffect(() => {
    const currentProduct = productNames[productIndex];
    const fullText = staticPrefix + currentProduct;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 3000);
      typingTimeoutRef.current = timeout;
      return () => {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
      };
    }

    if (isDeleting) {
      if (displayText.length > staticPrefix.length) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, 30);
        typingTimeoutRef.current = timeout;
        return () => {
          if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
          }
        };
      } else {
        setIsDeleting(false);
        const nextIndex = (productIndex + 1) % productNames.length;
        setProductIndex(nextIndex);
        return;
      }
    }

    if (displayText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => fullText.slice(0, prev.length + 1));
      }, 60);
      typingTimeoutRef.current = timeout;
      return () => {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
      };
    } else if (displayText.length === fullText.length) {
      setIsPaused(true);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [displayText, isDeleting, isPaused, productIndex, productNames]);

  // Reset animation when menu opens
  useEffect(() => {
    if (isOpen) {
      setDisplayText("Search for ");
      setProductIndex(0);
      setIsDeleting(false);
      setIsPaused(false);
    }
  }, [isOpen]);

  // Handle search
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedSearch = searchTerm.trim();
      if (trimmedSearch) {
        navigate(`/products?query=${encodeURIComponent(trimmedSearch)}`);
      } else {
        navigate("/products");
      }
      setSearchTerm("");
      onClose();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleLogout = async () => {
    dispatch(setUser({ user: null, token: null }));
    Cookies.remove("accessToken");
    Cookies.remove("role");
    dispatch(logout());
    localStorage.clear();
    onClose();
    navigate("/");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-999 transition-opacity duration-300 xl:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-[80%] max-w-xs bg-white z-999 shadow-xl transition-transform duration-300 ease-in-out xl:hidden flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-50">
          <Link to="/" onClick={onClose}>
            <img src={IMAGES.logo} alt="Logo" className="w-32" />
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="size-9 flex items-center justify-center rounded-full bg-neutral-20 hover:bg-neutral-50 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Search bar */}
        <div className="px-5 pt-4">
          <div className="flex py-2.5 items-center rounded-md bg-neutral-20 px-4 relative overflow-hidden">
            <img src={ICONS.search} alt="Search" className="shrink-0" />
            <input
              type="text"
              placeholder=""
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              className="w-full text-sm bg-transparent text-neutral-10 outline-none placeholder:text-neutral-500 ml-1 relative z-10"
              aria-label="Search for handcrafted products"
            />
            {!searchTerm && (
              <div className="absolute left-10 text-sm text-neutral-500 pointer-events-none whitespace-nowrap">
                <span className="inline-block">
                  {displayText}
                  <span
                    className="inline-block w-0.5 h-4 ml-0.5 bg-neutral-500 animate-blink"
                    style={{
                      display: "inline-block",
                      opacity: isDeleting ? 0 : 1,
                    }}
                  />
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col px-5 py-4 gap-1 overflow-y-auto flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={onClose}
              className={`py-3 px-3 rounded-md text-sm transition duration-300 ${
                pathname === link.path
                  ? "text-primary-10 underline font-semibold bg-neutral-20"
                  : "font-medium text-neutral-10 hover:bg-neutral-20"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Cart */}
          <Link
            to="/cart"
            onClick={onClose}
            className="py-3 px-3 rounded-md text-sm font-medium text-neutral-10 hover:bg-neutral-20 transition-colors flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <img src={ICONS.cart} alt="Cart" className="size-5" />
              Cart
            </span>
            {getCartItemCount() > 0 && (
              <span className="bg-red-500 text-white text-xs font-semibold rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center">
                {getCartItemCount()}
              </span>
            )}
          </Link>
        </nav>

        {/* Footer / Auth */}
        <div className="px-5 py-4 border-t border-neutral-50">
          {user ? (
            <button
              onClick={handleLogout}
              className="
                flex items-center gap-3 w-full px-3 py-2.5 rounded-xl 
                text-sm font-medium text-red-500 
                hover:bg-red-50 transition-all duration-200 group
              "
            >
              <FiLogOut
                size={18}
                className="text-red-500 group-hover:translate-x-0.5 transition-transform duration-200"
              />
              <span className="flex-1 text-left">Logout</span>
            </button>
          ) : (
            <Button
              onClick={() => {
                onLoginClick();
                onClose();
              }}
              label="Login"
            />
          )}
        </div>
      </aside>

      {/* Blink animation for search placeholder */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </>
  );
};

export default HamburgerMenu;