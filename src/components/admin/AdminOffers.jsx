import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Ticket, Plus, Calendar, Trash2, Edit, X } from 'lucide-react';

export default function AdminOffers() {
  const { offers, categories, addOffer, deleteOffer, updateOffer } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    discountPercent: 20,
    applicableCategory: 'nuts-dry-fruits',
    minOrderAmount: 999,
    startDate: '2026-09-01',
    endDate: '2026-09-30',
    status: 'ACTIVE'
  });

  const handleOpenAdd = () => {
    setEditingOffer(null);
    setFormData({
      name: '20% OFF – Premium Nuts',
      discountPercent: 20,
      applicableCategory: 'nuts-dry-fruits',
      minOrderAmount: 999,
      startDate: '2026-09-01',
      endDate: '2026-09-30',
      status: 'ACTIVE'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (off) => {
    setEditingOffer(off);
    setFormData({
      name: off.name,
      discountPercent: off.discountPercent,
      applicableCategory: off.applicableCategory || 'nuts-dry-fruits',
      minOrderAmount: off.minOrderAmount || 500,
      startDate: off.startDate || '2026-09-01',
      endDate: off.endDate || '2026-09-30',
      status: off.status || 'ACTIVE'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const catObj = categories.find(c => c.id === formData.applicableCategory);
    const categoryName = catObj ? catObj.name : 'All Products';

    const payload = {
      name: formData.name,
      discountPercent: Number(formData.discountPercent),
      applicableCategory: formData.applicableCategory,
      applicableCategoryName: categoryName,
      minOrderAmount: Number(formData.minOrderAmount),
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: formData.status
    };

    if (editingOffer) {
      updateOffer(editingOffer.id, payload);
    } else {
      addOffer(payload);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#2B1509] p-6 rounded-2xl border border-[#4A3525]">
        <div>
          <h2 className="text-2xl font-black font-serif text-white tracking-wide flex items-center gap-2">
            <Ticket className="w-6 h-6 text-[#D4AF37]" />
            🎟️ ADMIN — OFFERS & COUPONS ({offers.length})
          </h2>
          <p className="text-xs text-[#C4A484] mt-1">
            Create promotional discount vouchers, campaign start/end dates, and threshold minimum order rules.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#8B3A13] hover:bg-[#6E2C00] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg cursor-pointer shrink-0"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Offer</span>
        </button>
      </div>

      {/* OFFERS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((off) => (
          <div 
            key={off.id}
            className="bg-[#2B1509] border border-[#4A3525] hover:border-[#D4AF37] rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="px-3 py-1 bg-amber-500/20 text-[#D4AF37] border border-amber-500/40 rounded-full text-xs font-black uppercase">
                  {off.discountPercent}% DISCOUNT
                </span>
                <span className={`px-2.5 py-0.5 text-[10px] font-black uppercase rounded-md border ${
                  off.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-gray-500/20 text-gray-300 border-gray-500/40'
                }`}>
                  {off.status}
                </span>
              </div>

              <h3 className="text-lg font-black font-serif text-white tracking-wide leading-snug">
                {off.name}
              </h3>

              <div className="bg-[#1E0F07] p-3 rounded-xl border border-[#4A3525] space-y-1 text-xs text-[#C4A484]">
                <div>Applicable: <strong className="text-white">{off.applicableCategoryName || 'All Categories'}</strong></div>
                <div>Min Order: <strong className="text-white font-serif">₹{off.minOrderAmount}</strong></div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#4A3525] flex items-center justify-between text-[11px] text-[#C4A484]">
              <div className="flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5 text-[#8B3A13]" />
                <span>{off.startDate} to {off.endDate}</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleOpenEdit(off)}
                  className="p-1.5 bg-[#1E0F07] hover:bg-[#8B3A13] border border-[#4A3525] text-white rounded-lg cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete offer "${off.name}"?`)) {
                      deleteOffer(off.id);
                    }
                  }}
                  className="p-1.5 bg-[#1E0F07] hover:bg-red-950 border border-[#4A3525] text-red-400 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* CREATE / EDIT OFFER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#2B1509] border border-[#4A3525] rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl text-white relative">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#4A3525]">
              <h3 className="text-lg font-black font-serif text-white flex items-center gap-2">
                <Ticket className="w-5 h-5 text-[#D4AF37]" />
                {editingOffer ? 'Edit Promotional Offer' : 'Create New Offer'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-[#C4A484] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-[#C4A484] mb-1">Offer Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. 20% OFF – Premium Nuts"
                  className="w-full bg-[#1E0F07] border border-[#4A3525] focus:border-[#D4AF37] rounded-xl p-2.5 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase text-[#C4A484] mb-1">Discount % *</label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    required
                    value={formData.discountPercent}
                    onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value })}
                    className="w-full bg-[#1E0F07] border border-[#4A3525] focus:border-[#D4AF37] rounded-xl p-2.5 text-white outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-[#C4A484] mb-1">Min Order Amount (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.minOrderAmount}
                    onChange={(e) => setFormData({ ...formData, minOrderAmount: e.target.value })}
                    className="w-full bg-[#1E0F07] border border-[#4A3525] focus:border-[#D4AF37] rounded-xl p-2.5 text-white outline-none font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-[#C4A484] mb-1">Applicable Category</label>
                <select
                  value={formData.applicableCategory}
                  onChange={(e) => setFormData({ ...formData, applicableCategory: e.target.value })}
                  className="w-full bg-[#1E0F07] border border-[#4A3525] focus:border-[#D4AF37] rounded-xl p-2.5 text-white outline-none"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase text-[#C4A484] mb-1">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full bg-[#1E0F07] border border-[#4A3525] focus:border-[#D4AF37] rounded-xl p-2.5 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-[#C4A484] mb-1">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full bg-[#1E0F07] border border-[#4A3525] focus:border-[#D4AF37] rounded-xl p-2.5 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-[#C4A484] mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-[#1E0F07] border border-[#4A3525] focus:border-[#D4AF37] rounded-xl p-2.5 text-white outline-none font-bold"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="SCHEDULED">SCHEDULED</option>
                  <option value="EXPIRED">EXPIRED</option>
                </select>
              </div>

              <div className="pt-4 border-t border-[#4A3525] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-[#1E0F07] text-[#C4A484] font-bold rounded-xl border border-[#4A3525]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#8B3A13] hover:bg-[#6E2C00] text-white font-extrabold uppercase rounded-xl"
                >
                  Save Offer
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
