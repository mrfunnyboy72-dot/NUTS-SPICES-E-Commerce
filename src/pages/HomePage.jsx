import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Compass, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  { id: 1, image: '/images/hero1.png' },
  { id: 2, image: '/images/hero2.jpg' },
  { id: 3, image: '/images/hero3.jpg' }
];

export default function HomePage() {
  const { navigate, products, categories, selectedCategory } = useCart();
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
      
      {/* AUTOMATIC 5-SECOND SLIDING HERO BACKGROUND WITH FIXED OVERLAY CONTENT */}
      <section className="relative mx-4 sm:mx-6 lg:mx-8 mt-6 rounded-3xl overflow-hidden shadow-2xl border border-[#8B3A13]/40 h-[500px] sm:h-[560px] lg:h-[620px]">
        
        {/* SCROLLABLE BACKGROUND IMAGES TRACK */}
        <div 
          ref={scrollRef}
          className="w-full h-full flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none absolute inset-0"
        >
          {HERO_SLIDES.map((slide) => (
            <div key={slide.id} className="w-full h-full shrink-0 snap-center relative">
              <img
                src={slide.image}
                alt="Premium Nuts & Spices Background"
                className="w-full h-full object-cover select-none"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* FIXED CONTENT OVERLAY - STAYS STATIONARY IN FOREGROUND */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30 flex items-center p-8 sm:p-14 lg:p-20 z-10 pointer-events-none">
          <div className="max-w-2xl space-y-6 text-white pointer-events-auto">
            
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif tracking-tight leading-none text-white drop-shadow-lg">
              Premium Nuts & Spices
            </h1>

            {/* Short Description */}
            <p className="text-sm sm:text-lg text-[#E6D7C3] leading-relaxed drop-shadow-sm font-medium max-w-xl">
              Discover premium nuts, dry fruits, seeds and authentic spices, carefully selected and packed for your everyday needs.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => {
                  setHomeCategory('all');
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-[#8B3A13] hover:bg-[#6E2C00] text-white font-extrabold rounded-2xl transition-all shadow-2xl hover:shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm tracking-wider uppercase group border border-[#D4AF37]/30 cursor-pointer"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('categories-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white/15 hover:bg-white/25 text-white font-extrabold rounded-2xl backdrop-blur-md transition-all text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 border border-white/30 shadow-lg cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>EXPLORE CATEGORIES</span>
              </button>
            </div>

          </div>
        </div>

      </section>

      {/* HORIZONTALLY SCROLLABLE SHOP BY CATEGORY ROW */}
      <section id="categories-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between border-b border-[#E6D7C3] pb-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#8B3A13]">
              Curated Selection
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#2B1509] mt-1">
              Shop By Category
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Scroll Left & Right Arrow Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={scrollCatLeft}
                className="p-2 rounded-full bg-white border border-[#E6D7C3] hover:border-[#8B3A13] text-[#8B3A13] hover:bg-[#FAF5EF] transition-all shadow-xs cursor-pointer"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollCatRight}
                className="p-2 rounded-full bg-white border border-[#E6D7C3] hover:border-[#8B3A13] text-[#8B3A13] hover:bg-[#FAF5EF] transition-all shadow-xs cursor-pointer"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {homeCategory !== 'all' && (
              <button
                onClick={() => setHomeCategory('all')}
                className="text-xs font-extrabold text-[#8B3A13] hover:underline cursor-pointer ml-2"
              >
                Reset to All Categories
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Categories Track */}
        <div
          ref={catScrollRef}
          className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 scroll-smooth scrollbar-none snap-x snap-mandatory"
        >
          {categoriesList.map(cat => {
            const isSelected = homeCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  setHomeCategory(cat.id);
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-40 sm:w-52 shrink-0 snap-start bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col cursor-pointer transform hover:-translate-y-1 group ${
                  isSelected ? 'border-[#8B3A13] ring-2 ring-[#8B3A13]/30 shadow-lg' : 'border-[#E6D7C3] hover:border-[#8B3A13] shadow-sm'
                }`}
              >
                {/* Category Image Box */}
                <div className="relative aspect-square overflow-hidden bg-[#FAF5EF]">
                  <img
                    src={cat.image || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600'}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {isSelected && (
                    <span className="absolute top-2 right-2 bg-[#8B3A13] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
                      Selected
                    </span>
                  )}
                </div>

                {/* Category Info */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between text-center space-y-2">
                  <h3 className={`font-extrabold text-xs sm:text-sm leading-snug line-clamp-1 transition-colors ${isSelected ? 'text-[#8B3A13]' : 'text-[#2B1509] group-hover:text-[#8B3A13]'}`}>
                    {cat.name}
                  </h3>
                  
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B3A13] group-hover:underline flex items-center justify-center gap-1">
                    <span>View Products</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRODUCTS SECTION ON HOMEPAGE */}
      <section id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E6D7C3] pb-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#8B3A13]">
              {homeCategory === 'all' ? 'Handpicked Favorites' : `Category: ${activeCatObj.name}`}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#2B1509] mt-1">
              {homeCategory === 'all' ? 'Trending Best Sellers' : activeCatObj.name}
            </h2>
          </div>
        </div>

        {filteredHomeProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E6D7C3] space-y-3">
            <p className="text-lg font-bold text-[#2B1509]">No products found in this category</p>
            <button
              onClick={() => setHomeCategory('all')}
              className="px-5 py-2.5 bg-[#8B3A13] text-white font-bold text-xs rounded-xl cursor-pointer"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredHomeProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* HOW ORDERING WORKS (WHATSAPP FLOW) */}
      <section className="bg-[#F3E8DC] py-16 border-y border-[#E6D7C3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#8B3A13]">
              Simple & Hassle-Free
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#2B1509]">
              How WhatsApp Ordering Works
            </h2>
            <p className="text-xs sm:text-sm text-[#4A3525]">
              No credit cards or complex payment gateways needed! Follow these easy steps to place your order.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E6D7C3] shadow-sm text-center space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-[#8B3A13] text-white font-bold flex items-center justify-center mx-auto text-sm">
                1
              </div>
              <h3 className="font-bold text-[#2B1509] text-base">Browse & Select</h3>
              <p className="text-xs text-[#8C7A6B]">
                Choose your favorite nuts, dry fruits, spices, seeds, or gift hampers with your desired pack weight.
              </p>
            </div>

            <div className="bg-[#FAF5EF] p-6 rounded-2xl border border-[#E6D7C3] shadow-sm text-center space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-[#8B3A13] text-white font-bold flex items-center justify-center mx-auto text-sm">
                2
              </div>
              <h3 className="font-bold text-[#2B1509] text-base">Review Cart</h3>
              <p className="text-xs text-[#8C7A6B]">
                Check your chosen quantities and subtotal price in your shopping cart.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E6D7C3] shadow-sm text-center space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-[#8B3A13] text-white font-bold flex items-center justify-center mx-auto text-sm">
                3
              </div>
              <h3 className="font-bold text-[#2B1509] text-base">Enter Delivery Info</h3>
              <p className="text-xs text-[#8C7A6B]">
                Provide your name, contact phone number, and delivery address in our clean checkout form.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#25D366] shadow-md text-center space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-[#25D366] text-white font-bold flex items-center justify-center mx-auto text-sm">
                4
              </div>
              <h3 className="font-bold text-[#2B1509] text-base">Send via WhatsApp</h3>
              <p className="text-xs text-[#8C7A6B]">
                Click "Place Order" to automatically send the formatted order payload directly to our WhatsApp support!
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
