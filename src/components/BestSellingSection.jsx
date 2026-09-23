import React, { useState, useRef, useMemo } from 'react';
import { useCart, isProductActive } from '../context/CartContext';
import { ChevronLeft, ChevronRight, ShoppingBag, Check, ChevronDown } from 'lucide-react';

function BestSellerCard({ product }) {
  const { addToCart, navigate } = useCart();
  
  if (!product) return null;

  const defaultWeight = (product.weights && product.weights[0]) 
    ? product.weights[0] 
    : { label: '250g', price: Number(product.price) || 350, originalPrice: Math.round((Number(product.price) || 350) * 1.2) };

  const [selectedWeight, setSelectedWeight] = useState(defaultWeight);
  const activeWeight = selectedWeight || defaultWeight;
  const weightsList = Array.isArray(product.weights) && product.weights.length > 0 ? product.weights : [defaultWeight];
  const [added, setAdded] = useState(false);

  const curP = Number(activeWeight.price) || 350;
  const origP = Number(activeWeight.originalPrice) || ((product.discountPercent > 0) ? Math.round(curP / ((100 - product.discountPercent) / 100)) : curP);
  const discountPercent = (product.discountPercent !== undefined && product.discountPercent !== null) 
    ? Number(product.discountPercent) 
    : (origP > curP ? Math.round(((origP - curP) / origP) * 100) : 0);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, activeWeight, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div 
      onClick={() => navigate('product-details', { product })}
      className="min-w-[250px] max-w-[270px] sm:min-w-[260px] sm:max-w-[280px] bg-white rounded-3xl border border-[#E6D7C3]/80 hover:border-[#8B3A13]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col snap-start shrink-0 overflow-hidden cursor-pointer group transform hover:-translate-y-1"
    >
      {/* Product Image Box & Badges */}
      <div className="relative aspect-square bg-[#FAF5EF] p-4 flex items-center justify-center overflow-hidden">
        
        {/* Top Badges Stack (Matching Reference Screenshot: BEST SELLER) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="bg-[#D4AF37] text-[#2B1509] text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-sm tracking-wider font-serif">
            BEST SELLER
          </span>
          {discountPercent > 0 && (
            <span className="bg-[#8B3A13] text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm w-fit font-sans">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Card Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
        <div>
          {/* Category Tag */}
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8B3A13] block mb-1">
            {product.categoryName}
          </span>
          
          {/* Product Title */}
          <h3 className="font-serif font-bold text-[#2B1509] text-base leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-[#8B3A13] transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Weight Picker Dropdown */}
        <div onClick={(e) => e.stopPropagation()} className="relative">
          <select
            value={activeWeight.label}
            onChange={(e) => {
              const w = weightsList.find(item => item.label === e.target.value);
              if (w) setSelectedWeight(w);
            }}
            className="w-full text-xs font-bold text-[#4A3525] bg-[#FAF5EF] border border-[#E6D7C3] rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:border-[#8B3A13] appearance-none pr-8"
          >
            {weightsList.map((w) => (
              <option key={w.label} value={w.label}>
                {w.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#8C7A6B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-xs text-[#8C7A6B] line-through font-medium">
            ₹{origP}.00
          </span>
          <span className="text-lg font-black text-[#8B3A13] font-serif">
            ₹{curP}.00
          </span>
        </div>

        {/* Add To Cart Button (Rich Brand Brown #8B3A13) */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg active:scale-95 ${
            added
              ? 'bg-[#2B1509] text-white'
              : 'bg-[#8B3A13] hover:bg-[#6E2C00] text-white'
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>ADDED TO CART</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <span>ADD TO CART</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function BestSellingSection() {
  const { products, categories, setSelectedCategory, navigate } = useCart();
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Pick DIFFERENT products from each category (avoiding Featured Today items)
  const bestSellerProducts = useMemo(() => {
    const cats = (categories || []).filter(c => c.id !== 'all');
    
    // First, determine featured items (1st product per category)
    const featuredSet = new Set();
    cats.forEach(cat => {
      const catId = (cat.id || '').toLowerCase();
      const catName = (cat.name || '').toLowerCase();
      const firstMatch = (products || []).find(p => {
        if (!isProductActive(p)) return false;
        const pCat = (p.category || '').toLowerCase();
        const pCatName = (p.categoryName || '').toLowerCase();
        return pCat === catId || pCat === catName || pCatName === catName || pCatName === catId;
      });
      if (firstMatch) featuredSet.add(firstMatch.id);
    });

    // Now for Best Selling, pick a non-duplicate product from each category
    const items = [];
    cats.forEach(cat => {
      const catId = (cat.id || '').toLowerCase();
      const catName = (cat.name || '').toLowerCase();

      const catMatches = (products || []).filter(p => {
        if (!isProductActive(p)) return false;
        const pCat = (p.category || '').toLowerCase();
        const pCatName = (p.categoryName || '').toLowerCase();
        return pCat === catId || pCat === catName || pCatName === catName || pCatName === catId;
      });

      // Prefer item that is not in featuredSet, fallback to second item or first item
      const chosen = catMatches.find(p => !featuredSet.has(p.id)) || catMatches[1] || catMatches[0];
      if (chosen) {
        items.push(chosen);
      }
    });

    return items;
  }, [categories, products]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const scrollRatio = scrollLeft / (scrollWidth - clientWidth || 1);
      const index = Math.min(3, Math.floor(scrollRatio * 4));
      setActiveIndex(index);
    }
  };

  const handleExploreCatalog = () => {
    if (setSelectedCategory) setSelectedCategory('all');
    navigate('category');
  };

  if (bestSellerProducts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 py-8">
      {/* Header with Subtitle "FRESH FROM HARVEST", Title "Best Selling Products", & Button "Explore All Catalog →" */}
      <div className="flex flex-row items-end justify-between border-b border-[#E6D7C3]/60 pb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#8B3A13] block font-serif">
            FRESH FROM HARVEST
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-[#2B1509] mt-1">
            Best Selling Products
          </h2>
        </div>

        {/* Explore All Catalog Button (Exact match from reference image) */}
        <button
          onClick={handleExploreCatalog}
          className="border border-[#8B3A13]/60 hover:border-[#8B3A13] text-[#8B3A13] hover:bg-[#8B3A13] hover:text-white transition-all font-bold text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5 rounded-full flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <span>Explore All Catalog</span>
          <span className="text-sm">→</span>
        </button>
      </div>

      {/* Carousel Container with Side Navigation Arrows */}
      <div className="relative group">
        
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft}
          className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-[#E6D7C3] flex items-center justify-center text-[#2B1509] hover:bg-[#8B3A13] hover:text-white transition-all cursor-pointer opacity-90 hover:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Scrollable Products Track */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth scrollbar-none py-3 px-1 snap-x snap-mandatory"
        >
          {bestSellerProducts.map((product) => (
            <BestSellerCard key={product.id} product={product} />
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-[#E6D7C3] flex items-center justify-center text-[#2B1509] hover:bg-[#8B3A13] hover:text-white transition-all cursor-pointer opacity-90 hover:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Pagination Indicator Dots */}
      <div className="flex justify-center items-center gap-2 pt-2">
        {[0, 1, 2, 3].map((dot) => (
          <div
            key={dot}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === dot
                ? 'w-6 h-2 bg-[#8B3A13]'
                : 'w-2 h-2 bg-[#D9D9D9]'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
