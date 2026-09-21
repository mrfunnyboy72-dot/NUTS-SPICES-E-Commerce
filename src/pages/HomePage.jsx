import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
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
      
      {/* AUTOMATIC 5-SECOND SLIDING HERO BANNER WITH BRIGHT HD UPLOADED IMAGES */}
      <section className="relative mx-4 sm:mx-6 lg:mx-8 mt-6 rounded-3xl overflow-hidden shadow-2xl border border-[#8B3A13]/30 h-[380px] sm:h-[480px] lg:h-[560px]">
        
        {/* SCROLLABLE BRIGHT HD BANNER IMAGES TRACK */}
        <div 
          ref={scrollRef}
          className="w-full h-full flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none absolute inset-0 bg-[#FAF5EF]"
        >
          {HERO_SLIDES.map((slide) => (
            <div key={slide.id} className="w-full h-full shrink-0 snap-center relative overflow-hidden">
              <img
                src={slide.image}
                alt="Nuts & Spices Premium Banner"
                className="w-full h-full object-cover select-none brightness-110 contrast-105 saturate-105 filter transition-all duration-500"
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-[#1E3A2B]">
            Explore categories
          </h2>
          <div className="w-12 h-1 bg-[#1E3A2B] mx-auto rounded-full" />
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
                if (setSelectedCategory) setSelectedCategory(cat.id);
                navigate('category');
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
