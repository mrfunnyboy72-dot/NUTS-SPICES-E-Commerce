import React from 'react';
import { useCart } from '../context/CartContext';
import { ArrowRight, ShoppingBag } from 'lucide-react';

export default function ComboOfferBanner() {
  const { navigate } = useCart();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-xl border border-[#E6D7C3]/60 min-h-[260px] sm:min-h-[320px] md:min-h-[380px] flex items-center group">
        
        {/* BACKGROUND BANNER IMAGE */}
        <img
          src="/images/combo_banner.jpg"
          alt="Exclusive Special Combo Offer"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* DARK GRADIENT OVERLAY FOR CRISP TEXT READABILITY */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/75 to-transparent sm:w-3/4 md:w-2/3" />
        <div className="absolute inset-0 bg-black/20" />

        {/* OVERLAY CONTENT */}
        <div className="relative z-10 p-6 sm:p-10 md:p-12 max-w-xl space-y-4 text-white">
          <span className="inline-block px-3.5 py-1 bg-[#D4AF37] text-[#2B1509] text-[11px] sm:text-xs font-black tracking-widest uppercase rounded-full shadow-sm">
            SPECIAL OFFER
          </span>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white leading-tight drop-shadow-md">
            Exclusive Combo Products
          </h2>

          <p className="text-xs sm:text-sm md:text-base font-serif italic text-gray-200 leading-relaxed max-w-md drop-shadow-sm">
            Discover premium dates, dry fruits, fruit & veg chips, protein snacks, and wholesome treats crafted for delicious, healthy living.
          </p>

          <div className="pt-2">
            <button
              onClick={() => navigate('shop', { category: 'combos' })}
              className="px-7 py-3 bg-white hover:bg-[#FAF5EF] text-[#2B1509] font-extrabold text-xs sm:text-sm rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 cursor-pointer border border-[#E6D7C3]"
            >
              <span>Grab Now</span>
              <ArrowRight className="w-4 h-4 text-[#8B3A13] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
