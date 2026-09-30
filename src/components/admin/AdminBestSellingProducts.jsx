import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Search, Award, ArrowLeft } from 'lucide-react';

export default function AdminBestSellingProducts() {
  const { products, updateProduct, setAdminTab } = useCart();
  const [bestsellingSearchTerm, setBestsellingSearchTerm] = useState('');

  const bestsellingModalProducts = products.filter(p => {
    return p.name.toLowerCase().includes(bestsellingSearchTerm.toLowerCase()) || 
           (p.id && p.id.toLowerCase().includes(bestsellingSearchTerm.toLowerCase()));
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto h-full flex flex-col pt-6 pb-20 md:pb-6 px-4 sm:px-6 md:px-8">
      <div className="flex items-center justify-between bg-white p-4 sm:p-6 rounded-2xl border border-gray-200/80 shadow-xs shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setAdminTab('products')}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
            title="Back to Products"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Manage Best Selling
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200/80 shadow-xs flex-1 flex flex-col min-h-0">
        <div className="relative shrink-0 mb-4">
          <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products to mark as best selling..."
            value={bestsellingSearchTerm}
            onChange={(e) => setBestsellingSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 rounded-xl py-3 pl-11 pr-4 text-sm font-bold text-gray-900 outline-none"
          />
        </div>

        <div className="flex-1 overflow-y-auto rounded-xl border border-gray-200/80 bg-gray-50/50 p-3 space-y-3">
          {bestsellingModalProducts.length === 0 ? (
            <div className="text-center py-16">
              <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <div className="text-gray-500 font-bold">No products found.</div>
            </div>
          ) : (
            bestsellingModalProducts.map(p => (
              <label key={p.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-amber-300 shadow-sm cursor-pointer transition-all">
                <div className="flex items-center gap-4">
                  <img src={p.image} alt={p.name} className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover border border-gray-200 bg-gray-50 shrink-0" />
                  <div>
                    <div className="font-extrabold text-gray-800 text-sm sm:text-base">{p.name}</div>
                    <div className="text-[10px] sm:text-xs font-bold text-amber-700 uppercase mt-1">{p.categoryName || p.category}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 pl-2 border-l border-gray-100 ml-2">
                  {p.isBestSelling && <span className="text-[10px] sm:text-xs font-bold text-amber-600 uppercase hidden sm:block shrink-0">Best Selling</span>}
                  <input 
                    type="checkbox" 
                    checked={!!p.isBestSelling}
                    onChange={() => updateProduct(p.id, { isBestSelling: !p.isBestSelling })}
                    className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600 bg-gray-100 border-gray-300 rounded-md focus:ring-amber-500 cursor-pointer shrink-0"
                  />
                </div>
              </label>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
