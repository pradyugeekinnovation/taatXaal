import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Award, ArrowRight, Heart, Eye, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import { MOCK_PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';

export default function PremiumCollection() {
  const { addToCart, openQuickView, toggleWishlist, isInWishlist } = useShop();

  const premiumProducts = MOCK_PRODUCTS.filter((p) => p.collection === 'premium' || p.isLimitedEdition);

  return (
    <div className="bg-[#18060e] text-champagne min-h-screen pb-24 selection:bg-gold selection:text-charcoal">
      
      {/* CINEMATIC LUXURY HERO */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden border-b border-gold/30">
        
        {/* Background Editorial Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=2000&q=85"
            alt="Premium Assamese Haute Couture"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18060e] via-[#320c1b]/70 to-black/70" />
          <div className="absolute inset-0 bg-dark-texture opacity-25" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 backdrop-blur-md border border-gold/40 text-gold text-xs font-semibold uppercase tracking-[0.3em]">
            <Sparkles className="w-3.5 h-3.5" />
            Haute Couture &bull; Limited Editions
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
            The Sovereign Premium Collection
          </h1>

          <p className="font-editorial text-lg sm:text-2xl text-champagne/90 italic max-w-2xl mx-auto font-light leading-relaxed">
            "Rare wild Muga yarn, 24k tested gold threads, and certified master artisan signatures from the ancient looms of Assam."
          </p>

          <div className="pt-2 flex items-center justify-center gap-6 text-xs text-champagne/70 font-mono">
            <span>Numbered Batches</span>
            <span>&bull;</span>
            <span>Museum-Grade Weave</span>
            <span>&bull;</span>
            <span>Silk Mark Certified</span>
          </div>
        </div>
      </section>

      {/* LUXURY EDITORIAL SHOWCASE OF LIMITED PIECES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold text-xs uppercase font-bold tracking-[0.25em] block mb-2 font-sans">
            Limited Editions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Collector's Masterworks
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
        </div>

        <div className="space-y-20">
          {premiumProducts.map((product, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={product.id}
                className={`flex flex-col ${
                  isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } gap-10 lg:gap-14 items-center bg-[#240a15] rounded-3xl p-6 sm:p-10 border border-gold/30 shadow-2xl`}
              >
                {/* Large Editorial Photography */}
                <div className="w-full lg:w-1/2 aspect-[4/5] rounded-2xl overflow-hidden relative group">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                  {/* Numbered Tag */}
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-gold/40 text-[10px] text-gold uppercase tracking-widest font-mono">
                    Limited Edition No. {idx + 1} of 10
                  </div>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-gold flex items-center justify-center border border-gold/30 transition-colors"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-gold' : ''}`} />
                  </button>
                </div>

                {/* Editorial Information */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div>
                    <span className="text-gold text-xs uppercase font-bold tracking-widest block mb-1">
                      {product.fabric} &bull; {product.category}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-champagne/60 font-mono mt-1">
                      SKU: {product.sku} &bull; Handwoven in Sualkuchi Guild
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-champagne/85 leading-relaxed font-sans">
                    {product.description}
                  </p>

                  {/* Craftsmanship Details */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-gold/20 text-xs">
                    <div>
                      <span className="text-champagne/50 block text-[10px] uppercase tracking-wider">Artisan</span>
                      <span className="font-semibold text-white">{product.artisan || 'Master Weaver'}</span>
                    </div>
                    <div>
                      <span className="text-champagne/50 block text-[10px] uppercase tracking-wider">Loom Time</span>
                      <span className="font-semibold text-white">{product.weaveTimeDays} Days on Pit Loom</span>
                    </div>
                    <div>
                      <span className="text-champagne/50 block text-[10px] uppercase tracking-wider">Sacred Motifs</span>
                      <span className="text-gold">{product.motifs?.join(', ') || 'Kingkhap Crest'}</span>
                    </div>
                    <div>
                      <span className="text-champagne/50 block text-[10px] uppercase tracking-wider">Packaging</span>
                      <span className="text-champagne">Handcrafted Teakwood Box</span>
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-champagne/60 block">
                        Investment Value
                      </span>
                      <span className="font-serif text-3xl font-bold text-gold">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => openQuickView(product)}
                        className="flex-1 sm:flex-none px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold uppercase tracking-wider border border-white/20 transition-colors"
                      >
                        Inspect
                      </button>

                      <button
                        onClick={() => addToCart(product, 1)}
                        className="flex-1 sm:flex-none px-6 py-3 bg-gold hover:bg-gold-shimmer text-charcoal font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-gold flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Acquire Piece</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Premium Assurance Section */}
        <div className="mt-24 p-8 sm:p-12 rounded-3xl bg-[#280b18] border border-gold/40 text-center max-w-4xl mx-auto space-y-4">
          <Award className="w-10 h-10 text-gold mx-auto" />
          <h3 className="font-serif text-2xl font-bold text-white">The taatXaal Provenance Guarantee</h3>
          <p className="text-xs text-champagne/80 max-w-xl mx-auto leading-relaxed">
            Every piece from the Premium Collection includes a signed Certificate of Authenticity with the master weaver's thumb impression, GI-tag lineage documentation, and complimentary lifetime heirloom rejuvenation care.
          </p>
        </div>

      </section>

    </div>
  );
}

