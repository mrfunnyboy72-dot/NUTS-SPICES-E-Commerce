import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Search, Heart, ShoppingBag, User, Menu, X, LayoutGrid, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function Navbar() {
  const { activePage, navigate, cartItemCount, wishlist, setIsSearchOpen, setSearchQuery, user, openAuthModal } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');

  const subCategories = CATEGORIES.filter(c => c.id !== 'all');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      setSearchQuery(navSearch);
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF5EF]/95 backdrop-blur-md border-b border-[#E6D7C3] shadow-xs">
        
        {/* Top Announcement Bar */}
        <div className="bg-[#8B3A13] text-white text-[11px] font-medium py-1.5 px-4 text-center tracking-wide">
          100% Pure & Freshly Packaged Spices, Nuts & Dry Fruits — Order Direct via WhatsApp!
        </div>

        {/* Main Navbar Row */}
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-1.5 sm:gap-6">
            
            {/* 1. LEFT GROUP: CATEGORY DRAWER LOGO BUTTON & BRAND TITLE */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink min-w-0">
              
              {/* Category Drawer Toggle Logo Button */}
              <button
                onClick={() => setIsCategoryDrawerOpen(true)}
                className="p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white border border-[#E6D7C3] hover:border-[#8B3A13] text-[#8B3A13] hover:bg-[#FAF5EF] transition-all flex items-center gap-1.5 shadow-xs group cursor-pointer shrink-0"
                title="Browse All 10 Categories"
              >
                <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B3A13] group-hover:rotate-90 transition-transform duration-300" />
                <span className="hidden xl:inline-block text-xs font-extrabold uppercase tracking-wider text-[#2B1509]">
                  Categories
                </span>
              </button>

              {/* Brand Logo Text */}
              <button 
                onClick={() => navigate('home')}
                className="flex flex-col text-left focus:outline-none shrink-0 group cursor-pointer"
              >
                <span className="text-lg sm:text-2xl font-black tracking-wider text-[#2B1509] font-serif group-hover:text-[#8B3A13] transition-colors leading-none whitespace-nowrap">
                  NUTS & SPICES
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-widest text-[#8B3A13] font-bold uppercase mt-1 whitespace-nowrap">
                  Gourmet Store
                </span>
              </button>
            </div>

            {/* 2. CENTER: DARK BROWN WIDE SEARCH BUTTON (Desktop & Tablet only) */}
            <div className="hidden sm:flex flex-1 items-center justify-center px-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-56 sm:w-64 py-2.5 px-6 bg-[#8B3A13] hover:bg-[#6E2C00] text-white font-extrabold text-xs rounded-full transition-all shrink-0 uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#8B3A13] hover:scale-105"
                title="Search Products"
              >
                <Search className="w-4 h-4 text-white" />
                <span>SEARCH</span>
              </button>
            </div>

            {/* 3. RIGHT GROUP: LINKS & ACTION ICONS */}
            <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
              
              {/* Nav Links */}
              <nav className="hidden lg:flex items-center gap-6 mr-1">
                <button
                  onClick={() => navigate('home')}
                  className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                    activePage === 'home' ? 'text-[#8B3A13] border-b-2 border-[#8B3A13] pb-0.5' : 'text-[#4A3525] hover:text-[#8B3A13]'
                  }`}
                >
                  HOME
                </button>

                <button
                  onClick={() => navigate('shop', { category: 'all' })}
                  className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                    activePage === 'shop' ? 'text-[#8B3A13] border-b-2 border-[#8B3A13] pb-0.5' : 'text-[#4A3525] hover:text-[#8B3A13]'
                  }`}
                >
                  SHOP
                </button>

                <button
                  onClick={() => navigate('about')}
                  className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                    activePage === 'about' ? 'text-[#8B3A13] border-b-2 border-[#8B3A13] pb-0.5' : 'text-[#4A3525] hover:text-[#8B3A13]'
                  }`}
                >
                  ABOUT US
                </button>

                <button
                  onClick={() => navigate('contact')}
                  className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                    activePage === 'contact' ? 'text-[#8B3A13] border-b-2 border-[#8B3A13] pb-0.5' : 'text-[#4A3525] hover:text-[#8B3A13]'
                  }`}
                >
                  CONTACT
                </button>
              </nav>

              {/* 1. Wishlist Heart Button (1st) */}
              <button
                onClick={() => navigate('shop', { category: 'all' })}
                className="hidden sm:flex w-10 h-10 rounded-full bg-[#8B3A13] hover:bg-[#6E2C00] text-white items-center justify-center relative transition-transform hover:scale-105 shadow-md cursor-pointer"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* 2. Shop / Cart Bag Button (Center) */}
              <button
                onClick={() => navigate('cart')}
                className="p-1.5 text-[#8B3A13] hover:text-[#6E2C00] transition-colors relative cursor-pointer"
                title="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#8B3A13] text-white text-[9px] sm:text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* 3. Profile Icon / User Name Display (Last) */}
              <button
                onClick={() => navigate('login')}
                className="flex items-center gap-2 p-1 px-2.5 sm:px-3.5 rounded-full bg-white border border-[#E6D7C3] hover:border-[#8B3A13] text-[#4A3525] hover:text-[#8B3A13] transition-all shadow-xs cursor-pointer max-w-[180px] sm:max-w-none"
                title={user ? `Logged in as ${user.name}` : "LOGIN"}
              >
                {user ? (
                  <>
                    <div className="w-7 h-7 rounded-full bg-[#8B3A13] text-white flex items-center justify-center text-xs font-black uppercase shrink-0 shadow-xs">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-xs font-black text-[#8B3A13] truncate tracking-wide">
                      {user.name.split(' ')[0]}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-7 h-7 rounded-full bg-[#FAF5EF] text-[#8B3A13] flex items-center justify-center shrink-0 border border-[#E6D7C3]">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="hidden sm:inline-block text-xs font-extrabold text-[#8B3A13] uppercase tracking-wider">
                      LOGIN
                    </span>
                  </>
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 text-[#4A3525] hover:text-[#8B3A13] rounded-lg"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>

            </div>

          </div>
        </div>

        {/* Dedicated Mobile Search Bar Row (Mobile Phones only - Zero Overlap!) */}
        <div className="block sm:hidden px-3 pb-2.5 pt-0.5">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full py-2 px-3.5 bg-white border border-[#E6D7C3] hover:border-[#8B3A13] rounded-full text-xs text-[#8C7A6B] flex items-center justify-between shadow-2xs transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#8B3A13] shrink-0" />
              <span className="text-xs font-semibold text-gray-500">Search products, dry fruits, spices...</span>
            </div>
            <span className="text-[10px] bg-[#8B3A13] text-white px-2.5 py-1 rounded-full font-extrabold tracking-wider uppercase shrink-0">
              SEARCH
            </span>
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#E6D7C3] px-4 pt-3 pb-6 space-y-3">
            <form 
              onSubmit={handleSearchSubmit}
              className="flex items-center bg-[#FAF5EF] border border-[#E6D7C3] rounded-full p-1 pl-3 my-2"
            >
              <Search className="w-4 h-4 text-[#8C7A6B] mr-2" />
              <input
                type="text"
                placeholder="Search The Product"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                className="w-full bg-transparent outline-none text-xs text-[#2B1509]"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#8B3A13] text-white font-bold text-xs rounded-full"
              >
                Search
              </button>
            </form>

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
              ABOUT US
            </button>
            <button
              onClick={() => { setIsMobileMenuOpen(false); navigate('contact'); }}
              className="block w-full text-left px-3 py-2 text-sm font-bold uppercase text-[#2B1509] hover:bg-[#FAF5EF] rounded-lg"
            >
              CONTACT
            </button>
            {user ? (
              <button
                onClick={() => { setIsMobileMenuOpen(false); navigate('login'); }}
                className="w-full mt-2 p-3 bg-[#FAF5EF] rounded-xl border border-[#8B3A13]/40 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#8B3A13] text-white flex items-center justify-center font-black text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#8B3A13] uppercase block">Logged In As</span>
                    <span className="text-xs font-extrabold text-[#2B1509]">{user.name}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8B3A13]" />
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-[#E6D7C3]">
                <button
                  onClick={() => { setIsMobileMenuOpen(false); navigate('login'); }}
                  className="w-full text-center py-2 text-xs font-extrabold uppercase tracking-wider text-white bg-[#8B3A13] rounded-lg shadow-xs"
                >
                  LOGIN
                </button>
                <button
                  onClick={() => { setIsMobileMenuOpen(false); navigate('register'); }}
                  className="w-full text-center py-2 text-xs font-extrabold uppercase tracking-wider text-[#8B3A13] bg-[#FAF5EF] rounded-lg border border-[#8B3A13]"
                >
                  REGISTER
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* FULL HEIGHT LEFT SIDE CATEGORY DRAWER OVERLAY - OUTSIDE STICKY HEADER CONTEXT */}
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

            {/* Category List - 10 Specified Categories */}
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
