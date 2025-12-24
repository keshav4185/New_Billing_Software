import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, Cog6ToothIcon, 
  FunnelIcon, XMarkIcon, ChevronDownIcon,
  ListBulletIcon, TableCellsIcon,
  CloudArrowUpIcon, MapPinIcon, 
  PhoneIcon, EnvelopeIcon, GlobeAltIcon
} from '@heroicons/react/24/outline';

const Customers = () => {
  // View state: 'list' or 'form'
  const [view, setView] = useState('list');
  
  // Data State: Stores the list of saved customers
  const [customerList, setCustomerList] = useState([]);
  
  // Tracks if we are editing an existing customer or creating a new one
  const [editingId, setEditingId] = useState(null);

  // Form State: storage for the customer data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    isCompany: true,
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({...prev, image: e.target.result}));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNew = () => {
    setEditingId(null);
    setFormData({ name: '', email: '', phone: '', city: '', isCompany: true, image: null });
    setView('form');
  };

  const handleEdit = (customer) => {
    setEditingId(customer.id);
    setFormData({ ...customer });
    setView('form');
  };

  const handleSave = () => {
    if (!formData.name) return alert("Please enter a customer name.");
    
    if (editingId) {
      // Update existing customer
      setCustomerList(customerList.map(c => c.id === editingId ? { ...formData } : c));
    } else {
      // Add new customer
      const newCustomer = { 
        ...formData, 
        id: Date.now(), 
        country: 'United States' 
      };
      setCustomerList([newCustomer, ...customerList]);
    }
    
    setView('list');
    setEditingId(null);
  };

  const handleDiscard = () => {
    setView('list');
    setEditingId(null);
  };

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-[13px] text-slate-700 overflow-hidden">
      
      {/* --- HEADER CONTROL BAR --- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-2 bg-white border-b shrink-0 gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {view === 'list' ? (
            <>
              <button onClick={() => window.history.back()} className="bg-white border border-slate-300 px-4 py-1 rounded font-bold hover:bg-slate-50">
                Back
              </button>
              <button 
                onClick={handleNew}
                className="bg-[#714B67] text-white px-4 py-1 rounded font-bold text-[14px] hover:bg-[#5a3c52]"
              >
                New
              </button>
              <div className="flex items-center gap-1 text-[18px] text-slate-600 font-medium">
                <span>Customers</span>
                <Cog6ToothIcon className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-2">
                <button onClick={handleSave} className="bg-[#714B67] text-white px-4 py-1 rounded font-bold hover:bg-[#5a3c52]">
                  Save
                </button>
                <button onClick={handleDiscard} className="bg-white border border-slate-300 px-4 py-1 rounded font-bold hover:bg-slate-50">
                  Discard
                </button>
              </div>
              <div className="flex items-center gap-1 text-[18px] text-slate-500 font-medium ml-0 sm:ml-4">
                <span className="cursor-pointer hover:text-[#714B67]" onClick={handleDiscard}>Customers</span>
                <span className="text-slate-300 mx-1">/</span>
                <span className="text-slate-900 font-bold">{formData.name || 'New'}</span>
              </div>
            </>
          )}
        </div>

        {view === 'list' && (
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex items-center border-b border-slate-300 w-full sm:w-80 pb-0.5">
              <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 mr-2" />
              <input type="text" placeholder="Search..." className="outline-none w-full italic bg-transparent" />
              <ChevronDownIcon className="w-3 h-3 text-slate-400" />
            </div>
           
          </div>
        )}
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 overflow-y-auto bg-slate-50">
        {view === 'list' ? (
          customerList.length === 0 ? (
            /* EMPTY STATE */
            <div className="h-full flex flex-col items-center justify-center bg-white">
              <div className="w-40 h-40 bg-[#714B67]/5 rounded-full flex items-center justify-center mb-8">
                <div className="w-24 h-32 border-4 border-[#714B67]/20 rounded-lg bg-white flex flex-col p-3 gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#714B67]/10 self-center mb-2"></div>
                  <div className="w-full h-1 bg-slate-100"></div>
                  <div className="w-full h-1 bg-slate-100"></div>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Create a new customer in your address book</h2>
              {/* <p className="text-slate-500">Odoo helps you easily track all activities related to a customer.</p> */}
            </div>
          ) : (
            /* DATA TABLE VIEW */
            <div className="bg-white h-full px-2 sm:px-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-0 min-w-[600px]">
                  <thead>
                    <tr className="text-slate-900 font-bold border-b sticky top-0 bg-white">
                      <th className="py-3 border-b w-10"><input type="checkbox" /></th>
                      <th className="py-3 border-b">Name</th>
                      <th className="py-3 border-b hidden sm:table-cell">Email</th>
                      <th className="py-3 border-b hidden md:table-cell">Phone</th>
                      <th className="py-3 border-b hidden lg:table-cell">City</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerList.map((c) => (
                      <tr 
                        key={c.id} 
                        onClick={() => handleEdit(c)}
                        className="hover:bg-slate-50 border-b cursor-pointer group transition-colors"
                      >
                        <td className="py-3 border-b border-slate-100" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" />
                        </td>
                        <td className="py-3 border-b border-slate-100 font-medium text-slate-900 group-hover:text-[#714B67]">{c.name}</td>
                        <td className="py-3 border-b border-slate-100 text-blue-600 hidden sm:table-cell">{c.email}</td>
                        <td className="py-3 border-b border-slate-100 hidden md:table-cell">{c.phone}</td>
                        <td className="py-3 border-b border-slate-100 hidden lg:table-cell">{c.city}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        ) : (
          /* FORM VIEW */
          <div className="p-4 sm:p-6 lg:p-12">
            <div className="max-w-5xl mx-auto bg-white shadow-sm border rounded-sm p-4 sm:p-6 lg:p-10">
              <div className="flex flex-col lg:flex-row justify-between items-start mb-6 lg:mb-10 gap-6">
                <div className="flex-1 w-full">
                  <div className="flex gap-1 mb-6">
                    <button 
                      onClick={() => setFormData({...formData, isCompany: true})} 
                      className={`px-4 py-1 border text-[12px] font-bold rounded-l ${formData.isCompany ? 'bg-slate-800 text-white' : 'bg-white'}`}
                    >Company</button>
                    <button 
                      onClick={() => setFormData({...formData, isCompany: false})} 
                      className={`px-4 py-1 border text-[12px] font-bold rounded-r ${!formData.isCompany ? 'bg-slate-800 text-white' : 'bg-white'}`}
                    >Individual</button>
                  </div>
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Customer Name" 
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold w-full outline-none border-b border-transparent focus:border-teal-500 pb-2 placeholder:text-slate-200" 
                  />
                </div>
                <div className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-dashed border-slate-200 rounded flex flex-col items-center justify-center text-slate-300 cursor-pointer hover:border-slate-300 relative overflow-hidden shrink-0">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {formData.image ? (
                    <img src={formData.image} alt="Customer" className="w-full h-full object-cover rounded" />
                  ) : (
                    <>
                      <CloudArrowUpIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                      <span className="text-[9px] sm:text-[10px] mt-1 sm:mt-2 font-bold uppercase text-center px-1 sm:px-2">Upload Image</span>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-20 lg:gap-y-6">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase font-bold text-[#714B67]">Address</label>
                  <input placeholder="Street..." className="w-full border-b outline-none py-1 focus:border-teal-500" />
                  <input name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="w-full border-b outline-none py-1 focus:border-teal-500" />
                </div>
                <div className="space-y-4 pt-0 lg:pt-6">
                  <div className="flex items-center border-b py-1 group">
                    <PhoneIcon className="w-4 h-4 mr-3 text-slate-400 group-focus-within:text-teal-500" />
                    <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" className="w-full outline-none" />
                  </div>
                  <div className="flex items-center border-b py-1 group">
                    <EnvelopeIcon className="w-4 h-4 mr-3 text-slate-400 group-focus-within:text-teal-500" />
                    <input name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="w-full outline-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;