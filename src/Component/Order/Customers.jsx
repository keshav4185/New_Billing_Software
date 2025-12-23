import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, Cog6ToothIcon, 
  FunnelIcon, XMarkIcon, ChevronDownIcon,
  ListBulletIcon, TableCellsIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/outline';

const Customers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Data modeled after image_58daa7.png
  const [customerData] = useState([
    { id: 1, name: 'Deco Addict', email: 'info@agrolait.com', phone: '(603)-996-3829', country: 'United States', tags: ['pink-5', 'blue-5', 'purple-2', 'orange-15', 'gray-1'] },
    { id: 2, name: 'OpenWood', email: 'ErikNFrench@armyspy.com', phone: '+352 123 456 789', country: 'Liechtenstein', tags: ['pink-4', 'blue-1'] },
    { id: 3, name: 'Azure Interior', email: 'vauxoo@yourcompany.example.com', phone: '+58 212 681 0538', country: 'United States', tags: ['yellow-2', 'pink-3', 'blue-2', 'purple-2'] },
    { id: 4, name: 'LightsUp', email: 'lightsup@example.com', phone: '+372 123 1234', country: 'Montenegro', tags: ['pink-1'] },
  ]);

  const filteredCustomers = customerData.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper to render activity tags from image_58daa7.png
  const renderTag = (tag) => {
    const [color, value] = tag.split('-');
    const colorMap = {
      pink: 'bg-pink-200 text-pink-700',
      blue: 'bg-blue-200 text-blue-700',
      purple: 'bg-purple-200 text-purple-700',
      orange: 'bg-orange-200 text-orange-700',
      gray: 'bg-gray-200 text-gray-700',
      yellow: 'bg-yellow-200 text-yellow-700'
    };
    return (
      <span key={tag} className={`${colorMap[color]} px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5`}>
        {color === 'blue' ? '★' : color === 'pink' ? '✎' : ''} {value}
      </span>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-[13px] text-slate-700 overflow-hidden">
      
      {/* CONTROL BAR - Matches image_58daa7.png with added Back Button */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b shrink-0">
        <div className="flex items-center gap-3">
          {/* <button className="bg-[#714B67] text-white px-4 py-1 rounded font-bold text-[14px] hover:bg-[#5a3c52]">New</button> */}
          
          <div className="flex items-center gap-1 text-[18px] text-slate-600 font-medium">
            {/* Back Button added here */}
            <button 
              onClick={() => navigate(-1)} 
              className="p-1 hover:bg-slate-100 rounded-full transition-colors mr-1"
              title="Go Back"
            >
              <ChevronLeftIcon className="w-5 h-5 text-slate-500" />
            </button>
            <span>Customers</span>
            <Cog6ToothIcon className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex items-center border-b border-slate-300 w-80 pb-0.5 group">
            <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 mr-2" />
            {/* <div className="bg-slate-100 px-2 py-0.5 rounded text-[11px] flex items-center gap-1 border border-slate-200 whitespace-nowrap text-slate-600">
              <FunnelIcon className="w-3 h-3 text-[#714B67]" />
              Customer Invoices
              <XMarkIcon className="w-3 h-3 cursor-pointer hover:text-slate-800" />
            </div> */}
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ml-2 outline-none w-full italic text-slate-700 bg-transparent" 
            />
            <ChevronDownIcon className="w-3 h-3 text-slate-400" />
          </div>
          
          {/* <div className="flex items-center gap-3 text-slate-500 border-l pl-4">
            <div className="flex gap-1">
              <ListBulletIcon className="w-5 h-5 p-1 rounded bg-slate-200 text-slate-900" />
              <TableCellsIcon className="w-5 h-5 p-1 cursor-pointer hover:bg-slate-100 rounded" />
            </div>
          </div> */}
        </div>
      </div>

      {/* TABLE AREA - Matches image_58daa7.png */}
      <div className="flex-1 overflow-auto px-4">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="text-slate-900 font-bold border-b sticky top-0 bg-white z-10">
              <th className="py-2 w-10 border-b"><input type="checkbox" className="rounded border-slate-300" /></th>
              <th className="py-2 border-b">Name</th>
              <th className="py-2 border-b">Email</th>
              <th className="py-2 border-b">Phone</th>
              <th className="py-2 border-b">Activities</th>
              <th className="py-2 border-b">Country</th>
              <th className="py-2 border-b text-right pr-4"></th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50 border-b group cursor-pointer">
                <td className="py-3 border-b border-slate-100" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" className="rounded border-slate-300" />
                </td>
                <td className="py-3 border-b border-slate-100 flex items-center gap-2">
                  <img src={`https://ui-avatars.com/api/?name=${c.name}&background=random`} alt="" className="w-6 h-6 rounded" />
                  <span className="text-slate-900">{c.name}</span>
                </td>
                <td className="py-3 border-b border-slate-100 text-blue-600">{c.email}</td>
                <td className="py-3 border-b border-slate-100">{c.phone}</td>
                <td className="py-3 border-b border-slate-100">
                   <div className="w-5 h-5 border border-slate-300 rounded-full flex items-center justify-center">
                     <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
                   </div>
                </td>
                <td className="py-3 border-b border-slate-100">{c.country}</td>
                <td className="py-3 border-b border-slate-100 text-right pr-4">
                  <div className="flex justify-end gap-1">
                    {c.tags.map(tag => renderTag(tag))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;