import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck, Sparkles, ArrowRight, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const { addToast } = useShop();

  // Mode: 'login' | 'register' | 'forgot'
  const isRegister = location.pathname.includes('register');
  const isForgot = location.pathname.includes('forgot');

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: true
  });

  const handleFillDemoCustomer = () => {
    setFormData({
      ...formData,
      email: 'priya.saikia@taatxaal.com',
      password: 'password123'
    });
    addToast('Prefilled demo customer: Priya Saikia');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      if (!formData.fullName || !formData.email || !formData.password) {
        addToast('Please complete all required fields.', 'error');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        addToast('Passwords do not match.', 'error');
        return;
      }
      register(formData);
      addToast('Account created successfully! Welcome to taatXaal.');
      navigate('/account/dashboard');
    } else if (isForgot) {
      addToast('Password reset link has been dispatched to your email.');
      navigate('/login');
    } else {
      // Login
      const res = login(formData.email || 'priya.saikia@taatxaal.com', formData.password || 'password123');
      if (res.success) {
        addToast(`Welcome back, ${res.user.name}!`);
        navigate('/account/dashboard');
      } else {
        addToast('Authentication failed.', 'error');
      }
    }
  };

  return (
    <div className="bg-ivory min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gold/40 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        
        {/* LEFT COLUMN: EDITORIAL ASSAMESE FASHION PHOTOGRAPHY */}
        <div className="lg:col-span-5 relative hidden lg:block overflow-hidden bg-[#240c16]">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85"
            alt="Assamese Handloom Model"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#240c16] via-[#4d1324]/60 to-transparent" />
          
          <div className="absolute bottom-10 left-8 right-8 text-ivory space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 text-gold text-[10px] uppercase font-bold tracking-widest border border-gold/30">
              <Sparkles className="w-3 h-3" />
              Patron Membership
            </div>
            <h2 className="font-serif text-3xl font-bold text-white leading-snug">
              "Weaving Tradition. Wearing Elegance."
            </h2>
            <p className="font-editorial text-sm text-champagne/90 italic leading-relaxed">
              Access your personalized bespoke customizer projects, bridal consultation tracking, and exclusive previews of pure Sualkuchi handloom creations.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: ELEGANT FORM */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
          
          <div>
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-burgundy flex items-center justify-center text-gold border border-gold">
                  <svg viewBox="0 0 100 100" className="w-4 h-4 fill-current">
                    <polygon points="50,15 85,80 15,80" fill="none" stroke="currentColor" strokeWidth="6" />
                    <circle cx="50" cy="55" r="12" fill="currentColor" />
                  </svg>
                </div>
                <span className="font-serif text-2xl font-bold text-burgundy">
                  taat<span className="text-gold font-normal">Xaal</span>
                </span>
              </Link>

              {/* Demo quick fill button for customer */}
              {!isRegister && !isForgot && (
                <button
                  type="button"
                  onClick={handleFillDemoCustomer}
                  className="px-3 py-1.5 bg-gold/15 hover:bg-gold/25 text-burgundy text-xs font-semibold rounded-lg border border-gold/40 flex items-center gap-1.5 transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5 text-gold" />
                  <span>Demo Patron</span>
                </button>
              )}
            </div>

            <div className="mb-6">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                {isRegister
                  ? 'Join the Loom of Elegance'
                  : isForgot
                  ? 'Recover Patron Password'
                  : 'Welcome Back to taatXaal'}
              </h1>
              <p className="text-xs text-charcoal/60 mt-1 font-sans">
                {isRegister
                  ? 'Create your customer account to track orders and save bespoke designs.'
                  : isForgot
                  ? 'Enter your registered email to receive a password reset link.'
                  : 'Sign in with your credentials to access your account dashboard.'}
              </p>
            </div>

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {isRegister && (
                <div>
                  <label className="text-xs font-semibold uppercase text-charcoal/70 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="E.g. Priya Saikia"
                    className="w-full px-4 py-3 rounded-xl border border-champagne text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-semibold uppercase text-charcoal/70 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="priya.saikia@taatxaal.com"
                  className="w-full px-4 py-3 rounded-xl border border-champagne text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              {isRegister && (
                <div>
                  <label className="text-xs font-semibold uppercase text-charcoal/70 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98640 12345"
                    className="w-full px-4 py-3 rounded-xl border border-champagne text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
              )}

              {!isForgot && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold uppercase text-charcoal/70">
                      Password *
                    </label>
                    {!isRegister && (
                      <Link to="/forgot-password" className="text-[11px] text-burgundy hover:underline">
                        Forgot Password?
                      </Link>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-champagne text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-gold pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-charcoal/50 hover:text-charcoal"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {isRegister && (
                <div>
                  <label className="text-xs font-semibold uppercase text-charcoal/70 block mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-champagne text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
              )}

              {isRegister && (
                <div className="flex items-center gap-2 pt-1 text-xs text-charcoal/70">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.termsAccepted}
                    onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                    className="accent-burgundy"
                  />
                  <label htmlFor="terms">
                    I agree to the <span className="text-burgundy underline">Terms of Service</span> and <span className="text-burgundy underline">Handloom Heritage Privacy Policy</span>.
                  </label>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-burgundy hover:bg-maroon text-ivory font-semibold text-xs uppercase tracking-wider rounded-xl shadow-luxury transition-all border border-gold/40 flex items-center justify-center gap-2 mt-2"
              >
                <span>
                  {isRegister ? 'Create Patron Account' : isForgot ? 'Send Reset Link' : 'Sign In to Account'}
                </span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </button>

            </form>
          </div>

          {/* Footer switcher */}
          <div className="pt-8 border-t border-champagne mt-6 text-center text-xs text-charcoal/70">
            {isRegister ? (
              <p>
                Already registered with us?{' '}
                <Link to="/login" className="font-bold text-burgundy hover:underline">
                  Sign In Here
                </Link>
              </p>
            ) : isForgot ? (
              <p>
                Remembered your password?{' '}
                <Link to="/login" className="font-bold text-burgundy hover:underline">
                  Back to Sign In
                </Link>
              </p>
            ) : (
              <p>
                New to taatXaal?{' '}
                <Link to="/register" className="font-bold text-burgundy hover:underline">
                  Create an Account
                </Link>
              </p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}

