/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
  useCallback,
} from "react";

export type TCartItem = {
  productId: string;
  variantId?: string;
  name: string;
  image: string;
  basePrice: number;
  discountedPrice: number;
  category: string;
  discount?: number;
  size: string;
  color: string;
  packagingStyle: string;
  packagingStylePrice: number;
  quantity: number;
  maxQuantity: number;
};

type TCartContext = {
  cartItems: TCartItem[];
  cartData: TCartItem[]; // Alias for backward compatibility
  addToCart: (item: TCartItem) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  isInCart: (productId: string, variantId?: string) => boolean;
  refreshCart: () => void;
  getPackagingTotal: () => number;
  getPackagingDetails: () => {
    productId: string;
    productName: string;
    packagingStyle: string;
    packagingStylePrice: number;
  }[];
  getSubTotal : () => number
};

const CartContext = createContext<TCartContext | undefined>(undefined);

// Helper to get unique key for cart item
const getCartItemKey = (item: TCartItem) => {
  return item.variantId 
    ? `${item.productId}-${item.variantId}`
    : item.productId;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<TCartItem[]>([]);

  // Load cart from localStorage
  const loadCart = useCallback(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const parsed = JSON.parse(storedCart);
        setCartItems(Array.isArray(parsed) ? parsed : []);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCartItems([]);
    }
  }, []);

  // Add item to cart
  const addToCart = useCallback((item: TCartItem) => {
    const itemKey = getCartItemKey(item);
    
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => {
        const iKey = getCartItemKey(i);
        return iKey === itemKey;
      });
      
      let updatedItems: TCartItem[];
      if (existingItemIndex !== -1) {
        // Update existing item - increment quantity
        updatedItems = prevItems.map((i, index) =>
          index === existingItemIndex
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      } else {
        // Add new item
        const newItem = {
          ...item,
          quantity: item.quantity || 1,
        };
        updatedItems = [...prevItems, newItem];
      }
      
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: updatedItems }));
      
      return updatedItems;
    });
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((productId: string, variantId?: string) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => {
        if (variantId) {
          // Remove specific variant
          return !(item.productId === productId && item.variantId === variantId);
        }
        // Remove all items with this productId (no variant specified)
        return item.productId !== productId;
      });
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: updatedItems }));
      return updatedItems;
    });
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((productId: string, quantity: number, variantId?: string) => {
    if (quantity < 1) {
      removeFromCart(productId, variantId);
      return;
    }
    
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        // Match by productId AND variantId (if provided)
        const isMatch = variantId 
          ? (item.productId === productId && item.variantId === variantId)
          : (item.productId === productId && !item.variantId);
        
        return isMatch ? { ...item, quantity } : item;
      });
      
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: updatedItems }));
      return updatedItems;
    });
  }, [removeFromCart]);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.setItem("cart", JSON.stringify([]));
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: [] }));
  }, []);

  const getSubTotal = useCallback(() => {
  return cartItems.reduce((total, item) => {
    const price = item.discountedPrice || item.basePrice;
    return total + price * item.quantity;
  }, 0);
}, [cartItems]);

  // Get cart total
  const getCartTotal = useCallback(() => {
  return cartItems.reduce((total, item) => {
    const price = item.discountedPrice || item.basePrice;
    const packagingPrice = item.packagingStylePrice || 0;
    return total + (price + packagingPrice) * item.quantity;
  }, 0);
}, [cartItems]);

const getPackagingTotal = useCallback(() => {
  return cartItems.reduce((total, item) => {
    const packagingPrice = item.packagingStylePrice || 0;
    return total + packagingPrice * item.quantity;
  }, 0);
}, [cartItems]);


const getPackagingDetails = useCallback(() => {
  return cartItems.map(item => ({
    productId: item.productId,
    productName: item.name,
    packagingStyle: item.packagingStyle,
    packagingStylePrice: item.packagingStylePrice || 0,
    quantity: item.quantity,
    totalPackagingPrice: (item.packagingStylePrice || 0) * item.quantity,
  }));
}, [cartItems]);

  // Get total item count (sum of all quantities)
  const getCartItemCount = useCallback(() => {
    return cartItems.length;
  }, [cartItems]);

  // Check if item is in cart
  const isInCart = useCallback((productId: string, variantId?: string) => {
    return cartItems.some((item) => {
      if (variantId) {
        return item.productId === productId && item.variantId === variantId;
      }
      return item.productId === productId && !item.variantId;
    });
  }, [cartItems]);

  // Refresh cart
  const refreshCart = useCallback(() => {
    loadCart();
  }, [loadCart]);

  // Load cart on mount
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Listen to storage changes (for other tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cart") {
        loadCart();
      }
    };

    // Listen to custom event for same-tab updates
    const handleCartUpdate = (e: CustomEvent) => {
      setCartItems(e.detail);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener('cartUpdated' as any, handleCartUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener('cartUpdated' as any, handleCartUpdate);
    };
  }, [loadCart]);

  const contextValue: TCartContext = {
    cartItems,
    cartData: cartItems, // Alias for backward compatibility
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getSubTotal,
    getCartTotal,
    getCartItemCount,
    isInCart,
    refreshCart,
    getPackagingTotal,
    getPackagingDetails,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};