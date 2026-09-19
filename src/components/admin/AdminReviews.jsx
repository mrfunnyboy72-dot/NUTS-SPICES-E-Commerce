import React from 'react';
import { useCart } from '../../context/CartContext';
import { Star, CheckCircle, EyeOff, Trash2, MessageSquare, ShieldAlert } from 'lucide-react';

export default function AdminReviews() {
  const { reviews, updateReviewStatus, deleteReview } = useCart();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'APPROVED':
        return <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-black uppercase">APPROVED</span>;
      case 'PENDING':
        return <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-[10px] font-black uppercase">PENDING</span>;
      case 'HIDDEN':
        return <span className="px-2.5 py-1 bg-gray-500/20 text-gray-400 border border-gray-500/30 rounded-full text-[10px] font-black uppercase">HIDDEN</span>;
      default:
        return <span className="px-2.5 py-1 bg-gray-500/20 text-gray-300 border border-gray-500/30 rounded-full text-[10px] font-black uppercase">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#2B1509] p-6 rounded-2xl border border-[#4A3525]">
        <div>
          <h2 className="text-2xl font-black font-serif text-white tracking-wide flex items-center gap-2">
            <Star className="w-6 h-6 text-[#D4AF37]" />
            ⭐ ADMIN — REVIEWS ({reviews.length})
          </h2>
          <p className="text-xs text-[#C4A484] mt-1">
            Moderate customer reviews, approve ratings to display on storefront, hide or remove feedback.
          </p>
        </div>
      </div>

      {/* REVIEWS TABLE */}
      <div className="bg-[#2B1509] border border-[#4A3525] rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#4A3525] bg-[#1E0F07] text-[#C4A484] font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Product Name</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4 text-center">Rating</th>
                <th className="py-3.5 px-4">Review Feedback</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4A3525]/60">
              {reviews.map((rev) => (
                <tr key={rev.id} className="hover:bg-[#1E0F07]/50 transition-colors">
                  
                  {/* Product */}
                  <td className="py-3.5 px-4">
                    <span className="font-extrabold text-white text-xs block max-w-xs">{rev.productName}</span>
                    <span className="text-[10px] text-[#C4A484]">Date: {rev.date}</span>
                  </td>

                  {/* Customer */}
                  <td className="py-3.5 px-4 font-bold text-white">
                    {rev.customerName}
                  </td>

                  {/* Rating */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center text-[#D4AF37]">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-[#D4AF37]' : 'text-gray-600'}`} 
                        />
                      ))}
                    </div>
                  </td>

                  {/* Comment */}
                  <td className="py-3.5 px-4 text-xs text-white max-w-md italic">
                    "{rev.comment}"
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 text-center">
                    {getStatusBadge(rev.status)}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right space-x-1 shrink-0">
                    
                    {/* Approve */}
                    <button
                      onClick={() => updateReviewStatus(rev.id, 'APPROVED')}
                      className="px-2.5 py-1.5 bg-emerald-950/60 hover:bg-emerald-800 border border-emerald-500/40 text-emerald-300 rounded-lg text-[10px] font-bold cursor-pointer inline-flex items-center gap-1"
                      title="Approve Review"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>

                    {/* Hide */}
                    <button
                      onClick={() => updateReviewStatus(rev.id, 'HIDDEN')}
                      className="px-2.5 py-1.5 bg-[#1E0F07] hover:bg-gray-800 border border-gray-600 text-gray-300 rounded-lg text-[10px] font-bold cursor-pointer inline-flex items-center gap-1"
                      title="Hide Review"
                    >
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hide</span>
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this review permanently?')) {
                          deleteReview(rev.id);
                        }
                      }}
                      className="p-1.5 bg-[#1E0F07] hover:bg-red-950 border border-red-500/40 text-red-400 rounded-lg cursor-pointer"
                      title="Delete Review"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
