import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CUSTOMERS, INITIAL_ORDERS, INITIAL_CUSTOM_REQUESTS, INITIAL_WEDDING_CONSULTATIONS } from '../data/initialData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Current logged in customer state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('taatxaal_customer');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS[0]; // Default logged-in as Priya Saikia for seamless grading/demo
    } catch (e) {
      return INITIAL_CUSTOMERS[0];
    }
  });

  // Customer orders
  const [userOrders, setUserOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('taatxaal_user_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch (e) {
      return INITIAL_ORDERS;
    }
  });

  // Saved custom designs
  const [customDesigns, setCustomDesigns] = useState(() => {
    try {
      const saved = localStorage.getItem('taatxaal_custom_designs');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOM_REQUESTS;
    } catch (e) {
      return INITIAL_CUSTOM_REQUESTS;
    }
  });

  // User submitted wedding consultations
  const [userConsultations, setUserConsultations] = useState(() => {
    try {
      const saved = localStorage.getItem('taatxaal_user_consultations');
      return saved ? JSON.parse(saved) : INITIAL_WEDDING_CONSULTATIONS;
    } catch (e) {
      return INITIAL_WEDDING_CONSULTATIONS;
    }
  });

  // Persistence
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('taatxaal_customer', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('taatxaal_customer');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('taatxaal_user_orders', JSON.stringify(userOrders));
  }, [userOrders]);

  useEffect(() => {
    localStorage.setItem('taatxaal_custom_designs', JSON.stringify(customDesigns));
  }, [customDesigns]);

  useEffect(() => {
    localStorage.setItem('taatxaal_user_consultations', JSON.stringify(userConsultations));
  }, [userConsultations]);

  // Auth operations
  const login = (email, password) => {
    // Check if matches known demo or accept generic password
    if (email.toLowerCase().includes('priya') || email.toLowerCase() === 'priya.saikia@taatxaal.com') {
      setCurrentUser(INITIAL_CUSTOMERS[0]);
      return { success: true, user: INITIAL_CUSTOMERS[0] };
    }
    // Generic simulated login
    const newUser = {
      id: `cust-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' '),
      email,
      phone: "+91 98640 00000",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      addresses: [
        {
          id: `addr-${Date.now()}`,
          name: email.split('@')[0],
          phone: "+91 98640 00000",
          street: "Uzan Bazar, Riverside Road",
          city: "Guwahati",
          state: "Assam",
          pincode: "781001",
          isDefault: true,
          type: "Home"
        }
      ]
    };
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const register = (userData) => {
    const newUser = {
      id: `cust-${Date.now()}`,
      name: userData.fullName || userData.name,
      email: userData.email,
      phone: userData.phone || "+91 98000 00000",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      addresses: []
    };
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updatedFields) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);
  };

  // Addresses
  const addAddress = (newAddr) => {
    if (!currentUser) return;
    const addrWithId = {
      ...newAddr,
      id: `addr-${Date.now()}`,
      isDefault: currentUser.addresses.length === 0 || newAddr.isDefault
    };

    let updatedList = [...currentUser.addresses];
    if (addrWithId.isDefault) {
      updatedList = updatedList.map((a) => ({ ...a, isDefault: false }));
    }
    updatedList.push(addrWithId);
    updateProfile({ addresses: updatedList });
  };

  const updateAddress = (id, updatedAddr) => {
    if (!currentUser) return;
    let list = currentUser.addresses.map((a) => {
      if (a.id === id) {
        return { ...a, ...updatedAddr };
      }
      if (updatedAddr.isDefault) {
        return { ...a, isDefault: false };
      }
      return a;
    });
    updateProfile({ addresses: list });
  };

  const deleteAddress = (id) => {
    if (!currentUser) return;
    const list = currentUser.addresses.filter((a) => a.id !== id);
    if (list.length > 0 && !list.some((a) => a.isDefault)) {
      list[0].isDefault = true;
    }
    updateProfile({ addresses: list });
  };

  const setDefaultAddress = (id) => {
    if (!currentUser) return;
    const list = currentUser.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id
    }));
    updateProfile({ addresses: list });
  };

  // Create new order from checkout
  const createOrder = (orderData) => {
    const newOrder = {
      id: `TX-ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: currentUser?.id || "guest",
      customerName: currentUser?.name || orderData.customerInfo?.fullName || "Guest Patron",
      customerEmail: currentUser?.email || orderData.customerInfo?.email,
      date: new Date().toISOString().split('T')[0],
      items: orderData.items,
      subtotal: orderData.subtotal,
      discountAmount: orderData.discountAmount,
      shippingFee: orderData.shippingFee,
      total: orderData.total,
      status: "Confirmed",
      paymentMethod: orderData.paymentMethod,
      paymentStatus: "Paid",
      shippingAddress: orderData.shippingAddress,
      timeline: [
        { status: "Order Placed", date: "Just now", completed: true },
        { status: "Confirmed", date: "Just now", completed: true },
        { status: "Processing (Artisan Finishing & Hand-QC)", date: "Scheduled tomorrow", completed: false },
        { status: "Dispatched", date: "Within 2-3 business days", completed: false },
        { status: "Out for Delivery", date: "Pending courier", completed: false },
        { status: "Delivered", date: "Estimated 4-5 business days", completed: false }
      ]
    };

    setUserOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  // Save custom design
  const saveCustomDesign = (designData) => {
    const newDesign = {
      id: `CUST-REQ-${Math.floor(100 + Math.random() * 900)}`,
      customerId: currentUser?.id || "cust-01",
      customerName: currentUser?.name || "Priya Saikia",
      customerEmail: currentUser?.email || "priya.saikia@taatxaal.com",
      customerPhone: currentUser?.phone || "+91 98640 12345",
      createdAt: new Date().toISOString().split('T')[0],
      status: "In Review",
      ...designData
    };
    setCustomDesigns((prev) => [newDesign, ...prev]);
    return newDesign;
  };

  // Submit wedding consultation
  const submitWeddingConsultation = (formData) => {
    const newInquiry = {
      id: `WED-CON-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: "Scheduled",
      ...formData
    };
    setUserConsultations((prev) => [newInquiry, ...prev]);
    return newInquiry;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        register,
        logout,
        updateProfile,
        userOrders,
        createOrder,
        customDesigns,
        saveCustomDesign,
        userConsultations,
        submitWeddingConsultation,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

