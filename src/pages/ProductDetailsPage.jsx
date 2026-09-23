import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ArrowLeft, Star, ShoppingBag, ShieldCheck, Truck, RefreshCw, Heart, Check, MessageSquare } from 'lucide-react';

export default function ProductDetailsPage() {
  const { selectedProduct, products, addToCart, wishlist, toggleWishlist, navigate } = useCart();
  
  const product = selectedProduct || (products && products.find(p => p.status !== 'Inactive' && p.active !== false)) || (products && products[0]) || PRODUCTS[0];
  
  const defaultWeight = { label: '250g', price: Number(product?.price) || 290, originalPrice: Math.round((Number(product?.price) || 290) * 1.2) };
  const safeWeights = (Array.isArray(product?.weights) && product.weights.length > 0) ? product.weights : [defaultWeight];

  const [selectedWeight, setSelectedWeight] = useState(safeWeights[0] || defaultWeight);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  React.useEffect(() => {
    if (product) {
      const weights = (Array.isArray(product?.weights) && product.weights.length > 0) ? product.weights : [defaultWeight];
      setSelectedWeight(weights[0] || defaultWeight);
      setQuantity(1);
    }
  }, [product?.id]);

  const activeWeight = selectedWeight || safeWeights[0] || defaultWeight;
  const isWishlisted = product ? wishlist.includes(product.id) : false;

  const handleAddToCart = () => {
    addToCart(product, activeWeight, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleQuickCheckout = () => {
    addToCart(product, activeWeight, quantity);
    navigate('cart');
  };

  const curPrice = Number(activeWeight?.price) || Number(product?.price) || 290;
  const origPrice = Number(activeWeight?.originalPrice) || ((product?.discountPercent > 0) ? Math.round(curPrice / ((100 - product.discountPercent) / 100)) : curPrice);
  const totalPrice = curPrice * quantity;
  const originalTotalPrice = origPrice * quantity;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button */}
      <button
        onClick={() => navigate('shop')}
        className="inline-flex items-center gap-2 text-xs font-bold text-[#8B3A13] hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Shop</span>
      </button>

      {/* Main Details Card */}
      <div className="bg-white rounded-3xl border border-[#E6D7C3] p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left: Product Image */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#FAF5EF] border border-[#E6D7C3]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#8B3A13] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {product.badge}
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-md transition-colors ${
                isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white/80 text-[#8C7A6B] hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#FAF5EF] p-3 rounded-xl border border-[#E6D7C3] text-center">
              <span className="text-[10px] font-bold text-[#8C7A6B] uppercase block">Origin</span>
              <span className="text-xs font-bold text-[#2B1509]">{product.origin || 'India'}</span>
            </div>
            <div className="bg-[#FAF5EF] p-3 rounded-xl border border-[#E6D7C3] text-center">
              <span className="text-[10px] font-bold text-[#8C7A6B] uppercase block">Shelf Life</span>
              <span className="text-xs font-bold text-[#2B1509]">{product.shelfLife || '6 Months'}</span>
            </div>
            <div className="bg-[#FAF5EF] p-3 rounded-xl border border-[#E6D7C3] text-center">
              <span className="text-[10px] font-bold text-[#8C7A6B] uppercase block">Purity</span>
              <span className="text-xs font-bold text-green-700">100% Pure</span>
            </div>
          </div>
        </div>

        {/* Right: Product Info & Actions */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-[#8B3A13] uppercase tracking-wider bg-[#FAF5EF] px-3 py-1 rounded-full border border-[#E6D7C3]">
                {product.categoryName}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-[#2B1509]">
                <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                <span>{product.rating}</span>
                <span className="text-[#8C7A6B]">({product.reviews} customer reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-serif text-[#2B1509]">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-[#4A3525] leading-relaxed">
              {product.description}
            </p>

            {/* Select Weight */}
            <div className="space-y-2 pt-2 border-t border-[#FAF5EF]">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#2B1509] block">
                Select Package Weight:
              </span>
              <div className="flex flex-wrap gap-2">
                {safeWeights.map((w) => (
                  <button
                    key={w.label}
                    onClick={() => setSelectedWeight(w)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      activeWeight.label === w.label
                        ? 'bg-[#8B3A13] text-white border-[#8B3A13] shadow-md'
                        : 'bg-[#FAF5EF] text-[#4A3525] border-[#E6D7C3] hover:border-[#8B3A13]'
                    }`}
                  >
                    <span>{w.label}</span>
                    <span className="ml-1.5 font-normal text-[11px] opacity-80">₹{w.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#2B1509] block">
                Quantity:
              </span>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#E6D7C3] rounded-xl bg-[#FAF5EF] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-white font-bold text-base text-[#2B1509] hover:bg-[#E6D7C3] transition-colors flex items-center justify-center shadow-xs"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-[#2B1509]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white font-bold text-base text-[#2B1509] hover:bg-[#E6D7C3] transition-colors flex items-center justify-center shadow-xs"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-[#8C7A6B]">In stock & ready to ship</span>
              </div>
            </div>

            {/* Dynamic Total Price */}
            <div className="p-4 bg-[#FAF5EF] rounded-2xl border border-[#E6D7C3] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#8C7A6B] block">Total Amount:</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#8B3A13]">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#8C7A6B] line-through">
                    ₹{originalTotalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-md">
                Free Express Delivery Eligible
              </span>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-[#FAF5EF]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className={`py-3.5 px-6 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  added 
                    ? 'bg-green-600 text-white' 
                    : 'bg-[#8B3A13] hover:bg-[#6E2C00] text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={handleQuickCheckout}
                className="py-3.5 px-6 rounded-2xl font-bold text-sm bg-[#2B1509] hover:bg-[#4A230F] text-white transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>Proceed to Cart & Checkout</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
