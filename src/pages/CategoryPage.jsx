import React from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { ArrowLeft } from 'lucide-react';

export default function CategoryPage() {
  const { products, categories, selectedCategory, navigate } = useCart();

  const currentCatObj = categories.find(c => c.id === selectedCategory) || categories[1] || categories[0];
  const categoryProducts = products.filter(p => p.status !== 'Inactive' && p.active !== false).filter(p => p.category === currentCatObj?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button & Category Banner */}
      <div className="space-y-4">
        <button
          onClick={() => navigate('shop', { category: 'all' })}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#8B3A13] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Products</span>
        </button>

        <div className="bg-[#8B3A13] text-white p-8 sm:p-12 rounded-3xl space-y-3 relative overflow-hidden border border-[#D4AF37]/30 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#D4AF37] shrink-0 shadow-md">
              <img src={currentCatObj.image} alt={currentCatObj.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">
                Category View
              </span>
              <h1 className="text-3xl sm:text-4xl font-black font-serif">
                {currentCatObj.name}
              </h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#E6D7C3] max-w-xl">
            Showing all authentic products in {currentCatObj.name}. Hand-packaged for maximum freshness and flavor.
          </p>
        </div>
      </div>

      {/* Sub-Category Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
          <button
            key={cat.id}
            onClick={() => navigate('category', { category: cat.id })}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              currentCatObj.id === cat.id
                ? 'bg-[#2B1509] text-white shadow-md'
                : 'bg-white text-[#4A3525] border border-[#E6D7C3] hover:border-[#8B3A13]'
            }`}
          >
            <span className="w-5 h-5 rounded-full overflow-hidden shrink-0 border border-white/40">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
            </span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {categoryProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E6D7C3] space-y-3">
          <p className="text-lg font-bold text-[#2B1509]">No products found in {currentCatObj.name}</p>
          <button
            onClick={() => navigate('shop', { category: 'all' })}
            className="px-4 py-2 bg-[#8B3A13] text-white font-bold text-xs rounded-xl"
          >
            Explore Other Categories
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
