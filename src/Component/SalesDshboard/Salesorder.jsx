import React, { useState, useRef, useEffect } from 'react';
import { 
  XMarkIcon, Cog6ToothIcon, CloudArrowUpIcon, 
  ChevronDownIcon, TrashIcon, Bars3Icon, 
  ExclamationCircleIcon, MagnifyingGlassIcon,
  FunnelIcon, ListBulletIcon, ChartBarIcon,
  CalendarDaysIcon, TableCellsIcon
} from '@heroicons/react/24/outline';

const Salesorder = () => {
  const [view, setView] = useState('list');
  const [searchQuery, setSearchQuery] = useState(''); // Search state
  const [customer, setCustomer] = useState('');
  
  // List Data
  const [quotations, setQuotations] = useState([
    { id: 'S00006', date: '18 Dec, 12:17 pm', customer: 'Keshav', salesperson: 'Keshav', total: 20.00, status: 'Quotation' },
    { id: 'S00005', date: '18 Dec, 12:15 pm', customer: 'Keshav', salesperson: 'Keshav', total: 0.00, status: 'Sales Order' },
    { id: 'S00004', date: '18 Dec, 11:57 am', customer: 'Keshav', salesperson: 'Keshav', total: 32.00, status: 'Sales Order' },
    { id: 'S00003', date: '18 Dec, 11:53 am', customer: 'ewfw', salesperson: 'Keshav', total: 23.00, status: 'Sales Order' },
    { id: 'S00002', date: '18 Dec, 11:08 am', customer: 'cdsscom.odoo.com', salesperson: 'Keshav', total: 602.00, status: 'Sales Order' },
    { id: 'S00001', date: '18 Dec, 11:02 am', customer: 'Keshav', salesperson: 'Keshav', total: 736.00, status: 'Sales Order' },
  ]);

  // Search/Filter Logic
  const filteredQuotations = quotations.filter(q => 
    q.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
    q.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate dynamic total for the filtered list
  const totalSum = filteredQuotations.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-[13px] text-slate-700 overflow-hidden">
      
      {/* SEARCH/NAV BAR */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => {setCustomer(''); setView('form')}} className="bg-[#714B67] text-white px-4 py-1 rounded font-bold text-[14px]">New</button>
          <div className="flex items-center gap-1 text-[18px] text-slate-600">
            <span className="cursor-pointer hover:underline" onClick={() => setView('list')}>Quotations</span>
            <Cog6ToothIcon className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex items-center border-b border-slate-300 w-80 pb-0.5 group">
            <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 mr-2" />
            <div className="bg-slate-100 px-2 py-0.5 rounded text-[11px] flex items-center gap-1 border border-slate-200 whitespace-nowrap">
              <FunnelIcon className="w-3 h-3 text-[#714B67]" />
              My Quotations
              <XMarkIcon className="w-3 h-3 cursor-pointer" />
            </div>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ml-2 outline-none w-full italic text-slate-700 placeholder:text-slate-300 bg-transparent" 
            />
            {searchQuery && (
              <XMarkIcon onClick={() => setSearchQuery('')} className="w-3 h-3 cursor-pointer text-slate-400 hover:text-slate-600 mr-1" />
            )}
            <ChevronDownIcon className="w-3 h-3 ml-auto text-slate-400" />
          </div>
          
          <div className="flex items-center gap-3 text-slate-500 border-l pl-4">
            <span className="text-[12px]">{filteredQuotations.length}-{filteredQuotations.length} / {filteredQuotations.length}</span>
            <div className="flex gap-1">
              <ListBulletIcon className={`w-5 h-5 p-1 rounded ${view === 'list' ? 'bg-slate-200 text-slate-900' : ''}`} />
              <TableCellsIcon className="w-5 h-5 p-1" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {view === 'list' ? (
          <div className="h-full overflow-y-auto bg-white px-4">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr className="text-slate-900 font-bold border-b border-slate-300 sticky top-0 bg-white z-10">
                  <th className="py-2 w-10"><input type="checkbox" /></th>
                  <th className="py-2 border-b">Number</th>
                  <th className="py-2 border-b">Creation Date</th>
                  <th className="py-2 border-b">Customer</th>
                  <th className="py-2 border-b">Salesperson</th>
                  <th className="py-2 border-b text-right">Total</th>
                  <th className="py-2 border-b pl-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotations.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50 border-b border-slate-100 group cursor-pointer" onClick={() => {setCustomer(q.customer); setView('form');}}>
                    <td className="py-2 border-b border-slate-100"><input type="checkbox" /></td>
                    <td className="py-2 border-b border-slate-100 font-bold text-slate-900">{q.id}</td>
                    <td className="py-2 border-b border-slate-100">{q.date}</td>
                    <td className="py-2 border-b border-slate-100">{q.customer}</td>
                    <td className="py-2 border-b border-slate-100 flex items-center gap-2">
                      <div className="w-5 h-5 bg-blue-700 text-white rounded-sm flex items-center justify-center text-[9px] font-bold">K</div>
                      {q.salesperson}
                    </td>
                    <td className="py-2 border-b border-slate-100 text-right font-medium">₹ {q.total.toFixed(2)}</td>
                    <td className="py-2 border-b border-slate-100 pl-4">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold text-white ${q.status === 'Quotation' ? 'bg-teal-500' : 'bg-green-600'}`}>
                        {q.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredQuotations.length === 0 && (
                  <tr>
                    <td colSpan="7" className="py-10 text-center text-slate-400 italic">No records found matching your search.</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50/50 font-bold">
                  <td colSpan="5"></td>
                  <td className="py-2 text-right border-t-2 border-slate-900 text-slate-900">₹ {totalSum.toLocaleString()}</td>
                  <td className="border-t-2 border-slate-900"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          /* FORM VIEW */
          <div className="p-8">
            <h1 className="text-3xl font-medium mb-6">{customer || 'New'}</h1>
            <button onClick={() => setView('list')} className="text-teal-600 hover:underline">← Back to List</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Salesorder;