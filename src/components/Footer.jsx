import React from 'react';
import { useCart } from '../context/CartContext';
import { Phone, Mail, MapPin, ShieldCheck, Truck, RefreshCw, MessageSquare } from 'lucide-react';
import { STORE_WHATSAPP_NUMBER } from '../data/products';

export default function Footer() {
  const { navigate } = useCart();

  return (
    <footer className="bg-[#2B1509] text-[#FAF5EF] pt-16 pb-8 border-t-4 border-[#8B3A13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Props Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-[#4A3525]">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#3B1F0E] border border-[#5C3317]">
            <div className="p-3 bg-[#8B3A13] rounded-lg text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Premium Quality</h4>
              <p className="text-xs text-[#C4A484] mt-0.5">Handpicked nuts & farm-fresh spices</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#3B1F0E] border border-[#5C3317]">
            <div className="p-3 bg-[#8B3A13] rounded-lg text-white">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Fast Doorstep Delivery</h4>
              <p className="text-xs text-[#C4A484] mt-0.5">Dispatched quickly across India</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#3B1F0E] border border-[#5C3317]">
            <div className="p-3 bg-[#25D366] rounded-lg text-white">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Direct WhatsApp Orders</h4>
              <p className="text-xs text-[#C4A484] mt-0.5">No gateway required, instant support</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-wider text-white font-serif">
                HAJI
              </span>
            </div>
            <p className="text-xs text-[#C4A484] leading-relaxed">
              Bringing India's finest handpicked nuts, authentic spices, sun-dried fruits, and nutritious superfood seeds straight to your doorstep.
            </p>
            <a
              href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#1EBE57] text-white font-bold text-xs rounded-lg transition-colors shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat with Us on WhatsApp</span>
            </a>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C4A484]">
              <li>
                <button onClick={() => navigate('home')} className="hover:text-white transition-colors">Home</button>
              </li>
              <li>
                <button onClick={() => navigate('shop', { category: 'all' })} className="hover:text-white transition-colors">Shop All Products</button>
              </li>
              <li>
                <button onClick={() => navigate('offers')} className="hover:text-white transition-colors">Special Offers</button>
              </li>
              <li>
                <button onClick={() => navigate('about')} className="hover:text-white transition-colors">About Us</button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-white transition-colors">Contact Store</button>
              </li>
              <li>
                <button onClick={() => navigate('login')} className="hover:text-white transition-colors font-bold text-[#D4AF37]">Member Login</button>
              </li>
              <li>
                <button onClick={() => navigate('register')} className="hover:text-white transition-colors font-bold text-[#D4AF37]">Create Account</button>
              </li>
              <li>
                <button onClick={() => navigate('admin')} className="hover:text-[#D4AF37] transition-colors font-black text-amber-400">⚙️ Admin Control Panel</button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C4A484]">
              <li>
                <button onClick={() => navigate('category', { category: 'nuts' })} className="hover:text-white transition-colors">Nuts (Badam, Kaju, Pista)</button>
              </li>
              <li>
                <button onClick={() => navigate('category', { category: 'dry-fruits' })} className="hover:text-white transition-colors">Dry Fruits (Figs, Dates)</button>
              </li>
              <li>
                <button onClick={() => navigate('category', { category: 'spices' })} className="hover:text-white transition-colors">Spices (Cardamom, Cinnamon)</button>
              </li>
              <li>
                <button onClick={() => navigate('category', { category: 'seeds' })} className="hover:text-white transition-colors">Seeds (Chia, Pumpkin)</button>
              </li>
              <li>
                <button onClick={() => navigate('category', { category: 'combos' })} className="hover:text-white transition-colors">Gifting Combos</button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-4">
              Contact & Store Info
            </h4>
            <ul className="space-y-3 text-xs text-[#C4A484]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8B3A13] shrink-0 mt-0.5" />
                <span>124, Gourmet Spice Market Road, T. Nagar, Chennai - 600017</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#8B3A13] shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#8B3A13] shrink-0" />
                <span>orders@nutsandspices.store</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-[#4A3525] text-center text-xs text-[#8C7A6B]">
          <p>© {new Date().getFullYear()} HAJI NUTS & SPICES. All rights reserved. Order directly via WhatsApp.</p>
        </div>

      </div>
    </footer>
  );
}
