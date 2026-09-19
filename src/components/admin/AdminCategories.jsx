import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Image as ImageIcon, Pencil, Trash2, Plus, X } from 'lucide-react';

export default function AdminCategories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useCart();
  
  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [iconLucideName, setIconLucideName] = useState('');

  const filteredCategories = categories.filter(c => c.id !== 'all');

  const handleOpenAdd = () => {
    if (isFormOpen && !editingCategory) {
      // Toggle close if already adding
      setIsFormOpen(false);
      return;
    }
    setEditingCategory(null);
    setCategoryName('');
    setIconLucideName('');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setCategoryName(cat.name || '');
    setIconLucideName(cat.iconLucideName || cat.icon || '');
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingCategory(null);
    setCategoryName('');
    setIconLucideName('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name: categoryName.trim(),
        iconLucideName: iconLucideName.trim()
      });
    } else {
      const generatedId = categoryName.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');
      addCategory({
        id: generatedId,
        name: categoryName.trim(),
        iconLucideName: iconLucideName.trim() || 'Sparkles',
        icon: '🌰',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600'
      });
    }

    handleCancel();
  };

  const [deleteConfirmCategory, setDeleteConfirmCategory] = useState(null);

  const handleDelete = (cat) => {
    setDeleteConfirmCategory(cat);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* HEADER ROW */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Manage Categories
        </h1>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold text-xs rounded-lg shadow-2xs cursor-pointer transition-all border border-red-700/20"
        >
          {isFormOpen ? (
            <span>Cancel</span>
          ) : (
            <>
              <Plus className="w-4 h-4 text-white" />
              <span>Add Category</span>
            </>
          )}
        </button>
      </div>

      {/* EDIT / ADD CATEGORY FORM CARD (Matches Screenshot Exactly) */}
      {isFormOpen && (
        <div className="bg-white border border-gray-100 rounded-xl shadow-2xs p-6 animate-in fade-in slide-in-from-top-2 duration-150">
          <h2 className="text-base font-bold text-gray-900 mb-4">
            {editingCategory ? 'Edit Category' : 'Add Category'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Category Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g. ADIYAL"
                  className="w-full bg-white border border-gray-200 focus:border-amber-500 rounded-lg px-3 py-2 text-xs font-normal text-gray-800 outline-none transition-all"
                />
              </div>

              {/* Icon (Lucide Name) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Icon (Lucide Name)
                </label>
                <input
                  type="text"
                  value={iconLucideName}
                  onChange={(e) => setIconLucideName(e.target.value)}
                  placeholder="e.g. Sparkles"
                  className="w-full bg-white border border-gray-200 focus:border-amber-500 rounded-lg px-3 py-2 text-xs font-normal text-gray-800 outline-none transition-all placeholder:text-gray-400"
                />
              </div>

            </div>

            {/* Action Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold text-xs rounded-lg shadow-2xs cursor-pointer transition-all"
              >
                {editingCategory ? 'Update Category' : 'Save Category'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CATEGORIES TABLE CANVAS */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/40 text-gray-700 font-bold text-xs">
                <th className="py-3.5 px-6 w-24">Icon</th>
                <th className="py-3.5 px-6">Category Name</th>
                <th className="py-3.5 px-6 text-right w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-gray-400 font-medium">
                    No categories found. Click "+ Add Category" to create one.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                    
                    {/* Icon */}
                    <td className="py-4 px-6">
                      <div className="w-8 h-8 flex items-center justify-center text-gray-500">
                        {cat.image ? (
                          <img src={cat.image} alt={cat.name} className="w-7 h-7 object-cover rounded-md" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-gray-400 stroke-[1.5]" />
                        )}
                      </div>
                    </td>

                    {/* Category Name */}
                    <td className="py-4 px-6 font-bold text-gray-900 text-xs tracking-tight uppercase">
                      {cat.name}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Edit Notepad Icon Button */}
                        <button
                          onClick={() => handleOpenEdit(cat)}
                          title="Edit Category"
                          className="p-1.5 bg-sky-50 hover:bg-sky-100 text-sky-400 hover:text-sky-500 rounded-md transition-colors cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        {/* Delete Trash Icon Button */}
                        <button
                          onClick={() => handleDelete(cat)}
                          title="Delete Category"
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-500 rounded-md transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CUSTOM DELETE CONFIRMATION MODAL */}
      {deleteConfirmCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-gray-200 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl my-auto text-gray-800 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Delete Category?</h3>
            <p className="text-xs text-gray-500">
              Are you sure you want to delete <strong className="text-gray-800">"{deleteConfirmCategory.name}"</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmCategory(null)}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteCategory(deleteConfirmCategory.id);
                  if (editingCategory?.id === deleteConfirmCategory.id) {
                    handleCancel();
                  }
                  setDeleteConfirmCategory(null);
                }}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-md cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
