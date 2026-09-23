import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import FeaturedTodaySection from '../components/FeaturedTodaySection';
import BestSellingSection from '../components/BestSellingSection';
import ComboOfferBanner from '../components/ComboOfferBanner';
import TestimonialsSection from '../components/TestimonialsSection';
import { ArrowRight, Compass, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  { id: 1, image: '/images/hero_banner1.jpg' },
  { id: 2, image: '/images/hero_banner2.jpg' },
  { id: 3, image: '/images/hero_banner3.jpg' }
];

export default function HomePage() {
  const { navigate, products, categories, selectedCategory, setSelectedCategory } = useCart();
  const [homeCategory, setHomeCategory] = useState(selectedCategory || 'all');
  const scrollRef = useRef(null);
  const catScrollRef = useRef(null);

  useEffect(() => {
    if (selectedCategory) {
      setHomeCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const scrollCatLeft = () => {
    if (catScrollRef.current) {
      catScrollRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };

  const scrollCatRight = () => {
    if (catScrollRef.current) {
      catScrollRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  };

  // 5 Seconds Automatic Image Slide Interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const categoriesList = (categories || []).filter(c => c.id !== 'all');

  const filteredHomeProducts = (products || []).filter(p => p.status !== 'Inactive' && p.active !== false).filter(p => {
    if (!homeCategory || homeCategory === 'all') return true;
    const catObj = (categories || []).find(c => c.id === homeCategory);
    const cId = homeCategory.toLowerCase();
    const cName = catObj ? catObj.name.toLowerCase() : '';
    const pCat = (p.category || '').toLowerCase();
    const pCatName = (p.categoryName || '').toLowerCase();

    return pCat === cId || 
           pCat === cName || 
           (cName && pCatName === cName) || 
           pCatName === cId ||
           (pCat && cId && (pCat.includes(cId) || cId.includes(pCat))) ||
           (pCatName && cName && (pCatName.includes(cName) || cName.includes(pCatName)));
  });

  const activeCatObj = (categories || []).find(c => c.id === homeCategory) || { name: 'All Products' };

  return (
    <div className="space-[#2B1509] space-y-16 pb-16">
      
      {/* AUTOMATIC 5-SECOND SLIDING HERO BANNER WITH REDUCED HEIGHT & FULL WIDTH (MARGIN 0, PADDING 0) */}
      <section className="relative w-full m-0 p-0 overflow-hidden shadow-md h-[180px] sm:h-[280px] md:h-[340px] lg:h-[400px]">
        
        {/* SCROLLABLE BRIGHT HD BANNER IMAGES TRACK */}
        <div 
          ref={scrollRef}
          className="w-full h-full flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none absolute inset-0 bg-white"
        >
          {HERO_SLIDES.map((slide) => (
            <div key={slide.id} className="w-full h-full shrink-0 snap-center relative overflow-hidden">
              <img
                src={slide.image}
                alt="Nuts & Spices Premium Banner"
                className="w-full h-full object-cover select-none brightness-105 contrast-105 filter transition-all duration-500"
                draggable={false}
              />
            </div>
          ))}
        </div>

      </section>

      {/* SHOP BY CATEGORY GRID SECTION (MATCHING USER REFERENCE DESIGN) */}
      <section id="categories-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
        
        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-[#2B1509]">
            Explore categories
          </h2>
          <div className="w-12 h-1 bg-[#8B3A13] mx-auto rounded-full" />
          <p className="text-xs sm:text-base font-serif italic text-[#4A3525] leading-relaxed pt-1">
            Experience the finest selection of premium dates, exotic nuts, and artisanal wellness blends.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8">
          {categoriesList.map(cat => (
            <div
              key={cat.id}
              onClick={() => {
                navigate('category', { category: cat.id });
              }}
              className="group cursor-pointer flex flex-col items-center text-center space-y-3"
            >
              {/* Rounded Square Image Box */}
              <div className="w-full aspect-square rounded-[28px] overflow-hidden bg-white shadow-md group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1.5 border border-[#E6D7C3]/60 relative">
                <img
                  src={cat.image || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600'}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Bold Uppercase Category Name Below */}
              <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#2B1509] group-hover:text-[#8B3A13] transition-colors leading-tight line-clamp-2 px-1 font-serif">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED TODAY CAROUSEL SECTION (1 PRODUCT PER CATEGORY MATCHING USER REFERENCE SCREENSHOT) */}
      <FeaturedTodaySection />

      {/* BEST SELLING PRODUCTS CAROUSEL SECTION (FRESH FROM HARVEST SUBTITLE, UNIQUE PRODUCTS PER CATEGORY) */}
      <BestSellingSection />

      {/* EXCLUSIVE COMBO OFFER PROMO BANNER SECTION */}
      <ComboOfferBanner />

      {/* CUSTOMER REVIEWS / TESTIMONIALS SECTION (OUR HAPPY HARVEST TRIBE) */}
      <TestimonialsSection />

    </div>
  );
}
