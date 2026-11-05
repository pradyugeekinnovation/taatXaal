import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function CartDrawer() {
  const { 
    cart, 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    updateQuantity, 
    removeFromCart, 
    cartSubtotal, 
    cartTotal, 
    totalItemCount,
    appliedCoupon 
  } = useShop();
  
  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-ivory shadow-2xl flex flex-col border-l border-gold/40">
          
          {/* Header */}
          <div className="p-5 border-b border-champagne flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-burgundy" />
              <h2 className="font-serif text-lg font-bold text-charcoal">
                Shopping Bag <span className="text-gold font-normal">({totalItemCount})</span>
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-charcoal/60 hover:text-burgundy rounded-full hover:bg-gold/10 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Progress Banner */}
          <div className="bg-beige/60 px-5 py-2.5 border-b border-champagne text-xs">
            {cartSubtotal >= 10000 ? (
              <p className="text-emerald-800 font-medium flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-gold" />
                You have qualified for complimentary insured delivery across India!
              </p>
            ) : (
              <div>
                <p className="text-charcoal/80">
                  Add <strong className="text-burgundy">₹{(10000 - cartSubtotal).toLocaleString('en-IN')}</strong> more for complimentary shipping
                </p>
                <div className="w-full bg-champagne h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div 
                    className="bg-gold h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (cartSubtotal / 10000) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-champagne/40">
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-champagne/40 text-gold flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 opacity-70" />
                </div>
                <h3 className="font-serif text-lg font-bold text-charcoal mb-1">Your bag is empty</h3>
                <p className="text-xs text-charcoal/60 mb-6 max-w-xs mx-auto">
                  Discover handcrafted Muga, Pat, and Eri silk Mekhela Sador woven by Sualkuchi artisans.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/collections/general');
                  }}
                  className="px-6 py-2.5 bg-burgundy hover:bg-maroon text-ivory text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors border border-gold/40"
                >
                  Explore Handloom Collections
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartId || item.id} className="pt-4 first:pt-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 rounded-lg overflow-hidden bg-beige/40 border border-champagne shrink-0">
                    <img
                      src={item.images?.[0] || item.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-semibold text-charcoal line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartId || item.id)}
                          className="text-charcoal/40 hover:text-red-700 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-charcoal/60 mt-0.5">
                        {item.fabric || 'Pure Assam Handloom'} &bull; {item.color || 'Natural'}
                      </p>

                      {/* Custom specs note if custom piece */}
                      {item.customSpecs && (
                        <div className="mt-1 p-1.5 bg-gold/10 rounded text-[10px] text-burgundy font-medium">
                          Custom: {item.customSpecs.fabric} &bull; {item.customSpecs.motif}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-champagne rounded-md bg-white">
                        <button
                          onClick={() => updateQuantity(item.cartId || item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-charcoal hover:bg-gold/10"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-medium text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartId || item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-charcoal hover:bg-gold/10"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-serif text-sm font-bold text-burgundy">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Call-to-action */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-champagne bg-white space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-charcoal/70">
                  <span>Bag Subtotal</span>
                  <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>Coupon ({appliedCoupon.code})</span>
                    <span>-₹{Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100).toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-charcoal/70">
                  <span>Estimated Shipping</span>
                  <span>{cartSubtotal >= 10000 ? 'Complimentary' : '₹500'}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-burgundy pt-2 border-t border-champagne/40">
                  <span>Total Amount</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full py-3 bg-burgundy hover:bg-maroon text-ivory font-semibold text-xs uppercase tracking-wider rounded-lg shadow-md flex items-center justify-center gap-2 transition-all border border-gold/40"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4 text-gold" />
                </button>

                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full py-2.5 bg-beige hover:bg-champagne/60 text-charcoal font-medium text-xs rounded-lg transition-colors border border-champagne"
                >
                  View Full Shopping Bag &amp; Apply Coupons
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-charcoal/60 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <span>100% Handcrafted Authenticity Guaranteed</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

