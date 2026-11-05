import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, ShieldCheck, Award, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1e0a13] text-champagne/80 pt-16 pb-10 border-t border-gold/30 relative overflow-hidden">
      {/* Decorative Gold Motif watermark in background */}
      <div className="absolute right-[-60px] bottom-[-40px] opacity-5 pointer-events-none w-96 h-96">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-gold">
          <polygon points="50,10 90,80 10,80" fill="none" stroke="currentColor" strokeWidth="4" />
          <circle cx="50" cy="50" r="14" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Brand Highlights Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-gold/20 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-burgundy/60 border border-gold/40 flex items-center justify-center text-gold shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-white text-sm font-semibold">100% Certified Silk Mark</h4>
              <p className="text-xs text-champagne/70">Pure GI-tagged Assam Muga, Pat & Eri</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-burgundy/60 border border-gold/40 flex items-center justify-center text-gold shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-white text-sm font-semibold">Sualkuchi Master Looms</h4>
              <p className="text-xs text-champagne/70">Handwoven by third-generation artisans</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-burgundy/60 border border-gold/40 flex items-center justify-center text-gold shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-white text-sm font-semibold">Insured Global Transit</h4>
              <p className="text-xs text-champagne/70">Complimentary domestic express delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-burgundy/60 border border-gold/40 flex items-center justify-center text-gold shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-white text-sm font-semibold">Bespoke Bridal Atelier</h4>
              <p className="text-xs text-champagne/70">Custom weaves tailored to your heirloom vision</p>
            </div>
          </div>
        </div>

        {/* 4 Columns Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-burgundy flex items-center justify-center border border-gold text-gold">
                <svg viewBox="0 0 100 100" className="w-5 h-5 fill-current">
                  <polygon points="50,15 85,80 15,80" fill="none" stroke="currentColor" strokeWidth="6" />
                  <circle cx="50" cy="55" r="12" fill="currentColor" />
                </svg>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                taat<span className="text-gold font-normal">Xaal</span>
              </span>
            </Link>
            <p className="font-editorial text-lg italic text-champagne">
              "Weaving Tradition. Wearing Elegance."
            </p>
            <p className="text-xs leading-relaxed text-champagne/75 pr-6">
              taatXaal bridges the sacred, timeless craftsmanship of Assamese handloom with the highest standards of contemporary haute couture. Dedicated exclusively to authentic Muga, Pat, and Eri Mekhela Sador, each creation celebrates centuries of weaving heritage from the heart of Sualkuchi.
            </p>
            
            <div className="pt-2 flex items-center space-x-3 text-gold">
              <a href="#instagram" className="w-8 h-8 rounded-full bg-burgundy/70 flex items-center justify-center hover:bg-gold hover:text-burgundy transition-all" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" className="w-8 h-8 rounded-full bg-burgundy/70 flex items-center justify-center hover:bg-gold hover:text-burgundy transition-all" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#youtube" className="w-8 h-8 rounded-full bg-burgundy/70 flex items-center justify-center hover:bg-gold hover:text-burgundy transition-all" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h3 className="font-serif text-white text-sm font-semibold tracking-wider uppercase mb-4 text-gold border-l-2 border-gold pl-2">
              Collections
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/collections/general" className="hover:text-gold transition-colors">General Collection</Link>
              </li>
              <li>
                <Link to="/customise" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <span>Customise Studio</span>
                  <span className="text-[10px] bg-gold/20 text-gold px-1.5 py-0.2 rounded font-semibold">Bespoke</span>
                </Link>
              </li>
              <li>
                <Link to="/collections/wedding-special" className="hover:text-gold transition-colors">Wedding Special & Bridal</Link>
              </li>
              <li>
                <Link to="/collections/premium" className="hover:text-gold transition-colors">Premium & Collector's Muga</Link>
              </li>
              <li>
                <Link to="/collections/general?fabric=Eri" className="hover:text-gold transition-colors">Ahimsa Eri Silk Stoles</Link>
              </li>
              <li>
                <Link to="/collections/general?fabric=Pat" className="hover:text-gold transition-colors">Mulberry Pat Silk Classic</Link>
              </li>
            </ul>
          </div>

          {/* Heritage & About */}
          <div>
            <h3 className="font-serif text-white text-sm font-semibold tracking-wider uppercase mb-4 text-gold border-l-2 border-gold pl-2">
              The Heritage
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#heritage" className="hover:text-gold transition-colors">The Story of Muga Silk</a>
              </li>
              <li>
                <a href="#heritage" className="hover:text-gold transition-colors">Ahimsa Peace Silk (Eri)</a>
              </li>
              <li>
                <a href="#heritage" className="hover:text-gold transition-colors">Sualkuchi Weaving Guild</a>
              </li>
              <li>
                <a href="#heritage" className="hover:text-gold transition-colors">Ahom Dynasty Motifs</a>
              </li>
              <li>
                <Link to="/account/dashboard" className="hover:text-gold transition-colors">Customer Dashboard</Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-gold transition-colors text-champagne/90">Curator / Admin Login</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-serif text-white text-sm font-semibold tracking-wider uppercase mb-4 text-gold border-l-2 border-gold pl-2">
              Atelier & Contact
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Loom Guild Road, Sualkuchi, Kamrup Rural & Uzan Bazar, Guwahati, Assam 781001
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>+91 98640 12345 / 0361-2678910</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>curator@taatxaal.com</span>
              </div>
              <div className="pt-2">
                <p className="text-[11px] text-champagne/60">
                  Bridal Private Consultations:
                  <br />Mon &ndash; Sat: 10:00 AM &ndash; 7:30 PM IST
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Payments, Legal */}
        <div className="pt-8 border-t border-gold/15 flex flex-col md:flex-row items-center justify-between text-xs text-champagne/60 gap-4">
          <p>
            &copy; {new Date().getFullYear()} taatXaal. Handcrafted in Assam. All rights reserved.
          </p>

          <div className="flex items-center space-x-4">
            <span className="hover:text-gold transition-colors cursor-pointer">Authenticity Guarantee</span>
            <span>&bull;</span>
            <span className="hover:text-gold transition-colors cursor-pointer">Care Guide</span>
            <span>&bull;</span>
            <span className="hover:text-gold transition-colors cursor-pointer">Privacy Policy</span>
            <span>&bull;</span>
            <span className="hover:text-gold transition-colors cursor-pointer">Terms & Conditions</span>
          </div>

          {/* Mock payment methods placeholder */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10 text-[10px] text-champagne">UPI</span>
            <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10 text-[10px] text-champagne">Visa</span>
            <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10 text-[10px] text-champagne">Mastercard</span>
            <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10 text-[10px] text-champagne">RuPay</span>
            <span className="px-2 py-0.5 rounded bg-black/40 border border-white/10 text-[10px] text-champagne">NetBanking</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

