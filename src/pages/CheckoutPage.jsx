import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ArrowLeft, User, Phone, MapPin, Building, Hash, FileText, ShoppingBag, Send } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, cartTotal, setLastOrder, clearCart, navigate, user } = useCart();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    pincode: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-[#FAF5EF] border border-[#8B3A13] text-[#8B3A13] rounded-full flex items-center justify-center mx-auto text-3xl font-bold shadow-inner">
          🔒
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black font-serif text-[#2B1509]">Login Required for Checkout</h2>
          <p className="text-xs sm:text-sm text-[#8C7A6B]">
            Please log in to your account or register to complete your customer details & shipping address and place your order.
          </p>
        </div>
        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={() => navigate('login')}
            className="px-8 py-3.5 bg-[#8B3A13] hover:bg-[#6E2C00] text-white font-extrabold text-xs rounded-2xl transition-all shadow-md uppercase tracking-wider cursor-pointer"
          >
            LOGIN NOW
          </button>
          <button
            onClick={() => navigate('register')}
            className="px-8 py-3.5 bg-white border border-[#8B3A13] text-[#8B3A13] font-extrabold text-xs rounded-2xl transition-all uppercase tracking-wider cursor-pointer"
          >
            REGISTER
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#2B1509]">No active items to checkout</h2>
        <button
          onClick={() => navigate('shop')}
          className="px-6 py-2.5 bg-[#8B3A13] text-white font-bold text-xs rounded-xl"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full Name is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = 'Valid 10-digit mobile number required';
    if (!formData.address.trim()) errs.address = 'Delivery address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.pincode.trim() || formData.pincode.length < 6) errs.pincode = 'Valid 6-digit pincode required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const orderId = Math.floor(100000 + Math.random() * 900000);
    const orderDetails = {
      orderId,
      customer: formData,
      items: cart,
      total: cartTotal,
      timestamp: new Date().toLocaleString()
    };

    setLastOrder(orderDetails);
    clearCart();
    navigate('order-success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <button
          onClick={() => navigate('cart')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#8B3A13] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-black font-serif text-[#2B1509]">
          Customer Details & Shipping
        </h1>
        <p className="text-xs text-[#8C7A6B]">
          Please enter your delivery details. Next step will format your order for direct WhatsApp submission.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#E6D7C3] shadow-md">
          <h2 className="text-lg font-black font-serif text-[#2B1509] border-b border-[#FAF5EF] pb-3 flex items-center gap-2">
            <User className="w-5 h-5 text-[#8B3A13]" />
            <span>Delivery Recipient Info</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#2B1509] uppercase tracking-wider block">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A6B]" />
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full pl-9 pr-3 py-2.5 text-xs font-medium text-[#2B1509] bg-[#FAF5EF] rounded-xl border outline-none ${
                    errors.name ? 'border-red-500 bg-red-50' : 'border-[#E6D7C3] focus:border-[#8B3A13]'
                  }`}
                />
              </div>
              {errors.name && <p className="text-[11px] text-red-500 font-semibold">{errors.name}</p>}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#2B1509] uppercase tracking-wider block">
                WhatsApp Phone Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A6B]" />
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full pl-9 pr-3 py-2.5 text-xs font-medium text-[#2B1509] bg-[#FAF5EF] rounded-xl border outline-none ${
                    errors.phone ? 'border-red-500 bg-red-50' : 'border-[#E6D7C3] focus:border-[#8B3A13]'
                  }`}
                />
              </div>
              {errors.phone && <p className="text-[11px] text-red-500 font-semibold">{errors.phone}</p>}
            </div>

          </div>

          {/* Delivery Address */}
          <div className="space-y-1">
            <label className="text-xs font-extrabold text-[#2B1509] uppercase tracking-wider block">
              Complete Delivery Address (Door No, Street, Area) *
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-3 text-[#8C7A6B]" />
              <textarea
                rows={3}
                placeholder="e.g. Flat 302, Green Avenue, Main Road, T. Nagar"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className={`w-full pl-9 pr-3 py-2.5 text-xs font-medium text-[#2B1509] bg-[#FAF5EF] rounded-xl border outline-none ${
                  errors.address ? 'border-red-500 bg-red-50' : 'border-[#E6D7C3] focus:border-[#8B3A13]'
                }`}
              />
            </div>
            {errors.address && <p className="text-[11px] text-red-500 font-semibold">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* City */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#2B1509] uppercase tracking-wider block">
                City / Town *
              </label>
              <div className="relative">
                <Building className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A6B]" />
                <input
                  type="text"
                  placeholder="e.g. Chennai"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={`w-full pl-9 pr-3 py-2.5 text-xs font-medium text-[#2B1509] bg-[#FAF5EF] rounded-xl border outline-none ${
                    errors.city ? 'border-red-500 bg-red-50' : 'border-[#E6D7C3] focus:border-[#8B3A13]'
                  }`}
                />
              </div>
              {errors.city && <p className="text-[11px] text-red-500 font-semibold">{errors.city}</p>}
            </div>

            {/* Pincode */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-[#2B1509] uppercase tracking-wider block">
                Pincode *
              </label>
              <div className="relative">
                <Hash className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A6B]" />
                <input
                  type="text"
                  placeholder="e.g. 600017"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className={`w-full pl-9 pr-3 py-2.5 text-xs font-medium text-[#2B1509] bg-[#FAF5EF] rounded-xl border outline-none ${
                    errors.pincode ? 'border-red-500 bg-red-50' : 'border-[#E6D7C3] focus:border-[#8B3A13]'
                  }`}
                />
              </div>
              {errors.pincode && <p className="text-[11px] text-red-500 font-semibold">{errors.pincode}</p>}
            </div>

          </div>

          {/* Delivery Notes */}
          <div className="space-y-1">
            <label className="text-xs font-extrabold text-[#2B1509] uppercase tracking-wider block">
              Special Delivery Instructions (Optional)
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 absolute left-3 top-3 text-[#8C7A6B]" />
              <input
                type="text"
                placeholder="e.g. Leave package with security if unavailable"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 text-xs font-medium text-[#2B1509] bg-[#FAF5EF] rounded-xl border border-[#E6D7C3] outline-none focus:border-[#8B3A13]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#8B3A13] hover:bg-[#6E2C00] text-white font-bold text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Place Order & Generate WhatsApp Payload</span>
          </button>
        </form>

        {/* Mini Cart Review */}
        <div className="bg-white p-6 rounded-3xl border border-[#E6D7C3] shadow-md h-fit space-y-4">
          <h3 className="text-base font-black font-serif text-[#2B1509] border-b border-[#FAF5EF] pb-3 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#8B3A13]" />
            <span>Order Summary ({cart.length} items)</span>
          </h3>

          <div className="divide-y divide-[#FAF5EF] max-h-72 overflow-y-auto pr-1 space-y-2">
            {cart.map(item => (
              <div key={item.cartItemId} className="pt-2 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-[#2B1509]">{item.name}</p>
                  <span className="text-[10px] text-[#8C7A6B]">{item.weight} x {item.quantity}</span>
                </div>
                <span className="font-extrabold text-[#8B3A13]">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E6D7C3] flex items-center justify-between text-base font-black">
            <span className="text-[#2B1509]">Total Amount:</span>
            <span className="text-[#8B3A13]">₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>

      </div>

    </div>
  );
}
