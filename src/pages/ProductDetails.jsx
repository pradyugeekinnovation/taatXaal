import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Award, 
  ChevronDown, 
  Sparkles, 
  Star, 
  Check, 
  Maximize2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/common/ProductCard';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, addToast } = useShop();

  const product = MOCK_PRODUCTS.find((p) => p.slug === slug) || MOCK_PRODUCTS[0];

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  // Accordion active state
  const [openAccordion, setOpenAccordion] = useState('details');

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImgIdx(0);
  }, [slug]);

  const inWishlist = isInWishlist(product.id);
  const images = product.images || [];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1200);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.fabricType === product.fabricType || p.collection === product.collection)
  ).slice(0, 4);

  return (
    <div className="bg-ivory min-h-screen pb-24">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-charcoal/60">
        <Link to="/" className="hover:text-burgundy">Home</Link>
        <span className="mx-2">&gt;</span>
        <Link to="/collections/general" className="hover:text-burgundy">Collections</Link>
        <span className="mx-2">&gt;</span>
        <span className="text-burgundy font-medium truncate">{product.name}</span>
      </div>

      {/* Main Product Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
          
          {/* LEFT COLUMN: MULTI-IMAGE GALLERY WITH ZOOM */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            
            {/* Thumbnails Sidebar */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[580px] shrink-0 pb-2 md:pb-0">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImgIdx(i)}
                  className={`w-16 h-20 md:w-20 md:h-24 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImgIdx === i ? 'border-burgundy ring-2 ring-gold/40' : 'border-champagne opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Angle ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Large Active Image with Zoom effect */}
            <div className="flex-1 aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-champagne shadow-md relative group">
              <img
                src={images[activeImgIdx] || images[0]}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-500 cursor-zoom-in ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
                {product.isLimitedEdition && (
                  <span className="bg-charcoal text-gold text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-gold/40 shadow-sm">
                    Limited Edition
                  </span>
                )}
                {product.isBestseller && !product.isLimitedEdition && (
                  <span className="bg-burgundy text-ivory text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    Bestseller
                  </span>
                )}
                {product.discount && (
                  <span className="bg-maroon text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                    {product.discount}
                  </span>
                )}
              </div>

              {/* Zoom hint toggle button */}
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute bottom-4 right-4 p-2.5 rounded-full bg-white/80 backdrop-blur-md text-charcoal hover:bg-white hover:text-burgundy shadow-md transition-colors"
                title={isZoomed ? "Reset Zoom" : "Zoom In"}
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: PRODUCT SPECIFICATIONS & ACTIONS */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold-dark mb-1">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>{product.fabric}</span>
                <span className="text-charcoal/30">&bull;</span>
                <span>{product.category}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy leading-snug">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 text-xs text-charcoal/60 mt-1.5 font-mono">
                <span>SKU: {product.sku}</span>
                <span>&bull;</span>
                <div className="flex items-center gap-1 text-gold">
                  <Star className="w-3.5 h-3.5 fill-gold" />
                  <span className="font-bold text-charcoal">{product.rating}</span>
                  <span className="text-charcoal/50">({product.reviewsCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Pricing Box */}
            <div className="p-4 bg-white rounded-xl border border-champagne space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-burgundy">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-charcoal/40 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discount && (
                  <span className="text-xs font-bold text-maroon bg-gold/20 px-2 py-0.5 rounded">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-charcoal/60">
                Inclusive of all taxes &bull; Complimentary insured shipping across India
              </p>
            </div>

            {/* Artisan & Weave Heritage Note */}
            <div className="p-4 bg-beige/50 rounded-xl border border-champagne text-xs space-y-1">
              <div className="flex items-center justify-between font-semibold text-charcoal">
                <span className="text-burgundy flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-gold" /> {product.artisan || 'Master Weaver Guild'}
                </span>
                <span className="flex items-center gap-1 text-gold-dark">
                  <Clock className="w-3.5 h-3.5" /> ~{product.weaveTimeDays || 22} Days Handloom
                </span>
              </div>
              <p className="text-charcoal/70 leading-relaxed text-[11px]">
                Woven on traditional wooden throw-shuttle looms in Assam using 100% natural pure silk fibers with extra-weft hand embroidery.
              </p>
            </div>

            {/* Key attributes pills */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-white border border-champagne">
                <span className="text-charcoal/50 block text-[10px] uppercase font-bold">Silk Type</span>
                <span className="font-semibold text-charcoal">{product.fabric}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-champagne">
                <span className="text-charcoal/50 block text-[10px] uppercase font-bold">Color Shade</span>
                <span className="font-semibold text-charcoal">{product.color}</span>
              </div>
              <div className="col-span-2 p-2.5 rounded-lg bg-white border border-champagne">
                <span className="text-charcoal/50 block text-[10px] uppercase font-bold mb-1">Authentic Motifs</span>
                <div className="flex flex-wrap gap-1">
                  {product.motifs?.map((m, i) => (
                    <span key={i} className="px-2 py-0.5 bg-beige text-burgundy text-[11px] font-medium rounded">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stock indicator */}
            <div className="flex items-center gap-2 text-xs">
              <span className={`w-2 h-2 rounded-full ${product.stock <= 3 ? 'bg-amber-500 animate-pulse' : 'bg-emerald-600'}`} />
              <span className="font-medium text-charcoal">
                {product.stock <= 3 ? `Urgent: Only ${product.stock} handwoven pieces left in loom stock` : 'In Artisan Stock &bull; Ships within 24-48 hours'}
              </span>
            </div>

            {/* Quantity Selector + Add to Bag + Buy Now + Wishlist */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-champagne rounded-xl bg-white overflow-hidden shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-3 text-charcoal hover:bg-gold/10 text-sm font-semibold transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-3 text-sm font-bold text-charcoal min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-3 text-charcoal hover:bg-gold/10 text-sm font-semibold transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToCart}
                  disabled={addedAnim}
                  className="flex-1 py-3.5 px-4 bg-burgundy hover:bg-maroon text-ivory font-semibold text-xs uppercase tracking-wider rounded-xl shadow-luxury flex items-center justify-center gap-2 transition-all border border-gold/40"
                >
                  {addedAnim ? (
                    <>
                      <Check className="w-4 h-4 text-gold animate-bounce" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-gold" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border flex items-center justify-center transition-colors shadow-sm ${
                    inWishlist ? 'bg-burgundy text-gold border-gold' : 'bg-white text-charcoal border-champagne hover:border-gold'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-gold' : ''}`} />
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-gold hover:bg-gold-shimmer text-charcoal-dark font-bold text-xs uppercase tracking-wider rounded-xl shadow-gold transition-all"
              >
                Buy Now &bull; Express Checkout
              </button>
            </div>

            {/* EXPANDABLE ACCORDIONS */}
            <div className="pt-4 border-t border-champagne divide-y divide-champagne/60 text-xs">
              
              {/* Product Details */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('details')}
                  className="w-full flex items-center justify-between font-serif font-bold text-charcoal text-sm text-left"
                >
                  <span>Product Overview &amp; Specifications</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'details' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'details' && (
                  <div className="pt-3 text-charcoal/80 space-y-2 leading-relaxed">
                    <p>{product.description}</p>
                    {product.features && (
                      <ul className="list-disc pl-4 space-y-1 text-xs">
                        {product.features.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Fabric & Craftsmanship */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('craft')}
                  className="w-full flex items-center justify-between font-serif font-bold text-charcoal text-sm text-left"
                >
                  <span>Fabric &amp; Sualkuchi Craftsmanship</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'craft' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'craft' && (
                  <div className="pt-3 text-charcoal/80 space-y-2 leading-relaxed">
                    <p>
                      Each Mekhela Sador is hand-loomed in the historical silk village of Sualkuchi, Assam. Known as the Manchester of the East, Sualkuchi preserves over 1,000 years of unbroken silk weaving tradition.
                    </p>
                    <p>
                      The pure metallic zari (guna) is woven using the intricate extra-weft technique, where motifs appear floating on the surface of the silk with crisp geometric precision.
                    </p>
                  </div>
                )}
              </div>

              {/* Care Instructions */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full flex items-center justify-between font-serif font-bold text-charcoal text-sm text-left"
                >
                  <span>Care Instructions for Handloom Silk</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'care' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'care' && (
                  <div className="pt-3 text-charcoal/80 space-y-1.5 leading-relaxed">
                    {product.care?.map((c, i) => (
                      <p key={i}>&bull; {c}</p>
                    )) || (
                      <>
                        <p>&bull; Strictly dry clean only by experienced silk specialists.</p>
                        <p>&bull; Store wrapped inside breathable muslin/mul-mul cloth.</p>
                        <p>&bull; Avoid spraying perfumes or deodorants directly on the zari.</p>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Shipping & Return Policy */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex items-center justify-between font-serif font-bold text-charcoal text-sm text-left"
                >
                  <span>Shipping, Delivery &amp; Returns</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'shipping' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pt-3 text-charcoal/80 space-y-2 leading-relaxed">
                    <p>
                      <strong>Domestic:</strong> Complimentary insured delivery across India within 3-5 business days via BlueDart/DHL express.
                    </p>
                    <p>
                      <strong>Authenticity Guarantee:</strong> 7-day hassle-free inspection and return policy for unworn items in original packaging with tags intact.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* RELATED PRODUCTS ("YOU MAY ALSO LIKE") */}
        <div className="mt-24 pt-12 border-t border-champagne">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy block mb-1">
              Curated Recommendations
            </span>
            <h2 className="font-serif text-3xl font-bold text-charcoal">You May Also Like</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

