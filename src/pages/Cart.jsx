import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Tag, 
  ArrowLeft,
  Truck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Cart() {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    cartSubtotal, 
    discountAmount, 
    shippingFee, 
    cartTotal, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon,
    addToast
  } = useShop();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    applyCoupon(couponCodeInput.trim());
    setCouponCodeInput('');
  };

  return (
    <div className="bg-ivory min-h-screen pb-24">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#3b121e] via-[#651D32] to-[#240a12] text-ivory py-12 px-4 sm:px-6 lg:px-8 border-b border-gold/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-gold text-xs uppercase font-bold tracking-[0.2em] block mb-1">
              Curated Handloom Selection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Your Shopping Bag
            </h1>
          </div>
          <Link
            to="/collections/general"
            className="hidden sm:flex items-center gap-2 text-xs font-semibold text-champagne hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 sm:p-16 text-center border border-champagne shadow-sm max-w-2xl mx-auto my-12">
            <div className="w-20 h-20 rounded-full bg-champagne/40 text-gold flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 opacity-70" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-charcoal mb-2">Your shopping bag is empty</h2>
            <p className="text-xs text-charcoal/60 mb-8 max-w-sm mx-auto leading-relaxed">
              Explore our master artisan handlooms in pure Assam Muga, Mulberry Pat, and non-violent Eri peace silk.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/collections/general"
                className="w-full sm:w-auto px-6 py-3 bg-burgundy hover:bg-maroon text-ivory text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors border border-gold/40"
              >
                Explore Collections
              </Link>
              <Link
                to="/customise"
                className="w-full sm:w-auto px-6 py-3 bg-gold hover:bg-gold-shimmer text-charcoal text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
              >
                Customise Mekhela Sador
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: CART ITEMS TABLE */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-champagne shadow-sm overflow-hidden">
              
              <div className="p-5 border-b border-champagne flex items-center justify-between">
                <h3 className="font-serif text-base font-bold text-charcoal">
                  Items in Bag ({cart.length})
                </h3>
                <button
                  onClick={clearCart}
                  className="text-xs text-charcoal/50 hover:text-red-700 transition-colors"
                >
                  Clear All
                </button>
              </div>

              {/* Items List */}
              <div className="divide-y divide-champagne">
                {cart.map((item) => (
                  <div key={item.cartId || item.id} className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                    
                    <div className="flex gap-4 items-center">
                      <img
                        src={item.images?.[0] || item.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80'}
                        alt={item.name}
                        className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl object-cover bg-beige/40 border border-champagne shrink-0"
                      />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-burgundy tracking-wider block">
                          {item.fabric || 'Pure Assam Silk'}
                        </span>
                        <h4 className="font-serif text-base font-bold text-charcoal">
                          {item.name}
                        </h4>
                        <p className="text-xs text-charcoal/60 mt-0.5">
                          Color: {item.color || 'Natural'}
                        </p>

                        {/* Custom Specs if custom piece */}
                        {item.customSpecs && (
                          <div className="mt-1.5 p-2 bg-gold/10 rounded-lg text-[11px] text-burgundy border border-gold/30">
                            <strong>Bespoke Specs:</strong> {item.customSpecs.fabric} &bull; {item.customSpecs.color} &bull; Motifs: {item.customSpecs.motifs}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-champagne/40">
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-champagne rounded-lg bg-beige/30">
                        <button
                          onClick={() => updateQuantity(item.cartId || item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-xs text-charcoal hover:bg-gold/10 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-1 text-xs font-bold text-charcoal min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartId || item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-xs text-charcoal hover:bg-gold/10 font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <div className="text-right min-w-[5.5rem]">
                        <span className="font-serif text-base font-bold text-burgundy block">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-charcoal/50">
                          ₹{item.price.toLocaleString('en-IN')} each
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.cartId || item.id)}
                        className="p-2 text-charcoal/40 hover:text-red-700 transition-colors"
                        title="Remove from bag"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>

                  </div>
                ))}
              </div>

            </div>

            {/* RIGHT: ORDER SUMMARY & COUPON PROMO */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Order Summary Box */}
              <div className="bg-white rounded-2xl p-6 border border-champagne shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-burgundy pb-3 border-b border-champagne">
                  Order Summary
                </h3>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-charcoal/80">
                    <span>Bag Subtotal</span>
                    <span className="font-medium text-charcoal">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-800 font-semibold bg-emerald-50 p-2 rounded-lg">
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Coupon ({appliedCoupon.code})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                        <button onClick={removeCoupon} className="text-red-600 hover:underline text-[10px]">
                          Remove
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between text-charcoal/80">
                    <span>Shipping &amp; Insurance</span>
                    <span className="font-medium text-charcoal">
                      {shippingFee === 0 ? 'Complimentary' : `₹${shippingFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-charcoal/80">
                    <span>Authenticity Certificate</span>
                    <span className="text-emerald-700 font-semibold">Included</span>
                  </div>

                  <div className="pt-3 border-t border-champagne flex justify-between items-baseline">
                    <span className="font-serif text-base font-bold text-charcoal">Estimated Total</span>
                    <span className="font-serif text-2xl font-bold text-burgundy">
                      ₹{cartTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-4 bg-burgundy hover:bg-maroon text-ivory font-semibold text-xs uppercase tracking-widest rounded-xl shadow-luxury transition-all border border-gold/40 flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-gold" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-charcoal/60 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                  <span>Secure 256-bit Encrypted Checkout</span>
                </div>
              </div>

              {/* Coupon Code Input Box */}
              <div className="bg-white rounded-2xl p-5 border border-champagne shadow-sm space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal block">
                  Promotional Coupon
                </span>
                
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    placeholder="E.g. BOHAG10 or BRIDAL15"
                    className="flex-1 px-3 py-2.5 rounded-lg border border-champagne text-xs uppercase tracking-wider text-charcoal focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-beige hover:bg-gold hover:text-charcoal text-burgundy text-xs font-bold rounded-lg transition-colors border border-champagne"
                  >
                    Apply
                  </button>
                </form>

                <div className="text-[11px] text-charcoal/60 space-y-1">
                  <p>Try code <strong className="text-burgundy">BOHAG10</strong> for 10% off (min ₹15,000).</p>
                  <p>Try code <strong className="text-burgundy">BRIDAL15</strong> for 15% off (min ₹45,000).</p>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

