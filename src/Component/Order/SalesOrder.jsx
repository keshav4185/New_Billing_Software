import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeftIcon, MagnifyingGlassIcon, 
  FunnelIcon, XMarkIcon, ChevronDownIcon,
  ListBulletIcon, TableCellsIcon, Cog6ToothIcon,
  CalendarIcon, ChartBarIcon, MapPinIcon, ClockIcon
} from '@heroicons/react/24/outline';

const SalesOrder = () => {
  const navigate = useNavigate();

  // Mock data based on image_5874ab.png
  const orders = [
    { id: 'S00069', date: 'Dec 19, 6:42 AM', customer: 'Deco Addict', salesperson: 'Mitchell Admin', total: '273,654.00', status: 'To Invoice' },
    { id: 'S00065', date: 'Dec 19, 6:42 AM', customer: 'Deco Addict', salesperson: 'Mitchell Admin', total: '1,086.75', status: 'To Invoice' },
    { id: 'S00064', date: 'Dec 19, 6:41 AM', customer: 'Deco Addict', salesperson: 'Mitchell Admin', total: '1,397.25', status: 'To Invoice' },
    { id: 'S00061', date: 'Dec 19, 6:41 AM', customer: 'Gemini Furniture', salesperson: 'Marc Demo', total: '11,025.00', status: 'To Invoice' },
  ];

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-[13px] text-slate-700 overflow-hidden">
      {/* CONTROL BAR */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b shrink-0">
        <div className="flex items-center gap-3">
          <button className="bg-[#714B67] text-white px-4 py-1 rounded font-bold text-[14px]">New</button>
          <div className="flex items-center gap-1 text-[18px] text-slate-600 font-medium">
            <button onClick={() => navigate(-1)} className="p-1 hover:bg-slate-100 rounded-full mr-1">
              <ChevronLeftIcon className="w-5 h-5 text-slate-500" />
            </button>
            <span>Sales Orders</span>
            <Cog6ToothIcon className="w-4 h-4 text-slate-400 cursor-pointer ml-1" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex items-center border-b border-slate-300 w-80 pb-0.5">
            <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 mr-2" />
            <div className="bg-slate-100 px-2 py-0.5 rounded text-[11px] flex items-center gap-1 border border-slate-200 whitespace-nowrap text-slate-600">
              <FunnelIcon className="w-3 h-3 text-[#714B67]" />
              Sales Orders
              <XMarkIcon className="w-3 h-3 cursor-pointer" />
            </div>
            <input type="text" placeholder="Search..." className="ml-2 outline-none w-full italic bg-transparent" />
            <ChevronDownIcon className="w-3 h-3 text-slate-400" />
          </div>
          
          <div className="flex items-center gap-2 border-l pl-4">
             <ListBulletIcon className="w-5 h-5 p-1 rounded bg-slate-200 text-slate-900" />
             <ChartBarIcon className="w-5 h-5 p-1 cursor-pointer hover:bg-slate-100 rounded text-slate-400" />
             <CalendarIcon className="w-5 h-5 p-1 cursor-pointer hover:bg-slate-100 rounded text-slate-400" />
          </div>
        </div>
      </div>

      {/* TABLE AREA */}
      <div className="flex-1 overflow-auto px-4">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="text-slate-900 font-bold border-b sticky top-0 bg-white z-10 uppercase text-[11px]">
              <th className="py-2 w-10 border-b"><input type="checkbox" className="rounded border-slate-300" /></th>
              <th className="py-2 border-b">Number</th>
              <th className="py-2 border-b">Order Date</th>
              <th className="py-2 border-b">Customer</th>
              <th className="py-2 border-b">Salesperson</th>
              <th className="py-2 border-b text-right">Total</th>
              <th className="py-2 border-b text-center">Invoice Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 border-b group cursor-pointer transition-colors">
                <td className="py-3 border-b border-slate-100"><input type="checkbox" className="rounded border-slate-300" /></td>
                <td className="py-3 border-b border-slate-100 font-bold text-slate-900">{order.id}</td>
                <td className="py-3 border-b border-slate-100">{order.date}</td>
                <td className="py-3 border-b border-slate-100">{order.customer}</td>
                <td className="py-3 border-b border-slate-100 flex items-center gap-2">
                  <img src={`https://ui-avatars.com/api/?name=${order.salesperson}&background=random`} className="w-5 h-5 rounded" alt="" />
                  {order.salesperson}
                </td>
                <td className="py-3 border-b border-slate-100 text-right text-blue-600 font-medium">$ {order.total}</td>
                <td className="py-3 border-b border-slate-100 text-center">
                  <span className="bg-teal-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesOrder;