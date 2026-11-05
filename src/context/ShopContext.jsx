import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../data/products';
import { INITIAL_COUPONS } from '../data/initialData';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Cart state persisted in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('taatxaal_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Wishlist state persisted in localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('taatxaal_wishlist');
      return saved ? JSON.parse(saved) : ["tx-muga-01", "tx-pat-02"];
    } catch (e) {
      return ["tx-muga-01", "tx-pat-02"];
    }
  });

  // Active coupon
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('taatxaal_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // UI Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('taatxaal_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('taatxaal_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('taatxaal_coupon', JSON.stringify(appliedCoupon));
  }, [appliedCoupon]);

  // Toast notification helper
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product, quantity = 1, customSpecs = null) => {
    setCart((prevCart) => {
      // For custom items, generate unique cart item key
      const itemKey = customSpecs 
        ? `custom-${Date.now()}` 
        : product.id;

      const existingIndex = prevCart.findIndex((item) => !customSpecs && item.id === product.id);

      if (existingIndex > -1 && !customSpecs) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            ...product,
            cartId: itemKey,
            quantity,
            customSpecs: customSpecs || null,
            addedAt: new Date().toISOString()
          }
        ];
      }
    });

    addToast(`"${product.name}" has been added to your shopping bag.`);
    setIsCartDrawerOpen(true);
  };

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartId === cartId || item.id === cartId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId && item.id !== cartId));
    addToast('Item removed from shopping bag.', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from your wishlist.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Added to your wishlist!');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Coupon handling
  const applyCoupon = (code) => {
    const coupon = INITIAL_COUPONS.find(
      (c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive
    );

    if (!coupon) {
      addToast('Invalid coupon code. Try "BOHAG10" or "BRIDAL15".', 'error');
      return { success: false, message: 'Invalid coupon' };
    }

    if (cartSubtotal < coupon.minOrder) {
      addToast(`This coupon requires a minimum bag value of ₹${coupon.minOrder.toLocaleString('en-IN')}`, 'error');
      return { success: false, message: 'Minimum order not met' };
    }

    setAppliedCoupon(coupon);
    addToast(`Coupon "${coupon.code}" applied! You saved ${coupon.discountPercent}%.`, 'success');
    return { success: true };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed.', 'info');
  };

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = appliedCoupon 
    ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100) 
    : 0;
  const shippingFee = cartSubtotal >= 10000 || cartSubtotal === 0 ? 0 : 500;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);
  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Quick view
  const openQuickView = (product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        appliedCoupon,
        cartSubtotal,
        discountAmount,
        shippingFee,
        cartTotal,
        totalItemCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isSearchOpen,
        setIsSearchOpen,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};

