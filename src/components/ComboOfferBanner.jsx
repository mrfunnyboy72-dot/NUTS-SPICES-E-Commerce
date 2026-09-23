import React from 'react';
import { useCart } from '../context/CartContext';
import { ArrowRight } from 'lucide-react';

export default function ComboOfferBanner() {
  const { navigate } = useCart();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* PORTRAIT POSTER SHAPE ON MOBILE (min-h-[480px]), LANDSCAPE ON DESKTOP */}
      <div className="relative w-full rounded-[30px] sm:rounded-[40px] overflow-hidden shadow-2xl border border-[#E6D7C3]/60 min-h-[480px] sm:min-h-[380px] md:min-h-[440px] lg:min-h-[480px] flex items-end sm:items-center group">
        
        {/* ULTRA CRISP & BRIGHT BACKGROUND BANNER IMAGE */}
        <img
          src="/images/combo_banner.jpg"
          alt="Exclusive Special Combo Offer"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* SOFT VIGNETTE GRADIENT (LIGHT OVERLAY SO BACKGROUND IMAGE REMAINS ULTRA CLEAR) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent sm:bg-gradient-to-r sm:from-black/80 sm:via-black/35 sm:to-transparent sm:w-3/4" />

        {/* OVERLAY CONTENT WITH FROSTED GLASS FOR CRISP READABILITY & VIVID BACKGROUND */}
        <div className="relative z-10 p-5 sm:p-8 md:p-10 max-w-xl text-white w-full">
          <div className="bg-black/35 backdrop-blur-xs p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/20 space-y-3.5 shadow-xl">
            <div>
              <span className="inline-block px-3.5 py-1 bg-[#D4AF37] text-[#2B1509] text-[11px] sm:text-xs font-black tracking-widest uppercase rounded-full shadow-md">
                SPECIAL OFFER
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white leading-tight drop-shadow-md">
              Exclusive Combo Products
            </h2>

            <p className="text-xs sm:text-sm md:text-base font-serif italic text-gray-100 leading-relaxed max-w-md drop-shadow-sm">
              Discover premium dates, dry fruits, fruit & veg chips, protein snacks, and wholesome treats crafted for delicious, healthy living.
            </p>

            <div className="pt-2">
              <button
                onClick={() => navigate('shop', { category: 'combos' })}
                className="w-full sm:w-auto justify-center px-7 py-3 bg-white hover:bg-[#FAF5EF] text-[#2B1509] font-extrabold text-xs sm:text-sm rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 cursor-pointer border border-[#E6D7C3]"
              >
                <span>Grab Now</span>
                <ArrowRight className="w-4.5 h-4.5 text-[#8B3A13] group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
