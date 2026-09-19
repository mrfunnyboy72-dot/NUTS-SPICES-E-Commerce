import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { ShieldCheck, Lock, User, ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const { loginAdmin, navigate } = useCart();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const res = loginAdmin(username, password);
    if (!res.success) {
      setError(res.message || 'Invalid admin credentials');
    }
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen bg-[#FAF5EF] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2B1509]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white border border-[#E6D7C3] rounded-3xl shadow-xl p-8 relative z-10 text-[#2B1509]">
        
        {/* Back to store button */}
        <button
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-2 text-xs font-extrabold text-[#2B1509] hover:underline mb-6 transition-colors cursor-pointer uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Gourmet Store</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#2B1509] p-0.5 mx-auto mb-4 shadow-md flex items-center justify-center border border-[#1E0F07]">
            <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <h1 className="text-2xl font-black font-serif text-[#2B1509] tracking-wide">
            NUTS & SPICES ADMIN
          </h1>
          <p className="text-xs text-[#8C7A6B] mt-1 font-sans">
            Store Management Portal & Control Center
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-300 rounded-2xl text-red-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-[#4A3525] mb-1.5 tracking-wider">
              Admin Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#2B1509] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-[#FAF5EF] border border-[#E6D7C3] focus:border-[#2B1509] rounded-2xl py-3 pl-10 pr-4 text-xs font-semibold text-[#2B1509] outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#4A3525] mb-1.5 tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#2B1509] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#FAF5EF] border border-[#E6D7C3] focus:border-[#2B1509] rounded-2xl py-3 pl-10 pr-4 text-xs font-semibold text-[#2B1509] outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#2B1509] hover:bg-[#1E0F07] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-md border border-[#1E0F07] transition-all transform active:scale-98 mt-2 cursor-pointer"
          >
            Sign In To Admin Portal
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div className="mt-8 pt-6 border-t border-[#E6D7C3] text-center">
          <div className="bg-[#FAF5EF] p-3.5 rounded-2xl border border-[#E6D7C3] flex items-center justify-between">
            <div className="text-left text-[11px] text-[#8C7A6B]">
              <span className="font-bold text-[#2B1509] block">Demo Admin Credentials</span>
              <span>User: <code className="text-[#2B1509] font-bold">admin</code> | Pass: <code className="text-[#2B1509] font-bold">admin123</code></span>
            </div>
            <button
              onClick={handleFillDemo}
              className="px-3 py-1.5 bg-[#2B1509] hover:bg-[#1E0F07] text-white text-[10px] font-extrabold uppercase rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Auto Fill
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
