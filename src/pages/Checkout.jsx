import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Banknote, 
  ArrowRight, 
  ArrowLeft,
  Truck,
  Sparkles,
  Lock,
  PackageCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';

export default function Checkout() {
  const { cart, cartSubtotal, discountAmount, shippingFee, cartTotal, clearCart, addToast } = useShop();
  const { currentUser, createOrder } = useAuth();
  const navigate = useNavigate();

  // Multi-step: 1 = Info & Address, 2 = Payment & Confirm
  const [step, setStep] = useState(1);

  // Form state
  const [customerInfo, setCustomerInfo] = useState({
    fullName: currentUser?.name || 'Priya Saikia',
    email: currentUser?.email || 'priya.saikia@taatxaal.com',
    phone: currentUser?.phone || '+91 98640 12345'
  });

  const [shippingAddress, setShippingAddress] = useState({
    street: currentUser?.addresses?.[0]?.street || 'Bungalow No. 14, Kharghuli Hills',
    city: currentUser?.addresses?.[0]?.city || 'Guwahati',
    state: currentUser?.addresses?.[0]?.state || 'Assam',
    pincode: currentUser?.addresses?.[0]?.pincode || '781004'
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [upiId, setUpiId] = useState('priyasaikia@okhdfcbank');
  const [cardInfo, setCardInfo] = useState({
    number: '•••• •••• •••• 4242',
    name: 'Priya Saikia',
    expiry: '08/29',
    cvv: '•••'
  });

  // Completed Order State for Confirmation Screen
  const [placedOrder, setPlacedOrder] = useState(null);

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!customerInfo.fullName || !customerInfo.email || !customerInfo.phone) {
      addToast('Please complete your contact details.', 'error');
      return;
    }
    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.pincode) {
      addToast('Please enter your delivery street address and pincode.', 'error');
      return;
    }
    setStep(2);
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      addToast('Your cart is empty.', 'error');
      return;
    }

    const orderData = {
      customerInfo,
      shippingAddress,
      items: cart,
      subtotal: cartSubtotal,
      discountAmount,
      shippingFee,
      total: cartTotal,
      paymentMethod: paymentMethod === 'UPI' ? `UPI (${upiId})` : paymentMethod === 'Card' ? 'Credit Card (Visa)' : paymentMethod
    };

    const newOrder = createOrder(orderData);
    setPlacedOrder(newOrder);
    clearCart();

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 }
    });

    addToast(`Order ${newOrder.id} successfully placed! Thank you.`);
  };

  if (placedOrder) {
    return (
      <div className="bg-ivory min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="bg-white rounded-3xl max-w-2xl w-full p-8 sm:p-12 border border-gold/40 shadow-2xl text-center space-y-6">
          
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
            <PackageCheck className="w-10 h-10" />
          </div>

          <div>
            <span className="text-gold text-xs font-bold uppercase tracking-[0.25em] block mb-1">
              Order Confirmed &bull; Artisan Loom Assigned
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy">
              Thank You for Weaving With Us
            </h1>
            <p className="text-xs text-charcoal/70 mt-2 font-mono">
              Order Reference: <strong className="text-charcoal font-bold text-sm">{placedOrder.id}</strong>
            </p>
          </div>

          {/* Itemized Snapshot */}
          <div className="p-5 rounded-2xl bg-beige/40 border border-champagne text-left text-xs space-y-3">
            <div className="flex justify-between pb-2 border-b border-champagne font-semibold text-charcoal">
              <span>Delivery To:</span>
              <span>{placedOrder.customerName}</span>
            </div>
            <p className="text-charcoal/70 leading-snug">
              {placedOrder.shippingAddress.street}, {placedOrder.shippingAddress.city}, {placedOrder.shippingAddress.state} - {placedOrder.shippingAddress.pincode}
            </p>
            <div className="pt-2 border-t border-champagne flex justify-between font-serif font-bold text-sm text-burgundy">
              <span>Paid Amount ({placedOrder.paymentMethod}):</span>
              <span>₹{placedOrder.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="p-4 bg-gold/10 rounded-xl border border-gold/30 text-xs text-charcoal/80 text-left space-y-1">
            <p className="font-semibold text-burgundy flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-gold" /> Artisan Preparation &amp; Quality Inspection
            </p>
            <p>
              Your handloom piece is now being readied by the Sualkuchi Guild. You will receive real-time SMS and dispatch notifications.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              to="/account/orders"
              className="w-full sm:w-auto px-6 py-3.5 bg-burgundy hover:bg-maroon text-ivory text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md"
            >
              Track Order in Dashboard
            </Link>
            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3.5 bg-beige hover:bg-champagne text-charcoal text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
            >
              Return to Home
            </Link>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen pb-24">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#3b121e] via-[#651D32] to-[#240a12] text-ivory py-10 px-4 sm:px-6 lg:px-8 border-b border-gold/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Secure Checkout
          </h1>
          <div className="flex items-center gap-2 text-xs text-champagne/80 font-mono">
            <Lock className="w-3.5 h-3.5 text-gold" />
            <span>256-bit Encrypted SSL</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 mb-8 text-xs font-semibold">
          <div className={`flex items-center gap-2 ${step === 1 ? 'text-burgundy' : 'text-emerald-700'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 1 ? 'bg-burgundy text-white' : 'bg-emerald-600 text-white'
            }`}>
              1
            </span>
            <span>Delivery &amp; Patron Details</span>
          </div>

          <div className="w-12 h-0.5 bg-champagne" />

          <div className={`flex items-center gap-2 ${step === 2 ? 'text-burgundy' : 'text-charcoal/40'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 2 ? 'bg-burgundy text-white' : 'bg-beige text-charcoal/60'
            }`}>
              2
            </span>
            <span>Payment Selection</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: STEP FORMS */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-champagne shadow-sm">
            
            {step === 1 ? (
              <form onSubmit={handleProceedToPayment} className="space-y-6">
                
                {/* Customer Information */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-burgundy pb-2 border-b border-champagne mb-4">
                    1. Patron Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase text-charcoal/70 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.fullName}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, fullName: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-champagne text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase text-charcoal/70 block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-champagne text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase text-charcoal/70 block mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-champagne text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-burgundy pb-2 border-b border-champagne mb-4">
                    2. Insured Doorstep Delivery Address
                  </h3>
                  
                  {/* Saved address quick picker */}
                  {currentUser?.addresses && currentUser.addresses.length > 0 && (
                    <div className="mb-4 p-3 bg-beige/40 rounded-xl border border-champagne flex flex-wrap gap-2 text-xs">
                      <span className="font-semibold text-charcoal/60 mr-1 self-center">Use Saved Address:</span>
                      {currentUser.addresses.map((a) => (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => setShippingAddress({
                            street: a.street,
                            city: a.city,
                            state: a.state,
                            pincode: a.pincode
                          })}
                          className="px-3 py-1 bg-white hover:bg-gold/20 rounded-md border border-champagne text-charcoal font-medium text-xs"
                        >
                          {a.type}: {a.city} ({a.pincode})
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold uppercase text-charcoal/70 block mb-1">
                        Street Address / Bungalow / Flat *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.street}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-champagne text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-semibold uppercase text-charcoal/70 block mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-lg border border-champagne text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase text-charcoal/70 block mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.state}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-lg border border-champagne text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase text-charcoal/70 block mb-1">
                          Pincode *
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.pincode}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-lg border border-champagne text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <Link to="/cart" className="text-xs text-charcoal/60 hover:text-burgundy flex items-center gap-1">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Bag
                  </Link>

                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-burgundy hover:bg-maroon text-ivory font-semibold text-xs uppercase tracking-wider rounded-xl shadow-luxury flex items-center gap-2 border border-gold/40"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4 text-gold" />
                  </button>
                </div>

              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg font-bold text-burgundy pb-2 border-b border-champagne mb-4">
                    Select Payment Method (Mock Gateway Simulation)
                  </h3>

                  {/* Payment Methods Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {[
                      { id: 'UPI', label: 'Instant UPI (GPay / PhonePe / QR)', icon: Smartphone },
                      { id: 'Card', label: 'Credit / Debit Card (Visa / MC)', icon: CreditCard },
                      { id: 'NetBanking', label: 'Net Banking (All Indian Banks)', icon: Building2 },
                      { id: 'COD', label: 'Cash on Handloom Delivery', icon: Banknote }
                    ].map((m) => {
                      const Icon = m.icon;
                      const isSelected = paymentMethod === m.id;
                      return (
                        <div
                          key={m.id}
                          onClick={() => setPaymentMethod(m.id)}
                          className={`p-4 rounded-xl border-2 cursor-pointer flex items-center gap-3 transition-all ${
                            isSelected
                              ? 'border-burgundy bg-burgundy/5 shadow-sm'
                              : 'border-champagne hover:border-gold bg-white'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isSelected ? 'bg-burgundy text-gold' : 'bg-beige text-charcoal/70'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-serif text-xs font-bold text-charcoal">{m.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Payment Details Subpanel */}
                  {paymentMethod === 'UPI' && (
                    <div className="p-5 bg-beige/40 rounded-xl border border-champagne space-y-3 text-xs">
                      <p className="font-semibold text-burgundy">Virtual Payment Address (VPA):</p>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        className="w-full px-3 py-2.5 bg-white rounded-lg border border-champagne font-mono text-charcoal focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                      <p className="text-[11px] text-charcoal/60">
                        Scan &amp; Pay QR simulation: Collect request will be simulated instantly on button click.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'Card' && (
                    <div className="p-5 bg-beige/40 rounded-xl border border-champagne space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                          <label className="text-[10px] uppercase font-bold text-charcoal/70 block mb-1">Card Number</label>
                          <input
                            type="text"
                            value={cardInfo.number}
                            readOnly
                            className="w-full px-3 py-2 bg-white rounded border border-champagne font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-charcoal/70 block mb-1">Expiry</label>
                          <input
                            type="text"
                            value={cardInfo.expiry}
                            readOnly
                            className="w-full px-3 py-2 bg-white rounded border border-champagne font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-charcoal/70 block mb-1">CVV</label>
                          <input
                            type="text"
                            value={cardInfo.cvv}
                            readOnly
                            className="w-full px-3 py-2 bg-white rounded border border-champagne font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'COD' && (
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                      <p className="font-semibold">Cash on Delivery Selected</p>
                      <p>Payment of ₹{cartTotal.toLocaleString('en-IN')} will be collected in cash upon insured delivery.</p>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-charcoal/60 hover:text-burgundy flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Address
                  </button>

                  <button
                    onClick={handlePlaceOrder}
                    className="px-8 py-4 bg-gold hover:bg-gold-shimmer text-charcoal-dark font-bold text-xs uppercase tracking-wider rounded-xl shadow-gold flex items-center gap-2"
                  >
                    <span>Complete Order &bull; ₹{cartTotal.toLocaleString('en-IN')}</span>
                    <PackageCheck className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* RIGHT: ORDER SUMMARY SIDEBAR */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-champagne shadow-sm space-y-4">
            <h3 className="font-serif text-base font-bold text-charcoal pb-2 border-b border-champagne">
              Order Items ({cart.length})
            </h3>

            <div className="divide-y divide-champagne/40 max-h-72 overflow-y-auto space-y-2">
              {cart.map((item) => (
                <div key={item.cartId || item.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.images?.[0] || item.image}
                      alt={item.name}
                      className="w-12 h-14 rounded-lg object-cover bg-beige shrink-0"
                    />
                    <div>
                      <h5 className="font-serif font-bold text-charcoal line-clamp-1">{item.name}</h5>
                      <span className="text-[11px] text-charcoal/60">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-burgundy shrink-0">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-champagne space-y-2 text-xs">
              <div className="flex justify-between text-charcoal/70">
                <span>Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-800 font-semibold">
                  <span>Savings</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-charcoal/70">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'Complimentary' : `₹${shippingFee}`}</span>
              </div>
              <div className="pt-2 border-t border-champagne flex justify-between font-serif font-bold text-base text-burgundy">
                <span>Total Amount</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="p-3 bg-beige/40 rounded-xl text-[11px] text-charcoal/70 space-y-1">
              <p className="font-semibold text-burgundy flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-gold" /> Estimated Delivery: 3-5 Business Days
              </p>
              <p>Shipped directly from Sualkuchi Loom Guild.</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

