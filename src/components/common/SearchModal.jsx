import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { MOCK_PRODUCTS } from '../../data/products';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const q = searchTerm.toLowerCase();
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q) ||
        (p.motifs && p.motifs.some((m) => m.toLowerCase().includes(q))) ||
        p.category.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [searchTerm]);

  if (!isSearchOpen) return null;

  const handleSelectProduct = (slug) => {
    setIsSearchOpen(false);
    navigate(`/product/${slug}`);
  };

  const handleQuickTagClick = (tag) => {
    setSearchTerm(tag);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/70 backdrop-blur-md flex items-start justify-center pt-16 px-4">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={() => setIsSearchOpen(false)} />

      <div className="relative bg-ivory rounded-2xl max-w-2xl w-full shadow-2xl border border-gold/40 z-10 overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-champagne bg-white flex items-center gap-3">
          <Search className="w-5 h-5 text-burgundy shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Muga, Pat, Eri, Kingkhap, Bridal Mekhela Sador..."
            className="w-full bg-transparent text-charcoal text-base placeholder:text-charcoal/40 focus:outline-none font-serif"
            autoFocus
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-charcoal/40 hover:text-charcoal"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-3 py-1.5 text-xs font-semibold text-charcoal/70 hover:text-burgundy rounded-lg hover:bg-gold/10"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-6 py-3 bg-beige/30 border-b border-champagne flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-charcoal/50 text-[11px] font-medium shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-gold" /> Popular:
          </span>
          {['Pure Muga', 'Bridal Pat', 'Kingkhap', 'Eri Peace Silk', 'Jaapi Motif', 'Sualkuchi'].map((tag) => (
            <button
              key={tag}
              onClick={() => handleQuickTagClick(tag)}
              className="px-2.5 py-1 bg-white hover:bg-gold/20 text-charcoal/80 rounded-full border border-champagne shrink-0 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
          {searchTerm.trim() === '' ? (
            <div className="text-center py-8 text-charcoal/50 text-xs">
              <p>Type keywords to discover authentic handcrafted Assamese treasures.</p>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="text-center py-8">
              <p className="font-serif text-charcoal font-semibold text-sm">No handloom match found</p>
              <p className="text-xs text-charcoal/60 mt-1">
                Try searching by fabric like "Muga", "Pat", or motifs like "Kingkhap".
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-charcoal/50 mb-2">
                Matching Handloom Pieces ({filteredResults.length})
              </p>
              {filteredResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.slug)}
                  className="p-2.5 rounded-xl hover:bg-white border border-transparent hover:border-gold/30 flex items-center gap-4 cursor-pointer transition-all group"
                >
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-14 h-16 rounded-lg object-cover bg-beige shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-burgundy tracking-wider block">
                      {product.fabric} &bull; {product.category}
                    </span>
                    <h4 className="font-serif text-sm font-semibold text-charcoal group-hover:text-burgundy truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-charcoal/60 truncate font-editorial italic">
                      Motifs: {product.motifs?.join(', ') || 'Traditional Assamese Weave'}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-serif font-bold text-burgundy text-sm block">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-gold font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

