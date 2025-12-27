import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  ChevronDownIcon,
  ChartBarIcon,
  TableCellsIcon,
  Bars3Icon,
  Cog6ToothIcon,
  PresentationChartLineIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';

const Product = () => {
  const navigate = useNavigate();
  const [activeChart, setActiveChart] = useState('bar');
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Pulling from the same 'quotations' key where your order items are stored
    const quotations = JSON.parse(localStorage.getItem('quotations') || '[]');
    setSalesData(quotations);
  }, []);

  // Process data to group by Product Name
  const processProductData = () => {
    const productMap = {};
    
    salesData.forEach(order => {
      // Assuming each order has an 'items' array: [{name: 'Product A', subtotal: 500}, ...]
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          const name = item.productName || item.name || "Unknown Product";
          const amount = Number(item.subtotal || item.total || 0);
          
          if (productMap[name]) {
            productMap[name] += amount;
          } else {
            productMap[name] = amount;
          }
        });
      }
    });

    return productMap;
  };

  const productData = processProductData();
  const productNames = Object.keys(productData);
  const values = Object.values(productData);
  const maxValue = Math.max(...values, 100);

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-[13px] text-slate-700 overflow-hidden">
      
      {/* --- TOP CONTROL BAR --- */}
      <div className="flex items-center justify-between px-4 py-2 bg-white shrink-0 gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-[18px] text-slate-700 font-normal">Product Analysis</h1>
          <Cog6ToothIcon className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
        </div>

        <div className="flex items-center gap-2 border border-slate-300 rounded-sm px-2 py-1 bg-white w-full max-w-2xl shadow-sm">
          <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 mr-1" />
          <input type="text" placeholder="Search Products..." className="outline-none border-none text-[13px] flex-1 italic text-slate-400" />
          <ChevronDownIcon className="w-3 h-3 text-slate-400 cursor-pointer" />
        </div>

        <div className="flex items-center gap-1">
          <div className="flex border border-slate-300 rounded-sm overflow-hidden shadow-sm">
            <button className="p-1.5 bg-[#E1F1F1] border-r border-slate-300">
              <PresentationChartLineIcon className="w-4 h-4 text-[#00A09D]" />
            </button>
            <button className="p-1.5 bg-white hover:bg-slate-50 border-r border-slate-300">
              <TableCellsIcon className="w-4 h-4 text-slate-500" />
            </button>
            <button className="p-1.5 bg-white hover:bg-slate-50">
              <Bars3Icon className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>
      </div>

      {/* --- SECONDARY TOOLBAR --- */}
      <div className="flex items-center gap-1 px-4 py-1 border-b border-slate-200 bg-white">
        <button className="bg-[#714B67] text-white px-3 py-1 rounded-sm font-bold text-[12px] flex items-center gap-1 hover:bg-[#5e3e55]">
          Measures: Total Revenue <ChevronDownIcon className="w-3 h-3 text-white/70" />
        </button>
        
        <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>

        <div className="flex gap-1">
          <button onClick={() => setActiveChart('bar')} className={`p-1 rounded border ${activeChart === 'bar' ? 'bg-[#E1F1F1] border-[#00A09D]' : 'border-transparent'}`}>
            <ChartBarIcon className={`w-4 h-4 ${activeChart === 'bar' ? 'text-[#00A09D]' : 'text-slate-500'}`} />
          </button>
          <button onClick={() => setActiveChart('pie')} className={`p-1 rounded border ${activeChart === 'pie' ? 'bg-[#E1F1F1] border-[#00A09D]' : 'border-transparent'}`}>
            <ChartPieIcon className={`w-4 h-4 ${activeChart === 'pie' ? 'text-[#00A09D]' : 'text-slate-500'}`} />
          </button>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#F8F9FA]">
        
        {activeChart === 'bar' && (
          <div className="w-full max-w-4xl h-96 bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4 text-slate-700">Top Selling Products</h3>
            <svg width="100%" height="300" viewBox="0 0 800 300" className="border-b border-l border-slate-200">
              {productNames.map((name, index) => {
                const x = 60 + (index * 100);
                const barHeight = (values[index] / maxValue) * 250;
                return (
                  <g key={name}>
                    <rect x={x} y={300 - barHeight} width="50" height={barHeight} fill="#00A09D" rx="2" />
                    <text x={x + 25} y="320" className="text-[10px] fill-slate-500" textAnchor="middle">{name}</text>
                    <text x={x + 25} y={290 - barHeight} className="text-[10px] fill-slate-700 font-bold" textAnchor="middle">₹{values[index]}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        )}

        {activeChart === 'pie' && (
          <div className="w-full max-w-4xl h-96 bg-white rounded-lg shadow-sm border p-6 flex flex-col items-center">
             <h3 className="text-lg font-semibold mb-4 text-slate-700 w-full text-left">Product Revenue Share</h3>
             {/* Pie logic would go here, similar to your Sales code but using productNames */}
             <div className="text-slate-400 mt-20 italic">Pie Chart Distribution of Products</div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Product;