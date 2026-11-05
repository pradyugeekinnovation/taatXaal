import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  FolderTree, 
  Layers, 
  ShoppingCart, 
  Users, 
  Sparkles, 
  CalendarHeart, 
  Boxes, 
  Tag, 
  Home as HomeIcon, 
  BarChart3, 
  Settings as SettingsIcon, 
  LogOut,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Download,
  Search,
  Printer,
  X
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useAdmin } from '../../context/AdminContext';

export default function AdminDashboard() {
  const { 
    adminUser, 
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
    deleteCategory,
    collections, 
    homepageCMS, 
    updateHomepageCMS,
    totalRevenue,
    totalOrdersCount,
    pendingOrdersCount,
    lowStockCount
  } = useAdmin();

  const navigate = useNavigate();

  // Active admin section
  const [activeSection, setActiveSection] = useState('overview');

  // Modals state
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);
  const [showAddCouponModal, setShowAddCouponModal] = useState(false);
  const [productSearch, setProductSearch] = useState('');

  // New product form state
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    fabric: 'Pure Muga Silk',
    fabricType: 'Muga',
    price: 35000,
    originalPrice: 40000,
    discount: '12% OFF',
    stock: 5,
    collection: 'general',
    category: 'Traditional Mekhela Sador',
    color: 'Golden Honey',
    colorFamily: 'Gold',
    sku: `TX-NEW-${Math.floor(100 + Math.random() * 900)}`,
    images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"],
    description: 'Masterfully handwoven Assamese Mekhela Sador with extra-weft zari motifs.',
    motifs: ['Kingkhap', 'Jaapi'],
    isBestseller: false,
    isNewArrival: true,
    isFeatured: true
  });

  // New coupon form state
  const [newCouponForm, setNewCouponForm] = useState({
    code: '',
    discountPercent: 10,
    minOrder: 15000,
    description: ''
  });

  // CMS edit form state
  const [cmsForm, setCmsForm] = useState({
    heroHeading: homepageCMS?.heroHeading || '',
    heroSubtitle: homepageCMS?.heroSubtitle || '',
    heroImageUrl: homepageCMS?.heroImageUrl || '',
    announcements: homepageCMS?.announcements || []
  });

  // Mock revenue chart data
  const revenueChartData = [
    { month: 'Jun', revenue: 240000, orders: 12 },
    { month: 'Jul', revenue: 310000, orders: 16 },
    { month: 'Aug', revenue: 290000, orders: 15 },
    { month: 'Sep', revenue: 480000, orders: 24 },
    { month: 'Oct', revenue: 620000, orders: 32 },
    { month: 'Nov', revenue: 540000, orders: 28 },
  ];

  const categoryPieData = [
    { name: 'Muga Silk', value: 45, color: '#C6A15B' },
    { name: 'Pat Silk', value: 35, color: '#651D32' },
    { name: 'Eri Ahimsa', value: 15, color: '#3C3937' },
    { name: 'Cotton Silk', value: 5, color: '#E8D7B7' },
  ];

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProductForm.name) return;
    addProduct(newProductForm);
    setShowAddProductModal(false);
  };

  const handleCreateCouponSubmit = (e) => {
    e.preventDefault();
    if (!newCouponForm.code) return;
    addCoupon(newCouponForm);
    setShowAddCouponModal(false);
    setNewCouponForm({ code: '', discountPercent: 10, minOrder: 15000, description: '' });
  };

  const handleSaveCMS = (e) => {
    e.preventDefault();
    updateHomepageCMS(cmsForm);
    alert('Homepage CMS successfully updated! You can inspect the storefront home page.');
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Order ID,Customer,Amount,Date,Status,Payment\n" +
      orders.map(o => `${o.id},${o.customerName},${o.total},${o.date},${o.status},${o.paymentMethod}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `taatxaal-orders-report-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredProductsList = products.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.fabric.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.sku.toLowerCase().includes(productSearch.toLowerCase())
  );

  const navMenuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package, badge: products.length },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, badge: orders.length },
    { id: 'custom-requests', label: 'Custom Requests', icon: Sparkles, badge: customRequests.length },
    { id: 'consultations', label: 'Wedding Consultations', icon: CalendarHeart, badge: weddingConsultations.length },
    { id: 'inventory', label: 'Inventory', icon: Boxes },
    { id: 'categories', label: 'Categories', icon: FolderTree },
    { id: 'collections', label: 'Collections', icon: Layers },
    { id: 'customers', label: 'Customers', icon: Users, badge: customers.length },
    { id: 'coupons', label: 'Coupons & Discounts', icon: Tag },
    { id: 'cms', label: 'Homepage CMS', icon: HomeIcon },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="bg-[#12050b] text-champagne min-h-screen flex flex-col lg:flex-row font-sans">
      
      {/* ADMIN SIDEBAR */}
      <aside className="w-full lg:w-64 bg-[#1b0711] border-r border-gold/30 shrink-0 flex flex-col justify-between p-4 lg:h-screen lg:sticky lg:top-0">
        
        <div>
          {/* Admin Brand Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gold/20">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-burgundy flex items-center justify-center text-gold border border-gold">
                <svg viewBox="0 0 100 100" className="w-4 h-4 fill-current">
                  <polygon points="50,15 85,80 15,80" fill="none" stroke="currentColor" strokeWidth="6" />
                  <circle cx="50" cy="55" r="12" fill="currentColor" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg text-white">
                  taat<span className="text-gold font-normal">Xaal</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-champagne/60 font-mono">
                  Master Looms Admin
                </span>
              </div>
            </Link>
          </div>

          {/* Admin Navigation */}
          <nav className="space-y-1 max-h-[calc(100vh-210px)] overflow-y-auto pr-1">
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-burgundy text-gold font-bold border border-gold/40 shadow-md'
                      : 'text-champagne/75 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-gold/70'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-1.5 py-0.2 bg-black/40 text-[10px] rounded text-champagne font-mono">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Admin Footer & Logout */}
        <div className="pt-3 border-t border-gold/20 mt-3 space-y-2">
          <Link
            to="/"
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-champagne/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
            <span>View Public Storefront</span>
          </Link>

          <button
            onClick={() => {
              adminLogout();
              navigate('/admin/login');
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Exit Curator Portal</span>
          </button>
        </div>

      </aside>

      {/* MAIN ADMIN WORKSPACE */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        
        {/* Top Operational Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-gold/20 gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white capitalize">
              {activeSection.replace('-', ' ')}
            </h1>
            <p className="text-xs text-champagne/60 font-mono mt-0.5">
              Assam Handloom Enterprise &bull; Sualkuchi Looms Gateway
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-mono border border-emerald-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Loom Synchronization Active
            </span>
          </div>
        </div>

        {/* 1. OVERVIEW SECTION */}
        {activeSection === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Top 4 KPI Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#1e0a13] border border-gold/30 space-y-1">
                <span className="text-[10px] uppercase font-bold text-champagne/60 tracking-wider">Total Handloom Revenue</span>
                <span className="font-serif text-2xl font-bold text-gold block">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </span>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18.4% vs last festival cycle</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#1e0a13] border border-gold/30 space-y-1">
                <span className="text-[10px] uppercase font-bold text-champagne/60 tracking-wider">Total Orders</span>
                <span className="font-serif text-2xl font-bold text-white block">
                  {totalOrdersCount}
                </span>
                <span className="text-[11px] text-champagne/60">{pendingOrdersCount} orders currently in loom finishing</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#1e0a13] border border-gold/30 space-y-1">
                <span className="text-[10px] uppercase font-bold text-champagne/60 tracking-wider">Active Customers</span>
                <span className="font-serif text-2xl font-bold text-white block">
                  {customers.length}
                </span>
                <span className="text-[11px] text-champagne/60">Registered luxury patrons</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#1e0a13] border border-gold/30 space-y-1">
                <span className="text-[10px] uppercase font-bold text-champagne/60 tracking-wider">Low Stock Looms</span>
                <span className="font-serif text-2xl font-bold text-amber-400 block">
                  {lowStockCount}
                </span>
                <span className="text-[11px] text-amber-300/80">Pieces with &le; 3 in inventory</span>
              </div>
            </div>

            {/* Recharts Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Revenue Curve */}
              <div className="lg:col-span-8 p-6 rounded-2xl bg-[#1e0a13] border border-gold/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-base font-bold text-white">Revenue &amp; Weaving Velocity</h3>
                    <p className="text-[11px] text-champagne/60">Monthly revenue trends in INR</p>
                  </div>
                  <span className="text-xs font-mono text-gold">Festive High Season</span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueChartData}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#C6A15B" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#C6A15B" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#331422" />
                      <XAxis dataKey="month" stroke="#E8D7B7" fontSize={11} />
                      <YAxis stroke="#E8D7B7" fontSize={11} tickFormatter={(v) => `₹${v/1000}k`} />
                      <Tooltip contentStyle={{ backgroundColor: '#2a0c16', borderColor: '#C6A15B', fontSize: '12px' }} />
                      <Area type="monotone" dataKey="revenue" stroke="#C6A15B" fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Silk Distribution Pie */}
              <div className="lg:col-span-4 p-6 rounded-2xl bg-[#1e0a13] border border-gold/30 space-y-4">
                <div>
                  <h3 className="font-serif text-base font-bold text-white">Silk Share by Volume</h3>
                  <p className="text-[11px] text-champagne/60">Demand distribution</p>
                </div>

                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryPieData} dataKey="value" innerRadius={40} outerRadius={65} paddingAngle={4}>
                        {categoryPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#2a0c16', borderColor: '#C6A15B', fontSize: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {categoryPieData.map((c) => (
                    <div key={c.name} className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                      <span className="text-champagne/80">{c.name} ({c.value}%)</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Recent Orders Snapshot Table */}
            <div className="p-6 rounded-2xl bg-[#1e0a13] border border-gold/30 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-base font-bold text-white">Recent Handloom Orders</h3>
                <button
                  onClick={() => setActiveSection('orders')}
                  className="text-xs text-gold hover:underline"
                >
                  View All Orders &rarr;
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-[10px] uppercase font-bold text-champagne/60 border-b border-gold/20">
                    <tr>
                      <th className="py-2.5">Order ID</th>
                      <th>Patron</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold/10">
                    {orders.slice(0, 4).map((o) => (
                      <tr key={o.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 font-mono font-bold text-gold">{o.id}</td>
                        <td className="text-white font-medium">{o.customerName}</td>
                        <td className="text-champagne/70">{o.date}</td>
                        <td className="font-serif font-bold text-white">₹{o.total?.toLocaleString('en-IN')}</td>
                        <td>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gold/20 text-gold border border-gold/30">
                            {o.status}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => setSelectedInvoiceOrder(o)}
                            className="text-gold hover:underline text-[11px]"
                          >
                            Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* 2. PRODUCT MANAGEMENT */}
        {activeSection === 'products' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-gold/60 absolute left-3 top-3" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products by name, SKU or silk..."
                  className="w-full pl-9 pr-3 py-2 bg-black/40 border border-gold/30 rounded-xl text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-gold"
                />
              </div>

              <button
                onClick={() => setShowAddProductModal(true)}
                className="w-full sm:w-auto px-4 py-2.5 bg-gold hover:bg-gold-shimmer text-charcoal font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-gold flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Handloom Product</span>
              </button>
            </div>

            <div className="bg-[#1e0a13] rounded-2xl border border-gold/30 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-[10px] uppercase font-bold text-champagne/60 border-b border-gold/20 bg-black/30">
                    <tr>
                      <th className="p-3.5">Handloom</th>
                      <th>SKU</th>
                      <th>Fabric</th>
                      <th>Price</th>
                      <th>Loom Stock</th>
                      <th>Collection</th>
                      <th className="text-right p-3.5">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold/10">
                    {filteredProductsList.map((p) => (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.images?.[0]}
                              alt={p.name}
                              className="w-10 h-12 rounded object-cover bg-black/40 border border-gold/20"
                            />
                            <div>
                              <p className="font-serif font-bold text-white line-clamp-1">{p.name}</p>
                              <span className="text-[10px] text-gold">{p.color}</span>
                            </div>
                          </div>
                        </td>
                        <td className="font-mono text-champagne/70">{p.sku}</td>
                        <td className="text-champagne">{p.fabric}</td>
                        <td className="font-serif font-bold text-gold">₹{p.price.toLocaleString('en-IN')}</td>
                        <td>
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${p.stock <= 3 ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                            <span className="font-bold">{p.stock}</span>
                            <button
                              onClick={() => updateStock(p.id, p.stock + 1)}
                              className="px-1 text-[10px] bg-white/10 hover:bg-white/20 rounded ml-1"
                              title="Increase stock"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="capitalize text-champagne/80">{p.collection}</td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 text-red-400 hover:text-red-300"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* 3. ORDER MANAGEMENT */}
        {activeSection === 'orders' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="p-4 bg-[#1e0a13] rounded-2xl border border-gold/30 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-base font-bold text-white">All Handloom Orders ({orders.length})</h3>
                <p className="text-[11px] text-champagne/60">Update order fulfillment status and review invoices</p>
              </div>

              <button
                onClick={handleExportCSV}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-white/20"
              >
                <Download className="w-3.5 h-3.5 text-gold" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="p-5 rounded-2xl bg-[#1e0a13] border border-gold/30 space-y-4">
                  <div className="flex flex-wrap items-center justify-between pb-3 border-b border-gold/20 text-xs">
                    <div>
                      <span className="font-mono font-bold text-gold text-sm">{order.id}</span>
                      <span className="text-champagne/60 ml-3">Date: {order.date}</span>
                    </div>
                    
                    {/* Status updater dropdown */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-champagne/60">Status:</span>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="px-3 py-1 bg-black/40 border border-gold/40 rounded-lg text-xs font-semibold text-gold focus:outline-none"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>

                      <button
                        onClick={() => setSelectedInvoiceOrder(order)}
                        className="px-3 py-1 bg-burgundy hover:bg-maroon rounded-lg text-xs font-semibold text-white border border-gold/30"
                      >
                        View Invoice
                      </button>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="font-semibold text-white mb-1">Patron Information:</p>
                      <p className="text-champagne/80">{order.customerName} ({order.customerEmail})</p>
                      <p className="text-champagne/60 text-[11px] mt-0.5">
                        Address: {order.shippingAddress?.street}, {order.shippingAddress?.city} ({order.shippingAddress?.pincode})
                      </p>
                    </div>

                    <div className="text-right md:border-l md:border-gold/15 md:pl-4">
                      <p className="text-champagne/60 text-[11px]">Payment: {order.paymentMethod} &bull; {order.paymentStatus}</p>
                      <p className="font-serif font-bold text-xl text-gold mt-1">₹{order.total?.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* 4. CUSTOMISATION REQUESTS */}
        {activeSection === 'custom-requests' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="font-serif text-xl font-bold text-white">Patron Bespoke Requests ({customRequests.length})</h2>
              <p className="text-xs text-champagne/60 mt-0.5">Review digital customizer submissions and set estimated loom charges.</p>
            </div>

            <div className="space-y-4">
              {customRequests.map((req) => (
                <div key={req.id} className="p-6 rounded-2xl bg-[#1e0a13] border border-gold/30 space-y-4">
                  <div className="flex flex-wrap items-center justify-between pb-3 border-b border-gold/20 text-xs">
                    <div>
                      <span className="font-mono font-bold text-gold">{req.id}</span>
                      <span className="text-champagne/60 ml-2">Patron: {req.customerName} ({req.customerPhone})</span>
                    </div>

                    {/* Status updater */}
                    <div className="flex items-center gap-2">
                      <select
                        value={req.status}
                        onChange={(e) => updateCustomRequestStatus(req.id, e.target.value)}
                        className="px-3 py-1 bg-black/40 border border-gold/40 rounded-lg text-xs font-semibold text-gold focus:outline-none"
                      >
                        <option value="In Review">In Review</option>
                        <option value="Loom Assigned">Loom Assigned</option>
                        <option value="Weaving In Progress">Weaving In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-champagne/50 block text-[10px] uppercase font-bold">Foundation Silk</span>
                      <span className="font-semibold text-white">{req.fabric}</span>
                    </div>
                    <div>
                      <span className="text-champagne/50 block text-[10px] uppercase font-bold">Selected Shade</span>
                      <span className="font-semibold text-white">{req.colorName}</span>
                    </div>
                    <div>
                      <span className="text-champagne/50 block text-[10px] uppercase font-bold">Motifs</span>
                      <span className="text-gold">{Array.isArray(req.motifs) ? req.motifs.join(', ') : req.motifs}</span>
                    </div>
                    <div>
                      <span className="text-champagne/50 block text-[10px] uppercase font-bold">Est. Price</span>
                      <span className="font-serif font-bold text-gold text-sm">₹{req.estimatedPrice?.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {req.instructions && (
                    <div className="p-3 bg-black/30 rounded-xl text-xs text-champagne/80 font-mono">
                      Artisan Note: "{req.instructions}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. WEDDING CONSULTATIONS */}
        {activeSection === 'consultations' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="font-serif text-xl font-bold text-white">Bridal Atelier Inquiries ({weddingConsultations.length})</h2>
              <p className="text-xs text-champagne/60 mt-0.5">High-value wedding trousseau appointments.</p>
            </div>

            <div className="space-y-4">
              {weddingConsultations.map((c) => (
                <div key={c.id} className="p-6 rounded-2xl bg-[#1e0a13] border border-gold/30 space-y-3">
                  <div className="flex flex-wrap items-center justify-between pb-3 border-b border-gold/20 text-xs">
                    <div>
                      <span className="font-mono font-bold text-gold">{c.id}</span>
                      <span className="text-white font-bold ml-2">{c.customerName}</span>
                    </div>

                    <select
                      value={c.status}
                      onChange={(e) => updateConsultationStatus(c.id, e.target.value)}
                      className="px-3 py-1 bg-black/40 border border-gold/40 rounded-lg text-xs font-semibold text-gold focus:outline-none"
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Trousseau Finalized">Trousseau Finalized</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-champagne/50 block text-[10px] uppercase font-bold">Phone</span>
                      <span className="text-white">{c.phone}</span>
                    </div>
                    <div>
                      <span className="text-champagne/50 block text-[10px] uppercase font-bold">Wedding Date</span>
                      <span className="text-white font-semibold">{c.weddingDate || 'Upcoming'}</span>
                    </div>
                    <div>
                      <span className="text-champagne/50 block text-[10px] uppercase font-bold">Budget</span>
                      <span className="text-gold font-bold">{c.budget}</span>
                    </div>
                    <div>
                      <span className="text-champagne/50 block text-[10px] uppercase font-bold">Preferred Fabric</span>
                      <span className="text-white">{c.preferredFabric}</span>
                    </div>
                  </div>

                  {c.specialRequirements && (
                    <div className="p-3 bg-black/30 rounded-xl text-xs text-champagne/80">
                      <strong>Requirements:</strong> {c.specialRequirements}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. INVENTORY MANAGEMENT */}
        {activeSection === 'inventory' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-4 bg-[#1e0a13] rounded-2xl border border-gold/30">
              <h3 className="font-serif text-base font-bold text-white">Loom Inventory Balances</h3>
              <p className="text-[11px] text-champagne/60">Real-time stock of handwoven pieces in Sualkuchi depot.</p>
            </div>

            <div className="bg-[#1e0a13] rounded-2xl border border-gold/30 overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="text-[10px] uppercase font-bold text-champagne/60 border-b border-gold/20 bg-black/30">
                  <tr>
                    <th className="p-3.5">Piece</th>
                    <th>Fabric</th>
                    <th>Price</th>
                    <th>Stock Level</th>
                    <th>Status</th>
                    <th className="p-3.5 text-right">Adjust</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/10">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-white/5">
                      <td className="p-3.5 font-bold text-white">{p.name}</td>
                      <td className="text-champagne">{p.fabric}</td>
                      <td className="font-serif font-bold text-gold">₹{p.price.toLocaleString('en-IN')}</td>
                      <td className="font-bold text-white">{p.stock} units</td>
                      <td>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.stock <= 3 ? 'bg-amber-950 text-amber-300' : 'bg-emerald-950 text-emerald-300'
                        }`}>
                          {p.stock <= 3 ? 'Low Stock' : 'Adequate'}
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-1">
                        <button
                          onClick={() => updateStock(p.id, p.stock - 1)}
                          className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded font-bold"
                        >
                          -
                        </button>
                        <button
                          onClick={() => updateStock(p.id, p.stock + 1)}
                          className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded font-bold"
                        >
                          +
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 7. HOMEPAGE CMS */}
        {activeSection === 'cms' && (
          <form onSubmit={handleSaveCMS} className="space-y-6 animate-fadeIn max-w-2xl bg-[#1e0a13] p-6 rounded-2xl border border-gold/30">
            <div>
              <h2 className="font-serif text-xl font-bold text-white">Storefront Homepage CMS</h2>
              <p className="text-xs text-champagne/60 mt-0.5">Control hero headlines, announcements and visual banner assets.</p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold uppercase text-champagne/70 block mb-1">Hero Main Heading</label>
                <input
                  type="text"
                  value={cmsForm.heroHeading}
                  onChange={(e) => setCmsForm({ ...cmsForm, heroHeading: e.target.value })}
                  className="w-full px-3 py-2.5 bg-black/40 border border-gold/30 rounded-xl text-white text-xs focus:outline-none focus:border-gold font-serif"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-champagne/70 block mb-1">Hero Subtitle</label>
                <textarea
                  rows="2"
                  value={cmsForm.heroSubtitle}
                  onChange={(e) => setCmsForm({ ...cmsForm, heroSubtitle: e.target.value })}
                  className="w-full p-3 bg-black/40 border border-gold/30 rounded-xl text-white text-xs focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="font-bold uppercase text-champagne/70 block mb-1">Hero Editorial Image URL</label>
                <input
                  type="url"
                  value={cmsForm.heroImageUrl}
                  onChange={(e) => setCmsForm({ ...cmsForm, heroImageUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-black/40 border border-gold/30 rounded-xl text-white text-xs font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-gold hover:bg-gold-shimmer text-charcoal font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-gold"
            >
              Update Live Homepage
            </button>
          </form>
        )}

        {/* 8. COUPONS & DISCOUNTS */}
        {activeSection === 'coupons' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-white">Promotional Discount Coupons</h2>
                <p className="text-xs text-champagne/60 mt-0.5">Manage festive offers and bridal voucher codes.</p>
              </div>

              <button
                onClick={() => setShowAddCouponModal(true)}
                className="px-4 py-2 bg-gold hover:bg-gold-shimmer text-charcoal font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
              >
                + Create Coupon
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {coupons.map((c) => (
                <div key={c.code} className="p-5 rounded-2xl bg-[#1e0a13] border border-gold/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-lg text-gold">{c.code}</span>
                    <button
                      onClick={() => toggleCoupon(c.code)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.isActive ? 'bg-emerald-900 text-emerald-300' : 'bg-red-950 text-red-300'
                      }`}
                    >
                      {c.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                  <p className="text-xs text-champagne/80 font-bold">{c.discountPercent}% OFF</p>
                  <p className="text-[11px] text-champagne/60 leading-snug">{c.description}</p>
                  <div className="pt-2 border-t border-gold/15 flex justify-between items-center text-[10px]">
                    <span className="text-champagne/50">Min: ₹{c.minOrder?.toLocaleString('en-IN')}</span>
                    <button onClick={() => deleteCoupon(c.code)} className="text-red-400 hover:underline">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. REPORTS & ANALYTICS */}
        {activeSection === 'reports' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-6 rounded-2xl bg-[#1e0a13] border border-gold/30 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-white">Financial &amp; Production Reports</h2>
                <p className="text-xs text-champagne/60 mt-0.5">Export certified handloom audit logs.</p>
              </div>
              <button
                onClick={handleExportCSV}
                className="px-4 py-2 bg-gold hover:bg-gold-shimmer text-charcoal font-bold text-xs uppercase rounded-xl flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV Report</span>
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-[#1e0a13] border border-gold/30 space-y-3 text-xs">
              <h3 className="font-serif text-base font-bold text-white">Weaver Compensation &amp; Artisan Guild Balances</h3>
              <p className="text-champagne/70 leading-relaxed">
                Total artisan direct payouts this quarter: <strong>₹{(totalRevenue * 0.55).toLocaleString('en-IN')}</strong> (55% direct weaver share policy). Certified by the Sualkuchi Handloom Guild.
              </p>
            </div>
          </div>
        )}

        {/* 10. SETTINGS */}
        {activeSection === 'settings' && (
          <div className="max-w-xl space-y-6 animate-fadeIn bg-[#1e0a13] p-6 rounded-2xl border border-gold/30 text-xs">
            <div>
              <h2 className="font-serif text-xl font-bold text-white">Enterprise Loom Settings</h2>
              <p className="text-champagne/60 mt-0.5">Store parameters, currency and tax defaults.</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-bold text-champagne/70 block mb-1">Store Name</label>
                <input
                  type="text"
                  readOnly
                  value="taatXaal Assamese Handloom Haute Couture"
                  className="w-full px-3 py-2 bg-black/40 border border-gold/30 rounded-xl text-white font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-champagne/70 block mb-1">Base Currency</label>
                <input
                  type="text"
                  readOnly
                  value="Indian Rupee (INR - ₹)"
                  className="w-full px-3 py-2 bg-black/40 border border-gold/30 rounded-xl text-white font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-champagne/70 block mb-1">GI Registry Origin</label>
                <input
                  type="text"
                  readOnly
                  value="Sualkuchi, Kamrup Rural, Assam (Silk Mark No: GI-ASM-004)"
                  className="w-full px-3 py-2 bg-black/40 border border-gold/30 rounded-xl text-white font-medium"
                />
              </div>
            </div>
          </div>
        )}

      </main>

      {/* PRINTABLE INVOICE MODAL */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 text-charcoal">
          <div className="bg-ivory rounded-3xl max-w-xl w-full p-8 border border-gold shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedInvoiceOrder(null)}
              className="absolute top-4 right-4 p-2 text-charcoal/60 hover:text-burgundy"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Invoice Header */}
            <div className="flex justify-between items-start pb-4 border-b border-champagne">
              <div>
                <span className="font-serif text-2xl font-bold text-burgundy">
                  taat<span className="text-gold font-normal">Xaal</span>
                </span>
                <p className="text-[10px] text-charcoal/60 uppercase tracking-widest">Sualkuchi Handloom Guild, Assam</p>
              </div>

              <div className="text-right text-xs">
                <p className="font-bold font-mono text-burgundy">{selectedInvoiceOrder.id}</p>
                <p className="text-[11px] text-charcoal/60">{selectedInvoiceOrder.date}</p>
              </div>
            </div>

            {/* Bill To */}
            <div className="text-xs space-y-1">
              <span className="text-[10px] uppercase font-bold text-charcoal/50 block">Bill To:</span>
              <p className="font-bold text-charcoal">{selectedInvoiceOrder.customerName}</p>
              <p className="text-charcoal/70">{selectedInvoiceOrder.shippingAddress?.street}, {selectedInvoiceOrder.shippingAddress?.city}</p>
            </div>

            {/* Itemized Table */}
            <table className="w-full text-xs text-left border-t border-b border-champagne py-2">
              <thead className="text-[10px] uppercase font-bold text-charcoal/60">
                <tr>
                  <th className="py-2">Item</th>
                  <th>Qty</th>
                  <th className="text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-champagne/40">
                {selectedInvoiceOrder.items?.map((it, idx) => (
                  <tr key={idx}>
                    <td className="py-2 font-medium">{it.name}</td>
                    <td>{it.quantity}</td>
                    <td className="text-right font-bold text-burgundy">
                      ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total */}
            <div className="text-right space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{selectedInvoiceOrder.subtotal?.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-bold text-base text-burgundy pt-2 border-t border-champagne">
                <span>Total Paid ({selectedInvoiceOrder.paymentMethod}):</span>
                <span>₹{selectedInvoiceOrder.total?.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-[10px] text-charcoal/60 italic font-editorial">
                100% Certified Silk Mark &bull; Handcrafted in Assam
              </span>

              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-burgundy hover:bg-maroon text-ivory rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 text-champagne">
          <div className="bg-[#1f0a14] rounded-2xl max-w-lg w-full p-6 border border-gold shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-2 border-b border-gold/20">
              <h3 className="font-serif text-lg font-bold text-white">Add New Handloom Piece</h3>
              <button onClick={() => setShowAddProductModal(false)} className="text-champagne/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProductForm.name}
                  onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                  placeholder="E.g. Sualkuchi Royal Muga Kingkhap Sador"
                  className="w-full px-3 py-2 bg-black/40 border border-gold/30 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Fabric Type</label>
                  <select
                    value={newProductForm.fabricType}
                    onChange={(e) => setNewProductForm({ ...newProductForm, fabricType: e.target.value, fabric: `${e.target.value} Silk` })}
                    className="w-full px-3 py-2 bg-black/40 border border-gold/30 rounded-lg text-white"
                  >
                    <option value="Muga">Muga Silk</option>
                    <option value="Pat">Pat Silk</option>
                    <option value="Eri">Eri Peace Silk</option>
                    <option value="Cotton Silk">Cotton Silk</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">Price (₹ INR)</label>
                  <input
                    type="number"
                    required
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-black/40 border border-gold/30 rounded-lg text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Initial Loom Stock</label>
                  <input
                    type="number"
                    value={newProductForm.stock}
                    onChange={(e) => setNewProductForm({ ...newProductForm, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-black/40 border border-gold/30 rounded-lg text-white font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Collection</label>
                  <select
                    value={newProductForm.collection}
                    onChange={(e) => setNewProductForm({ ...newProductForm, collection: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-gold/30 rounded-lg text-white"
                  >
                    <option value="general">General</option>
                    <option value="wedding-special">Wedding Special</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">High-Res Image URL</label>
                <input
                  type="url"
                  value={newProductForm.images[0]}
                  onChange={(e) => setNewProductForm({ ...newProductForm, images: [e.target.value] })}
                  className="w-full px-3 py-2 bg-black/40 border border-gold/30 rounded-lg text-white font-mono text-[11px]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 bg-white/10 rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gold text-charcoal font-bold rounded-lg text-xs"
                >
                  Save Product to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD COUPON MODAL */}
      {showAddCouponModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 text-champagne">
          <div className="bg-[#1f0a14] rounded-2xl max-w-sm w-full p-6 border border-gold shadow-2xl space-y-4">
            <h3 className="font-serif text-lg font-bold text-white">Create Promo Coupon</h3>
            
            <form onSubmit={handleCreateCouponSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Coupon Code (Uppercase)</label>
                <input
                  type="text"
                  required
                  value={newCouponForm.code}
                  onChange={(e) => setNewCouponForm({ ...newCouponForm, code: e.target.value.toUpperCase() })}
                  placeholder="E.g. BIHU20"
                  className="w-full px-3 py-2 bg-black/40 border border-gold/30 rounded-lg text-white font-mono uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1">Discount %</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={newCouponForm.discountPercent}
                    onChange={(e) => setNewCouponForm({ ...newCouponForm, discountPercent: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-black/40 border border-gold/30 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Min Order (₹)</label>
                  <input
                    type="number"
                    value={newCouponForm.minOrder}
                    onChange={(e) => setNewCouponForm({ ...newCouponForm, minOrder: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-black/40 border border-gold/30 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCouponModal(false)}
                  className="px-4 py-2 bg-white/10 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gold text-charcoal font-bold rounded-lg"
                >
                  Create Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

