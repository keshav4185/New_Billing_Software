import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, ChevronDownIcon, 
  Squares2X2Icon, ListBulletIcon, 
  ChevronLeftIcon, XMarkIcon 
} from '@heroicons/react/24/outline';

const Productscomponents = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('my_products') || '[]');
    setProducts(savedProducts);
  }, []);

  const handleEditProduct = () => {
    setIsEditing(true);
    setEditData({...selectedProduct});
  };

  const handleSaveEdit = () => {
    const updatedProducts = products.map(p => 
      p.id === selectedProduct.id ? editData : p
    );
    localStorage.setItem('my_products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    setSelectedProduct(editData);
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditData({...editData, image: event.target.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({});
  };

  const handleDeleteProduct = () => {
    const updatedProducts = products.filter(p => p.id !== selectedProduct.id);
    localStorage.setItem('my_products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    setShowDeleteConfirm(false);
    setShowProductModal(false);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, products]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-[13px] text-slate-700 overflow-hidden">
      
      {/* Product Detail Modal */}
      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-[300] flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-xs sm:max-w-md md:max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-3 sm:p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-base sm:text-lg">Product Details</h3>
              <XMarkIcon className="w-5 h-5 cursor-pointer" onClick={() => setShowProductModal(false)} />
            </div>
            <div className="p-3 sm:p-6 space-y-3 sm:space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600">Photo</label>
                <div className="w-full h-32 sm:h-40 bg-slate-100 rounded overflow-hidden border relative">
                  {(isEditing ? editData.image : selectedProduct.image) ? (
                    <img src={isEditing ? editData.image : selectedProduct.image} className="w-full h-full object-cover" alt="Product" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <span className="text-white text-sm font-bold">Change Photo</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Name</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={editData.name || ''} 
                      onChange={(e) => setEditData({...editData, name: e.target.value})}
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm font-bold"
                    />
                  ) : (
                    <p className="font-bold text-slate-900">{selectedProduct.name}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Category</label>
                  {isEditing ? (
                    <select 
                      value={editData.category || 'General'} 
                      onChange={(e) => setEditData({...editData, category: e.target.value})}
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                    >
                      <option value="General">General</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Food">Food</option>
                      <option value="Books">Books</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p className="text-slate-700">{selectedProduct.category || 'General'}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Price</label>
                  {isEditing ? (
                    <input 
                      type="number" 
                      value={editData.price || ''} 
                      onChange={(e) => setEditData({...editData, price: e.target.value})}
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm font-bold text-green-600"
                    />
                  ) : (
                    <p className="font-bold text-green-600">₹{parseFloat(selectedProduct.price).toFixed(2)}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Cost</label>
                  {isEditing ? (
                    <input 
                      type="number" 
                      value={editData.cost || ''} 
                      onChange={(e) => setEditData({...editData, cost: e.target.value})}
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                    />
                  ) : (
                    <p className="text-slate-700">₹{parseFloat(selectedProduct.cost || 0).toFixed(2)}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Stock</label>
                  {isEditing ? (
                    <input 
                      type="number" 
                      value={editData.stock || ''} 
                      onChange={(e) => setEditData({...editData, stock: e.target.value})}
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                    />
                  ) : (
                    <p className="text-slate-700">{selectedProduct.stock || 0}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Description</label>
                {isEditing ? (
                  <textarea 
                    value={editData.description || ''} 
                    onChange={(e) => setEditData({...editData, description: e.target.value})}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm h-20 resize-none"
                  />
                ) : (
                  <p className="text-slate-700">{selectedProduct.description || 'No description'}</p>
                )}
              </div>
            </div>
            <div className="p-3 sm:p-4 bg-slate-50 border-t flex flex-col sm:flex-row justify-between gap-2">
              {isEditing ? (
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button 
                    onClick={handleSaveEdit}
                    className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700 text-sm"
                  >
                    Save
                  </button>
                  <button 
                    onClick={handleCancelEdit}
                    className="bg-slate-600 text-white px-4 py-2 rounded font-bold hover:bg-slate-700 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button 
                    onClick={handleEditProduct}
                    className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => setShowDeleteConfirm(true)}
                    className="bg-red-600 text-white px-4 py-2 rounded font-bold hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
              <button onClick={() => setShowProductModal(false)} className="bg-slate-600 text-white px-4 py-2 rounded font-bold text-sm w-full sm:w-auto">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-[400] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
            <div className="p-4 border-b">
              <h3 className="font-bold text-lg text-red-600">Delete Product</h3>
            </div>
            <div className="p-6">
              <p className="text-slate-700">Are you sure you want to delete <strong>{selectedProduct?.name}</strong>?</p>
              <p className="text-sm text-slate-500 mt-2">This action cannot be undone.</p>
            </div>
            <div className="p-4 bg-slate-50 border-t flex justify-end gap-2">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-slate-600 text-white px-4 py-2 rounded font-bold"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteProduct}
                className="bg-red-600 text-white px-4 py-2 rounded font-bold hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- TOP NAVBAR --- */}
      <nav className="bg-[#714B67] text-white flex items-center justify-between px-4 h-10 shrink-0 z-50">
        <div className="flex items-center h-full">
          <div className="p-2 hover:bg-black/10 cursor-pointer mr-2">
            <div className="grid grid-cols-3 gap-0.5 w-4">
              {[...Array(9)].map((_, i) => <div key={i} className="w-1 h-1 bg-white rounded-sm" />)}
            </div>
          </div>
          <div className="font-bold px-3 text-[15px] cursor-pointer" onClick={() => navigate('/')}>Sales</div>
        </div>
      </nav>

      {/* --- CONTROL BAR --- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-2 bg-white border-b shrink-0 gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* BACK BUTTON TO DASHBOARD */}
          <button 
            onClick={() => navigate('/sdashboardpage')} 
            className="p-1 hover:bg-slate-100 rounded-full transition-colors"
            title="Back to Dashboard"
          >
            <ChevronLeftIcon className="w-5 h-5 text-slate-600" />
          </button>

          <button 
            onClick={() => navigate('/productform')}
            className="bg-[#714B67] text-white px-4 py-1 rounded font-bold text-[14px] hover:bg-[#5a3c52]"
          >
            New
          </button>
          <span className="text-[18px] text-slate-600 font-medium">Products</span>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex items-center border-b border-slate-300 flex-1 sm:w-64 pb-0.5 group">
            <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none w-full italic text-slate-700 bg-transparent" 
            />
          </div>
        </div>
      </div>

      {/* --- PRODUCT GRID --- */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              onClick={() => handleProductClick(product)}
              className="bg-white border rounded p-3 flex gap-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="w-20 h-20 bg-slate-100 rounded shrink-0 overflow-hidden border">
                {product.image && <img src={product.image} className="w-full h-full object-cover" alt="" />}
              </div>
              <div>
                <h3 className="font-bold text-[14px]">{product.name}</h3>
                <div className="text-teal-600 font-bold">₹ {parseFloat(product.price).toFixed(2)}</div>
                <div className="text-slate-400 text-[11px]">Cost: ₹ {parseFloat(product.cost).toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Productscomponents;