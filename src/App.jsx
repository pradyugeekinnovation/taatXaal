import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CartDrawer from './components/common/CartDrawer';
import QuickViewModal from './components/common/QuickViewModal';
import SearchModal from './components/common/SearchModal';
import ToastContainer from './components/common/ToastContainer';

// Pages
import Home from './pages/Home';
import GeneralCollection from './pages/GeneralCollection';
import CustomiseStudio from './pages/CustomiseStudio';
import WeddingSpecial from './pages/WeddingSpecial';
import PremiumCollection from './pages/PremiumCollection';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import CustomerDashboard from './pages/customer/Dashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-ivory text-charcoal">
      <ScrollToTop />

      {/* Show Customer Navbar and Overlays unless on Admin portal */}
      {!isAdminRoute && <Navbar />}
      
      <main className="flex-1">
        <Routes>
          {/* Main Navigation Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/collections/general" element={<GeneralCollection />} />
          <Route path="/customise" element={<CustomiseStudio />} />
          <Route path="/collections/wedding-special" element={<WeddingSpecial />} />
          <Route path="/collections/premium" element={<PremiumCollection />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          
          {/* Commerce & Checkout */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Customer Auth & Dashboard */}
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/forgot-password" element={<Auth />} />
          <Route path="/account/*" element={<CustomerDashboard />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Customer Footer */}
      {!isAdminRoute && <Footer />}

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <QuickViewModal />
      <SearchModal />
      <ToastContainer />
    </div>
  );
}

