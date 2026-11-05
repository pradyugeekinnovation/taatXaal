import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Award, Heart, CheckCircle2, ChevronRight, Eye, ShoppingBag, Truck } from 'lucide-react';
import SilkThreadsHeroCanvas from '../components/three/SilkThreadsHeroCanvas';
import ProductCard from '../components/common/ProductCard';
import { MOCK_PRODUCTS } from '../data/products';
import { COLLECTIONS_DATA, ASSAMESE_HERITAGE_STORIES, TESTIMONIALS } from '../data/collections';
import { useShop } from '../context/ShopContext';
import { useAdmin } from '../context/AdminContext';
import gsap from 'gsap';

export default function Home() {
  const { homepageCMS } = useAdmin();
  const { addToast } = useShop();
  
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Best Sellers Filter State
  const [bestSellerTab, setBestSellerTab] = useState('All');

  // GSAP animation refs
  const heroHeadingRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroCtaRef = useRef(null);
  const heroBadgeRef = useRef(null);

  useEffect(() => {
    try {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        if (heroBadgeRef.current) {
          tl.fromTo(
            heroBadgeRef.current,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
          );
        }
        if (heroHeadingRef.current) {
          tl.fromTo(
            heroHeadingRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1.1 },
            '-=0.4'
          );
        }
        if (heroSubtitleRef.current) {
          tl.fromTo(
            heroSubtitleRef.current,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.9 },
            '-=0.6'
          );
        }
        if (heroCtaRef.current) {
          tl.fromTo(
            heroCtaRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8 },
            '-=0.5'
          );
        }
      });

      return () => ctx.revert();
    } catch (err) {
      console.warn("GSAP animation bypassed:", err);
    }
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    setNewsletterSubscribed(true);
    addToast('Thank you for subscribing to taatXaal handloom chronicles!');
  };

  const bestSellers = MOCK_PRODUCTS.filter((p) => p.isBestseller).slice(0, 8);
  const spotlightProduct = MOCK_PRODUCTS.find((p) => p.id === 'tx-muga-01') || bestSellers[0];
  const premiumShowcase = MOCK_PRODUCTS.filter((p) => p.collection === 'premium').slice(0, 2);

  const signatureTabs = [
    { id: 'All', label: 'All Treasures' },
    { id: 'Muga', label: 'Pure Muga (GI Tagged)' },
    { id: 'Pat', label: 'Mulberry Pat Silk' },
    { id: 'Eri', label: 'Ahimsa Eri Silk' },
    { id: 'Cotton Silk', label: 'Festive Cotton Silk' }
  ];

  const displayedBestSellers = bestSellerTab === 'All'
    ? bestSellers
    : bestSellers.filter((p) => p.fabricType === bestSellerTab || p.fabric.toLowerCase().includes(bestSellerTab.toLowerCase()));

  return (
    <div className="relative overflow-hidden bg-ivory">
      
      {/* SECTION 1: CINEMATIC HERO BANNER */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#2a0e18] via-[#431422] to-[#1d0910] text-ivory">
        
        {/* Background Editorial Assamese Model Image with soft warm overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={homepageCMS?.heroImageUrl || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85"}
            alt="Assamese Traditional Mekhela Sador Elegance"
            className="w-full h-full object-cover object-center opacity-45 scale-105 animate-pulse"
            style={{ animationDuration: '10s' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1d0910] via-[#2a0e18]/80 to-black/50" />
          <div className="absolute inset-0 bg-silk-texture opacity-30 mix-blend-overlay" />
        </div>

        {/* Three.js Silk Thread 3D Canvas */}
        <SilkThreadsHeroCanvas />

        {/* Content Box */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 sm:py-32">
          
          {/* Badge */}
          <div ref={heroBadgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 backdrop-blur-md border border-gold/40 text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-6 shadow-gold">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>{homepageCMS?.heroBadge || "The Crown of Assam Handloom"}</span>
          </div>

          {/* Main Heading */}
          <h1
            ref={heroHeadingRef}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ivory leading-[1.1] mb-6 drop-shadow-md"
          >
            {homepageCMS?.heroHeading || "An Elegance Woven Through Generations"}
          </h1>

          {/* Subtitle */}
          <p
            ref={heroSubtitleRef}
            className="font-editorial text-lg sm:text-2xl text-champagne/90 max-w-3xl mx-auto font-light leading-relaxed mb-10 italic"
          >
            "{homepageCMS?.heroSubtitle || "Discover the timeless beauty of Assamese Mekhela Sador, where tradition meets contemporary elegance."}"
          </p>

          {/* CTA Buttons */}
          <div ref={heroCtaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/collections/general"
              className="w-full sm:w-auto px-8 py-4 bg-gold hover:bg-gold-shimmer text-charcoal-dark font-semibold text-xs uppercase tracking-[0.15em] rounded-xl shadow-gold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/customise"
              className="w-full sm:w-auto px-8 py-4 bg-burgundy/80 hover:bg-burgundy text-champagne hover:text-white font-semibold text-xs uppercase tracking-[0.15em] rounded-xl border border-gold/50 backdrop-blur-md shadow-luxury hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Customise Your Sador</span>
            </Link>
          </div>

          {/* Floating Features Bar */}
          <div className="mt-16 pt-8 border-t border-gold/20 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="flex items-center gap-2.5 text-champagne/80">
              <span className="w-2 h-2 rounded-full bg-gold"></span>
              <span className="text-xs font-serif">100% Pure Muga &amp; Pat</span>
            </div>
            <div className="flex items-center gap-2.5 text-champagne/80">
              <span className="w-2 h-2 rounded-full bg-gold"></span>
              <span className="text-xs font-serif">Sualkuchi Heritage Looms</span>
            </div>
            <div className="flex items-center gap-2.5 text-champagne/80">
              <span className="w-2 h-2 rounded-full bg-gold"></span>
              <span className="text-xs font-serif">Bespoke Bridal Customization</span>
            </div>
            <div className="flex items-center gap-2.5 text-champagne/80">
              <span className="w-2 h-2 rounded-full bg-gold"></span>
              <span className="text-xs font-serif">Silk Mark Certified Authentic</span>
            </div>
          </div>

        </div>

        {/* Bottom subtle divider line */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </section>

      {/* SECTION 2: SHOP BY COLLECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark block mb-2 font-sans">
            Curated Ensembles
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Shop by Collection
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLLECTIONS_DATA.map((col) => (
            <div
              key={col.id}
              className="group relative rounded-2xl overflow-hidden shadow-lg border border-champagne hover:border-gold transition-all duration-500 bg-white flex flex-col justify-between"
            >
              <div className="aspect-[4/5] w-full overflow-hidden relative bg-beige">
                <img
                  src={col.image}
                  alt={col.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-burgundy/90 backdrop-blur-md text-ivory text-[10px] font-semibold uppercase tracking-wider rounded-full border border-gold/40">
                    {col.badge}
                  </span>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-6 text-ivory">
                  <h3 className="font-serif text-xl font-bold text-white mb-1 group-hover:text-gold transition-colors">
                    {col.title}
                  </h3>
                  <p className="font-editorial italic text-xs text-champagne/90 mb-4 line-clamp-2">
                    {col.tagline}
                  </p>
                  
                  <Link
                    to={col.link}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold hover:text-white transition-colors"
                  >
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: SIGNATURE BEST SELLERS (PREMIUM LUXURY SHOWCASE) */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#FFF9F0] via-[#F9F1E2] to-[#FFF9F0] border-y border-gold/40">
        
        {/* Subtle Ambient Gold Glow & Background Motif Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-[-40px] top-12 opacity-[0.035] pointer-events-none w-[500px] h-[500px]">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-gold">
            <polygon points="50,10 90,80 10,80" fill="none" stroke="currentColor" strokeWidth="4" />
            <circle cx="50" cy="50" r="14" fill="currentColor" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Royal Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            
            {/* Crown Motif Emblem */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-burgundy/10 border border-gold/40 text-burgundy text-[11px] font-bold uppercase tracking-[0.25em] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
              <span>Imperial Looms &bull; Handwoven in Sualkuchi</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal tracking-tight leading-tight">
              Our Signature <span className="text-burgundy">Best Sellers</span>
            </h2>

            <p className="font-editorial text-base sm:text-xl text-charcoal/80 italic leading-relaxed max-w-2xl mx-auto">
              "Masterpieces revered for their pure unadulterated silk luster, sacred Ahom Kingkhap emblems, and intricate extra-weft gunari zari work."
            </p>

            {/* Ornamental Gold Divider */}
            <div className="flex items-center justify-center gap-3 pt-1">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold" />
              <div className="w-2.5 h-2.5 rotate-45 border border-gold bg-burgundy" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold" />
            </div>

          </div>

          {/* SPOTLIGHT MASTERPIECE FEATURE HERO BANNER */}
          {spotlightProduct && (
            <div className="mb-16 bg-gradient-to-br from-[#2D0F1B] via-[#481424] to-[#1E0811] text-ivory rounded-3xl p-6 sm:p-10 border-2 border-gold/50 shadow-2xl relative overflow-hidden group">
              
              {/* Gold textile pattern overlay */}
              <div className="absolute inset-0 bg-dark-texture opacity-30 pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Oversized Image with zoom */}
                <div className="lg:col-span-6 relative">
                  <div className="aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden border border-gold/40 relative shadow-2xl">
                    <img
                      src={spotlightProduct.images?.[0]}
                      alt={spotlightProduct.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    
                    {/* Crown badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-charcoal/90 backdrop-blur-md px-3 py-1 rounded-full border border-gold/40 text-[10px] text-gold font-bold uppercase tracking-widest shadow-md">
                      <Award className="w-3.5 h-3.5 text-gold" />
                      <span>Crown Jewel of Sualkuchi</span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-champagne/90">
                      <span className="font-mono bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10">
                        {spotlightProduct.artisan}
                      </span>
                      <span className="font-bold text-gold bg-burgundy/80 px-2.5 py-1 rounded-md border border-gold/30">
                        {spotlightProduct.weaveTimeDays} Days on Pit Loom
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Masterpiece Story & Quick Action */}
                <div className="lg:col-span-6 space-y-5">
                  <div className="flex items-center gap-2 text-xs text-gold uppercase tracking-widest font-bold">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span>Silk Mark Certified &bull; GI Tagged Heritage</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
                    {spotlightProduct.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-champagne/85 leading-relaxed font-sans line-clamp-3">
                    {spotlightProduct.description}
                  </p>

                  {/* Highlights Bar */}
                  <div className="grid grid-cols-3 gap-3 py-3 border-y border-gold/25 text-xs text-champagne">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-champagne/60 block">Silk Yarn</span>
                      <span className="font-bold text-white">{spotlightProduct.fabric}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-champagne/60 block">Zari Type</span>
                      <span className="font-bold text-gold">Pure Copper-Gold Guna</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-champagne/60 block">Dynasty Motifs</span>
                      <span className="font-bold text-white">Royal Kingkhap &bull; Jaapi</span>
                    </div>
                  </div>

                  {/* Price & Acquisition */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-3xl font-bold text-gold">
                          ₹{spotlightProduct.price.toLocaleString('en-IN')}
                        </span>
                        {spotlightProduct.originalPrice && (
                          <span className="text-sm text-champagne/50 line-through">
                            ₹{spotlightProduct.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-champagne/70 block mt-0.5">
                        Includes signed provenance certificate &amp; handcrafted teakwood box
                      </span>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <Link
                        to={`/product/${spotlightProduct.slug}`}
                        className="flex-1 sm:flex-none px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider border border-white/20 transition-colors text-center"
                      >
                        Inspect Piece
                      </Link>

                      <Link
                        to={`/product/${spotlightProduct.slug}`}
                        className="flex-1 sm:flex-none px-6 py-3 bg-gold hover:bg-gold-shimmer text-charcoal-dark font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-gold flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Acquire Piece</span>
                      </Link>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* INTERACTIVE SILK CATEGORY TABS & FILTER BAR */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-5 border-b border-champagne">
            
            {/* Pill Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {signatureTabs.map((tab) => {
                const isActive = bestSellerTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setBestSellerTab(tab.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-burgundy text-gold shadow-md border border-gold font-bold scale-105'
                        : 'bg-white hover:bg-champagne/40 text-charcoal/80 border border-champagne'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Link to Full Catalog */}
            <Link
              to="/collections/general"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-burgundy hover:text-maroon transition-colors shrink-0 group"
            >
              <span>Explore All 10 Handlooms</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

          </div>

          {/* SIGNATURE PRODUCTS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
            {displayedBestSellers.map((product) => (
              <ProductCard key={product.id} product={product} variant="signature" />
            ))}
          </div>

          {/* ARTISAN GUILD LUXURY TRUST STRIP */}
          <div className="mt-16 pt-10 border-t border-gold/30 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-gold/30 shadow-sm space-y-1">
              <Award className="w-5 h-5 text-gold mx-auto" />
              <h4 className="font-serif text-xs font-bold text-charcoal">100% Pure Silk Mark</h4>
              <p className="text-[10px] text-charcoal/60">Government certified pure Assam yarn</p>
            </div>

            <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-gold/30 shadow-sm space-y-1">
              <Sparkles className="w-5 h-5 text-gold mx-auto" />
              <h4 className="font-serif text-xs font-bold text-charcoal">Master Pit Looms</h4>
              <p className="text-[10px] text-charcoal/60">Takes 20 to 35 days of hand weaving</p>
            </div>

            <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-gold/30 shadow-sm space-y-1">
              <ShieldCheck className="w-5 h-5 text-gold mx-auto" />
              <h4 className="font-serif text-xs font-bold text-charcoal">Direct Artisan Looms</h4>
              <p className="text-[10px] text-charcoal/60">100% ethical fair weaver compensation</p>
            </div>

            <div className="p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-gold/30 shadow-sm space-y-1">
              <Truck className="w-5 h-5 text-gold mx-auto" />
              <h4 className="font-serif text-xs font-bold text-charcoal">Complimentary Insured Delivery</h4>
              <p className="text-[10px] text-charcoal/60">Shipped in breathable heirloom muslin</p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: THE ART OF ASSAMESE HANDLOOM (EDITORIAL SPLIT-SCREEN) */}
      <section id="heritage" className="py-24 bg-ivory relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark block mb-2 font-sans">
              The Soul of the Brahmaputra Valley
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-burgundy leading-tight">
              More Than a Fabric. A Living Heritage.
            </h2>
            <p className="font-editorial text-lg text-charcoal/80 mt-3 italic max-w-2xl mx-auto">
              From the mythical reign of the Ahom Kings to Mahatma Gandhi's famous praise: "The women of Assam weave dreams in their looms."
            </p>
            <div className="w-20 h-0.5 bg-gold mx-auto mt-5" />
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {ASSAMESE_HERITAGE_STORIES.map((story, idx) => (
              <div 
                key={idx}
                className="flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden border border-champagne shadow-sm hover:shadow-luxury hover:border-gold transition-all duration-300"
              >
                <div className="sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden relative bg-beige">
                  <img
                    src={story.image}
                    alt={story.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-burgundy/90 text-ivory text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                    {story.tag}
                  </span>
                </div>
                
                <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-charcoal mb-2 hover:text-burgundy transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-xs text-charcoal/70 leading-relaxed font-sans">
                      {story.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-champagne/60 flex items-center justify-between text-xs font-semibold text-gold-dark">
                    <span>Authentic Assam Guild</span>
                    <Link to="/collections/general" className="hover:text-burgundy flex items-center gap-1">
                      Explore Weave &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Traditional Motifs Showcase Bar */}
          <div className="mt-16 bg-[#250e17] rounded-2xl p-8 sm:p-10 text-champagne border border-gold/40 shadow-xl">
            <div className="max-w-3xl mb-8">
              <span className="text-gold text-xs uppercase font-bold tracking-widest block mb-1">
                Sacred Iconography
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                The Sacred Motifs of Assam Handloom
              </h3>
              <p className="text-xs text-champagne/80 mt-1 font-editorial italic">
                Each motif holds centuries of symbolic resonance woven in pure metallic zari (guna).
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="p-4 rounded-xl bg-burgundy/40 border border-gold/20">
                <span className="font-serif text-lg text-gold font-bold block mb-1">Kingkhap</span>
                <p className="text-xs text-champagne/70 leading-snug">
                  The crowned lion crest of Ahom royalty, signifying sovereign valor, pride, and imperial grace.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-burgundy/40 border border-gold/20">
                <span className="font-serif text-lg text-gold font-bold block mb-1">Jaapi</span>
                <p className="text-xs text-champagne/70 leading-snug">
                  The sacred conical headgear of Assam, symbol of ultimate honor, hospitality, and cultural pride.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-burgundy/40 border border-gold/20">
                <span className="font-serif text-lg text-gold font-bold block mb-1">Kolka (Paisley)</span>
                <p className="text-xs text-champagne/70 leading-snug">
                  Fertility and auspicious beginnings expressed through twisting mango seed and blooming lotus vines.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-burgundy/40 border border-gold/20">
                <span className="font-serif text-lg text-gold font-bold block mb-1">Gamusa Border</span>
                <p className="text-xs text-champagne/70 leading-snug">
                  Extra-weft crimson floral patterns embodying love, respect, and auspicious warmth across Assam.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: WEDDING COLLECTION FEATURE */}
      <section className="py-24 bg-gradient-to-r from-[#4d1324] via-[#651D32] to-[#3b0e1b] text-ivory relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                Royal Bridal Atelier
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-[1.15]">
                "Your Wedding. Your Tradition. Your Timeless Elegance."
              </h2>

              <p className="font-editorial text-lg sm:text-xl text-champagne/90 leading-relaxed italic">
                Step into your forever crowned in authentic wild golden Muga silk, crimson Pat zari, and masterfully woven Lokaparo motifs. Handcrafted to become your family's most cherished heirloom.
              </p>

              <ul className="space-y-3 text-xs text-champagne/90">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Personalized 1-on-1 bridal trousseau consultation with our master curators</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Certified 100% pure silk mark with tested antique copper &amp; gold zari</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Custom blouse piece detailing, hand-braided latkans &amp; keepsake wooden box</span>
                </li>
              </ul>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to="/collections/wedding-special"
                  className="px-8 py-4 bg-gold hover:bg-gold-shimmer text-charcoal font-semibold text-xs uppercase tracking-widest rounded-xl shadow-gold transition-all duration-300 flex items-center gap-2"
                >
                  <span>Explore Wedding Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/collections/wedding-special#consultation"
                  className="px-6 py-4 bg-black/40 hover:bg-black/60 text-champagne font-semibold text-xs uppercase tracking-widest rounded-xl border border-white/20 transition-all duration-300"
                >
                  Book Bridal Consultation
                </Link>
              </div>
            </div>

            {/* Right Large Bridal Photography Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/40">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
                  alt="Assamese Bride in Muga Silk Mekhela Sador"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                
                {/* Floating quote tag */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-burgundy/85 backdrop-blur-md border border-gold/30 text-xs text-champagne">
                  <p className="font-editorial text-sm italic text-white mb-1">
                    "Nothing on earth reflects candlelight and wedding sacred fires like pure Assam Muga silk."
                  </p>
                  <p className="text-[10px] text-gold uppercase tracking-wider font-semibold">
                    &mdash; Master Weaver Bhaben Das, Sualkuchi
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: CUSTOMISATION FEATURE STUDIO CALLOUT */}
      <section className="py-24 bg-ivory relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-gradient-to-br from-beige to-white rounded-3xl p-8 sm:p-14 border border-gold/40 shadow-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-5">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy block font-sans">
                  The Interactive Digital Loom
                </span>
                
                <h2 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal leading-tight">
                  "Designed by You. Woven for You."
                </h2>

                <p className="text-sm text-charcoal/80 leading-relaxed font-sans">
                  Become the co-creator of your Mekhela Sador. Select your foundation silk, choose your auspicious dye palette, customize traditional Ahom Kingkhap or Jaapi motifs, and define your border zari.
                </p>

                {/* 6 Step Customization Features */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3 bg-white rounded-xl border border-champagne">
                    <span className="text-xs font-bold text-burgundy block mb-0.5">1. Pure Silk</span>
                    <span className="text-[11px] text-charcoal/60">Muga, Pat, Eri or Cotton</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-champagne">
                    <span className="text-xs font-bold text-burgundy block mb-0.5">2. Sacred Palette</span>
                    <span className="text-[11px] text-charcoal/60">Royal Vermilion, Honey Gold</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-champagne">
                    <span className="text-xs font-bold text-burgundy block mb-0.5">3. Mekhela Weave</span>
                    <span className="text-[11px] text-charcoal/60">Heavy Zari or Minimal Vine</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-champagne">
                    <span className="text-xs font-bold text-burgundy block mb-0.5">4. Sador Anchal</span>
                    <span className="text-[11px] text-charcoal/60">Grand Gunari Cascade</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-champagne">
                    <span className="text-xs font-bold text-burgundy block mb-0.5">5. Royal Motifs</span>
                    <span className="text-[11px] text-charcoal/60">Jaapi, Kolka, Kingkhap</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-champagne">
                    <span className="text-xs font-bold text-burgundy block mb-0.5">6. Bespoke Detail</span>
                    <span className="text-[11px] text-charcoal/60">Woven initials &amp; latkans</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    to="/customise"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-burgundy hover:bg-maroon text-ivory font-semibold text-xs uppercase tracking-widest rounded-xl shadow-luxury transition-all border border-gold/40 group"
                  >
                    <Sparkles className="w-4 h-4 text-gold group-hover:rotate-12 transition-transform" />
                    <span>Create Your Own Mekhela Sador</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Graphic Mock of Customizer */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gold/50 bg-[#1e0a13] p-4">
                  <img
                    src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=85"
                    alt="Custom Weaving Loom Preview"
                    className="w-full aspect-[4/3] object-cover rounded-xl opacity-85"
                  />
                  <div className="mt-3 p-3 bg-burgundy/60 rounded-xl border border-gold/30 text-xs text-champagne flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">Live 3D &amp; 2D Fabric Drape</p>
                      <p className="text-[11px] text-champagne/70">Real-time price &amp; delivery timeline estimate</p>
                    </div>
                    <span className="px-2.5 py-1 bg-gold text-charcoal text-[10px] font-bold rounded">
                      Interactive
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 7: PREMIUM COLLECTION SHOWCASE */}
      <section className="py-24 bg-[#1e0a13] text-champagne relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold block mb-2 font-sans">
              Haute Couture Handloom
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
              The Premium Collection
            </h2>
            <p className="font-editorial text-base text-champagne/80 mt-2 italic">
              Individually numbered masterworks woven with 24k tested gold thread on GI-tagged wild Muga silk.
            </p>
            <div className="w-20 h-0.5 bg-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {premiumShowcase.map((prod) => (
              <div
                key={prod.id}
                className="group relative bg-[#2a0f1b] rounded-2xl overflow-hidden border border-gold/30 shadow-2xl flex flex-col justify-between"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={prod.images?.[0]}
                    alt={prod.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2a0f1b] via-transparent to-transparent" />
                  
                  <span className="absolute top-4 left-4 bg-charcoal/90 text-gold text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-gold/40">
                    Numbered Collector Piece
                  </span>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between text-xs text-gold uppercase tracking-wider mb-2 font-semibold">
                    <span>{prod.fabric}</span>
                    <span>Takes {prod.weaveTimeDays} Days to Weave</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                    {prod.name}
                  </h3>

                  <p className="text-xs text-champagne/70 line-clamp-2 leading-relaxed mb-6 font-sans">
                    {prod.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gold/20">
                    <div>
                      <span className="text-xs text-champagne/60 block">Collector Investment</span>
                      <span className="font-serif text-2xl font-bold text-gold">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <Link
                      to={`/product/${prod.slug}`}
                      className="px-6 py-3 bg-burgundy hover:bg-gold hover:text-charcoal text-ivory text-xs font-semibold uppercase tracking-wider rounded-xl transition-all border border-gold/40 flex items-center gap-1.5"
                    >
                      <span>Acquire Piece</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/collections/premium"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold hover:text-white transition-colors"
            >
              <span>View All Premium Collector Ensembles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION 8: TESTIMONIALS */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark block mb-2 font-sans">
              Patron Voices
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Words From Our Patrons
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-champagne shadow-sm hover:shadow-luxury hover:border-gold transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Stars */}
                  <div className="flex gap-1 text-gold mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="text-sm">&#9733;</span>
                    ))}
                  </div>

                  <p className="font-editorial text-base text-charcoal/80 leading-relaxed italic mb-6">
                    "{t.review}"
                  </p>
                </div>

                <div className="pt-4 border-t border-champagne flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border border-gold"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-bold text-burgundy">{t.name}</h4>
                    <p className="text-[11px] text-charcoal/60">{t.location}</p>
                    <p className="text-[10px] text-gold-dark font-medium truncate mt-0.5">
                      Purchased: {t.product}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 9: INSTAGRAM / SOCIAL GALLERY */}
      <section className="py-20 bg-beige/30 border-t border-champagne">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy block mb-1 font-sans">
              #taatXaalHeritage
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
              Styled by Elegance, Shared Worldwide
            </h2>
            <p className="text-xs text-charcoal/60 mt-1">
              Tag @taatXaal on Instagram to be featured in our curated handloom gallery.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80"
            ].map((src, idx) => (
              <div key={idx} className="aspect-square rounded-xl overflow-hidden relative group border border-champagne">
                <img
                  src={src}
                  alt={`Assamese Handloom Style ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-burgundy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-ivory">
                  <span className="text-xs font-serif font-bold text-gold">@taatXaal</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 10: NEWSLETTER */}
      <section className="py-20 bg-burgundy text-champagne relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-gold text-xs uppercase font-bold tracking-widest block mb-2">
            The Weavers' Dispatch
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            "Stay Woven Into Our World."
          </h2>
          <p className="font-editorial text-base sm:text-lg text-champagne/90 max-w-xl mx-auto italic mb-8">
            Receive private preview invitations to limited edition Muga weaves, bridal trousseau chronicles, and handloom artisan stories from Sualkuchi.
          </p>

          {newsletterSubscribed ? (
            <div className="inline-flex items-center gap-2 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-gold/40 text-ivory text-sm">
              <CheckCircle2 className="w-5 h-5 text-gold" />
              <span>You have been woven into our inner circle. Welcome to taatXaal.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your personal email"
                className="flex-1 px-5 py-3.5 rounded-xl bg-ivory text-charcoal text-sm placeholder:text-charcoal/50 focus:outline-none focus:ring-2 focus:ring-gold"
                required
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-gold hover:bg-gold-shimmer text-charcoal font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-gold shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-[11px] text-champagne/60 mt-4">
            We value your privacy. No spam. Only poetry in yarn.
          </p>
        </div>
      </section>

    </div>
  );
}

