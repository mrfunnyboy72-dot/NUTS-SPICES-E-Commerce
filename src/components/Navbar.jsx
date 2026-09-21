import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Search, Heart, ShoppingBag, User, Menu, X, LayoutGrid, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const { activePage, navigate, cartItemCount, wishlist, setIsSearchOpen, setSearchQuery, user, categories } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [navSearchInput, setNavSearchInput] = useState('');

  const safeCategories = categories || [];
  const subCategories = safeCategories.filter(c => c.id !== 'all');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearchInput.trim()) {
      setSearchQuery(navSearchInput);
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F7F3E9] border-b border-[#E6D7C3] shadow-xs">
        
        {/* TOP ANNOUNCEMENT BAR (MATCHING REFERENCE SCREENSHOT STRUCTURE WITH BRAND COLORS) */}
        <div className="bg-[#2B1509] text-[#D4AF37] text-[10px] sm:text-[11px] font-extrabold py-2 px-4 border-b border-[#8B3A13]/40 tracking-wider uppercase">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            
            {/* Left Ticker Announcements */}
            <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap text-center sm:text-left">
              <span>WE DELIVER ACROSS INDIA</span>
              <span className="text-[#8B3A13]">|</span>
              <span className="text-white">ORDER ABOVE ₹3500 GET FREE SHIPPING</span>
              <span className="text-[#8B3A13] hidden md:inline">|</span>
              <span className="hidden md:inline">WE DELIVER ACROSS INDIA</span>
            </div>

            {/* Right Quick Links */}
            <div className="hidden lg:flex items-center gap-4 shrink-0 text-[#E6D7C3]">
              <button onClick={() => navigate('about')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">OUR STORY</button>
              <span className="text-[#8B3A13]">|</span>
              <button onClick={() => navigate('contact')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">HELP CENTER</button>
              <span className="text-[#8B3A13]">|</span>
              <button onClick={() => navigate('contact')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">BULK ORDERS</button>
              <span className="text-[#8B3A13]">|</span>
              <button onClick={() => navigate('contact')} className="hover:text-[#D4AF37] transition-colors cursor-pointer">CONTACT US</button>
            </div>

          </div>
        </div>

        {/* MAIN HEADER ROW (MATCHING SCREENSHOT SEARCH BAR, ICONS & LOGO) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24 gap-4">
            
            {/* 1. LEFT: CATEGORY DRAWER ICON & BRAND LOGO */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsCategoryDrawerOpen(true)}
                className="p-2 text-[#D4AF37] hover:text-[#8B3A13] transition-colors cursor-pointer"
                title="Browse Categories"
              >
                <LayoutGrid className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>

              <button 
                onClick={() => navigate('home')}
                className="flex flex-col text-left focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black tracking-wider text-[#2B1509] font-serif uppercase">
                    NUTS & SPICES
                  </span>
                  <span className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase font-serif hidden sm:inline">
                    DATES N' NUTS
                  </span>
                </div>
              </button>
            </div>

            {/* 2. CENTER: PILL SEARCH BAR WITH SEARCH BUTTON INSIDE */}
            <div className="hidden md:flex flex-1 max-w-xl mx-4">
              <form onSubmit={handleSearchSubmit} className="w-full relative flex items-center">
                <div className="w-full relative flex items-center bg-white rounded-full border border-[#D4AF37]/60 shadow-sm p-1.5 focus-within:ring-2 focus-within:ring-[#8B3A13]/30">
                  <Search className="w-5 h-5 text-[#8C7A6B] ml-3 shrink-0" />
                  <input
                    type="text"
                    value={navSearchInput}
                    onChange={(e) => setNavSearchInput(e.target.value)}
                    placeholder="Search..."
                    className="w-full bg-transparent px-3 py-1.5 text-xs sm:text-sm font-medium text-[#2B1509] focus:outline-none placeholder-[#8C7A6B]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#8B3A13] hover:bg-[#6E2C00] text-[#D4AF37] font-extrabold text-xs rounded-full transition-all tracking-wider uppercase shrink-0 shadow-md cursor-pointer border border-[#D4AF37]/30"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* 3. RIGHT: LINKS & ACTION ICONS */}
            <div className="flex items-center gap-4 sm:gap-6 shrink-0">
              
              {/* Navigation Links */}
              <nav className="hidden lg:flex items-center gap-6">
                <button
                  onClick={() => navigate('home')}
                  className={`text-xs sm:text-sm font-extrabold uppercase tracking-widest transition-colors ${
                    activePage === 'home' ? 'text-[#8B3A13]' : 'text-[#2B1509] hover:text-[#8B3A13]'
                  }`}
                >
                  HOME
                </button>

                <button
                  onClick={() => navigate('shop', { category: 'all' })}
                  className={`text-xs sm:text-sm font-extrabold uppercase tracking-widest transition-colors ${
                    activePage === 'shop' ? 'text-[#8B3A13]' : 'text-[#2B1509] hover:text-[#8B3A13]'
                  }`}
                >
                  SHOP
                </button>
              </nav>

              {/* User Profile Icon */}
              <button
                onClick={() => navigate(user ? 'profile' : 'login')}
                className="p-1.5 text-[#2B1509] hover:text-[#8B3A13] transition-colors cursor-pointer"
                title={user ? user.name : "Login / Account"}
              >
                <User className="w-6 h-6" />
              </button>

              {/* Wishlist Heart Icon with Solid Dark Circle Background */}
              <button
                onClick={() => navigate('shop', { category: 'all' })}
                className="w-10 h-10 rounded-full bg-[#8B3A13] hover:bg-[#6E2C00] text-[#D4AF37] flex items-center justify-center relative transition-transform hover:scale-105 shadow-md cursor-pointer border border-[#D4AF37]/40"
                title="Wishlist"
              >
                <Heart className="w-5 h-5 fill-none" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Shopping Bag Icon */}
              <button
                onClick={() => navigate('cart')}
                className="p-1.5 text-[#D4AF37] hover:text-[#8B3A13] transition-colors relative cursor-pointer"
                title="Shopping Cart"
              >
                <ShoppingBag className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#8B3A13] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-1.5 text-[#2B1509] hover:text-[#8B3A13]"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>

          </div>

          {/* Mobile Search Input Row */}
          <div className="block md:hidden pb-3">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="w-full relative flex items-center bg-white rounded-full border border-[#D4AF37]/50 shadow-sm p-1">
                <Search className="w-4 h-4 text-[#8C7A6B] ml-2.5 shrink-0" />
                <input
                  type="text"
                  value={navSearchInput}
                  onChange={(e) => setNavSearchInput(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-transparent px-2 py-1 text-xs text-[#2B1509] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#8B3A13] text-[#D4AF37] font-bold text-[10px] rounded-full tracking-wider uppercase shrink-0"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#E6D7C3] px-4 pt-3 pb-6 space-y-3">
            <button
              onClick={() => { setIsMobileMenuOpen(false); navigate('home'); }}
              className="block w-full text-left px-3 py-2 text-sm font-bold uppercase text-[#2B1509] hover:bg-[#FAF5EF] rounded-lg"
            >
              HOME
            </button>
            <button
              onClick={() => { setIsMobileMenuOpen(false); navigate('shop', { category: 'all' }); }}
              className="block w-full text-left px-3 py-2 text-sm font-bold uppercase text-[#2B1509] hover:bg-[#FAF5EF] rounded-lg"
            >
              SHOP
            </button>
            <button
              onClick={() => { setIsMobileMenuOpen(false); navigate('about'); }}
              className="block w-full text-left px-3 py-2 text-sm font-bold uppercase text-[#2B1509] hover:bg-[#FAF5EF] rounded-lg"
            >
              OUR STORY
            </button>
            <button
              onClick={() => { setIsMobileMenuOpen(false); navigate('contact'); }}
              className="block w-full text-left px-3 py-2 text-sm font-bold uppercase text-[#2B1509] hover:bg-[#FAF5EF] rounded-lg"
            >
              CONTACT US
            </button>
          </div>
        )}
      </header>

      {/* FULL HEIGHT LEFT SIDE CATEGORY DRAWER OVERLAY */}
      {isCategoryDrawerOpen && (
        <div className="fixed inset-0 z-50 flex h-screen w-screen overflow-hidden">
          {/* Dark Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-black/60 transition-opacity animate-in fade-in duration-300"
            onClick={() => setIsCategoryDrawerOpen(false)}
          />

          {/* Side Drawer Content Panel */}
          <div className="relative w-80 max-w-[85vw] bg-white h-screen shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-300 border-r border-[#E6D7C3]">
            
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#E6D7C3] flex items-center justify-between bg-[#FAF5EF] shrink-0">
              <h2 className="text-xl font-extrabold font-serif tracking-wider text-[#8B3A13] uppercase">
                CATEGORIES
              </h2>
              <button
                onClick={() => setIsCategoryDrawerOpen(false)}
                className="p-1 text-[#8C7A6B] hover:text-[#2B1509] rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Category List */}
            <div className="flex-1 overflow-y-auto divide-y divide-[#E6D7C3]/50 py-2 min-h-0 bg-white">
              {subCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setIsCategoryDrawerOpen(false);
                    navigate('category', { category: cat.id });
                  }}
                  className="w-full text-left px-5 py-3.5 text-xs font-bold text-[#8B3A13] hover:bg-[#FAF5EF] flex items-center justify-between group transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full overflow-hidden border border-[#E6D7C3] group-hover:border-[#8B3A13] shadow-xs shrink-0 transition-all bg-[#FAF5EF]">
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#8B3A13] group-hover:text-[#6E2C00]">
                      {cat.name}
                    </span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#8C7A6B] group-hover:text-[#8B3A13] group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-[#FAF5EF] border-t border-[#E6D7C3] text-center shrink-0">
              <button
                onClick={() => {
                  setIsCategoryDrawerOpen(false);
                  navigate('shop', { category: 'all' });
                }}
                className="text-xs font-extrabold text-[#8B3A13] hover:underline cursor-pointer"
              >
                View Full Shop Catalog →
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
