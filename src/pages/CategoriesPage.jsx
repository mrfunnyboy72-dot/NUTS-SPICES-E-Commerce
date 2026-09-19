import React from 'react';
import { useCart } from '../context/CartContext';
import { ArrowRight, Layers } from 'lucide-react';

export default function CategoriesPage() {
  const { navigate, products, categories } = useCart();

  const categoriesList = categories.filter(c => c.id !== 'all');

  const categoryDetails = {
    'nuts': { tagline: 'Premium Jumbo & Roasted Nuts' },
    'dry-fruits': { tagline: 'Sun-Dried & Naturally Sweet Fruits' },
    'spices': { tagline: 'Single-Origin Estate Harvest Spices' },
    'seeds': { tagline: 'Nutrient-Dense Daily Superfoods' },
    'combos': { tagline: 'Curated Gifting & Festive Hampers' },
    'dates': { tagline: 'Royal Arabian & Import Quality Dates' },
    'masala': { tagline: 'Authentic Indian Ground & Whole Masalas' },
    'honey': { tagline: '100% Pure Raw Organic Honey' },
    'soup': { tagline: 'Healthy & Flavorful Instant Soups' }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Page Header */}
      <div className="bg-[#2B1509] text-white p-8 sm:p-14 rounded-3xl space-y-4 relative overflow-hidden border border-[#1E0F07] shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#8B3A13]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E0F07] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4 text-[#D4AF37]" />
          <span>Product Collections</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-serif text-white">
          Explore All Categories
        </h1>

        <p className="text-xs sm:text-base text-[#E6D7C3] max-w-2xl leading-relaxed">
          Discover our full range of 100% natural nuts, farm-fresh spices, sun-dried fruits, organic seeds, and luxury gifting combos.
        </p>
      </div>

      {/* Main Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoriesList.map((cat) => {
          const allProds = products && products.length > 0 ? products : PRODUCTS;
          const count = allProds.filter(p => p.category === cat.id).length;
          const info = categoryDetails[cat.id] || { tagline: 'Gourmet Selection' };

          return (
            <div
              key={cat.id}
              onClick={() => navigate('category', { category: cat.id })}
              className="group bg-white rounded-3xl border border-[#E6D7C3] hover:border-[#2B1509] shadow-sm hover:shadow-xl transition-all duration-300 p-8 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="space-y-6">
                
                {/* Category Header & Icon */}
                <div className="flex items-center justify-between">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md border border-[#E6D7C3] shrink-0 bg-[#FAF5EF]">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <span className="text-xs font-extrabold text-[#2B1509] bg-[#FAF5EF] px-3.5 py-1.5 rounded-full border border-[#E6D7C3]">
                    {count} Products
                  </span>
                </div>

                {/* Title & Tagline */}
                <div className="space-y-1.5">
                  <h3 className="text-2xl font-black font-serif text-[#2B1509] group-hover:text-[#8B3A13] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#8C7A6B]">
                    {info.tagline}
                  </p>
                </div>

              </div>

              {/* Action Link */}
              <div className="pt-6 mt-6 border-t border-[#FAF5EF] flex items-center justify-between text-xs font-extrabold text-[#2B1509] group-hover:text-[#8B3A13]">
                <span>Browse {cat.name}</span>
                <div className="w-8 h-8 rounded-full bg-[#FAF5EF] group-hover:bg-[#2B1509] group-hover:text-white flex items-center justify-center transition-all">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
