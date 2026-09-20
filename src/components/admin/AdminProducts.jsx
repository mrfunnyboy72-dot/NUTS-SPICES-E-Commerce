import React, { useState, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { 
  Package, Plus, Search, Edit, Trash2, X, Upload 
} from 'lucide-react';

export default function AdminProducts() {
  const { products, categories, addProduct, updateProduct, deleteProduct, toggleProductStatus } = useCart();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Hidden file input for quick row image upload
  const [quickUploadProductId, setQuickUploadProductId] = useState(null);
  const fileInputRef = useRef(null);

  // Form State for Add / Edit Product
  const [formData, setFormData] = useState({
    name: '',
    category: 'nuts-dry-fruits',
    description: '',
    image: 'https://images.unsplash.com/photo-1508061252966-177bf9f7f457?auto=format&fit=crop&q=80&w=800',
    price: 350,
    discountPercent: 10,
    weightString: '250g, 500g, 1 kg',
    stock: 50,
    ingredients: '100% Natural Premium Nuts',
    origin: 'India',
    shelfLife: '9 Months',
    storage: 'Store in a cool dry place in airtight container',
    status: 'Active'
  });

  // Filter products by search and category
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (p.id && p.id.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: categories[1]?.id || 'nuts-dry-fruits',
      description: '',
      image: 'https://images.unsplash.com/photo-1508061252966-177bf9f7f457?auto=format&fit=crop&q=80&w=800',
      price: 350,
      discountPercent: 10,
      weightString: '250g, 500g, 1 kg',
      stock: 50,
      ingredients: '100% Natural Premium Grade',
      origin: 'India',
      shelfLife: '9 Months',
      storage: 'Store in airtight jar in cool dark place',
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    const weightLabels = product.weights ? product.weights.map(w => w.label).join(', ') : '250g, 500g';
    const firstPrice = product.weights && product.weights[0] ? product.weights[0].price : product.price || 350;

    setFormData({
      name: product.name || '',
      category: product.category || 'nuts-dry-fruits',
      description: product.description || '',
      image: product.image || '',
      price: firstPrice,
      discountPercent: product.discountPercent || 10,
      weightString: weightLabels,
      stock: product.stock !== undefined ? product.stock : 45,
      ingredients: product.ingredients || '100% Natural',
      origin: product.origin || 'India',
      shelfLife: product.shelfLife || '9 Months',
      storage: product.storage || 'Cool dry place',
      status: product.status || (product.active !== false ? 'Active' : 'Inactive')
    });
    setIsModalOpen(true);
  };

  const handleQuickImageUpload = (productId) => {
    setQuickUploadProductId(productId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file && quickUploadProductId) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProduct(quickUploadProductId, { image: reader.result });
        setQuickUploadProductId(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const weightParts = formData.weightString.split(',').map(s => s.trim()).filter(Boolean);
    const basePrice = Number(formData.price) || 100;
    const discountFactor = (100 - (Number(formData.discountPercent) || 0)) / 100;

    const weights = weightParts.map((w, idx) => {
      const priceMultiplier = idx === 0 ? 1 : idx === 1 ? 1.8 : 3.4;
      const calculatedPrice = Math.round(basePrice * priceMultiplier);
      const original = Math.round(calculatedPrice / discountFactor);
      return {
        label: w,
        price: calculatedPrice,
        originalPrice: original
      };
    });

    const categoryObj = categories.find(c => c.id === formData.category);
    const categoryName = categoryObj ? categoryObj.name : 'General';

    const payload = {
      name: formData.name,
      category: formData.category,
      categoryName: categoryName,
      description: formData.description,
      image: editingProduct ? (editingProduct.image || formData.image) : formData.image,
      price: basePrice,
      discountPercent: Number(formData.discountPercent),
      weights: weights.length > 0 ? weights : [{ label: '250g', price: basePrice, originalPrice: Math.round(basePrice * 1.2) }],
      stock: Number(formData.stock),
      ingredients: formData.ingredients,
      origin: formData.origin,
      shelfLife: formData.shelfLife,
      storage: formData.storage,
      status: formData.status,
      active: formData.status === 'Active'
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
    } else {
      addProduct(payload);
    }

    setIsModalOpen(false);
  };

  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState(null);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Hidden File Input for Quick Row Image Upload */}
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
      />

      {/* HEADER & RED ADD PRODUCT BUTTON matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Manage Products
          </h1>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer transition-all shrink-0 border border-red-700/30"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>+ Add New Product</span>
        </button>
      </div>

      {/* FILTERS & SEARCH BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-gray-900 outline-none"
          />
        </div>
        <div className="sm:col-span-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 rounded-xl py-2.5 px-3 text-xs font-bold text-gray-800 outline-none"
          >
            <option value="all">All Categories</option>
            {categories.filter(c => c.id !== 'all').map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* PRODUCTS TABLE matching reference screenshot layout */}
      <div className="bg-white border border-gray-200/80 rounded-2xl shadow-xs overflow-hidden text-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200/80 bg-gray-50/80 text-gray-600 font-bold uppercase text-[11px] tracking-wider">
                <th className="py-4 px-4">Image</th>
                <th className="py-4 px-4">Product Name</th>
                <th className="py-4 px-4">Selling Price</th>
                <th className="py-4 px-4">Discount</th>
                <th className="py-4 px-4 text-center">Visibility</th>
                <th className="py-4 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((p) => {
                const isInactive = p.status === 'Inactive' || p.active === false;
                
                const sellingPrice = p.weights && p.weights[0] ? p.weights[0].price : p.price || 0;
                const mrp = p.weights && p.weights[0] && p.weights[0].originalPrice 
                  ? p.weights[0].originalPrice 
                  : Math.round(sellingPrice * 1.25);
                
                const discountPct = p.discountPercent || (mrp > sellingPrice ? Math.round(((mrp - sellingPrice) / mrp) * 100) : 10);

                return (
                  <tr key={p.id} className={`hover:bg-gray-50/60 transition-colors ${isInactive ? 'opacity-60' : ''}`}>
                    
                    {/* 1. Image */}
                    <td className="py-3.5 px-4">
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-10 h-10 rounded-lg object-cover border border-gray-200 bg-gray-50 shrink-0" 
                      />
                    </td>

                    {/* 2. Product Name */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-gray-800 text-xs">{p.name}</div>
                    </td>

                    {/* 3. Selling Price (Red Bold) */}
                    <td className="py-3.5 px-4 whitespace-nowrap font-serif text-red-600 font-extrabold text-sm">
                      ₹{sellingPrice}
                    </td>

                    {/* 6. Discount (Green Bold) */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-emerald-600 font-extrabold text-xs">
                      {discountPct}% OFF
                    </td>

                    {/* 7. Visibility (ON/OFF Badge) */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => toggleProductStatus(p.id)}
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-extrabold uppercase cursor-pointer transition-colors ${
                          !isInactive 
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                            : 'bg-gray-100 text-gray-500 border border-gray-200'
                        }`}
                      >
                        {!isInactive ? 'ON' : 'OFF'}
                      </button>
                    </td>

                    {/* 8. Actions (Upload Image, Edit, Delete) matching screenshot icons */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="inline-flex items-center justify-center gap-1.5">
                        {/* Purple Upload/Change Image Button */}
                        <button
                          onClick={() => handleQuickImageUpload(p.id)}
                          className="p-1.5 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-lg transition-colors cursor-pointer"
                          title="Upload/Change Product Image"
                        >
                          <Upload className="w-3.5 h-3.5" />
                        </button>

                        {/* Blue Edit Button */}
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-1.5 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors cursor-pointer"
                          title="Edit Product Details"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        {/* Red/Pink Delete Button */}
                        <button
                          onClick={() => setDeleteConfirmProduct(p)}
                          className="p-1.5 bg-rose-100 hover:bg-rose-200 text-rose-600 rounded-lg transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CUSTOM DELETE CONFIRMATION MODAL */}
      {deleteConfirmProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-gray-200 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl my-auto text-gray-800 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Delete Product?</h3>
            <p className="text-xs text-gray-500">
              Are you sure you want to delete <strong className="text-gray-800">"{deleteConfirmProduct.name}"</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmProduct(null)}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteProduct(deleteConfirmProduct.id);
                  setDeleteConfirmProduct(null);
                }}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-md cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-gray-200 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-auto text-gray-800 relative animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-600" />
                {editingProduct ? 'Edit Product Details' : 'Add New Product'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Product Name */}
                <div className="sm:col-span-2">
                  <label className="block font-semibold uppercase text-gray-600 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. California Jumbo Almonds"
                    className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 rounded-xl p-2.5 text-gray-900 outline-none"
                  />
                </div>

                {/* 2. Category */}
                <div>
                  <label className="block font-semibold uppercase text-gray-600 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 rounded-xl p-2.5 text-gray-900 outline-none"
                  >
                    {categories.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* 3. Base Price */}
                <div>
                  <label className="block font-semibold uppercase text-gray-600 mb-1">Base Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 rounded-xl p-2.5 text-gray-900 outline-none font-bold"
                  />
                </div>

                {/* 4. Discount % */}
                <div>
                  <label className="block font-semibold uppercase text-gray-600 mb-1">Discount %</label>
                  <input
                    type="number"
                    min="0"
                    max="90"
                    value={formData.discountPercent}
                    onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 rounded-xl p-2.5 text-gray-900 outline-none"
                  />
                </div>

                {/* 5. Stock */}
                <div>
                  <label className="block font-semibold uppercase text-gray-600 mb-1">Stock Units *</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 rounded-xl p-2.5 text-gray-900 outline-none"
                  />
                </div>

                {/* 6. Weight Variants (Comma Separated) */}
                <div className="sm:col-span-2">
                  <label className="block font-semibold uppercase text-gray-600 mb-1">Weight Options (Comma Separated) *</label>
                  <input
                    type="text"
                    required
                    value={formData.weightString}
                    onChange={(e) => setFormData({ ...formData, weightString: e.target.value })}
                    placeholder="250g, 500g, 1 kg"
                    className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 rounded-xl p-2.5 text-gray-900 outline-none"
                  />
                </div>

                {/* 7. Description */}
                <div className="sm:col-span-2">
                  <label className="block font-semibold uppercase text-gray-600 mb-1">Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Detailed gourmet product description..."
                    className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 rounded-xl p-2.5 text-gray-900 outline-none"
                  />
                </div>

                {/* 8. Ingredients */}
                <div>
                  <label className="block font-semibold uppercase text-gray-600 mb-1">Ingredients</label>
                  <input
                    type="text"
                    value={formData.ingredients}
                    onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                    placeholder="e.g. 100% Pure Almonds"
                    className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 rounded-xl p-2.5 text-gray-900 outline-none"
                  />
                </div>

                {/* 9. Origin */}
                <div>
                  <label className="block font-semibold uppercase text-gray-600 mb-1">Origin</label>
                  <input
                    type="text"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    placeholder="e.g. California, USA"
                    className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 rounded-xl p-2.5 text-gray-900 outline-none"
                  />
                </div>

                {/* 10. Shelf Life */}
                <div>
                  <label className="block font-semibold uppercase text-gray-600 mb-1">Shelf Life</label>
                  <input
                    type="text"
                    value={formData.shelfLife}
                    onChange={(e) => setFormData({ ...formData, shelfLife: e.target.value })}
                    placeholder="e.g. 9 Months"
                    className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 rounded-xl p-2.5 text-gray-900 outline-none"
                  />
                </div>

                {/* 11. Storage */}
                <div>
                  <label className="block font-semibold uppercase text-gray-600 mb-1">Storage Instructions</label>
                  <input
                    type="text"
                    value={formData.storage}
                    onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                    placeholder="e.g. Cool & dry place"
                    className="w-full bg-gray-50 border border-gray-200 focus:border-amber-500 rounded-xl p-2.5 text-gray-900 outline-none"
                  />
                </div>

                {/* 12. Status */}
                <div className="sm:col-span-2">
                  <label className="block font-semibold uppercase text-gray-600 mb-1">Status</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-gray-800 font-bold cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value="Active"
                        checked={formData.status === 'Active'}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      />
                      <span>Active</span>
                    </label>
                    <label className="flex items-center gap-2 text-gray-500 font-bold cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value="Inactive"
                        checked={formData.status === 'Inactive'}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      />
                      <span>Inactive</span>
                    </label>
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#130924] hover:bg-[#291749] text-[#FACC15] font-bold uppercase rounded-xl shadow-md cursor-pointer"
                >
                  {editingProduct ? 'Save Product Updates' : 'Publish Product'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}


