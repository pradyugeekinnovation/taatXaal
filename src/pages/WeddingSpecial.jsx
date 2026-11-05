import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Calendar, Phone, Mail, User, ShieldCheck, CheckCircle2, ArrowRight, Award } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import { MOCK_PRODUCTS } from '../data/products';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';

export default function WeddingSpecial() {
  const { submitWeddingConsultation, currentUser } = useAuth();
  const { addToast } = useShop();

  // Consultation Form State
  const [formData, setFormData] = useState({
    customerName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    weddingDate: '',
    preferredFabric: 'Pure Muga Silk',
    preferredColor: 'Natural Golden Honey & Vermilion Red',
    budget: '₹60,000 - ₹1,00,000',
    specialRequirements: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Bridal categories
  const bridalProducts = MOCK_PRODUCTS.filter((p) => p.collection === 'wedding-special' || p.category.includes('Bridal'));
  const otherFestive = MOCK_PRODUCTS.filter((p) => p.collection !== 'wedding-special').slice(0, 4);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.email || !formData.phone) {
      addToast('Please fill in your name, email and contact phone.', 'error');
      return;
    }

    submitWeddingConsultation(formData);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
    setIsSubmitted(true);
    addToast('Your bridal consultation request has been received! Our master curator will contact you.');
  };

  return (
    <div className="bg-ivory min-h-screen pb-24">
      
      {/* LUXURY BRIDAL HERO */}
      <section className="relative min-h-[75vh] flex items-center justify-center bg-gradient-to-r from-[#2c0b16] via-[#651D32] to-[#250812] text-ivory overflow-hidden py-20 px-4 sm:px-6 lg:px-8 border-b border-gold/30">
        
        {/* Background Wedding Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1800&q=85"
            alt="Assamese Royal Bride"
            className="w-full h-full object-cover object-top opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#250812] via-[#651D32]/70 to-black/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 backdrop-blur-md border border-gold/40 text-gold text-xs font-semibold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            The Royal Assamese Bridal Trousseau
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white leading-tight">
            "Celebrate Your Forever in the Elegance of Assam."
          </h1>

          <p className="font-editorial text-lg sm:text-2xl text-champagne/95 italic max-w-2xl mx-auto leading-relaxed">
            Where wild golden Muga silk, sacred Kolka embroidery, and ancestral craftsmanship meet your most cherished milestone.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#bridal-gallery"
              className="px-8 py-4 bg-gold hover:bg-gold-shimmer text-charcoal-dark font-semibold text-xs uppercase tracking-widest rounded-xl shadow-gold transition-all duration-300"
            >
              Explore Bridal Ensembles
            </a>
            <a
              href="#consultation"
              className="px-8 py-4 bg-burgundy/80 hover:bg-burgundy text-white font-semibold text-xs uppercase tracking-widest rounded-xl border border-gold/40 transition-all duration-300"
            >
              Book 1-on-1 Bridal Consultation
            </a>
          </div>
        </div>
      </section>

      {/* BRIDAL SUITES CATEGORIES */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy block mb-1 font-sans">
            Trousseau Categories
          </span>
          <h2 className="font-serif text-3xl font-bold text-charcoal">
            The Wedding Curation
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          {[
            { title: 'Bridal Mekhela', desc: 'Pure Golden Muga', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80' },
            { title: 'Engagement Drape', desc: 'Ivory Pat with Zari', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&q=80' },
            { title: 'Reception Soirée', desc: 'Emerald & Royal Blue', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80' },
            { title: 'Bridesmaid Silk', desc: 'Lightweight Kesha Pat', img: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80' },
            { title: 'Family Wedding', desc: 'Ahimsa Eri Silk Stoles', img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80' },
            { title: 'Custom Bridal', desc: 'Woven for Your Vision', img: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=400&q=80' }
          ].map((cat, idx) => (
            <div
              key={idx}
              className="group p-3 rounded-2xl bg-white border border-champagne hover:border-gold hover:shadow-luxury transition-all cursor-pointer"
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-2.5 bg-beige">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h4 className="font-serif text-xs font-bold text-charcoal group-hover:text-burgundy transition-colors">
                {cat.title}
              </h4>
              <p className="text-[10px] text-charcoal/60 mt-0.5">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BRIDAL PRODUCT SHOWCASE */}
      <section id="bridal-gallery" className="py-16 bg-beige/30 border-y border-champagne">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-burgundy">Handpicked Trousseau</span>
              <h2 className="font-serif text-3xl font-bold text-charcoal">
                Bridal Masterpiece Creations
              </h2>
            </div>
            <Link
              to="/customise"
              className="mt-3 sm:mt-0 px-4 py-2 bg-burgundy/10 text-burgundy hover:bg-burgundy hover:text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Design Your Custom Bridal Look</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bridalProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {otherFestive.slice(0, 2).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* DEDICATED WEDDING BRIDAL CONSULTATION SECTION */}
      <section id="consultation" className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#2a0c16] via-[#4d1324] to-[#1a060d] rounded-3xl p-8 sm:p-14 text-champagne border border-gold/40 shadow-2xl relative overflow-hidden">
          
          {/* Decorative watermark */}
          <div className="absolute right-[-40px] top-[-40px] opacity-10 pointer-events-none w-72 h-72">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-gold">
              <polygon points="50,15 85,80 15,80" fill="none" stroke="currentColor" strokeWidth="6" />
              <circle cx="50" cy="55" r="14" fill="currentColor" />
            </svg>
          </div>

          <div className="max-w-2xl mb-10">
            <span className="text-gold text-xs uppercase font-bold tracking-widest block mb-1">
              Private Bridal Atelier
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Request a Bespoke Wedding Consultation
            </h2>
            <p className="font-editorial text-base sm:text-lg text-champagne/90 italic mt-2">
              Speak directly with our senior textile historian and master loom curator to craft your one-of-a-kind wedding attire.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-gold/40 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Consultation Request Scheduled!
              </h3>
              <p className="text-sm text-champagne/90 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong>{formData.customerName}</strong>. Our bridal atelier curator will review your wedding date (<strong>{formData.weddingDate || 'Upcoming'}</strong>) and contact you via phone at <strong>{formData.phone}</strong> and email within 24 business hours.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-gold hover:bg-gold-shimmer text-charcoal font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-gold"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-champagne/80 block mb-1.5">
                    Bride / Patron Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="E.g. Debjani Hazarika"
                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-gold/30 text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-champagne/80 block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="E.g. debjani@gmail.com"
                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-gold/30 text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-champagne/80 block mb-1.5">
                    Contact Phone Number (with WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="E.g. +91 98640 12345"
                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-gold/30 text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-champagne/80 block mb-1.5">
                    Wedding / Auspicious Date
                  </label>
                  <input
                    type="date"
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-gold/30 text-white text-xs focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-champagne/80 block mb-1.5">
                    Preferred Foundation Silk
                  </label>
                  <select
                    value={formData.preferredFabric}
                    onChange={(e) => setFormData({ ...formData, preferredFabric: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-charcoal border border-gold/30 text-white text-xs focus:outline-none focus:border-gold"
                  >
                    <option value="Pure Muga Silk">Pure Muga Silk (Assam Golden Luster)</option>
                    <option value="Mulberry Pat Silk">Mulberry Pat Silk (Ivory White / Crimson)</option>
                    <option value="Muga-Pat Interweave">Muga-Pat Interweave (Royal Fusion)</option>
                    <option value="Ahimsa Eri Silk">Ahimsa Eri Silk (Organic Peace Silk)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-champagne/80 block mb-1.5">
                    Trousseau Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-charcoal border border-gold/30 text-white text-xs focus:outline-none focus:border-gold"
                  >
                    <option value="₹40,000 - ₹60,000">₹40,000 &ndash; ₹60,000</option>
                    <option value="₹60,000 - ₹1,00,000">₹60,000 &ndash; ₹1,00,000</option>
                    <option value="₹1,00,000 - ₹1,80,000">₹1,00,000 &ndash; ₹1,80,000 (Royal Collector)</option>
                    <option value="Above ₹2,00,000">Above ₹2,00,000 (Multi-ensemble Trousseau)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-champagne/80 block mb-1.5">
                  Special Requirements / Matching Jewellery Notes:
                </label>
                <textarea
                  rows="3"
                  value={formData.specialRequirements}
                  onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                  placeholder="Tell us about your jewellery (e.g. Lokaparo, Jonbiri), preferred motifs, or groom matching stole requirements..."
                  className="w-full p-4 rounded-xl bg-black/30 border border-gold/30 text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-gold font-sans"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-champagne/70">
                  <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                  <span>Your information remains strictly confidential with our bridal atelier.</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-gold hover:bg-gold-shimmer text-charcoal font-bold text-xs uppercase tracking-widest rounded-xl shadow-gold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Submit Bridal Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

        </div>
      </section>

    </div>
  );
}

