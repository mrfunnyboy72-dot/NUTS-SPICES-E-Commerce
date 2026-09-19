import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, navigate, user } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-24 h-24 bg-[#FAF5EF] rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner border border-[#E6D7C3]">
          🛒
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black font-serif text-[#2B1509]">Your Cart is Empty</h2>
          <p className="text-xs sm:text-sm text-[#8C7A6B]">
            Looks like you haven't added any premium nuts, spices, or dry fruits to your cart yet.
          </p>
        </div>
        <button
          onClick={() => navigate('shop', { category: 'all' })}
          className="px-8 py-3.5 bg-[#8B3A13] hover:bg-[#6E2C00] text-white font-bold rounded-2xl transition-all shadow-lg text-sm inline-flex items-center gap-2"
        >
          <span>Explore Shop Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-[#8B3A13] uppercase tracking-widest block">
            Shopping Cart
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-serif text-[#2B1509]">
            Your Selected Items ({cart.length})
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-red-600 hover:underline flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Item List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const lineTotal = item.price * item.quantity;
            return (
              <div
                key={item.cartItemId}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E6D7C3] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover border border-[#E6D7C3] shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#8B3A13] uppercase tracking-wider bg-[#FAF5EF] px-2 py-0.5 rounded border border-[#E6D7C3]">
                      {item.categoryName}
                    </span>
                    <h3 className="font-bold text-[#2B1509] text-base leading-snug">
                      {item.name}
                    </h3>
                    <div className="text-xs text-[#8C7A6B]">
                      Pack Size: <span className="font-bold text-[#2B1509]">{item.weight}</span>
                    </div>
                    <div className="text-xs font-bold text-[#8B3A13]">
                      ₹{item.price} per unit
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#FAF5EF]">
                  {/* Quantity controls */}
                  <div className="flex items-center border border-[#E6D7C3] rounded-xl bg-[#FAF5EF] p-1">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, -1)}
                      className="w-7 h-7 rounded-lg bg-white font-bold text-sm text-[#2B1509] hover:bg-[#E6D7C3] flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-[#2B1509]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, 1)}
                      className="w-7 h-7 rounded-lg bg-white font-bold text-sm text-[#2B1509] hover:bg-[#E6D7C3] flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  {/* Line Total & Delete */}
                  <div className="text-right">
                    <div className="text-base font-black text-[#8B3A13]">
                      ₹{lineTotal.toLocaleString('en-IN')}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-[11px] text-red-500 hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <button
            onClick={() => navigate('shop', { category: 'all' })}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#8B3A13] hover:underline pt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Order Summary Box */}
        <div className="bg-white p-6 rounded-3xl border border-[#E6D7C3] shadow-lg h-fit space-y-6">
          <h2 className="text-lg font-black font-serif text-[#2B1509] border-b border-[#FAF5EF] pb-3">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-[#4A3525]">
              <span>Items Total:</span>
              <span className="font-bold text-[#2B1509]">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between text-[#4A3525]">
              <span>Packaging & Freshness Seals:</span>
              <span className="font-bold text-green-700">FREE</span>
            </div>

            <div className="flex justify-between text-[#4A3525]">
              <span>Doorstep Delivery Charges:</span>
              <span className="font-bold text-green-700">FREE</span>
            </div>

            <div className="pt-3 border-t border-[#E6D7C3] flex justify-between items-baseline">
              <span className="text-sm font-black text-[#2B1509]">Grand Total:</span>
              <span className="text-2xl font-black text-[#8B3A13]">
                ₹{cartTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="bg-[#FAF5EF] p-3 rounded-xl border border-[#E6D7C3] text-[11px] text-[#4A3525] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-700 shrink-0" />
            <span>No advance payment needed. Confirm delivery address on next screen.</span>
          </div>

          <button
            onClick={() => {
              if (!user) {
                navigate('login');
              } else {
                navigate('checkout');
              }
            }}
            className="w-full py-4 bg-[#8B3A13] hover:bg-[#6E2C00] text-white font-bold text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

    </div>
  );
}
