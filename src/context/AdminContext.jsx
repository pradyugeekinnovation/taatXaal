import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../data/products';
import { 
  INITIAL_ADMIN, 
  INITIAL_ORDERS, 
  INITIAL_CUSTOMERS, 
  INITIAL_CUSTOM_REQUESTS, 
  INITIAL_WEDDING_CONSULTATIONS, 
  INITIAL_COUPONS, 
  INITIAL_HOMEPAGE_CMS,
  INITIAL_CATEGORIES 
} from '../data/initialData';
import { COLLECTIONS_DATA } from '../data/collections';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Admin auth
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('taatxaal_admin_user');
      return saved ? JSON.parse(saved) : INITIAL_ADMIN; // Default logged in for easy admin testing
    } catch (e) {
      return INITIAL_ADMIN;
    }
  });

  // Admin managed state
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('taatxaal_admin_products');
      return saved ? JSON.parse(saved) : MOCK_PRODUCTS;
    } catch (e) {
      return MOCK_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('taatxaal_admin_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch (e) {
      return INITIAL_ORDERS;
    }
  });

  const [customers, setCustomers] = useState(() => {
    try {
      const saved = localStorage.getItem('taatxaal_admin_customers');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
    } catch (e) {
      return INITIAL_CUSTOMERS;
    }
  });

  const [customRequests, setCustomRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('taatxaal_admin_custom_reqs');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOM_REQUESTS;
    } catch (e) {
      return INITIAL_CUSTOM_REQUESTS;
    }
  });

  const [weddingConsultations, setWeddingConsultations] = useState(() => {
    try {
      const saved = localStorage.getItem('taatxaal_admin_consultations');
      return saved ? JSON.parse(saved) : INITIAL_WEDDING_CONSULTATIONS;
    } catch (e) {
      return INITIAL_WEDDING_CONSULTATIONS;
    }
  });

  const [coupons, setCoupons] = useState(() => {
    try {
      const saved = localStorage.getItem('taatxaal_admin_coupons');
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch (e) {
      return INITIAL_COUPONS;
    }
  });

  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('taatxaal_admin_categories');
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch (e) {
      return INITIAL_CATEGORIES;
    }
  });

  const [collections, setCollections] = useState(() => {
    try {
      const saved = localStorage.getItem('taatxaal_admin_collections');
      return saved ? JSON.parse(saved) : COLLECTIONS_DATA;
    } catch (e) {
      return COLLECTIONS_DATA;
    }
  });

  const [homepageCMS, setHomepageCMS] = useState(() => {
    try {
      const saved = localStorage.getItem('taatxaal_admin_cms');
      return saved ? JSON.parse(saved) : INITIAL_HOMEPAGE_CMS;
    } catch (e) {
      return INITIAL_HOMEPAGE_CMS;
    }
  });

  // Save to localStorage
  useEffect(() => {
    if (adminUser) {
      localStorage.setItem('taatxaal_admin_user', JSON.stringify(adminUser));
    } else {
      localStorage.removeItem('taatxaal_admin_user');
    }
  }, [adminUser]);

  useEffect(() => {
    localStorage.setItem('taatxaal_admin_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('taatxaal_admin_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('taatxaal_admin_cms', JSON.stringify(homepageCMS));
  }, [homepageCMS]);

  useEffect(() => {
    localStorage.setItem('taatxaal_admin_coupons', JSON.stringify(coupons));
  }, [coupons]);

  // Auth methods
  const adminLogin = (email, password) => {
    if (email === "admin@taatxaal.com" && password === "admin123") {
      setAdminUser(INITIAL_ADMIN);
      return { success: true };
    }
    // Accept any test admin login
    if (email.includes('admin') || password === 'admin123') {
      setAdminUser(INITIAL_ADMIN);
      return { success: true };
    }
    return { success: false, message: "Invalid admin credentials. Use admin@taatxaal.com / admin123" };
  };

  const adminLogout = () => {
    setAdminUser(null);
  };

  // Product CRUD
  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: `tx-prod-${Date.now()}`,
      slug: (productData.name || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      stock: parseInt(productData.stock || 5),
      price: parseFloat(productData.price || 25000),
      rating: 4.8,
      reviewsCount: 1,
      images: productData.images && productData.images.length > 0 
        ? productData.images 
        : ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"]
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateStock = (id, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, newStock) } : p))
    );
  };

  // Order management
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const updatedTimeline = order.timeline ? [...order.timeline] : [];
          // update timeline item if exists
          const itemIdx = updatedTimeline.findIndex((t) => t.status.toLowerCase().includes(newStatus.toLowerCase()));
          if (itemIdx > -1) {
            updatedTimeline[itemIdx].completed = true;
            updatedTimeline[itemIdx].date = new Date().toLocaleString();
          }
          return { ...order, status: newStatus, timeline: updatedTimeline };
        }
        return order;
      })
    );
  };

  // Custom request updates
  const updateCustomRequestStatus = (id, status, notes = "", estimatedPrice = null) => {
    setCustomRequests((prev) =>
      prev.map((req) => {
        if (req.id === id) {
          return {
            ...req,
            status,
            adminNotes: notes || req.adminNotes,
            estimatedPrice: estimatedPrice || req.estimatedPrice
          };
        }
        return req;
      })
    );
  };

  // Wedding Consultation updates
  const updateConsultationStatus = (id, status, adminNotes = "") => {
    setWeddingConsultations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status, adminNotes } : c))
    );
  };

  // Coupons CRUD
  const addCoupon = (couponData) => {
    setCoupons((prev) => [...prev, { ...couponData, isActive: true }]);
  };

  const toggleCoupon = (code) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const deleteCoupon = (code) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
  };

  // Categories CRUD
  const addCategory = (categoryData) => {
    setCategories((prev) => [
      ...prev,
      {
        ...categoryData,
        id: `cat-${Date.now()}`,
        itemCount: 0,
        isActive: true
      }
    ]);
  };

  const updateCategory = (id, fields) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...fields } : c))
    );
  };

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // CMS update
  const updateHomepageCMS = (newCMS) => {
    setHomepageCMS((prev) => ({ ...prev, ...newCMS }));
  };

  // Analytics helper calculations
  const totalRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status !== "Delivered").length;
  const lowStockCount = products.filter((p) => p.stock <= 3).length;

  return (
    <AdminContext.Provider
      value={{
        adminUser,
        isAdminAuthenticated: !!adminUser,
        adminLogin,
        adminLogout,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        orders,
        updateOrderStatus,
        customers,
        customRequests,
        updateCustomRequestStatus,
        weddingConsultations,
        updateConsultationStatus,
        coupons,
        addCoupon,
        toggleCoupon,
        deleteCoupon,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        collections,
        setCollections,
        homepageCMS,
        updateHomepageCMS,
        totalRevenue,
        totalOrdersCount,
        pendingOrdersCount,
        lowStockCount
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within an AdminProvider');
  return context;
};

