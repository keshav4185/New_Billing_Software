import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, TableCellsIcon, 
  XMarkIcon, Cog6ToothIcon, 
  ChevronDownIcon, FunnelIcon, ListBulletIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

const salesdashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [quotations] = useState([
    { id: 'S00006', date: '18 Dec, 12:17 pm', customer: 'Keshav', salesperson: 'Keshav', total: 20.00, status: 'Quotation' },
    { id: 'S00005', date: '18 Dec, 12:15 pm', customer: 'Keshav', salesperson: 'Keshav', total: 0.00, status: 'Sales Order' },
    { id: 'S00004', date: '18 Dec, 11:57 am', customer: 'Keshav', salesperson: 'Keshav', total: 32.00, status: 'Sales Order' },
    { id: 'S00001', date: '18 Dec, 11:02 am', customer: 'Keshav', salesperson: 'Keshav', total: 736.00, status: 'Sales Order' },
  ]);

  const filteredData = useMemo(() => {
    return quotations.filter(q => 
      q.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, quotations]);

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-[13px] text-slate-700 overflow-hidden">
      
      {/* --- MAIN NAVBAR --- */}
      <nav className="bg-[#714B67] text-white flex items-center justify-between px-2 md:px-4 h-10 shrink-0">
        <div className="flex items-center h-full">
          <div className="p-2 hover:bg-black/10 cursor-pointer mr-1 md:mr-2">
            <div className="grid grid-cols-3 gap-0.5 w-4">
              {[...Array(9)].map((_, i) => <div key={i} className="w-1 h-1 bg-white rounded-sm" />)}
            </div>
          </div>
          <div className="font-bold px-1 md:px-3 text-[14px] md:text-[15px]">Sales</div>
          
          {/* Desktop Menu - Hidden on Mobile */}
          <div className="hidden lg:flex h-full items-center text-[13px]">
            {['Orders', 'To Invoice', 'Products', 'Reporting', 'Configuration'].map((item) => (
              <div key={item} className="px-3 h-full flex items-center hover:bg-black/10 cursor-pointer group relative">
                {item} <ChevronDownIcon className="w-3 h-3 ml-1 opacity-50" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
           <div className="hidden sm:block bg-red-600 px-2 py-0.5 rounded text-[10px] font-bold">Pending Activation</div>
           <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center font-bold text-[10px]">K</div>
           {/* Mobile Menu Icon */}
           <Bars3Icon 
             className="w-5 h-5 lg:hidden cursor-pointer" 
             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
           />
        </div>
      </nav>
      
      {/* Mobile Menu Dropdown - Outside navbar */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#714B67] border-b border-white/20 absolute top-10 left-0 right-0 z-50">
          {['Orders', 'To Invoice', 'Products', 'Reporting', 'Configuration'].map((item) => (
            <div key={item} className="px-4 py-3 text-white hover:bg-black/10 cursor-pointer border-b border-white/10 last:border-b-0">
              {item}
            </div>
          ))}
        </div>
      )}

      {/* --- CONTROL BAR --- */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-4 py-2 bg-white border-b shrink-0 gap-3 md:gap-0">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => navigate('/snewpage')} 
            className="bg-[#714B67] text-white px-4 py-1 rounded font-bold text-[14px] hover:bg-[#5a3c52] transition-colors shrink-0"
          >
            New
          </button>
          
          <div className="flex items-center gap-1 text-[16px] md:text-[18px] text-slate-600 truncate">
            <span className="font-medium">Quotations</span>
            <Cog6ToothIcon className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
          </div>
        </div>

        {/* SEARCH BAR & VIEW SWITCHER */}
        <div className="flex flex-row items-center gap-2 md:gap-4 w-full md:w-auto">
          <div className="relative flex items-center border-b border-slate-300 flex-1 md:w-64 lg:w-80 pb-0.5 group">
            <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <div className="hidden sm:flex bg-slate-100 px-2 py-0.5 rounded text-[11px] items-center gap-1 border border-slate-200 shrink-0">
              <FunnelIcon className="w-3 h-3 text-[#714B67]" /> <XMarkIcon className="w-3 h-3 cursor-pointer" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..." 
              className="ml-2 outline-none w-full italic text-slate-700 bg-transparent min-w-[50px]" 
            />
            {searchQuery && (
              <XMarkIcon 
                onClick={() => setSearchQuery('')} 
                className="w-4 h-4 cursor-pointer text-slate-400 hover:text-slate-600 shrink-0" 
              />
            )}
          </div>
          
          <div className="flex items-center gap-2 md:gap-3 text-slate-500 border-l pl-2 md:pl-4">
            <span className="text-[11px] whitespace-nowrap">{filteredData.length} / {quotations.length}</span>
            <div className="flex gap-1">
              <ListBulletIcon className="w-5 h-5 p-1 rounded cursor-pointer bg-slate-200" />
              <TableCellsIcon className="w-5 h-5 p-1 cursor-pointer hover:bg-slate-100 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto px-4">
          {/* min-w-max ensures the table doesn't squish; parent overflow-auto allows scrolling */}
          <table className="w-full min-w-[700px] text-left border-separate border-spacing-0">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="text-slate-900 font-bold border-b">
                <th className="py-2 w-10"><input type="checkbox" className="rounded border-gray-300" /></th>
                <th className="py-2 border-b">Number</th>
                <th className="py-2 border-b">Creation Date</th>
                <th className="py-2 border-b">Customer</th>
                <th className="py-2 border-b text-right pr-4">Total</th>
                <th className="py-2 border-b pl-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50 cursor-pointer border-b group transition-colors">
                  <td className="py-2 border-b border-slate-100"><input type="checkbox" className="rounded border-gray-300" /></td>
                  <td className="py-2 border-b border-slate-100 font-bold text-slate-900">{q.id}</td>
                  <td className="py-2 border-b border-slate-100">{q.date}</td>
                  <td className="py-2 border-b border-slate-100">{q.customer}</td>
                  <td className="py-2 border-b border-slate-100 text-right pr-4 font-medium">₹ {q.total.toFixed(2)}</td>
                  <td className="py-2 border-b border-slate-100 pl-4">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold text-white ${q.status === 'Quotation' ? 'bg-teal-500' : 'bg-green-600'}`}>
                      {q.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredData.length === 0 && (
            <div className="text-center py-10 text-slate-400 italic">No results found for "{searchQuery}"</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default salesdashboard;