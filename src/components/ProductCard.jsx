import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Heart, Star, ShoppingBag, Check, ChevronDown } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist, navigate } = useCart();
  
  if (!product) return null;

  const defaultWeight = (product.weights && product.weights[0]) 
    ? product.weights[0] 
    : { label: '250g', price: Number(product.price) || 350, originalPrice: Math.round((Number(product.price) || 350) * 1.2) };

  const [selectedWeight, setSelectedWeight] = useState(defaultWeight);
  const activeWeight = selectedWeight || defaultWeight;
  const weightsList = Array.isArray(product.weights) && product.weights.length > 0 ? product.weights : [defaultWeight];
  const [added, setAdded] = useState(false);

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, activeWeight, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const origP = Number(activeWeight.originalPrice) || Math.round((Number(activeWeight.price) || 350) * 1.2);
  const curP = Number(activeWeight.price) || 350;
  const discountPercent = origP > curP ? Math.round(((origP - curP) / origP) * 100) : 0;

  return (
    <div 
      onClick={() => navigate('product-details', { product })}
      className="group bg-white rounded-2xl sm:rounded-3xl border border-[#E6D7C3] hover:border-[#8B3A13]/40 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer transform hover:-translate-y-1 relative"
    >
      {/* Product Image & Stacked Badges */}
      <div className="relative aspect-square overflow-hidden bg-[#FAF5EF]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Stacked Badges Top Left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {/* Gold FEATURED Badge */}
          <span className="bg-[#D4AF37] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs text-center border border-white/20">
            {product.badge || 'FEATURED'}
          </span>

          {/* Red Discount OFF Ribbon Badge */}
          {discountPercent > 0 && (
            <span className="bg-[#B22222] text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs text-center">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-colors z-10 ${
            isWishlisted 
              ? 'bg-red-50 text-red-500 shadow-md' 
              : 'bg-white/85 text-[#8C7A6B] hover:text-red-500 shadow-xs'
          }`}
          title="Add to Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Details */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Title */}
        <div>
          <h3 className="font-extrabold text-[#2B1509] text-sm sm:text-base font-serif group-hover:text-[#8B3A13] transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </div>

        {/* Weight Picker Select Dropdown */}
        <div onClick={(e) => e.stopPropagation()} className="relative">
          <select
            value={activeWeight.label}
            onChange={(e) => {
              const selected = weightsList.find(w => w.label === e.target.value);
              if (selected) setSelectedWeight(selected);
            }}
            className="w-full bg-[#FAF5EF] border border-[#E6D7C3] rounded-xl text-xs font-extrabold text-[#2B1509] px-3 py-2 pr-8 appearance-none focus:outline-none focus:border-[#8B3A13] cursor-pointer shadow-2xs font-serif"
          >
            {weightsList.map((w) => (
              <option key={w.label} value={w.label}>
                {w.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-[#8B3A13] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Price & Add to Cart Button */}
        <div className="pt-2 border-t border-[#FAF5EF] space-y-2">
          
          {/* Struck-through Original & Bold Current Price */}
          <div className="flex flex-col">
            <span className="text-[11px] text-[#8C7A6B] line-through font-serif leading-none">
              ₹{origP}.00
            </span>
            <span className="text-base sm:text-lg font-black text-[#8B3A13] font-mono leading-tight mt-0.5">
              ₹{curP}.00
            </span>
          </div>

          {/* Add to Cart Button (Solid Brand Brown #8B3A13 with Gold/White Text) */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md ${
              added 
                ? 'bg-green-700 text-white' 
                : 'bg-[#8B3A13] hover:bg-[#6E2C00] text-[#D4AF37] border border-[#D4AF37]/30'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>ADDED!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                <span>ADD TO CART</span>
              </>
            )}
          </button>

        </div>

      </div>
    </div>
  );
}
