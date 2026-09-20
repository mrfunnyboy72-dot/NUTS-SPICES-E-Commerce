import React, { useState, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { Image as ImageIcon, Pencil, Trash2, Plus, X, Upload, Eye, Package } from 'lucide-react';

export default function AdminCategories() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useCart();
  
  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [iconLucideName, setIconLucideName] = useState('');
  const [categoryImage, setCategoryImage] = useState('');

  // View Category Products Modal State
  const [viewingCategory, setViewingCategory] = useState(null);

  // Hidden File Input Ref for Device Image Picker
  const [quickUploadCategoryId, setQuickUploadCategoryId] = useState(null);
  const fileInputRef = useRef(null);

  const filteredCategories = categories.filter(c => c.id !== 'all');

  const getCategoryProducts = (cat) => {
    if (!cat || !products) return [];
    const cId = (cat.id || '').toLowerCase();
    const cName = (cat.name || '').toLowerCase();
    return products.filter(p => {
      const pCat = (p.category || '').toLowerCase();
      const pCatName = (p.categoryName || '').toLowerCase();
      return pCat === cId || pCat === cName || pCatName === cName || pCatName === cId;
    });
  };

  const handleOpenAdd = () => {
    if (isFormOpen && !editingCategory) {
      setIsFormOpen(false);
      return;
    }
    setEditingCategory(null);
    setCategoryName('');
    setIconLucideName('');
    setCategoryImage('');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setCategoryName(cat.name || '');
    setIconLucideName(cat.iconLucideName || cat.icon || '');
    setCategoryImage(cat.image || '');
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingCategory(null);
    setCategoryName('');
    setIconLucideName('');
    setCategoryImage('');
  };

  const compressImageFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 600;
          const MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = Math.round(width);
          canvas.height = Math.round(height);
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.onerror = () => resolve(e.target.result);
      };
      reader.onerror = () => resolve('');
    });
  };

  const handleQuickImageUpload = (catId) => {
    setQuickUploadCategoryId(catId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      try {
        const compressedBase64 = await compressImageFile(file);
        if (compressedBase64) {
          if (quickUploadCategoryId) {
            updateCategory(quickUploadCategoryId, { image: compressedBase64 });
            setQuickUploadCategoryId(null);
          } else {
            setCategoryImage(compressedBase64);
          }
        }
      } catch (err) {
        console.error('Failed to process image:', err);
      }
    }
    if (e.target) e.target.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    const finalImage = categoryImage || (editingCategory ? editingCategory.image : 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600');

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name: categoryName.trim(),
        iconLucideName: iconLucideName.trim(),
        image: finalImage
      });
    } else {
      const generatedId = categoryName.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');
      addCategory({
        id: generatedId,
        name: categoryName.trim(),
        iconLucideName: iconLucideName.trim() || 'Sparkles',
        icon: '🌰',
        image: finalImage
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
      {/* Hidden File Input for Device Image Selection */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      
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

            {/* Category Image URL & File Upload */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Category Image (URL or Upload from Device)
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={categoryImage}
                  onChange={(e) => setCategoryImage(e.target.value)}
                  placeholder="https://images.unsplash.com/... or upload image"
                  className="flex-1 bg-white border border-gray-200 focus:border-amber-500 rounded-lg px-3 py-2 text-xs font-normal text-gray-800 outline-none transition-all placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => {
                    setQuickUploadCategoryId(null);
                    if (fileInputRef.current) fileInputRef.current.click();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-lg font-bold text-xs transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-purple-600" />
                  <span>Choose File</span>
                </button>
              </div>
              {categoryImage && (
                <div className="mt-2 flex items-center gap-2">
                  <img src={categoryImage} alt="Preview" className="w-10 h-10 object-cover rounded-md border border-gray-200" />
                  <button
                    type="button"
                    onClick={() => setCategoryImage('')}
                    className="text-xs text-red-500 hover:text-red-700 font-medium cursor-pointer"
                  >
                    Remove Image
                  </button>
                </div>
              )}
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
                <th className="py-3.5 px-6 w-24">Icon / Image</th>
                <th className="py-3.5 px-6">Category Name</th>
                <th className="py-3.5 px-6">Products</th>
                <th className="py-3.5 px-6 text-right w-44">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-400 font-medium">
                    No categories found. Click "+ Add Category" to create one.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat) => {
                  const catProds = getCategoryProducts(cat);
                  return (
                    <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                      
                      {/* Icon / Image */}
                      <td className="py-4 px-6">
                        <div className="w-9 h-9 flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                          {cat.image ? (
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-gray-400 stroke-[1.5]" />
                          )}
                        </div>
                      </td>

                      {/* Category Name */}
                      <td className="py-4 px-6 font-bold text-gray-900 text-xs tracking-tight uppercase">
                        {cat.name}
                      </td>

                      {/* Products Count */}
                      <td className="py-4 px-6">
                        <button
                          onClick={() => setViewingCategory(cat)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-full font-bold text-[11px] border border-amber-200/80 transition-colors cursor-pointer"
                        >
                          <Package className="w-3 h-3 text-amber-700" />
                          <span>{catProds.length} Products</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* View Products Button */}
                          <button
                            onClick={() => setViewingCategory(cat)}
                            title="View Products in Category"
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 hover:text-emerald-700 rounded-md transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Quick Upload Image Button */}
                          <button
                            onClick={() => handleQuickImageUpload(cat.id)}
                            title="Upload/Change Category Image"
                            className="p-1.5 bg-purple-50 hover:bg-purple-100 text-purple-600 hover:text-purple-700 rounded-md transition-colors cursor-pointer"
                          >
                            <Upload className="w-4 h-4" />
                          </button>

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
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW CATEGORY PRODUCTS MODAL */}
      {viewingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-gray-200 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl my-auto text-gray-800 animate-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                  <img src={viewingCategory.image || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600'} alt={viewingCategory.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 uppercase">{viewingCategory.name}</h3>
                  <p className="text-xs text-gray-500">{getCategoryProducts(viewingCategory).length} Products assigned to this category</p>
                </div>
              </div>
              <button
                onClick={() => setViewingCategory(null)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 py-1 pr-1">
              {getCategoryProducts(viewingCategory).length === 0 ? (
                <div className="py-8 text-center text-gray-400 text-xs font-medium">
                  No products are currently assigned to "{viewingCategory.name}".
                </div>
              ) : (
                getCategoryProducts(viewingCategory).map(product => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-lg border border-gray-200 shrink-0" />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-gray-900 truncate">{product.name}</h4>
                        <span className="text-[11px] text-gray-500">₹{product.price || product.weights?.[0]?.price} • {product.badge || 'Active'}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full shrink-0">
                      Active
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 border-t border-gray-100">
              <button
                onClick={() => setViewingCategory(null)}
                className="w-full py-2.5 bg-gray-900 hover:bg-black text-white font-bold rounded-xl text-xs cursor-pointer transition-all"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

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
