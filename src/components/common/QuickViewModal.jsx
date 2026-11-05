import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, ShieldCheck, Truck, Sparkles, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedAnim, setAddedAnim] = useState(false);

  if (!quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct.id);
  const images = quickViewProduct.images || [];

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    setAddedAnim(true);
    setTimeout(() => {
      setAddedAnim(false);
      closeQuickView();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/70 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={closeQuickView} />

      <div className="relative bg-ivory rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-gold/40 z-10 my-8">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-charcoal hover:text-burgundy flex items-center justify-center shadow-md transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Gallery */}
          <div className="p-6 bg-beige/30 flex flex-col justify-between">
            <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-white border border-champagne shadow-sm relative">
              <img
                src={images[selectedImgIdx] || images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
              {quickViewProduct.discount && (
                <span className="absolute top-3 left-3 bg-burgundy text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {quickViewProduct.discount}
                </span>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImgIdx(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImgIdx === i ? 'border-burgundy ring-2 ring-gold/40' : 'border-champagne opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="p-6 md:p-8 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
            <div>
              <div className="flex items-center gap-2 text-xs text-gold-dark font-semibold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>{quickViewProduct.fabric}</span>
                <span className="text-charcoal/40">&bull;</span>
                <span>{quickViewProduct.category}</span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-burgundy mb-2">
                {quickViewProduct.name}
              </h2>

              <p className="text-xs text-charcoal/70 mb-3 font-mono">
                SKU: {quickViewProduct.sku} &bull; Handcrafted in Sualkuchi
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-serif text-3xl font-bold text-burgundy">
                  ₹{quickViewProduct.price.toLocaleString('en-IN')}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-base text-charcoal/40 line-through">
                    ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {quickViewProduct.discount && (
                  <span className="text-xs font-bold text-maroon bg-gold/20 px-2 py-0.5 rounded">
                    You Save ₹{(quickViewProduct.originalPrice - quickViewProduct.price).toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <p className="text-xs text-charcoal/80 leading-relaxed mb-4">
                {quickViewProduct.description}
              </p>

              {/* Artisan Note */}
              {quickViewProduct.artisan && (
                <div className="p-3 bg-gold/10 rounded-lg border border-gold/30 mb-4 text-xs">
                  <span className="font-semibold text-burgundy">Master Artisan: </span>
                  <span className="text-charcoal/80">{quickViewProduct.artisan}</span>
                  <p className="text-[11px] text-charcoal/60 mt-0.5">
                    Traditional Pit Loom Weave Time: ~{quickViewProduct.weaveTimeDays || 20} days
                  </p>
                </div>
              )}

              {/* Motifs */}
              {quickViewProduct.motifs && (
                <div className="mb-4">
                  <span className="text-xs font-semibold text-charcoal uppercase tracking-wider block mb-1.5">
                    Authentic Motifs:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickViewProduct.motifs.map((m, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 bg-white border border-champagne rounded-md text-charcoal/90">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions: Quantity + Add to Bag + Wishlist */}
            <div className="pt-4 border-t border-champagne space-y-3">
              <div className="flex items-center gap-3">
                
                {/* Quantity selector */}
                <div className="flex items-center border border-champagne rounded-lg bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-charcoal hover:bg-gold/10 text-sm font-semibold transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-sm font-medium text-charcoal min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-charcoal hover:bg-gold/10 text-sm font-semibold transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={addedAnim}
                  className="flex-1 py-3 px-4 bg-burgundy hover:bg-maroon text-ivory font-medium text-sm rounded-lg shadow-md flex items-center justify-center gap-2 transition-all border border-gold/50"
                >
                  {addedAnim ? (
                    <>
                      <Check className="w-4 h-4 text-gold animate-bounce" />
                      <span>Added to Shopping Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-gold" />
                      <span>Add to Shopping Bag</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3 rounded-lg border flex items-center justify-center transition-colors ${
                    inWishlist ? 'bg-burgundy text-gold border-gold' : 'bg-white text-charcoal border-champagne hover:border-gold'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-gold' : ''}`} />
                </button>
              </div>

              {/* View Full Product Details Link */}
              <Link
                to={`/product/${quickViewProduct.slug}`}
                onClick={closeQuickView}
                className="block text-center text-xs font-semibold uppercase tracking-wider text-burgundy hover:text-maroon hover:underline pt-2"
              >
                View Full Product Specifications &amp; Care Details &rarr;
              </Link>

              {/* Assurances */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-charcoal/70 pt-2 border-t border-champagne/40">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>100% Silk Mark Authenticity</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>Insured Express Shipping</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

