import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, ShieldCheck, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';
import { useAdmin } from '../../context/AdminContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const { wishlist, totalItemCount, setIsCartDrawerOpen, setIsSearchOpen } = useShop();
  const { currentUser, logout } = useAuth();
  const { homepageCMS } = useAdmin();
  const navigate = useNavigate();

  // Announcement index rotation
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const announcements = homepageCMS?.announcements || [
    "Discover the elegance of authentic Assamese handloom.",
    "Special collections for your most memorable occasions.",
    "Custom-designed Mekhela Sador, made just for you."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  // Scroll detection for sticky header transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'General', path: '/collections/general' },
    { name: 'Customise', path: '/customise', highlight: true },
    { name: 'Wedding Special', path: '/collections/wedding-special' },
    { name: 'Premium', path: '/collections/premium' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-burgundy text-champagne text-xs py-2 px-4 border-b border-gold/20 relative z-50 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-gold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping"></span>
            <span className="font-editorial italic tracking-wide text-sm">Sualkuchi Master Looms &bull; Certified Silk Mark</span>
          </div>

          <div className="flex-1 text-center transition-all duration-700 ease-in-out font-light tracking-wide text-ivory">
            {announcements[announcementIdx]}
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs text-champagne/90">
            <Link to="/customise" className="hover:text-gold transition-colors flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-gold" /> Bespoke Studio
            </Link>
            <span className="text-gold/40">|</span>
            <Link to="/admin/login" className="hover:text-gold transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-gold" /> Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-ivory/95 backdrop-blur-md shadow-md border-b border-gold/30 py-3.5'
            : 'bg-ivory/90 backdrop-blur-sm border-b border-champagne/40 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Mobile menu toggle */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-charcoal hover:text-burgundy transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo with Assamese Textile Motif */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Jaapi / Kingkhap SVG Icon */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-burgundy flex items-center justify-center border border-gold shadow-sm group-hover:scale-105 transition-transform duration-300">
              <svg viewBox="0 0 100 100" className="w-6 h-6 text-gold fill-current">
                <polygon points="50,15 85,80 15,80" fill="none" stroke="currentColor" strokeWidth="6" />
                <circle cx="50" cy="55" r="12" fill="currentColor" />
                <line x1="50" y1="15" x2="50" y2="80" stroke="currentColor" strokeWidth="4" />
                <line x1="28" y1="60" x2="72" y2="60" stroke="currentColor" strokeWidth="4" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-burgundy group-hover:text-maroon transition-colors">
                taat<span className="text-gold font-normal">Xaal</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-charcoal/70 font-sans -mt-1 hidden sm:block">
                Assam &bull; Handloom &bull; Haute Couture
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative py-1 text-sm font-medium tracking-wide transition-colors ${
                    isActive
                      ? 'text-burgundy font-semibold'
                      : 'text-charcoal/80 hover:text-burgundy'
                  } ${
                    link.highlight
                      ? 'px-3 py-1 bg-burgundy/10 text-burgundy rounded-full border border-gold/50 hover:bg-burgundy hover:text-ivory transition-all'
                      : ''
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="flex items-center gap-1.5">
                      {link.highlight && <Sparkles className="w-3.5 h-3.5 text-gold inline animate-pulse" />}
                      {link.name}
                    </span>
                    {!link.highlight && isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons: Search, Wishlist, Bag, Account */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-charcoal/80 hover:text-burgundy hover:bg-gold/10 rounded-full transition-all"
              aria-label="Search handlooms"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/account/wishlist"
              className="p-2 text-charcoal/80 hover:text-burgundy hover:bg-gold/10 rounded-full transition-all relative"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-burgundy text-ivory text-[10px] font-bold rounded-full flex items-center justify-center border border-ivory">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="p-2 text-charcoal/80 hover:text-burgundy hover:bg-gold/10 rounded-full transition-all relative"
              aria-label="Shopping bag"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-gold text-charcoal-dark text-[10px] font-bold rounded-full flex items-center justify-center border border-ivory">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className="flex items-center gap-1.5 p-1.5 text-charcoal/80 hover:text-burgundy hover:bg-gold/10 rounded-full transition-all"
                aria-label="Customer Account"
              >
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-gold"
                  />
                ) : (
                  <User className="w-5 h-5" />
                )}
                <ChevronDown className="w-3.5 h-3.5 text-charcoal/60 hidden sm:block" />
              </button>

              {accountDropdownOpen && (
                <div
                  onMouseLeave={() => setAccountDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-56 bg-ivory rounded-xl shadow-xl border border-gold/30 py-2 z-50 divide-y divide-champagne/40"
                >
                  <div className="px-4 py-2">
                    <p className="text-xs text-charcoal/60">Signed in as</p>
                    <p className="text-sm font-semibold text-burgundy truncate">
                      {currentUser ? currentUser.name : 'Guest Visitor'}
                    </p>
                    <p className="text-[11px] text-charcoal/60 truncate">
                      {currentUser ? currentUser.email : 'Explore taatXaal'}
                    </p>
                  </div>

                  <div className="py-1 text-sm">
                    {currentUser ? (
                      <>
                        <Link
                          to="/account/dashboard"
                          onClick={() => setAccountDropdownOpen(false)}
                          className="block px-4 py-2 hover:bg-gold/10 text-charcoal transition-colors"
                        >
                          Customer Dashboard
                        </Link>
                        <Link
                          to="/account/orders"
                          onClick={() => setAccountDropdownOpen(false)}
                          className="block px-4 py-2 hover:bg-gold/10 text-charcoal transition-colors"
                        >
                          My Orders & Tracking
                        </Link>
                        <Link
                          to="/account/custom-designs"
                          onClick={() => setAccountDropdownOpen(false)}
                          className="block px-4 py-2 hover:bg-gold/10 text-charcoal transition-colors"
                        >
                          My Custom Designs
                        </Link>
                        <Link
                          to="/account/wishlist"
                          onClick={() => setAccountDropdownOpen(false)}
                          className="block px-4 py-2 hover:bg-gold/10 text-charcoal transition-colors"
                        >
                          Saved Wishlist
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          onClick={() => setAccountDropdownOpen(false)}
                          className="block px-4 py-2 hover:bg-gold/10 text-burgundy font-medium transition-colors"
                        >
                          Customer Login
                        </Link>
                        <Link
                          to="/register"
                          onClick={() => setAccountDropdownOpen(false)}
                          className="block px-4 py-2 hover:bg-gold/10 text-charcoal transition-colors"
                        >
                          Create Account
                        </Link>
                      </>
                    )}
                  </div>

                  <div className="py-1 text-sm">
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setAccountDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-burgundy/10 text-burgundy font-medium transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-gold" /> Admin Portal
                    </Link>
                    {currentUser && (
                      <button
                        onClick={() => {
                          logout();
                          setAccountDropdownOpen(false);
                          navigate('/');
                        }}
                        className="w-full text-left px-4 py-2 text-charcoal/70 hover:bg-red-50 hover:text-red-700 transition-colors"
                      >
                        Sign Out
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-ivory border-b border-gold/30 px-6 py-5 shadow-lg animate-fadeIn">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `py-2 text-base font-medium transition-colors flex items-center justify-between ${
                      isActive ? 'text-burgundy font-bold pl-2 border-l-2 border-gold' : 'text-charcoal'
                    }`
                  }
                >
                  <span className="flex items-center gap-2">
                    {link.highlight && <Sparkles className="w-4 h-4 text-gold" />}
                    {link.name}
                  </span>
                  {link.highlight && (
                    <span className="text-xs bg-gold/20 text-burgundy px-2 py-0.5 rounded-full font-semibold">
                      Bespoke
                    </span>
                  )}
                </NavLink>
              ))}

              <div className="pt-4 border-t border-champagne flex flex-col gap-2">
                <Link
                  to="/account/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-sm text-burgundy font-medium flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-gold" />
                  {currentUser ? `Dashboard (${currentUser.name})` : 'Customer Login / Sign Up'}
                </Link>
                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-sm text-charcoal/70 flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-gold" /> Admin Management Panel
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

