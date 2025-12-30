import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CameraIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';

const ProductFormnew = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    cost: '',
    tax: '',
    stock: '',
    type: 'Goods',
    image: null
  });
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.price) newErrors.price = true;
    if (!formData.cost) newErrors.cost = true;
    if (!formData.image) newErrors.image = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Please fill all fields: Name, Sales Price, Cost, and Product Image.");
      return;
    }

    const existing = JSON.parse(localStorage.getItem('my_products') || '[]');
    const newProduct = { ...formData, id: Date.now() };
    localStorage.setItem('my_products', JSON.stringify([newProduct, ...existing]));
    navigate('/productpage');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-[13px]">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center gap-3">
          <button onClick={handleSave} className="bg-[#1F3A5F] text-white px-4 py-1 rounded font-bold hover:bg-[#162A43]">Save</button>
          <button onClick={() => navigate(-1)} className="border px-4 py-1 rounded">Discard</button>
          <span className="ml-4 text-[18px] font-medium text-slate-700">Products / <span className="text-slate-400">New</span></span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/30">
        <div className="max-w-4xl mx-auto bg-white border rounded shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <label className="text-red-500 font-bold block mb-1">Product Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Cheese Burger"
                className={`text-3xl font-bold w-full border-b pb-2 outline-none mb-6 ${errors.name ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-teal-600'}`}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-bold text-slate-700">Sales Price</span>
                    <div className="flex items-center gap-1">
                      <span className="text-slate-400">₹</span>
                      <input 
                        type="number" 
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className={`w-24 text-right outline-none ${errors.price ? 'text-red-500' : ''}`}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-bold text-slate-700">Actual Cost</span>
                    <div className="flex items-center gap-1">
                      <span className="text-slate-400">₹</span>
                      <input 
                        type="number" 
                        value={formData.cost}
                        onChange={(e) => setFormData({...formData, cost: e.target.value})}
                        className={`w-24 text-right outline-none ${errors.cost ? 'text-red-500' : ''}`}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-bold text-slate-700">Tax %</span>
                    <div className="flex items-center gap-1">
                      <input 
                        type="number" 
                        value={formData.tax}
                        onChange={(e) => setFormData({...formData, tax: e.target.value})}
                        className="w-24 text-right outline-none"
                        placeholder="0"
                      />
                      <span className="text-slate-400">%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-bold text-slate-700">Stock Quantity</span>
                    <input 
                      type="number" 
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: e.target.value})}
                      className="w-24 text-right outline-none"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div 
                onClick={() => fileInputRef.current.click()}
                className={`w-32 h-32 border-2 border-dashed rounded flex flex-col items-center justify-center cursor-pointer transition-colors ${errors.image ? 'border-red-500 bg-red-50' : 'border-slate-300 hover:bg-slate-50'}`}
              >
                {formData.image ? (
                  <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <CameraIcon className="w-8 h-8 text-slate-300" />
                )}
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
              <span className="text-[10px] mt-2 font-bold text-slate-400">PRODUCT IMAGE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFormnew;