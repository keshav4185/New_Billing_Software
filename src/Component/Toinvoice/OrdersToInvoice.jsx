import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeftIcon, MagnifyingGlassIcon, 
  ChevronDownIcon, Cog6ToothIcon,
  ListBulletIcon, Squares2X2Icon,
  CalendarDaysIcon, ChartBarIcon,
  XMarkIcon, ChevronRightIcon,
  MapPinIcon, ClockIcon,
  TableCellsIcon
} from '@heroicons/react/24/outline';

const OrdersToInvoice = () => {
  const navigate = useNavigate();
  
  // Data matching the "To Invoice" filtered view
  const [orders] = useState([
    { id: 'S00069', date: 'Dec 19, 6:42 AM', customer: 'Deco Addict', salesperson: 'Mitchell Admin', total: '273,654.00', status: 'To Invoice' },
    { id: 'S00065', date: 'Dec 19, 6:42 AM', customer: 'Deco Addict', salesperson: 'Mitchell Admin', total: '1,086.75', status: 'To Invoice' },
    { id: 'S00064', date: 'Dec 19, 6:41 AM', customer: 'Deco Addict', salesperson: 'Mitchell Admin', total: '1,397.25', status: 'To Invoice' },
    { id: 'S00063', date: 'Dec 19, 6:41 AM', customer: 'Deco Addict', salesperson: 'Mitchell Admin', total: '51,750.00', status: 'To Invoice' },
    { id: 'S00062', date: 'Dec 19, 6:41 AM', customer: 'Deco Addict', salesperson: 'Mitchell Admin', total: '15,525.00', status: 'To Invoice' },
    { id: 'S00061', date: 'Dec 19, 6:41 AM', customer: 'Gemini Furniture', salesperson: 'Marc Demo', total: '11,025.00', status: 'To Invoice' },
  ]);

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-[13px] text-slate-700 overflow-hidden">
      
      {/* --- TOP NAVBAR (Removed Orders & Products) --- */}
      <nav className="bg-[#714B67] text-white flex items-center justify-between px-4 h-10 shrink-0">
        <div className="flex items-center h-full">
          <div className="p-2 hover:bg-black/10 cursor-pointer mr-2">
            <div className="grid grid-cols-3 gap-0.5 w-4">
              {[...Array(9)].map((_, i) => <div key={i} className="w-1 h-1 bg-white rounded-sm" />)}
            </div>
          </div>
          <div className="font-bold px-3 text-[15px] cursor-pointer" onClick={() => navigate('/sdashboardpage')}>Sales</div>
          <div className="hidden md:flex h-full items-center">
            {/* Kept only the active "To Invoice" section */}
            <div className="px-3 h-full flex items-center bg-black/20 font-semibold border-b-2 border-white/30 cursor-pointer">
              To Invoice <ChevronDownIcon className="w-3 h-3 ml-1 opacity-50" />
            </div>
          </div>
        </div>
      </nav>

      {/* --- CONTROL BAR (Removed New Button) --- */}
      <div className="flex items-center justify-between px-4 py-2 border-b shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[18px] font-medium text-slate-600">
            {/* BACK BUTTON */}
            <button onClick={() => navigate(-1)} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
              <ChevronLeftIcon className="w-5 h-5"/>
            </button>
            <span>Orders to Invoice</span>
            <Cog6ToothIcon className="w-4 h-4 text-slate-400 cursor-pointer" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* SEARCH BAR */}
          <div className="relative flex items-center border-b border-slate-300 w-80 pb-0.5">
            <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 mr-2" />
            {/* <div className="bg-slate-100 px-2 py-0.5 rounded text-[11px] flex items-center gap-1 text-[#714B67] border border-slate-200">
              Sales Orders <XMarkIcon className="w-3 h-3 cursor-pointer" />
            </div> */}
            <input type="text" placeholder="Search..." className="outline-none ml-2 w-full italic bg-transparent" />
            <ChevronDownIcon className="w-3 h-3 text-slate-400" />
          </div>
          
          {/* VIEW SWITCHER */}
          {/* <div className="flex items-center border rounded overflow-hidden shadow-sm">
            <button className="p-1.5 bg-slate-100 text-[#714B67] border-r"><ListBulletIcon className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-slate-50 text-slate-400 border-r"><Squares2X2Icon className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-slate-50 text-slate-400 border-r"><CalendarDaysIcon className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-slate-50 text-slate-400 border-r"><TableCellsIcon className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-slate-50 text-slate-400 border-r"><ChartBarIcon className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-slate-50 text-slate-400 border-r"><MapPinIcon className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-slate-50 text-slate-400"><ClockIcon className="w-4 h-4" /></button>
          </div> */}
        </div>
      </div>

      {/* --- TABLE CONTENT --- */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-slate-50 border-b text-slate-800 font-semibold z-10 text-[12px]">
            <tr>
              <th className="px-4 py-2 w-10"><input type="checkbox" className="rounded border-slate-300" /></th>
              <th className="px-4 py-2">Number</th>
              <th className="px-4 py-2">Order Date</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Salesperson</th>
              <th className="px-4 py-2 text-right">Total</th>
              <th className="px-4 py-2">Invoice Status</th>
            </tr>
          </thead>
          <tbody className="divide-y text-[13px]">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                <td className="px-4 py-2"><input type="checkbox" className="rounded border-slate-300" /></td>
                <td className="px-4 py-2 font-bold text-slate-900">{order.id}</td>
                <td className="px-4 py-2 text-slate-500">{order.date}</td>
                <td className="px-4 py-2">{order.customer}</td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <div className="w-5 h-5 bg-[#714B67] rounded flex items-center justify-center text-[10px] text-white font-bold">
                    {order.salesperson.charAt(0)}
                  </div>
                  {order.salesperson}
                </td>
                <td className="px-4 py-2 text-right font-semibold text-[#00A09D]">
                  ₹ {order.total}
                </td>
                <td className="px-4 py-2">
                  {/* TEAL STATUS BADGE */}
                  <span className="bg-[#00A09D] text-white px-3 py-0.5 rounded-full text-[11px] font-bold">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* FOOTER PAGINATION */}
      <div className="px-4 py-1 border-t flex justify-end items-center gap-4 text-slate-500 text-[12px] bg-white">
        <span>1-{orders.length} / {orders.length}</span>
        <div className="flex border rounded h-7">
          <button className="px-2 border-r hover:bg-slate-50 opacity-50"><ChevronLeftIcon className="w-4 h-4"/></button>
          <button className="px-2 hover:bg-slate-50 opacity-50"><ChevronRightIcon className="w-4 h-4"/></button>
        </div>
      </div>
    </div>
  );
};

export default OrdersToInvoice;