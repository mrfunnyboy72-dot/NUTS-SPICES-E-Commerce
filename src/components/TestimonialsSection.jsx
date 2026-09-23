import React from 'react';
import { User, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    rating: 5,
    quote: '"Super tasty veg chips, fruit chips and cashew nuts. Packaging very fine and fresh!"',
    name: 'Anitha Ganesh',
    tag: 'Premium Buyer'
  },
  {
    id: 2,
    rating: 5,
    quote: '"We order Nuts and quality is superb.. we ordered from Ramanathapuram, Thondi. On time delivery!"',
    name: 'Jamruth Banu',
    tag: 'Premium Buyer'
  },
  {
    id: 3,
    rating: 5,
    quote: '"Packing pakka and dates n\' chips were very tasty. So I gave 5 stars!"',
    name: 'Manju Gobi',
    tag: 'Premium Buyer'
  },
  {
    id: 4,
    rating: 5,
    quote: '"All the items I received were excellent. The vegetable chips were crunchy and flavorful, and the prunes were fresh and soft. Packaging was neat and delivery was on time. Very satisfied with the quality. THANK YOU!"',
    name: 'Prashanth Mani',
    tag: 'Premium Buyer'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-[#FAF5EF]/60 border-t border-[#E6D7C3]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* HEADER & BADGE MATCHING USER REFERENCE SCREENSHOT */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#D4AF37] text-[#2B1509] text-[11px] sm:text-xs font-black tracking-widest uppercase rounded-full shadow-sm">
              <Quote className="w-3.5 h-3.5" />
              <span>VOICES OF TRUST</span>
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-[#2B1509] tracking-tight">
            Our Happy Harvest Tribe
          </h2>

          <p className="text-xs sm:text-base font-serif italic text-[#4A3525] leading-relaxed">
            Real experiences from our community of organic lovers across the country.
          </p>
        </div>

        {/* 4 REVIEW CARDS GRID MATCHING USER REFERENCE SCREENSHOT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E6D7C3] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between space-y-6 relative group"
            >
              {/* TOP RATING STARS & GOLD QUOTE SYMBOL */}
              <div className="flex items-center justify-between">
                {/* 5 GOLD STARS */}
                <div className="flex items-center gap-1 text-[#D4AF37] text-sm">
                  {[...Array(rev.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                {/* LARGE GOLD DOUBLE QUOTE ICON */}
                <div className="text-3xl sm:text-4xl font-serif font-black text-[#D4AF37] leading-none select-none opacity-90 group-hover:scale-110 transition-transform">
                  ”
                </div>
              </div>

              {/* REVIEW TEXT IN ITALIC SERIF FONT */}
              <p className="text-xs sm:text-sm font-serif italic text-[#4A3525] leading-relaxed flex-1">
                {rev.quote}
              </p>

              {/* USER PROFILE FOOTER */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#FAF5EF]">
                <div className="w-9 h-9 rounded-full bg-[#FAF5EF] border border-[#E6D7C3] flex items-center justify-center text-[#8C7A6B] shrink-0">
                  <User className="w-4 h-4 text-[#8B3A13]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold font-serif text-[#2B1509]">
                    {rev.name}
                  </h4>
                  <p className="text-[11px] font-semibold text-[#8B3A13] font-serif">
                    {rev.tag}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
