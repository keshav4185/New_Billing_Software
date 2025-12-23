import React, { useState, useMemo } from 'react';
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
  
  const [quotations] = useState([
    { id: 'S00006', date: '18 Dec, 12:17 pm', customer: 'Keshav', salesperson: 'Keshav', total: 20.00, status: 'Quotation' },
    { id: 'S00005', date: '18 Dec, 12:15 pm', customer: 'Keshav', salesperson: 'Keshav', total: 0.00, status: 'Sales Order' },
    { id: 'S00004', date: '18 Dec, 11:57 am', customer: 'Keshav', salesperson: 'Keshav', total: 32.00, status: 'Sales Order' },
    { id: 'S00001', date: '18 Dec, 11:02 am', customer: 'Keshav', salesperson: 'Keshav', total: 736.00, status: 'Sales Order' },
  ]);

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
                className="px-3 h-full flex items-center hover:bg-black/10 cursor-pointer"
                onClick={() => item === 'Products' && navigate('/productpage')}
              >
                {item} <ChevronDownIcon className="w-3 h-3 ml-1 opacity-50" />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:hidden flex items-center">
           <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
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
            <div className="font-semibold">Reporting</div>
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
          
          <div className="flex items-center gap-1 text-[16px] md:text-[18px] text-slate-600">
            <span className="font-medium">Quotations</span>
            <Cog6ToothIcon className="w-4 h-4 text-slate-400 cursor-pointer" />
          </div>
        </div>

        {/* --- SEARCH FILTER SECTION --- */}
        <div className="flex flex-row items-center gap-2 md:gap-4 w-full sm:w-auto justify-between">
          <div className="relative flex items-center border-b border-slate-300 flex-1 sm:w-64 md:w-80 pb-0.5 group">
            <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or ID..." 
              className="outline-none w-full italic text-slate-700 bg-transparent text-[13px]" 
            />
            {/* Added Clear Button for UX */}
            {searchQuery && (
              <XMarkIcon 
                className="w-4 h-4 text-slate-300 cursor-pointer hover:text-slate-500" 
                onClick={() => setSearchQuery('')}
              />
            )}
          </div>
          
          {/* <div className="flex items-center gap-2 md:gap-3 text-slate-500 border-l pl-2 md:pl-4 shrink-0">
            <span className="text-[11px] whitespace-nowrap">{filteredData.length} / {quotations.length}</span>
            <div className="flex gap-1">
              <ListBulletIcon className="w-7 h-7 p-1.5 rounded cursor-pointer bg-slate-200" />
              <TableCellsIcon className="w-7 h-7 p-1.5 cursor-pointer hover:bg-slate-100 rounded text-slate-400" />
            </div>
          </div> */}
        </div>
      </div>

      {/* --- TABLE CONTENT --- */}
      <div className="flex-1 overflow-auto">
        <div className="px-4 min-w-max sm:min-w-full">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_0_rgba(226,232,240,1)]">
              <tr className="text-slate-900 font-bold border-b text-[11px] uppercase tracking-wider">
                <th className="py-3 w-10 px-2"><input type="checkbox" className="rounded border-gray-300" /></th>
                <th className="py-3 px-2">Number</th>
                <th className="py-3 px-2">Creation Date</th>
                <th className="py-3 px-2">Customer</th>
                <th className="py-3 px-2 text-right pr-4">Total</th>
                <th className="py-3 px-2 pl-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((q) => (
                  <tr 
                    key={q.id} 
                    className="hover:bg-slate-50 cursor-pointer border-b group transition-colors text-[13px]"
                    onClick={() => navigate('/snewpage', { state: { order: q } })}
                  >
                    <td className="py-3 px-2 border-b border-slate-100" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="py-3 px-2 border-b border-slate-100 font-bold text-slate-900">{q.id}</td>
                    <td className="py-3 px-2 border-b border-slate-100 text-slate-500 whitespace-nowrap">{q.date}</td>
                    <td className="py-3 px-2 border-b border-slate-100">{q.customer}</td>
                    <td className="py-3 px-2 border-b border-slate-100 text-right pr-4 font-medium text-blue-600">₹ {q.total.toFixed(2)}</td>
                    <td className="py-3 px-2 border-b border-slate-100 pl-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase whitespace-nowrap ${q.status === 'Quotation' ? 'bg-teal-500' : 'bg-[#714B67]'}`}>
                        {q.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-slate-400 italic">
                    No results found for "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;  