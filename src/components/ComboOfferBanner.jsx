import React from 'react';
import { useCart } from '../context/CartContext';
import { ArrowRight } from 'lucide-react';

export default function ComboOfferBanner() {
  const { navigate } = useCart();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* PORTRAIT POSTER SHAPE ON MOBILE (min-h-[480px] aspect-[4/5]), LANDSCAPE / ROOMY BANNER ON DESKTOP */}
      <div className="relative w-full rounded-[30px] sm:rounded-[40px] overflow-hidden shadow-2xl border border-[#E6D7C3]/60 min-h-[480px] sm:min-h-[380px] md:min-h-[440px] lg:min-h-[480px] flex items-end sm:items-center group">
        
        {/* BACKGROUND BANNER IMAGE */}
        <img
          src="/images/combo_banner.jpg"
          alt="Exclusive Special Combo Offer"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* RESPONSIVE GRADIENT OVERLAY (BOTTOM-TO-TOP ON MOBILE PORTRAIT, LEFT-TO-RIGHT ON DESKTOP) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/85 to-transparent sm:bg-gradient-to-r sm:from-[#0F172A]/95 sm:via-[#0F172A]/80 sm:to-transparent sm:w-4/5 md:w-2/3" />
        <div className="absolute inset-0 bg-black/25" />

        {/* OVERLAY CONTENT */}
        <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-xl space-y-4 sm:space-y-5 text-white w-full">
          <div>
            <span className="inline-block px-4 py-1.5 bg-[#D4AF37] text-[#2B1509] text-xs font-black tracking-widest uppercase rounded-full shadow-md">
              SPECIAL OFFER
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white leading-tight drop-shadow-lg">
            Exclusive Combo Products
          </h2>

          <p className="text-sm sm:text-base font-serif italic text-gray-200 leading-relaxed max-w-md drop-shadow-md">
            Discover premium dates, dry fruits, fruit & veg chips, protein snacks, and wholesome treats crafted for delicious, healthy living.
          </p>

          <div className="pt-3">
            <button
              onClick={() => navigate('shop', { category: 'combos' })}
              className="w-full sm:w-auto justify-center px-8 py-3.5 bg-white hover:bg-[#FAF5EF] text-[#2B1509] font-extrabold text-sm sm:text-base rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3 cursor-pointer border border-[#E6D7C3]"
            >
              <span>Grab Now</span>
              <ArrowRight className="w-5 h-5 text-[#8B3A13] group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
