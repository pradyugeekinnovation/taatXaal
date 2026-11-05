import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Sparkles, Check } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import { MOCK_PRODUCTS, FABRICS_LIST, COLORS_LIST, MOTIFS_LIST, OCCASIONS_LIST } from '../data/products';

export default function GeneralCollection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFabric = searchParams.get('fabric') || 'All';

  // Filters state
  const [selectedFabric, setSelectedFabric] = useState(initialFabric);
  const [selectedColor, setSelectedColor] = useState('All');
  const [selectedMotif, setSelectedMotif] = useState('All');
  const [priceRange, setPriceRange] = useState(100000);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // Fabric filter
      if (selectedFabric !== 'All' && product.fabricType !== selectedFabric) {
        return false;
      }
      // Color filter
      if (selectedColor !== 'All' && product.colorFamily !== selectedColor) {
        return false;
      }
      // Motif filter
      if (selectedMotif !== 'All' && !product.motifs?.includes(selectedMotif)) {
        return false;
      }
      // Price filter
      if (product.price > priceRange) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (sortBy === 'bestseller') return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      return 0; // featured default
    });
  }, [selectedFabric, selectedColor, selectedMotif, priceRange, sortBy]);

  const resetFilters = () => {
    setSelectedFabric('All');
    setSelectedColor('All');
    setSelectedMotif('All');
    setPriceRange(100000);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters = selectedFabric !== 'All' || selectedColor !== 'All' || selectedMotif !== 'All' || priceRange < 100000;

  return (
    <div className="bg-ivory min-h-screen pb-24">
      
      {/* Collection Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#3b121e] via-[#651D32] to-[#240a12] text-ivory py-16 px-4 sm:px-6 lg:px-8 border-b border-gold/30">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-gold text-xs uppercase font-bold tracking-[0.25em] block mb-2 font-sans">
            Heritage Handloom Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            The General Collection
          </h1>
          <p className="font-editorial text-base sm:text-xl text-champagne/90 max-w-2xl mx-auto italic">
            "Authentic Assamese Mekhela Sador handwoven on traditional pit looms in Sualkuchi, Kamrup and Dhemaji."
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Controls Bar: Total Count + Mobile Filter Trigger + Sort dropdown */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-champagne gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-champagne text-xs font-semibold text-charcoal shadow-sm"
            >
              <Filter className="w-4 h-4 text-burgundy" />
              <span>Filter Catalog {hasActiveFilters && '(Active)'}</span>
            </button>

            <p className="text-xs text-charcoal/70">
              Showing <strong className="text-burgundy font-serif text-sm">{filteredProducts.length}</strong> authentic handloom creations
            </p>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-charcoal/60 hidden sm:inline">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-white rounded-lg border border-champagne text-charcoal text-xs font-medium focus:outline-none focus:ring-1 focus:ring-gold"
            >
              <option value="featured">Featured Curations</option>
              <option value="bestseller">Best Sellers</option>
              <option value="newest">New Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className="text-[11px] text-charcoal/60 font-semibold uppercase tracking-wider">Active Filters:</span>
            {selectedFabric !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-burgundy/10 text-burgundy rounded-full text-xs font-medium">
                Fabric: {selectedFabric}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedFabric('All')} />
              </span>
            )}
            {selectedColor !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-burgundy/10 text-burgundy rounded-full text-xs font-medium">
                Color: {selectedColor}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedColor('All')} />
              </span>
            )}
            {selectedMotif !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-burgundy/10 text-burgundy rounded-full text-xs font-medium">
                Motif: {selectedMotif}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedMotif('All')} />
              </span>
            )}
            {priceRange < 100000 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-burgundy/10 text-burgundy rounded-full text-xs font-medium">
                Under ₹{priceRange.toLocaleString('en-IN')}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceRange(100000)} />
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-burgundy hover:underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Layout: Sidebar Filters + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block bg-white p-6 rounded-2xl border border-champagne shadow-sm sticky top-28 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-champagne">
              <h3 className="font-serif text-base font-bold text-burgundy flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-gold" />
                Refine Selection
              </h3>
              {hasActiveFilters && (
                <button onClick={resetFilters} className="text-xs text-charcoal/60 hover:text-burgundy">
                  Reset
                </button>
              )}
            </div>

            {/* Fabric Filter */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal block mb-2.5">
                Silk / Fabric Type
              </label>
              <div className="space-y-1.5">
                {FABRICS_LIST.map((fab) => (
                  <button
                    key={fab}
                    onClick={() => setSelectedFabric(fab)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      selectedFabric === fab
                        ? 'bg-burgundy text-white font-semibold'
                        : 'text-charcoal/80 hover:bg-beige'
                    }`}
                  >
                    <span>{fab}</span>
                    {selectedFabric === fab && <Check className="w-3.5 h-3.5 text-gold" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal">
                  Max Budget
                </label>
                <span className="font-serif font-bold text-burgundy text-xs">
                  ₹{priceRange.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="100000"
                step="5000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-gold cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-charcoal/50 mt-1">
                <span>₹10,000</span>
                <span>₹1,00,000</span>
              </div>
            </div>

            {/* Palette Filter */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal block mb-2.5">
                Color Family
              </label>
              <div className="flex flex-wrap gap-1.5">
                {COLORS_LIST.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1 rounded-md text-xs transition-colors ${
                      selectedColor === c
                        ? 'bg-gold text-charcoal font-bold shadow-sm'
                        : 'bg-beige/60 text-charcoal/80 hover:bg-beige'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Traditional Motifs */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal block mb-2.5">
                Sacred Motif
              </label>
              <div className="space-y-1.5">
                {MOTIFS_LIST.map((motif) => (
                  <button
                    key={motif}
                    onClick={() => setSelectedMotif(motif)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      selectedMotif === motif
                        ? 'bg-burgundy text-white font-semibold'
                        : 'text-charcoal/80 hover:bg-beige'
                    }`}
                  >
                    <span>{motif}</span>
                    {selectedMotif === motif && <Check className="w-3.5 h-3.5 text-gold" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Sualkuchi Heritage Assurance */}
            <div className="pt-4 border-t border-champagne text-[11px] text-charcoal/70 space-y-1">
              <p className="font-semibold text-burgundy flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-gold" /> Sualkuchi Direct Looms
              </p>
              <p className="leading-snug">
                Every piece is woven on authentic handlooms and shipped in archival moisture-proof wrapping.
              </p>
            </div>

          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-champagne shadow-sm">
                <div className="w-14 h-14 rounded-full bg-gold/20 text-burgundy flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-charcoal mb-2">
                  No matching handloom pieces found
                </h3>
                <p className="text-xs text-charcoal/60 mb-6 max-w-sm mx-auto">
                  Try adjusting your fabric or budget filters to explore other traditional Assamese creations.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-burgundy hover:bg-maroon text-ivory text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors border border-gold/40"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filter Drawer Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-ivory shadow-2xl flex flex-col border-l border-gold/40 p-6 overflow-y-auto space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-champagne">
                <h3 className="font-serif text-lg font-bold text-burgundy">Filters</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-charcoal/60">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Fabric options */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal block mb-2">
                  Fabric Type
                </label>
                <div className="space-y-1">
                  {FABRICS_LIST.map((fab) => (
                    <button
                      key={fab}
                      onClick={() => setSelectedFabric(fab)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs ${
                        selectedFabric === fab ? 'bg-burgundy text-white font-bold' : 'text-charcoal hover:bg-beige'
                      }`}
                    >
                      {fab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal block mb-1">
                  Max Budget: ₹{priceRange.toLocaleString('en-IN')}
                </label>
                <input
                  type="range"
                  min="10000"
                  max="100000"
                  step="5000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-gold"
                />
              </div>

              {/* Color */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal block mb-2">
                  Color
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {COLORS_LIST.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-2.5 py-1 rounded text-xs ${
                        selectedColor === c ? 'bg-gold text-charcoal font-bold' : 'bg-white border border-champagne'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-champagne flex gap-2">
                <button
                  onClick={() => {
                    resetFilters();
                    setIsMobileFilterOpen(false);
                  }}
                  className="flex-1 py-2.5 bg-beige text-charcoal text-xs font-semibold rounded-lg"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-2.5 bg-burgundy text-white text-xs font-semibold rounded-lg"
                >
                  Apply Filters
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

