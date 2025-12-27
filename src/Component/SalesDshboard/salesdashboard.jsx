import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, TableCellsIcon, 
  Cog6ToothIcon, ChevronDownIcon, 
  ListBulletIcon, Bars3Icon, XMarkIcon
} from '@heroicons/react/24/outline';

const SalesDashboard = () => {
  const navigate = useNavigate(); 
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ordersDropdownOpen, setOrdersDropdownOpen] = useState(false);
  const [invoiceDropdownOpen, setInvoiceDropdownOpen] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [reportingDropdownOpen, setReportingDropdownOpen] = useState(false);
  
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    const savedName = localStorage.getItem('userName') || 'User';
    setUserName(savedName);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userFirstName');
    localStorage.removeItem('isSignedIn');
    localStorage.removeItem('userEmail');
    navigate('/signin');
  };

  const deleteQuotation = (id) => {
    const updatedQuotations = quotations.filter(q => q.id !== id);
    setQuotations(updatedQuotations);
    localStorage.setItem('quotations', JSON.stringify(updatedQuotations));
  };

  useEffect(() => {
    const savedQuotations = JSON.parse(localStorage.getItem('quotations') || '[]');
    setQuotations(savedQuotations);
  }, []);

  // Updated Filter logic to handle name and ID simultaneously
  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return quotations;

    return quotations.filter(q => 
      q.customer.toLowerCase().includes(query) || 
      q.id.toLowerCase().includes(query)
    );
  }, [searchQuery, quotations]);

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-[13px] text-slate-700 overflow-hidden">
      
      {/* --- MAIN NAVBAR --- */}
      <nav className="bg-[#714B67] text-white flex items-center justify-between px-2 md:px-4 h-10 shrink-0 relative z-[60]">
        <div className="flex items-center h-full">
          <div className="p-2 hover:bg-black/10 cursor-pointer mr-1 md:mr-2">
            <div className="grid grid-cols-3 gap-0.5 w-4">
              {[...Array(9)].map((_, i) => <div key={i} className="w-1 h-1 bg-white rounded-sm" />)}
            </div>
          </div>
          <div className="font-bold px-1 md:px-3 text-[14px] md:text-[15px] cursor-pointer" onClick={() => navigate('/')}>
            Sales
          </div>
          
          <div className="hidden lg:flex h-full items-center text-[13px]">
            <div   
              className="px-3 h-full flex items-center hover:bg-black/10 cursor-pointer relative"
              onMouseEnter={() => setOrdersDropdownOpen(true)}
              onMouseLeave={() => setOrdersDropdownOpen(false)}
            >
              Orders <ChevronDownIcon className="w-3 h-3 ml-1 opacity-50" />
              {ordersDropdownOpen && (
                <div className="absolute top-10 left-0 w-48 bg-white border border-slate-200 shadow-lg py-1 z-50 text-slate-700">
                  <div className="px-4 py-2 hover:bg-slate-100" onClick={() => navigate('/snewpage')}>Quotations</div>
                  <div className="px-4 py-2 hover:bg-slate-100" onClick={() => navigate('/sorderpage')}>Orders</div>
                  <div className="px-4 py-2 hover:bg-slate-100" onClick={() => navigate('/salesteampage')}>Sales Teams</div>
                  <div className="px-4 py-2 hover:bg-slate-100" onClick={() => navigate('/scustomerpage')}>Customers</div>
                </div>
              )}
            </div>

            <div 
              className="px-3 h-full flex items-center hover:bg-black/10 cursor-pointer relative"
              onMouseEnter={() => setInvoiceDropdownOpen(true)}
              onMouseLeave={() => setInvoiceDropdownOpen(false)}
            >
              To Invoice <ChevronDownIcon className="w-3 h-3 ml-1 opacity-50" />
              {invoiceDropdownOpen && (
                <div className="absolute top-10 left-0 w-56 bg-white border border-slate-200 shadow-lg py-1 z-50 text-slate-700">
                  <div className="px-4 py-2 hover:bg-slate-100" onClick={() => navigate('/toinvoicepage')}>Orders to Invoice</div>
                </div>
              )}
            </div>

            {['Products', 'Reporting', 'Configuration'].map((item) => (
              <div 
                key={item} 
                className="px-3 h-full flex items-center hover:bg-black/10 cursor-pointer relative"
                onMouseEnter={() => item === 'Reporting' && setReportingDropdownOpen(true)}
                onMouseLeave={() => item === 'Reporting' && setReportingDropdownOpen(false)}
                onClick={() => item === 'Products' && navigate('/productpage')}
              >
                {item} <ChevronDownIcon className="w-3 h-3 ml-1 opacity-50" />
                {item === 'Reporting' && reportingDropdownOpen && (
                  <div className="absolute top-10 left-0 w-48 bg-white border border-slate-200 shadow-lg py-1 z-50 text-slate-700">
                    <div 
                      className="px-4 py-2 hover:bg-slate-100 cursor-pointer" 
                      onClick={(e) => { e.stopPropagation(); navigate('/salespage'); }}
                    >
                      Sales
                    </div>
                    <div 
                      className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                      onClick={(e) => { e.stopPropagation(); navigate('/salespersons'); }}
                    >
                      Salespersons
                    </div>
                    <div 
                      className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                      onClick={(e) => { e.stopPropagation(); navigate('/product-report'); }}
                    >
                      Products
                    </div>
                    <div 
                      className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                      onClick={(e) => { e.stopPropagation(); navigate('/customer-report'); }}
                    >
                      Customers
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <div className="relative">
            <div 
              className="flex items-center space-x-2 cursor-pointer hover:bg-black/10 p-2 rounded"
              onClick={() => setShowUserDropdown(!showUserDropdown)}
            >
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#714B67] font-bold text-xs">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm hidden md:block">{userName}</span>
              <ChevronDownIcon className="w-3 h-3 opacity-50" />
            </div>
            {showUserDropdown && (
              <div className="absolute right-0 top-10 w-48 bg-white border border-slate-200 shadow-lg py-1 z-50 text-slate-700">
                <button 
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 hover:bg-slate-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
          
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 lg:hidden ml-2">
            {mobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-10 bg-white z-[55] overflow-y-auto p-4 flex flex-col gap-4">
          <div className="font-bold border-b pb-2 text-[#714B67]">Menu</div>
          <div className="flex flex-col gap-3 text-slate-700 text-[15px]">
            <div className="font-semibold">Orders</div>
            <div className="pl-4 flex flex-col gap-2 border-l-2 ml-1">
              <span onClick={() => navigate('/snewpage')}>Quotations</span>
              <span onClick={() => navigate('/sorderpage')}>Orders</span>
              <span onClick={() => navigate('/scustomerpage')}>Customers</span>
            </div>
            <div className="font-semibold pt-2">To Invoice</div>
            <div className="pl-4 flex flex-col gap-2 border-l-2 ml-1">
              <span onClick={() => navigate('/toinvoicepage')}>Orders to Invoice</span>
            </div>
            <div className="font-semibold pt-2" onClick={() => navigate('/productpage')}>Products</div>
            <div className="font-semibold pt-2">Reporting</div>
            <div className="pl-4 flex flex-col gap-2 border-l-2 ml-1">
              <span onClick={() => navigate('/sales')}>Sales</span>
              <span onClick={() => navigate('/salespersons')}>Salespersons</span>
              <span onClick={() => navigate('/product-report')}>Products</span>
              <span onClick={() => navigate('/customer-report')}>Customers</span>
            </div>
            <div className="font-semibold">Configuration</div>
          </div>
        </div>
      )}
      
      {/* --- CONTROL BAR --- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-2 bg-white border-b shrink-0 gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={() => navigate('/snewpage')}
            className="bg-[#714B67] text-white px-4 py-1.5 rounded font-bold text-[14px] hover:bg-[#5a3c52] transition-colors"
          >
            New
          </button>
          
          <div className="flex items-center gap-1 text-[18px] md:text-[20px] text-slate-600">
            <span className="font-medium">Quotations</span>
            <Cog6ToothIcon className="w-4 h-4 text-slate-400 cursor-pointer" />
          </div>
        </div>

        <div className="flex flex-row items-center gap-2 md:gap-4 w-full sm:w-auto justify-between">
          <div className="relative flex items-center border-b border-slate-300 flex-1 sm:w-64 md:w-80 pb-0.5 group">
            <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or ID..." 
              className="outline-none w-full italic text-slate-700 bg-transparent text-[14px]" 
            />
            {searchQuery && (
              <XMarkIcon 
                className="w-4 h-4 text-slate-300 cursor-pointer hover:text-slate-500" 
                onClick={() => setSearchQuery('')}
              />
            )}
          </div>
        </div>
      </div>

      {/* --- TABLE CONTENT --- */}
      <div className="flex-1 overflow-auto">
        <div className="px-4 min-w-max sm:min-w-full">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_0_rgba(226,232,240,1)]">
              <tr className="text-slate-900 font-bold border-b text-[12px] uppercase tracking-wider">
                <th className="py-3 w-10 px-2"><input type="checkbox" className="rounded border-gray-300" /></th>
                <th className="py-3 px-2">Number</th>
                <th className="py-3 px-2">Creation Date</th>
                <th className="py-3 px-2">Customer</th>
                <th className="py-3 px-2 text-right pr-4">Total</th>
                <th className="py-3 px-2 pl-4">Status</th>
                <th className="py-3 px-2 w-16">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((q) => (
                  <tr 
                    key={q.id} 
                    className="hover:bg-slate-50 cursor-pointer border-b group transition-colors text-[14px]"
                    onClick={() => {
                      setSelectedQuotation(q);
                      setShowModal(true);
                    }}
                  >
                    <td className="py-3 px-2 border-b border-slate-100" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="py-3 px-2 border-b border-slate-100 font-bold text-slate-900">{q.id}</td>
                    <td className="py-3 px-2 border-b border-slate-100 text-slate-500 whitespace-nowrap">{q.date}</td>
                    <td className="py-3 px-2 border-b border-slate-100">{q.customer}</td>
                    <td className="py-3 px-2 border-b border-slate-100 text-right pr-4 font-medium text-blue-600">₹ {q.total.toFixed(2)}</td>
                    <td className="py-3 px-2 border-b border-slate-100 pl-4">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold text-white uppercase whitespace-nowrap ${q.status === 'Quotation' ? 'bg-teal-500' : 'bg-[#714B67]'}`}>
                        {q.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 border-b border-slate-100" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => deleteQuotation(q.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-10 text-center text-slate-400 italic">
                    No results found for "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Data Info Modal */}
      {showModal && selectedQuotation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70] p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-slate-900">Quotation Details</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Quotation Number</label>
                  <p className="text-lg font-bold text-slate-900">{selectedQuotation.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Status</label>
                  <p>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white uppercase ${selectedQuotation.status === 'Quotation' ? 'bg-teal-500' : 'bg-[#714B67]'}`}>
                      {selectedQuotation.status}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Customer</label>
                  <p className="text-slate-900 font-medium">{selectedQuotation.customer}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Creation Date</label>
                  <p className="text-slate-900">{selectedQuotation.date}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Total Amount</label>
                  <p className="text-xl font-bold text-blue-600">₹ {selectedQuotation.total.toFixed(2)}</p>
                </div>
                {selectedQuotation.salesperson && (
                  <div>
                    <label className="text-sm font-medium text-slate-600">Salesperson</label>
                    <p className="text-slate-900">{selectedQuotation.salesperson}</p>
                  </div>
                )}
              </div>
              
              {selectedQuotation.items && selectedQuotation.items.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Items</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr className="text-left text-sm font-medium text-slate-600">
                          <th className="px-4 py-2">Product</th>
                          <th className="px-4 py-2">Quantity</th>
                          <th className="px-4 py-2">Unit Price</th>
                          <th className="px-4 py-2 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedQuotation.items.map((item, index) => (
                          <tr key={index} className="border-t text-sm">
                            <td className="px-4 py-2 font-medium">{item.product}</td>
                            <td className="px-4 py-2">{item.quantity}</td>
                            <td className="px-4 py-2">₹ {item.unitPrice.toFixed(2)}</td>
                            <td className="px-4 py-2 text-right font-medium">₹ {(item.quantity * item.unitPrice).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-slate-600 border border-slate-300 rounded hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesDashboard;