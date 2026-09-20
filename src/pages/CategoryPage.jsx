import React from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { ArrowLeft } from 'lucide-react';

export default function CategoryPage() {
  const { products, categories, selectedCategory, navigate } = useCart();

  const safeCategories = categories || [];
  const currentCatObj = safeCategories.find(c => c.id === selectedCategory) || safeCategories.find(c => c.id !== 'all') || safeCategories[0] || { id: 'all', name: 'Products', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600' };
  const currentCatImg = currentCatObj.image || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600';

  const categoryProducts = (products || [])
    .filter(p => p.status !== 'Inactive' && p.active !== false)
    .filter(p => {
      if (!currentCatObj || currentCatObj.id === 'all') return true;
      const cId = (currentCatObj.id || '').toLowerCase();
      const cName = (currentCatObj.name || '').toLowerCase();
      const pCat = (p.category || '').toLowerCase();
      const pCatName = (p.categoryName || '').toLowerCase();

      return (
        pCat === cId ||
        pCat === cName ||
        pCatName === cName ||
        pCatName === cId ||
        (pCat && cId && (pCat.includes(cId) || cId.includes(pCat))) ||
        (pCatName && cName && (pCatName.includes(cName) || cName.includes(pCatName)))
      );
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button & Category Banner */}
      <div className="space-y-4">
        <button
          onClick={() => navigate('shop', { category: 'all' })}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#8B3A13] hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Products</span>
        </button>

        <div className="bg-[#2B1509] text-white p-8 sm:p-12 rounded-3xl space-y-4 relative overflow-hidden border border-[#1E0F07] shadow-2xl">
          {/* Background Blurred Glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#8B3A13]/30 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#D4AF37] shrink-0 shadow-lg bg-[#FAF5EF]">
                <img src={currentCatImg} alt={currentCatObj.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E0F07] border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] sm:text-xs font-extrabold uppercase tracking-widest">
                  <span>Category Showcase</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight">
                  {currentCatObj.name}
                </h1>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-2xl text-center shrink-0 self-start sm:self-auto">
              <span className="text-xs text-[#E6D7C3] uppercase tracking-wider font-bold block">Available Items</span>
              <span className="text-xl font-black text-[#D4AF37]">{categoryProducts.length} Products</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#E6D7C3] max-w-2xl leading-relaxed relative z-10 pt-1">
            Showing all authentic products in <strong className="text-white">{currentCatObj.name}</strong>. Freshly packaged and quality guaranteed.
          </p>
        </div>
      </div>

      {/* Category Pills Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {safeCategories.filter(c => c.id !== 'all').map(cat => {
          const subImg = cat.image || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600';
          const isSelected = currentCatObj.id === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => navigate('category', { category: cat.id })}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-[#8B3A13] text-white shadow-md border border-[#8B3A13]'
                  : 'bg-white text-[#4A3525] border border-[#E6D7C3] hover:border-[#8B3A13] hover:bg-[#FAF5EF]'
              }`}
            >
              <span className="w-5 h-5 rounded-full overflow-hidden shrink-0 border border-white/40">
                <img src={subImg} alt={cat.name} className="w-full h-full object-cover" />
              </span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      {categoryProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E6D7C3] space-y-4 shadow-sm">
          <p className="text-xl font-black text-[#2B1509] font-serif">No products found in "{currentCatObj.name}"</p>
          <p className="text-xs text-[#8C7A6B] max-w-md mx-auto">There are currently no active products in this category. You can browse our other categories or check back soon!</p>
          <button
            onClick={() => navigate('shop', { category: 'all' })}
            className="px-6 py-3 bg-[#8B3A13] hover:bg-[#6E2C00] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all shadow-md"
          >
            Explore All Store Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}
