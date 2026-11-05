import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Check, Star, Sparkles, Award } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function ProductCard({ product, variant = 'standard' }) {
  const { toggleWishlist, isInWishlist, addToCart, openQuickView } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const primaryImg = product.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
  const secondaryImg = product.images?.[1] || primaryImg;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1200);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const isSignature = variant === 'signature';

  return (
    <div 
      className={`group relative flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-500 ${
        isSignature
          ? 'border border-gold/40 hover:border-gold hover:shadow-2xl hover:shadow-burgundy/15 ring-1 ring-gold/10'
          : 'border border-champagne/80 hover:border-gold hover:shadow-luxury'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative Gold Corner Filigree for signature variant */}
      {isSignature && (
        <>
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-gold/60 pointer-events-none z-20 group-hover:border-gold transition-colors" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-gold/60 pointer-events-none z-20 group-hover:border-gold transition-colors" />
        </>
      )}

      {/* Product Image Area */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-b from-[#FAF6EE] to-[#F3EBDD]">
        
        {/* Primary & Secondary Image transition */}
        <Link to={`/product/${product.slug}`} className="block w-full h-full relative overflow-hidden">
          <img
            src={primaryImg}
            alt={product.name}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
              isHovered && product.images?.[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
          />
          {product.images?.[1] && (
            <img
              src={secondaryImg}
              alt={`${product.name} alternate view`}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            />
          )}

          {/* Subtle silk shimmer overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-gold/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </Link>

        {/* Top Badges Stack */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isLimitedEdition && (
            <span className="bg-charcoal text-gold text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-gold/40 shadow-md backdrop-blur-md">
              Limited Edition
            </span>
          )}
          {product.isBestseller && !product.isLimitedEdition && (
            <span className="bg-gradient-to-r from-burgundy to-maroon text-ivory text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md border border-gold/30">
              Bestseller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-gold text-charcoal-dark text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md">
              New In
            </span>
          )}
          {product.discount && (
            <span className="bg-[#8B1E2F] text-white text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full shadow-md border border-white/20">
              {product.discount}
            </span>
          )}
        </div>

        {/* Weave Time Pill */}
        {product.weaveTimeDays && (
          <div className="absolute bottom-3 left-3 z-10 pointer-events-none opacity-90 group-hover:opacity-0 transition-opacity">
            <span className="bg-black/60 backdrop-blur-md text-champagne text-[10px] font-mono px-2 py-0.5 rounded-md border border-white/10 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-gold" />
              {product.weaveTimeDays}d Loom
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
            inWishlist
              ? 'bg-burgundy text-gold border border-gold scale-105'
              : 'bg-white/85 backdrop-blur-md text-charcoal hover:bg-white hover:text-burgundy hover:border hover:border-gold/40'
          }`}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          title="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 transition-transform active:scale-125 ${inWishlist ? 'fill-gold' : ''}`} />
        </button>

        {/* Bottom Hover Actions Bar */}
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-charcoal/90 via-charcoal/60 to-transparent flex items-center gap-2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
          
          <button
            onClick={handleQuickViewClick}
            className="flex-1 py-2.5 px-3 bg-ivory/95 hover:bg-white text-charcoal hover:text-burgundy text-xs font-semibold rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all border border-champagne"
            title="Quick View"
          >
            <Eye className="w-3.5 h-3.5 text-gold-dark" />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleQuickAdd}
            disabled={addedAnim}
            className="flex-1 py-2.5 px-3 bg-gradient-to-r from-burgundy via-maroon to-burgundy text-ivory text-xs font-semibold rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all border border-gold/50 hover:brightness-110 active:scale-95"
            title="Add to Shopping Bag"
          >
            {addedAnim ? (
              <>
                <Check className="w-3.5 h-3.5 text-gold animate-bounce" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-gold" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Fabric, Silk Mark seal and Color line */}
          <div className="flex items-center justify-between text-[11px] mb-1.5 font-sans">
            <span className="font-bold text-burgundy uppercase tracking-wider flex items-center gap-1">
              <Award className="w-3 h-3 text-gold" />
              {product.fabric}
            </span>
            <span className="font-editorial italic text-gold-dark font-medium capitalize">
              {product.colorFamily}
            </span>
          </div>

          {/* Product Name */}
          <Link to={`/product/${product.slug}`} className="block group-hover:text-burgundy">
            <h3 className="font-serif text-sm sm:text-base font-bold text-charcoal group-hover:text-burgundy transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Motifs preview tag */}
          {product.motifs && product.motifs.length > 0 && (
            <p className="text-[11px] text-charcoal/65 mt-1.5 line-clamp-1 italic font-editorial">
              <span className="not-italic font-semibold text-charcoal/50">Motifs:</span> {product.motifs.join(' \u2022 ')}
            </p>
          )}

          {/* Rating Snapshot */}
          <div className="flex items-center gap-1.5 mt-2 text-[11px]">
            <div className="flex text-gold">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(product.rating || 5) ? 'fill-gold text-gold' : 'text-champagne'}`}
                />
              ))}
            </div>
            <span className="font-bold text-charcoal text-xs">{product.rating || 4.9}</span>
            <span className="text-charcoal/40 text-[10px]">({product.reviewsCount || 24})</span>
          </div>
        </div>

        {/* Price and Stock Indicator */}
        <div className="mt-3 pt-3 border-t border-champagne/50 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-base sm:text-lg font-bold text-burgundy">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-charcoal/40 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div className="text-[10px] text-charcoal/60 flex items-center gap-1 font-medium">
            <span className={`w-1.5 h-1.5 rounded-full ${product.stock <= 3 ? 'bg-amber-500 animate-pulse' : 'bg-emerald-600'}`}></span>
            <span>{product.stock <= 3 ? `Only ${product.stock} left` : 'Loom In Stock'}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
