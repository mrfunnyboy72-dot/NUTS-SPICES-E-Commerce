import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { Filter, SlidersHorizontal, Search, X } from 'lucide-react';

export default function ShopPage() {
  const { products, categories, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useCart();
  const [activeCategory, setActiveCategory] = useState(selectedCategory || 'all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchFilter, setSearchFilter] = useState(searchQuery || '');

  useEffect(() => {
    if (searchQuery !== undefined) {
      setSearchFilter(searchQuery || '');
    }
  }, [searchQuery]);

  useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    }
  }, [selectedCategory]);

  // Filtering
  let filtered = (products || []).filter(p => p.status !== 'Inactive' && p.active !== false).filter(p => {
    if (!activeCategory || activeCategory === 'all') {
      const matchesSearch = !searchFilter.trim() || 
                            p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                            (p.categoryName || '').toLowerCase().includes(searchFilter.toLowerCase()) ||
                            (p.description || '').toLowerCase().includes(searchFilter.toLowerCase());
      return matchesSearch;
    }

    const catObj = (categories || []).find(c => c.id === activeCategory);
    const cId = activeCategory.toLowerCase();
    const cName = catObj ? catObj.name.toLowerCase() : '';
    const pCat = (p.category || '').toLowerCase();
    const pCatName = (p.categoryName || '').toLowerCase();

    const matchesCat = pCat === cId || 
                       pCat === cName || 
                       (cName && pCatName === cName) || 
                       pCatName === cId ||
                       (pCat && cId && (pCat.includes(cId) || cId.includes(pCat))) ||
                       (pCatName && cName && (pCatName.includes(cName) || cName.includes(pCatName)));

    const matchesSearch = !searchFilter.trim() || 
                          p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          pCatName.includes(searchFilter.toLowerCase()) ||
                          (p.description || '').toLowerCase().includes(searchFilter.toLowerCase());

    return matchesCat && matchesSearch;
  });

  // Sorting
  const getPrice = (item) => Number(item?.weights?.[0]?.price) || Number(item?.price) || 0;
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => getPrice(a) - getPrice(b));
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => getPrice(b) - getPrice(a));
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="bg-[#2B1509] text-white p-8 sm:p-12 rounded-3xl space-y-3 relative overflow-hidden border border-[#8B3A13]">
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#8B3A13]/30 rounded-full blur-2xl pointer-events-none" />
        <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">
          {searchFilter.trim() ? 'Search Results' : (activeCategory === 'all' ? 'Gourmet Pantry Collection' : 'Category Products')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-serif">
          {searchFilter.trim() ? `Search Results for "${searchFilter}"` : (activeCategory === 'all' ? 'Shop All Products' : (categories.find(c => c.id === activeCategory)?.name || 'Products'))}
        </h1>
        <p className="text-xs sm:text-sm text-[#E6D7C3] max-w-xl">
          {searchFilter.trim()
            ? `Showing all matching products for "${searchFilter}".`
            : (activeCategory === 'all' 
              ? 'Browse our entire catalog of premium nuts, hand-picked dry fruits, single-origin spices, superfood seeds, and luxury gift hampers.'
              : `Explore all products in ${categories.find(c => c.id === activeCategory)?.name || 'this category'}.`)}
        </p>

        {searchFilter.trim() && (
          <button
            onClick={() => {
              setSearchFilter('');
              if (setSearchQuery) setSearchQuery('');
            }}
            className="px-4 py-1.5 bg-[#D4AF37] text-[#2B1509] font-extrabold text-xs rounded-xl shadow-md hover:bg-white transition-all cursor-pointer inline-flex items-center gap-1.5 mt-2"
          >
            <span>Clear Search filter</span>
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter Controls & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E6D7C3] shadow-sm">
        
        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-[#8B3A13] text-white shadow-md'
                  : 'bg-[#FAF5EF] text-[#4A3525] hover:bg-[#E6D7C3]/50'
              }`}
            >
              <span className="w-5 h-5 rounded-full overflow-hidden shrink-0 border border-white/40">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Search & Sort dropdown */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-56">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A6B]" />
            <input
              type="text"
              placeholder="Search The Product"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#FAF5EF] text-xs font-medium text-[#2B1509] rounded-xl border border-[#E6D7C3] outline-none focus:border-[#8B3A13]"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-[#FAF5EF] px-3 py-2 rounded-xl border border-[#E6D7C3] shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-[#8B3A13]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold text-[#2B1509] outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E6D7C3] space-y-3">
          <p className="text-lg font-bold text-[#2B1509]">No products found</p>
          <p className="text-xs text-[#8C7A6B]">Try selecting a different category or clearing search filters.</p>
          <button
            onClick={() => { setActiveCategory('all'); setSearchFilter(''); }}
            className="px-4 py-2 bg-[#8B3A13] text-white font-bold text-xs rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}
