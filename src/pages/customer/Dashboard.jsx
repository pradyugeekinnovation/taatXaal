import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Sparkles, 
  Calendar, 
  Bell, 
  KeyRound, 
  LogOut, 
  PackageCheck, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useShop } from '../../context/ShopContext';
import { MOCK_PRODUCTS } from '../../data/products';

export default function CustomerDashboard() {
  const { 
    currentUser, 
    logout, 
    updateProfile, 
    userOrders, 
    customDesigns, 
    userConsultations, 
    addAddress, 
    deleteAddress, 
    setDefaultAddress 
  } = useAuth();
  
  const { wishlist, removeFromCart, addToCart, isInWishlist, toggleWishlist, addToast } = useShop();
  const navigate = useNavigate();
  const location = useLocation();

  // Active view tab state (derived from path or state)
  const initialTab = location.pathname.includes('orders')
    ? 'orders'
    : location.pathname.includes('wishlist')
    ? 'wishlist'
    : location.pathname.includes('custom-designs')
    ? 'custom'
    : 'overview';

  const [activeTab, setActiveTab] = useState(initialTab);

  // Profile Edit State
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || 'Priya Saikia',
    email: currentUser?.email || 'priya.saikia@taatxaal.com',
    phone: currentUser?.phone || '+91 98640 12345',
    gender: 'Female',
    dob: '1996-04-14'
  });

  // Selected Order for Tracking Modal
  const [selectedOrderTracking, setSelectedOrderTracking] = useState(null);

  // New Address Modal
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: currentUser?.name || 'Priya Saikia',
    phone: currentUser?.phone || '+91 98640 12345',
    street: '',
    city: 'Guwahati',
    state: 'Assam',
    pincode: '',
    type: 'Home',
    isDefault: false
  });

  // Password change state
  const [passwordState, setPasswordState] = useState({
    oldPass: '',
    newPass: '',
    confirmPass: ''
  });

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile({
      name: profileForm.name,
      email: profileForm.email,
      phone: profileForm.phone
    });
    addToast('Patron profile updated successfully!');
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.pincode) {
      addToast('Please enter street address and pincode.', 'error');
      return;
    }
    addAddress(newAddr);
    setShowAddressModal(false);
    setNewAddr({ ...newAddr, street: '', pincode: '' });
    addToast('New delivery address saved!');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwordState.oldPass || !passwordState.newPass) {
      addToast('Please fill all password fields.', 'error');
      return;
    }
    if (passwordState.newPass !== passwordState.confirmPass) {
      addToast('New passwords do not match.', 'error');
      return;
    }
    setPasswordState({ oldPass: '', newPass: '', confirmPass: '' });
    addToast('Password updated securely!');
  };

  // Calculations for stats
  const totalOrdersCount = userOrders.length;
  const pendingOrdersCount = userOrders.filter((o) => o.status !== 'Delivered').length;
  const deliveredOrdersCount = userOrders.filter((o) => o.status === 'Delivered').length;
  const wishlistItems = MOCK_PRODUCTS.filter((p) => wishlist.includes(p.id));

  const sidebarLinks = [
    { id: 'overview', label: 'Dashboard Overview', icon: User },
    { id: 'profile', label: 'My Profile', icon: Edit3 },
    { id: 'orders', label: 'My Orders', icon: ShoppingBag, count: totalOrdersCount },
    { id: 'tracking', label: 'Order Tracking', icon: Truck },
    { id: 'wishlist', label: 'My Wishlist', icon: Heart, count: wishlist.length },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { id: 'custom', label: 'Custom Designs', icon: Sparkles, count: customDesigns.length },
    { id: 'consultations', label: 'Wedding Consultation', icon: Calendar, count: userConsultations.length },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: 2 },
    { id: 'password', label: 'Change Password', icon: KeyRound }
  ];

  return (
    <div className="bg-ivory min-h-screen pb-24">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#2c0e18] via-[#521727] to-[#1c080e] text-ivory py-10 px-4 sm:px-6 lg:px-8 border-b border-gold/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-gold overflow-hidden bg-burgundy shrink-0">
              <img
                src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                alt={currentUser?.name || "Patron"}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-gold text-xs font-bold uppercase tracking-widest block">
                Patron Member Atelier
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {currentUser?.name || 'Priya Saikia'}
              </h1>
              <p className="text-xs text-champagne/70">{currentUser?.email || 'priya.saikia@taatxaal.com'}</p>
            </div>
          </div>

          <div className="hidden sm:block text-right text-xs text-champagne/80">
            <p className="font-editorial text-sm italic text-gold">"Weaving Heritage Since Generation"</p>
            <p className="text-[11px] font-mono mt-0.5">Patron ID: TX-PATRON-892</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR NAVIGATION */}
          <aside className="lg:col-span-4 bg-white rounded-2xl border border-champagne shadow-sm p-4 space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-burgundy text-ivory shadow-md border border-gold/30'
                      : 'text-charcoal/80 hover:bg-beige/60 hover:text-burgundy'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-gold-dark'}`} />
                    <span>{link.label}</span>
                  </div>

                  {link.count !== undefined && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-gold text-charcoal' : 'bg-beige text-charcoal/70'
                      }`}
                    >
                      {link.count}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-3 border-t border-champagne/60 mt-3">
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-700 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>

          {/* RIGHT CONTENT DISPLAY PANE */}
          <main className="lg:col-span-8 bg-white rounded-2xl border border-champagne shadow-sm p-6 sm:p-8 min-h-[580px]">
            
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-burgundy">
                    Welcome to Your Loom Atelier
                  </h2>
                  <p className="text-xs text-charcoal/60 mt-1">
                    Manage your handcrafted Assamese Mekhela Sador orders, custom design requests, and addresses.
                  </p>
                </div>

                {/* 4 Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-beige/40 border border-champagne">
                    <span className="text-[10px] uppercase font-bold text-charcoal/60 block">Total Orders</span>
                    <span className="font-serif text-2xl font-bold text-burgundy mt-1 block">
                      {totalOrdersCount}
                    </span>
                    <span className="text-[11px] text-charcoal/50">Loom acquisitions</span>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                    <span className="text-[10px] uppercase font-bold text-amber-800 block">In Loom / Transit</span>
                    <span className="font-serif text-2xl font-bold text-amber-900 mt-1 block">
                      {pendingOrdersCount}
                    </span>
                    <span className="text-[11px] text-amber-700/80">Active deliveries</span>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 block">Delivered Pieces</span>
                    <span className="font-serif text-2xl font-bold text-emerald-900 mt-1 block">
                      {deliveredOrdersCount}
                    </span>
                    <span className="text-[11px] text-emerald-700/80">In your wardrobe</span>
                  </div>

                  <div className="p-4 rounded-xl bg-gold/15 border border-gold/40">
                    <span className="text-[10px] uppercase font-bold text-charcoal block">Wishlist Items</span>
                    <span className="font-serif text-2xl font-bold text-burgundy mt-1 block">
                      {wishlist.length}
                    </span>
                    <span className="text-[11px] text-charcoal/60">Saved treasures</span>
                  </div>
                </div>

                {/* Recent Order Preview */}
                {userOrders.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-serif text-base font-bold text-charcoal">
                        Latest Handloom Acquisition
                      </h3>
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="text-xs font-semibold text-burgundy hover:underline"
                      >
                        View All Orders &rarr;
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-beige/30 border border-champagne flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={userOrders[0].items[0]?.image}
                          alt={userOrders[0].items[0]?.name}
                          className="w-16 h-20 rounded-lg object-cover bg-white border border-champagne shrink-0"
                        />
                        <div>
                          <span className="text-[10px] font-mono font-bold text-burgundy uppercase">
                            {userOrders[0].id} &bull; {userOrders[0].date}
                          </span>
                          <h4 className="font-serif text-sm font-bold text-charcoal">
                            {userOrders[0].items[0]?.name}
                          </h4>
                          <span className="text-xs text-charcoal/60">
                            Total: ₹{userOrders[0].total.toLocaleString('en-IN')} ({userOrders[0].paymentMethod})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gold/20 text-burgundy border border-gold/40">
                          {userOrders[0].status}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedOrderTracking(userOrders[0]);
                            setActiveTab('tracking');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-burgundy text-white text-xs font-semibold hover:bg-maroon transition-colors"
                        >
                          Track Weave
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Saved Custom Designs Preview */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-serif text-base font-bold text-charcoal">
                      Your Bespoke Custom Designs ({customDesigns.length})
                    </h3>
                    <Link to="/customise" className="text-xs font-semibold text-burgundy hover:underline">
                      + Create New Design
                    </Link>
                  </div>

                  {customDesigns.length === 0 ? (
                    <div className="p-6 bg-beige/20 rounded-xl border border-champagne text-center text-xs text-charcoal/60">
                      No custom designs saved yet. Use the <Link to="/customise" className="text-burgundy font-bold underline">Customise Studio</Link> to design a bespoke Mekhela Sador.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {customDesigns.slice(0, 2).map((des) => (
                        <div key={des.id} className="p-4 rounded-xl border border-champagne bg-white flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-gold-dark">{des.id} &bull; {des.createdAt}</span>
                            <h4 className="font-serif text-sm font-bold text-charcoal">
                              Bespoke {des.fabric} in {des.colorName}
                            </h4>
                            <p className="text-xs text-charcoal/60">
                              Estimated: ₹{des.estimatedPrice?.toLocaleString('en-IN')} &bull; Status: {des.status}
                            </p>
                          </div>
                          <Link
                            to="/customise"
                            className="px-3 py-1.5 bg-beige hover:bg-champagne text-charcoal text-xs font-semibold rounded-lg"
                          >
                            Open in Studio
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* 2. PROFILE TAB */}
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileSave} className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-burgundy">My Patron Profile</h2>
                  <p className="text-xs text-charcoal/60 mt-1">Update your personal and delivery details.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold uppercase text-charcoal/70 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-champagne focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="font-semibold uppercase text-charcoal/70 block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-champagne focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="font-semibold uppercase text-charcoal/70 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-champagne focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="font-semibold uppercase text-charcoal/70 block mb-1">Gender</label>
                    <select
                      value={profileForm.gender}
                      onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-champagne focus:outline-none focus:ring-1 focus:ring-gold bg-white"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold uppercase text-charcoal/70 block mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={profileForm.dob}
                      onChange={(e) => setProfileForm({ ...profileForm, dob: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-champagne focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-burgundy hover:bg-maroon text-ivory text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
                >
                  Save Profile Changes
                </button>
              </form>
            )}

            {/* 3. ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-burgundy">My Handloom Orders</h2>
                  <p className="text-xs text-charcoal/60 mt-1">Review past and ongoing handcrafted orders.</p>
                </div>

                {userOrders.length === 0 ? (
                  <p className="text-xs text-charcoal/60 py-12 text-center">No orders placed yet.</p>
                ) : (
                  <div className="space-y-4">
                    {userOrders.map((order) => (
                      <div key={order.id} className="p-5 rounded-2xl border border-champagne bg-white space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-champagne text-xs">
                          <div>
                            <span className="font-mono font-bold text-burgundy">{order.id}</span>
                            <span className="text-charcoal/50 ml-2">Placed: {order.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                              {order.paymentStatus}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gold/20 text-burgundy">
                              {order.status}
                            </span>
                          </div>
                        </div>

                        <div className="divide-y divide-champagne/40">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="py-2.5 first:pt-0 flex items-center justify-between text-xs">
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.images?.[0] || item.image}
                                  alt={item.name}
                                  className="w-12 h-14 rounded-lg object-cover bg-beige"
                                />
                                <div>
                                  <h4 className="font-serif font-bold text-charcoal">{item.name}</h4>
                                  <p className="text-[11px] text-charcoal/60">Qty: {item.quantity} &bull; {item.fabric}</p>
                                </div>
                              </div>
                              <span className="font-serif font-bold text-burgundy">
                                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-3 border-t border-champagne flex flex-wrap items-center justify-between gap-2 text-xs">
                          <div>
                            <span className="text-charcoal/60">Total: </span>
                            <strong className="font-serif font-bold text-sm text-charcoal">
                              ₹{order.total.toLocaleString('en-IN')}
                            </strong>
                          </div>

                          <button
                            onClick={() => {
                              setSelectedOrderTracking(order);
                              setActiveTab('tracking');
                            }}
                            className="px-4 py-2 bg-beige hover:bg-gold hover:text-charcoal text-burgundy font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Track Loom Timeline</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 4. TRACKING TAB */}
            {activeTab === 'tracking' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-burgundy">Artisan Loom &amp; Order Tracking</h2>
                  <p className="text-xs text-charcoal/60 mt-1">Real-time status of your handloom journey.</p>
                </div>

                {(() => {
                  const currentTracking = selectedOrderTracking || userOrders[0];
                  if (!currentTracking) {
                    return <p className="text-xs text-charcoal/60">No order selected for tracking.</p>;
                  }

                  return (
                    <div className="p-6 rounded-2xl bg-beige/30 border border-champagne space-y-6">
                      <div className="flex flex-wrap justify-between items-center pb-4 border-b border-champagne">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gold-dark block">Tracking Order</span>
                          <h3 className="font-serif text-lg font-bold text-burgundy">{currentTracking.id}</h3>
                        </div>
                        <span className="px-3 py-1 bg-burgundy text-ivory text-xs font-semibold rounded-full">
                          Status: {currentTracking.status}
                        </span>
                      </div>

                      {/* Visual Timeline Stepper */}
                      <div className="space-y-6 relative pl-6 border-l-2 border-gold/40">
                        {currentTracking.timeline?.map((step, idx) => (
                          <div key={idx} className="relative">
                            <span
                              className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 ${
                                step.completed
                                  ? 'bg-emerald-600 border-white ring-2 ring-emerald-600'
                                  : 'bg-white border-champagne'
                              }`}
                            />
                            <div>
                              <h4 className={`text-xs font-bold ${step.completed ? 'text-charcoal' : 'text-charcoal/40'}`}>
                                {step.status}
                              </h4>
                              <p className="text-[11px] text-charcoal/60 mt-0.5">{step.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 bg-white rounded-xl border border-champagne text-xs space-y-1">
                        <p className="font-semibold text-burgundy">Courier Partner: BlueDart Luxury Secure</p>
                        <p className="text-charcoal/70">
                          Destination: {currentTracking.shippingAddress?.street}, {currentTracking.shippingAddress?.city}
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 5. WISHLIST TAB */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-burgundy">My Saved Wishlist</h2>
                  <p className="text-xs text-charcoal/60 mt-1">Your saved handcrafted Mekhela Sador heirlooms.</p>
                </div>

                {wishlistItems.length === 0 ? (
                  <div className="text-center py-12 text-xs text-charcoal/60">
                    <Heart className="w-8 h-8 text-charcoal/30 mx-auto mb-2" />
                    <p>Your wishlist is currently empty.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlistItems.map((prod) => (
                      <div key={prod.id} className="p-4 rounded-xl border border-champagne bg-white flex gap-4">
                        <img
                          src={prod.images?.[0]}
                          alt={prod.name}
                          className="w-20 h-24 rounded-lg object-cover bg-beige shrink-0"
                        />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-bold uppercase text-burgundy">{prod.fabric}</span>
                            <h4 className="font-serif text-sm font-bold text-charcoal line-clamp-1">{prod.name}</h4>
                            <span className="font-serif font-bold text-burgundy text-sm block mt-1">
                              ₹{prod.price.toLocaleString('en-IN')}
                            </span>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={() => {
                                addToCart(prod, 1);
                                toggleWishlist(prod.id);
                              }}
                              className="px-3 py-1.5 bg-burgundy hover:bg-maroon text-white text-[11px] font-semibold rounded-lg flex-1"
                            >
                              Move to Bag
                            </button>
                            <button
                              onClick={() => toggleWishlist(prod.id)}
                              className="p-1.5 text-charcoal/40 hover:text-red-700"
                              title="Remove"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 6. SAVED ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-burgundy">Saved Addresses</h2>
                    <p className="text-xs text-charcoal/60 mt-1">Manage delivery locations for insured shipping.</p>
                  </div>

                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="px-3 py-2 bg-burgundy hover:bg-maroon text-ivory rounded-lg text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 text-gold" />
                    <span>Add New Address</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentUser?.addresses?.map((addr) => (
                    <div
                      key={addr.id}
                      className={`p-4 rounded-xl border-2 bg-white flex flex-col justify-between ${
                        addr.isDefault ? 'border-burgundy' : 'border-champagne'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-charcoal">{addr.name} ({addr.type})</span>
                          {addr.isDefault && (
                            <span className="px-2 py-0.5 rounded bg-burgundy/10 text-burgundy text-[10px] font-bold">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-charcoal/80 leading-relaxed">{addr.street}</p>
                        <p className="text-xs text-charcoal/60">{addr.city}, {addr.state} - {addr.pincode}</p>
                        <p className="text-xs text-charcoal/60 mt-1">Phone: {addr.phone}</p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-champagne flex items-center justify-between text-xs">
                        {!addr.isDefault ? (
                          <button
                            onClick={() => setDefaultAddress(addr.id)}
                            className="text-burgundy hover:underline font-semibold text-[11px]"
                          >
                            Set as Default
                          </button>
                        ) : (
                          <span className="text-[11px] text-emerald-700 font-semibold">Primary Address</span>
                        )}

                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="text-charcoal/40 hover:text-red-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. CUSTOM DESIGNS TAB */}
            {activeTab === 'custom' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-burgundy">My Bespoke Loom Designs</h2>
                    <p className="text-xs text-charcoal/60 mt-1">Configurations created in the Customise Studio.</p>
                  </div>
                  <Link
                    to="/customise"
                    className="px-3 py-2 bg-gold hover:bg-gold-shimmer text-charcoal rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> New Design
                  </Link>
                </div>

                <div className="space-y-4">
                  {customDesigns.map((des) => (
                    <div key={des.id} className="p-5 rounded-2xl border border-champagne bg-white space-y-3">
                      <div className="flex flex-wrap items-center justify-between text-xs pb-2 border-b border-champagne">
                        <div>
                          <span className="font-mono font-bold text-burgundy">{des.id}</span>
                          <span className="text-charcoal/50 ml-2">Created: {des.createdAt}</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gold/20 text-burgundy">
                          {des.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div>
                          <span className="text-charcoal/50 block text-[10px] uppercase font-bold">Fabric</span>
                          <span className="font-semibold text-charcoal">{des.fabric}</span>
                        </div>
                        <div>
                          <span className="text-charcoal/50 block text-[10px] uppercase font-bold">Shade</span>
                          <span className="font-semibold text-charcoal">{des.colorName}</span>
                        </div>
                        <div>
                          <span className="text-charcoal/50 block text-[10px] uppercase font-bold">Estimated Cost</span>
                          <span className="font-serif font-bold text-burgundy">
                            ₹{des.estimatedPrice?.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div>
                          <span className="text-charcoal/50 block text-[10px] uppercase font-bold">Loom Time</span>
                          <span className="text-charcoal">~{des.estimatedDays || 22} Days</span>
                        </div>
                      </div>

                      {des.instructions && (
                        <p className="text-[11px] text-charcoal/70 bg-beige/30 p-2 rounded-lg italic">
                          "{des.instructions}"
                        </p>
                      )}

                      <div className="pt-2 flex gap-2">
                        <Link
                          to="/customise"
                          className="px-4 py-2 bg-beige hover:bg-champagne text-charcoal rounded-lg text-xs font-semibold"
                        >
                          Edit in Studio
                        </Link>
                        <button
                          onClick={() => {
                            addToCart({
                              id: des.id,
                              name: `Bespoke ${des.fabric} Mekhela Sador`,
                              price: des.estimatedPrice || 48000,
                              images: [des.referenceImage || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80"]
                            }, 1, des);
                          }}
                          className="px-4 py-2 bg-burgundy hover:bg-maroon text-ivory rounded-lg text-xs font-semibold"
                        >
                          Add to Shopping Bag
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. WEDDING CONSULTATIONS TAB */}
            {activeTab === 'consultations' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-burgundy">Bridal Consultations</h2>
                    <p className="text-xs text-charcoal/60 mt-1">Submitted private bridal atelier requests.</p>
                  </div>
                  <Link
                    to="/collections/wedding-special#consultation"
                    className="px-3 py-2 bg-burgundy hover:bg-maroon text-ivory rounded-lg text-xs font-semibold"
                  >
                    + Book Consultation
                  </Link>
                </div>

                <div className="space-y-4">
                  {userConsultations.map((c) => (
                    <div key={c.id} className="p-5 rounded-2xl border border-champagne bg-white space-y-3">
                      <div className="flex items-center justify-between text-xs pb-2 border-b border-champagne">
                        <span className="font-mono font-bold text-burgundy">{c.id}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                          {c.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-charcoal/50 text-[10px] uppercase font-bold block">Wedding Date</span>
                          <span className="font-semibold text-charcoal">{c.weddingDate || 'Upcoming 2026'}</span>
                        </div>
                        <div>
                          <span className="text-charcoal/50 text-[10px] uppercase font-bold block">Preferred Silk</span>
                          <span className="font-semibold text-charcoal">{c.preferredFabric}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-charcoal/50 text-[10px] uppercase font-bold block">Special Notes</span>
                          <p className="text-charcoal/80 leading-relaxed text-[11px]">{c.specialRequirements}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 9. NOTIFICATIONS TAB */}
            {activeTab === 'notifications' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-burgundy">Atelier Notifications</h2>
                  <p className="text-xs text-charcoal/60 mt-1">Updates on handloom releases and order progress.</p>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-gold/40 bg-gold/10 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-burgundy">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-gold" /> Muga Wild Harvest Private Preview
                      </span>
                      <span className="text-[10px] text-charcoal/50 font-normal">Today</span>
                    </div>
                    <p className="text-charcoal/80">
                      The new autumn batch of pure wild golden Muga silk has arrived from the Sualkuchi looms. Patron early access is active.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-champagne bg-white text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-charcoal">
                      <span>Order TX-ORD-2025-9104 Quality Checked</span>
                      <span className="text-[10px] text-charcoal/50 font-normal">Yesterday</span>
                    </div>
                    <p className="text-charcoal/70">
                      Your Royal Sualkuchi Muga Silk Bridal Set has passed Silk Mark certification and is queued for courier pickup.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 10. CHANGE PASSWORD TAB */}
            {activeTab === 'password' && (
              <form onSubmit={handlePasswordSubmit} className="space-y-6 animate-fadeIn max-w-md">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-burgundy">Change Password</h2>
                  <p className="text-xs text-charcoal/60 mt-1">Update your account credentials securely.</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-semibold uppercase text-charcoal/70 block mb-1">Current Password</label>
                    <input
                      type="password"
                      value={passwordState.oldPass}
                      onChange={(e) => setPasswordState({ ...passwordState, oldPass: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-3 py-2.5 rounded-lg border border-champagne focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="font-semibold uppercase text-charcoal/70 block mb-1">New Password</label>
                    <input
                      type="password"
                      value={passwordState.newPass}
                      onChange={(e) => setPasswordState({ ...passwordState, newPass: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-3 py-2.5 rounded-lg border border-champagne focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="font-semibold uppercase text-charcoal/70 block mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordState.confirmPass}
                      onChange={(e) => setPasswordState({ ...passwordState, confirmPass: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-3 py-2.5 rounded-lg border border-champagne focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-burgundy hover:bg-maroon text-ivory text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
                >
                  Update Password
                </button>
              </form>
            )}

          </main>

        </div>
      </div>

      {/* Add Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-champagne shadow-2xl space-y-4">
            <h3 className="font-serif text-lg font-bold text-burgundy">Add Delivery Address</h3>
            
            <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Recipient Name</label>
                <input
                  type="text"
                  required
                  value={newAddr.name}
                  onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-champagne"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={newAddr.street}
                  onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-champagne"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={newAddr.city}
                    onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-champagne"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    value={newAddr.pincode}
                    onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-champagne"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="px-4 py-2 bg-beige rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-burgundy text-white rounded-lg text-xs font-semibold"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

