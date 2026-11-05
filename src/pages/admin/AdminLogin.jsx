import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminLogin() {
  const { adminLogin } = useAdmin();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleFillDemo = () => {
    setEmail('admin@taatxaal.com');
    setPassword('admin123');
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = adminLogin(email, password);
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="bg-[#14060d] min-h-screen flex items-center justify-center p-4 text-champagne">
      
      <div className="max-w-md w-full bg-[#1f0a14] rounded-3xl p-8 border border-gold/40 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-burgundy/80 border border-gold/50 flex items-center justify-center text-gold mx-auto shadow-gold">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h1 className="font-serif text-2xl font-bold text-white">
            taatXaal Curator Portal
          </h1>
          <p className="text-xs text-champagne/70 font-mono">
            Handloom Administration &amp; Master Looms Console
          </p>
        </div>

        {/* Demo login autofill */}
        <div className="p-3 bg-gold/10 rounded-xl border border-gold/30 flex items-center justify-between text-xs">
          <div className="text-champagne/80">
            <span className="font-bold text-gold block">Demo Master Curator:</span>
            <span>admin@taatxaal.com / admin123</span>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="px-3 py-1.5 bg-gold hover:bg-gold-shimmer text-charcoal font-bold rounded-lg text-xs transition-colors shrink-0 flex items-center gap-1"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Fill Demo</span>
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-red-200 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-champagne/70 uppercase font-semibold block mb-1">
              Curator Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gold/60 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@taatxaal.com"
                className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-gold/30 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div>
            <label className="text-champagne/70 uppercase font-semibold block mb-1">
              Security Key
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gold/60 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-gold/30 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gold hover:bg-gold-shimmer text-charcoal font-bold text-xs uppercase tracking-wider rounded-xl shadow-gold transition-all flex items-center justify-center gap-2"
          >
            <span>Access Curator Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-gold/20 text-center">
          <Link to="/" className="text-xs text-champagne/60 hover:text-gold transition-colors">
            &larr; Return to Storefront
          </Link>
        </div>

      </div>

    </div>
  );
}

