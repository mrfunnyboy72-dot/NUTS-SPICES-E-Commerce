import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';

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
      className="group bg-white rounded-2xl border border-[#E6D7C3] hover:border-[#8B3A13]/40 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-square overflow-hidden bg-[#FAF5EF]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#8B3A13] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
            isWishlisted 
              ? 'bg-red-50 text-red-500 shadow-md' 
              : 'bg-white/80 text-[#8C7A6B] hover:text-red-500'
          }`}
          title="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Discount tag */}
        {discountPercent > 0 && (
          <span className="absolute bottom-3 left-3 bg-[#D4AF37] text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
            SAVE {discountPercent}%
          </span>
        )}
      </div>

      {/* Card Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-[#8C7A6B] mb-1">
            <span className="font-semibold uppercase tracking-wider text-[#8B3A13]">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 font-bold text-[#2B1509]">
              <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
              <span>{product.rating}</span>
              <span className="text-[#8C7A6B] font-normal">({product.reviews})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-[#2B1509] text-base group-hover:text-[#8B3A13] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </div>

        {/* Weight Picker Pills */}
        <div>
          <div className="text-[11px] font-bold text-[#8C7A6B] mb-1.5 uppercase tracking-wider">
            Select Pack Weight:
          </div>
          <div className="flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
            {weightsList.map((w) => (
              <button
                key={w.label}
                onClick={() => setSelectedWeight(w)}
                className={`text-xs px-2.5 py-1 rounded-md font-semibold border transition-all ${
                  activeWeight.label === w.label
                    ? 'bg-[#8B3A13] text-white border-[#8B3A13] shadow-sm'
                    : 'bg-[#FAF5EF] text-[#4A3525] border-[#E6D7C3] hover:border-[#8B3A13]'
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-2 border-t border-[#FAF5EF] flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-[#8B3A13]">
                ₹{activeWeight.price}
              </span>
              <span className="text-xs text-[#8C7A6B] line-through">
                ₹{activeWeight.originalPrice}
              </span>
            </div>
            <span className="text-[10px] text-green-700 font-bold">Inclusive of taxes</span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              added 
                ? 'bg-green-600 text-white' 
                : 'bg-[#8B3A13] hover:bg-[#6E2C00] text-white shadow-md hover:shadow-lg'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
