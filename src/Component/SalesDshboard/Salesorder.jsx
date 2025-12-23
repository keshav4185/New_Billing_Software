import React, { useState, useMemo } from 'react';
import { 
  XMarkIcon, Cog6ToothIcon, 
  ChevronDownIcon, MagnifyingGlassIcon,
  ChevronLeftIcon, ListBulletIcon, 
  TableCellsIcon, CalendarDaysIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const Salesorder = () => {
  const [view, setView] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [customer, setCustomer] = useState('');
  
  // List Data matching screenshot
  const [quotations] = useState([
    { id: 'S00006', date: '18 Dec, 12:17 pm', customer: 'Keshav', salesperson: 'Keshav', total: 20.00, status: 'Quotation' },
    { id: 'S00005', date: '18 Dec, 12:15 pm', customer: 'Keshav', salesperson: 'Keshav', total: 0.00, status: 'Sales Order' },
    { id: 'S00004', date: '18 Dec, 11:57 am', customer: 'Keshav', salesperson: 'Keshav', total: 32.00, status: 'Sales Order' },
    { id: 'S00003', date: '18 Dec, 11:53 am', customer: 'ewfw', salesperson: 'Keshav', total: 23.00, status: 'Sales Order' },
    { id: 'S00002', date: '18 Dec, 11:08 am', customer: 'cdsscom.odoo.com', salesperson: 'Keshav', total: 602.00, status: 'Sales Order' },
    { id: 'S00001', date: '18 Dec, 11:02 am', customer: 'Keshav', salesperson: 'Keshav', total: 736.00, status: 'Sales Order' },
  ]);

  const filteredQuotations = useMemo(() => {
    return quotations.filter(q => 
      q.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, quotations]);

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-[13px] text-slate-700 overflow-hidden">
      
      {/* --- TOP CONTROL BAR --- */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b shrink-0">
        <div className="flex items-center gap-3">
          {/* PURPLE NEW BUTTON */}
          <button 
            onClick={() => {setCustomer(''); setView('form')}} 
            className="bg-[#714B67] text-white px-3 py-1 rounded font-bold text-[14px] hover:bg-[#5a3c52]"
          >
            New
          </button>
         <a href="/sdashboardpage"> <button  className="bg-[#714B67] text-white px-3 py-1 rounded font-bold text-[14px] hover:bg-[#5a3c52]">back</button></a>
          <div className="flex items-center gap-2 text-[18px] text-[#4c6784]">
            {/* UI BACK BUTTON */}
            {view === 'form' && (
              <button 
                onClick={() => setView('list')} 
                className="p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
            )}
            <span 
              className={`font-medium ${view === 'form' ? 'cursor-pointer hover:underline text-slate-400' : ''}`}
              onClick={() => setView('list')}
            >
              Sales order
            </span>
            {view === 'form' && (
              <>
                <span className="text-slate-300 mx-0.5">/</span>
                <span className="font-medium text-slate-700">{customer || 'New'}</span>
              </>
            )}
            <Cog6ToothIcon className="w-4 h-4 text-slate-400 cursor-pointer" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* SEARCH BAR */}
          <div className="relative flex items-center border-b border-slate-300 w-80 pb-0.5 group">
            <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none w-full italic text-slate-700 placeholder:text-slate-300 bg-transparent" 
            />
            {searchQuery && (
              <XMarkIcon onClick={() => setSearchQuery('')} className="w-3 h-3 cursor-pointer text-slate-400 mr-1" />
            )}
            <ChevronDownIcon className="w-3 h-3 ml-auto text-slate-400" />
          </div>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 overflow-hidden">
        {view === 'list' ? (
          <div className="h-full overflow-y-auto bg-white px-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-900 font-bold border-b border-slate-300">
                  <th className="py-2 w-8 px-2"><input type="checkbox" className="rounded border-slate-300" /></th>
                  <th className="py-2">Number</th>
                  <th className="py-2">Creation Date</th>
                  <th className="py-2">Customer</th>
                  <th className="py-2">Salesperson</th>
                  <th className="py-2 text-right pr-4">Total</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {filteredQuotations.map((q) => (
                  <tr 
                    key={q.id} 
                    className="hover:bg-slate-50 border-b border-slate-100 group cursor-pointer" 
                    onClick={() => {setCustomer(q.customer); setView('form');}}
                  >
                    <td className="py-2 px-2" onClick={(e) => e.stopPropagation()}><input type="checkbox" className="rounded border-slate-300" /></td>
                    <td className="py-2 font-bold text-slate-900">{q.id}</td>
                    <td className="py-2 text-slate-500">{q.date}</td>
                    <td className="py-2 text-slate-600">{q.customer}</td>
                    <td className="py-2 flex items-center gap-2">
                      <div className="w-5 h-5 bg-[#2141eb] text-white rounded-[2px] flex items-center justify-center text-[10px] font-bold">
                        {q.salesperson.charAt(0)}
                      </div>
                      <span className="text-slate-600">{q.salesperson}</span>
                    </td>
                    <td className="py-2 text-right pr-4 text-slate-700">₹ {q.total.toFixed(2)}</td>
                    <td className="py-2">
                      <span className={`px-3 py-0.5 rounded-full text-[11px] font-bold text-white ${
                        q.status === 'Quotation' ? 'bg-[#27b9a5]' : 'bg-[#714B67]'
                      }`}>
                        {q.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* FORM VIEW */
          <div className="p-8 max-w-5xl">
            <div className="mb-4">
              <span className="text-[#e2574c] text-sm font-semibold">Sales order</span>
              <h1 className="text-4xl font-bold text-slate-800">{customer || 'New'}</h1>
            </div>
            <div className="bg-white border rounded-sm p-6 italic text-slate-500">
              Form detail view for {customer || 'new record'}...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Salesorder;