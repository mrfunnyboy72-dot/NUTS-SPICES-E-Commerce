import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { ArrowLeft, SlidersHorizontal, Sparkles, ShoppingBag } from 'lucide-react';

export default function CategoryPage() {
  const { navigate, products, categories, selectedCategory, setSelectedCategory } = useCart();
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-low' | 'price-high' | 'rating'

  // Find category metadata
  const currentCategory = (categories || []).find(c => 
    c.id === selectedCategory || 
    (c.name && c.name.toLowerCase() === (selectedCategory || '').toLowerCase())
  ) || {
    id: selectedCategory || 'all',
    name: selectedCategory ? selectedCategory.replace(/-/g, ' ').toUpperCase() : 'SPECIAL COLLECTION',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600',
    description: 'Explore our handpicked gourmet collection crafted with 100% natural ingredients.'
  };

  // Filter products for ONLY this category
  const filteredProducts = (products || [])
    .filter(p => p.status !== 'Inactive' && p.active !== false)
    .filter(p => {
      if (!selectedCategory || selectedCategory === 'all') return true;
      const cId = (selectedCategory || '').toLowerCase().trim();
      const cName = (currentCategory.name || '').toLowerCase().trim();
      const pCat = (p.category || '').toLowerCase().trim();
      const pCatName = (p.categoryName || '').toLowerCase().trim();

      return (
        pCat === cId ||
        pCat === cName ||
        (cName && pCatName === cName) ||
        (cId && pCatName === cId) ||
        (pCat && cId && (pCat.includes(cId) || cId.includes(pCat))) ||
        (pCatName && cName && (pCatName.includes(cName) || cName.includes(pCatName)))
      );
    });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aPrice = a.weights && a.weights[0] ? a.weights[0].price : (a.price || 0);
    const bPrice = b.weights && b.weights[0] ? b.weights[0].price : (b.price || 0);

    if (sortBy === 'price-low') return aPrice - bPrice;
    if (sortBy === 'price-high') return bPrice - aPrice;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0; // default featured
  });

  return (
    <div className="bg-white min-h-screen pb-16 space-y-8">
      
      {/* CATEGORY HEADER BANNER */}
      <section className="relative bg-[#2B1509] text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-xl border-b border-[#8B3A13]/40">
        
        {/* Subtle Decorative Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B3A13]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          
          {/* Back Button */}
          <button
            onClick={() => navigate('categories')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#E6D7C3] hover:text-white text-xs font-bold transition-all border border-white/15"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Categories</span>
          </button>

          {/* Banner Main Content */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B3A13] text-[#D4AF37] text-[11px] font-extrabold uppercase tracking-wider border border-[#D4AF37]/40 shadow">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Exclusive Collection</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-wide uppercase">
                {currentCategory.name}
              </h1>

              <p className="text-xs sm:text-sm text-[#E6D7C3] leading-relaxed">
                {currentCategory.description || `Handpicked, 100% natural, premium quality items from our ${currentCategory.name} selection.`}
              </p>

              <div className="pt-1 text-xs font-extrabold text-[#D4AF37] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span>{sortedProducts.length} Premium Products Available</span>
              </div>
            </div>

            {/* Category Image Thumbnail */}
            {currentCategory.image && (
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-2xl shrink-0 bg-white/5">
                <img
                  src={currentCategory.image}
                  alt={currentCategory.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

          </div>

        </div>

      </section>

      {/* FILTER & SORT BAR + PRODUCT GRID */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E6D7C3]">
          
          <div className="text-sm font-bold text-[#2B1509]">
            Showing products for <span className="text-[#8B3A13] uppercase font-black">{currentCategory.name}</span>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="flex items-center gap-2 text-xs font-bold text-[#4A3525]">
              <SlidersHorizontal className="w-4 h-4 text-[#8B3A13]" />
              <span>Sort By:</span>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#E6D7C3] rounded-xl text-xs font-extrabold text-[#2B1509] px-3 py-2 focus:outline-none focus:border-[#8B3A13] shadow-sm cursor-pointer"
            >
              <option value="featured">Featured / Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>

        {/* PRODUCTS GRID */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="text-center py-16 px-4 bg-[#FAF5EF] rounded-3xl border border-[#E6D7C3] max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#8B3A13]/10 text-[#8B3A13] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-serif text-[#2B1509]">
              No Products Found in {currentCategory.name}
            </h3>
            <p className="text-xs text-[#8C7A6B]">
              We are currently updating stock for this category. Please check back soon or browse our other available collections!
            </p>
            <button
              onClick={() => navigate('categories')}
              className="px-6 py-2.5 rounded-full bg-[#8B3A13] text-white text-xs font-bold hover:bg-[#6E2C00] transition-colors shadow-md"
            >
              Explore Other Categories
            </button>
          </div>
        )}

      </main>

    </div>
  );
}
