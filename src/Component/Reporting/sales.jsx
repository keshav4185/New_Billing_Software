import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  XMarkIcon, 
  ChevronDownIcon,
  ChartBarIcon,
  TableCellsIcon,
  Bars3Icon,
  Cog6ToothIcon,
  PresentationChartLineIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';

const sales = () => {
  const navigate = useNavigate();
  const [activeChart, setActiveChart] = useState('line');
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Get data from localStorage (same as dashboard)
    const quotations = JSON.parse(localStorage.getItem('quotations') || '[]');
    setSalesData(quotations);
  }, []);

  // Process data for charts
  const processChartData = () => {
    const monthlyData = {};
    const currentYear = new Date().getFullYear();
    
    // Initialize months
    for (let i = 0; i < 12; i++) {
      const month = new Date(currentYear, i).toLocaleDateString('en', { month: 'short' });
      monthlyData[month] = 0;
    }
    
    // Process sales data
    salesData.forEach(order => {
      if (order.date && order.total) {
        const orderDate = new Date(order.date);
        if (orderDate.getFullYear() === currentYear) {
          const month = orderDate.toLocaleDateString('en', { month: 'short' });
          monthlyData[month] += order.total;
        }
      }
    });
    
    return monthlyData;
  };

  const chartData = processChartData();
  const maxValue = Math.max(...Object.values(chartData), 100);
  const months = Object.keys(chartData);
  const values = Object.values(chartData);

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-[13px] text-slate-700 overflow-hidden">
      
      {/* --- TOP CONTROL BAR --- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-4 py-2 bg-white shrink-0 gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-base sm:text-[18px] text-slate-700 font-normal">Sales Analysis</h1>
          <Cog6ToothIcon className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
        </div>

        {/* Search Bar - Empty but visible */}
        <div className="flex items-center gap-2 border border-slate-300 rounded-sm px-2 py-1 bg-white w-full sm:max-w-2xl shadow-sm">
          <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 mr-1" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="outline-none border-none text-[13px] flex-1 italic text-slate-400" 
          />
          <ChevronDownIcon className="w-3 h-3 text-slate-400 cursor-pointer" />
        </div>

        {/* View Switchers */}
        <div className="flex items-center gap-1">
          <div className="flex border border-slate-300 rounded-sm overflow-hidden shadow-sm">
            <button className="p-1 sm:p-1.5 bg-[#E1F1F1] border-r border-slate-300">
              <PresentationChartLineIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#00A09D]" />
            </button>
            <button className="p-1 sm:p-1.5 bg-white hover:bg-slate-50 border-r border-slate-300">
              <TableCellsIcon className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500" />
            </button>
            <button className="p-1 sm:p-1.5 bg-white hover:bg-slate-50">
              <Bars3Icon className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500" />
            </button>
          </div>
        </div>
      </div>

      {/* --- SECONDARY TOOLBAR --- */}
      <div className="flex flex-wrap items-center gap-1 px-2 sm:px-4 py-1 border-b border-slate-200 bg-white">
        <button className="bg-[#714B67] text-white px-2 sm:px-3 py-1 rounded-sm font-bold text-[10px] sm:text-[12px] flex items-center gap-1 hover:bg-[#5e3e55]">
          Measures <ChevronDownIcon className="w-3 h-3 text-white/70" />
        </button>
        <button className="bg-slate-100 text-slate-600 px-2 sm:px-3 py-1 border border-slate-300 rounded-sm text-[10px] sm:text-[12px] hover:bg-slate-200">
          Insert in Spreadsheet
        </button>
        
        <div className="h-4 sm:h-6 w-[1px] bg-slate-200 mx-1 sm:mx-2"></div>

        {/* Chart Options Icons */}
        <div className="flex gap-1">
          <button 
            onClick={() => setActiveChart('bar')}
            className={`p-1 rounded border ${activeChart === 'bar' ? 'bg-[#E1F1F1] border-[#00A09D]' : 'hover:bg-slate-100 border-transparent hover:border-slate-200'}`}
          >
            <ChartBarIcon className={`w-3 h-3 sm:w-4 sm:h-4 ${activeChart === 'bar' ? 'text-[#00A09D]' : 'text-slate-500'}`} />
          </button>
          <button 
            onClick={() => setActiveChart('line')}
            className={`p-1 rounded border ${activeChart === 'line' ? 'bg-[#E1F1F1] border-[#00A09D]' : 'hover:bg-slate-100 border-transparent hover:border-slate-200'}`}
          >
            <PresentationChartLineIcon className={`w-3 h-3 sm:w-4 sm:h-4 ${activeChart === 'line' ? 'text-[#00A09D]' : 'text-slate-500'}`} />
          </button>
          <button 
            onClick={() => setActiveChart('pie')}
            className={`p-1 rounded border ${activeChart === 'pie' ? 'bg-[#E1F1F1] border-[#00A09D]' : 'hover:bg-slate-100 border-transparent hover:border-slate-200'}`}
          >
            <ChartPieIcon className={`w-3 h-3 sm:w-4 sm:h-4 ${activeChart === 'pie' ? 'text-[#00A09D]' : 'text-slate-500'}`} />
          </button>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 p-2 sm:p-4 lg:p-8 bg-[#F8F9FA] relative overflow-y-auto">
        
        {/* Analysis Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 lg:p-6">
            <h4 className="text-xs sm:text-sm font-medium text-slate-600 mb-1 sm:mb-2">Total Orders</h4>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">{salesData.length}</div>
            <div className="text-xs sm:text-sm text-green-600 mt-1">+{salesData.filter(order => {
              const orderDate = new Date(order.date);
              const thisMonth = new Date().getMonth();
              return orderDate.getMonth() === thisMonth;
            }).length} this month</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 lg:p-6">
            <h4 className="text-xs sm:text-sm font-medium text-slate-600 mb-1 sm:mb-2">Total Revenue</h4>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">₹{values.reduce((a, b) => a + b, 0).toFixed(2)}</div>
            <div className="text-xs sm:text-sm text-blue-600 mt-1">Across all orders</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 lg:p-6 sm:col-span-2 lg:col-span-1">
            <h4 className="text-xs sm:text-sm font-medium text-slate-600 mb-1 sm:mb-2">Average Order Value</h4>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">₹{salesData.length > 0 ? (values.reduce((a, b) => a + b, 0) / salesData.length).toFixed(2) : '0.00'}</div>
            <div className="text-xs sm:text-sm text-purple-600 mt-1">Per order</div>
          </div>
        </div>
        
        {activeChart === 'line' && (
          <div className="w-full bg-white rounded-lg shadow-sm border p-3 sm:p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2">
              <h3 className="text-base sm:text-lg font-semibold text-slate-700">Monthly Sales Trend - Line Chart</h3>
              <div className="text-xs sm:text-sm text-slate-500">Showing revenue by month for {new Date().getFullYear()}</div>
            </div>
            <div className="overflow-x-auto">
              <svg width="100%" height="250" viewBox="0 0 800 250" className="border-b border-l border-slate-200 min-w-[600px]">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="133" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 133 0 L 0 0 0 50" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Y-axis labels */}
                <text x="30" y="40" className="text-xs fill-slate-400" textAnchor="end">₹{Math.round(maxValue)}</text>
                <text x="30" y="80" className="text-xs fill-slate-400" textAnchor="end">₹{Math.round(maxValue * 0.8)}</text>
                <text x="30" y="120" className="text-xs fill-slate-400" textAnchor="end">₹{Math.round(maxValue * 0.6)}</text>
                <text x="30" y="160" className="text-xs fill-slate-400" textAnchor="end">₹{Math.round(maxValue * 0.4)}</text>
                <text x="30" y="200" className="text-xs fill-slate-400" textAnchor="end">₹{Math.round(maxValue * 0.2)}</text>
                <text x="30" y="240" className="text-xs fill-slate-400" textAnchor="end">₹0</text>
                
                {/* X-axis labels and line chart */}
                {months.map((month, index) => {
                  const x = 80 + (index * 60);
                  const y = 240 - ((values[index] / maxValue) * 200);
                  return (
                    <g key={month}>
                      <text x={x} y="260" className="text-xs fill-slate-400" textAnchor="middle">{month}</text>
                      <circle cx={x} cy={y} r="3" fill="#00A09D" />
                      {values[index] > 0 && (
                        <text x={x} y={y - 8} className="text-xs fill-slate-600" textAnchor="middle">
                          ₹{values[index].toFixed(0)}
                        </text>
                      )}
                    </g>
                  );
                })}
                
                {/* Line path */}
                <path 
                  d={`M ${months.map((_, index) => {
                    const x = 80 + (index * 60);
                    const y = 240 - ((values[index] / maxValue) * 200);
                    return `${index === 0 ? 'M' : 'L'} ${x},${y}`;
                  }).join(' ')}`}
                  fill="none" 
                  stroke="#00A09D" 
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            
            {/* Monthly breakdown */}
            <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
              {months.slice(0, 4).map((month, index) => (
                <div key={month} className="text-center p-2 sm:p-3 bg-slate-50 rounded">
                  <div className="text-xs sm:text-sm font-medium text-slate-600">{month}</div>
                  <div className="text-sm sm:text-lg font-bold text-slate-900">₹{values[index].toFixed(0)}</div>
                  <div className="text-xs text-slate-500">{salesData.filter(order => {
                    const orderDate = new Date(order.date);
                    return orderDate.toLocaleDateString('en', { month: 'short' }) === month;
                  }).length} orders</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeChart === 'bar' && (
          <div className="w-full max-w-4xl h-96 bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4 text-slate-700">Sales Revenue - Bar Chart</h3>
            <svg width="100%" height="300" viewBox="0 0 800 300" className="border-b border-l border-slate-200">
              {/* Grid lines */}
              <defs>
                <pattern id="bargrid" width="133" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 133 0 L 0 0 0 50" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#bargrid)" />
              
              {/* Y-axis labels */}
              <text x="30" y="50" className="text-xs fill-slate-400" textAnchor="end">{Math.round(maxValue)}</text>
              <text x="30" y="100" className="text-xs fill-slate-400" textAnchor="end">{Math.round(maxValue * 0.8)}</text>
              <text x="30" y="150" className="text-xs fill-slate-400" textAnchor="end">{Math.round(maxValue * 0.6)}</text>
              <text x="30" y="200" className="text-xs fill-slate-400" textAnchor="end">{Math.round(maxValue * 0.4)}</text>
              <text x="30" y="250" className="text-xs fill-slate-400" textAnchor="end">{Math.round(maxValue * 0.2)}</text>
              <text x="30" y="300" className="text-xs fill-slate-400" textAnchor="end">0</text>
              
              {/* Bars and labels */}
              {months.map((month, index) => {
                const x = 60 + (index * 60);
                const barHeight = (values[index] / maxValue) * 250;
                const y = 300 - barHeight;
                return (
                  <g key={month}>
                    <rect 
                      x={x} 
                      y={y} 
                      width="40" 
                      height={barHeight} 
                      fill="#3B82F6" 
                      rx="2"
                    />
                    <text x={x + 20} y="320" className="text-xs fill-slate-400" textAnchor="middle">{month}</text>
                    {values[index] > 0 && (
                      <text x={x + 20} y={y - 5} className="text-xs fill-slate-600" textAnchor="middle">
                        ₹{values[index].toFixed(0)}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
            <div className="mt-4 text-sm text-slate-600">
              Total Orders: {salesData.length} | Total Revenue: ₹{values.reduce((a, b) => a + b, 0).toFixed(2)}
            </div>
          </div>
        )}

        {activeChart === 'pie' && (
          <div className="w-full max-w-4xl h-96 bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4 text-slate-700">Sales Revenue - Pie Chart</h3>
            <div className="flex items-center justify-center h-64">
              <svg width="300" height="300" viewBox="0 0 300 300">
                {(() => {
                  const total = values.reduce((a, b) => a + b, 0);
                  if (total === 0) return <text x="150" y="150" textAnchor="middle" className="fill-slate-400">No data available</text>;
                  
                  let currentAngle = 0;
                  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
                  
                  return months.map((month, index) => {
                    if (values[index] === 0) return null;
                    
                    const percentage = (values[index] / total) * 100;
                    const angle = (values[index] / total) * 360;
                    const startAngle = currentAngle;
                    const endAngle = currentAngle + angle;
                    
                    const x1 = 150 + 100 * Math.cos((startAngle * Math.PI) / 180);
                    const y1 = 150 + 100 * Math.sin((startAngle * Math.PI) / 180);
                    const x2 = 150 + 100 * Math.cos((endAngle * Math.PI) / 180);
                    const y2 = 150 + 100 * Math.sin((endAngle * Math.PI) / 180);
                    
                    const largeArcFlag = angle > 180 ? 1 : 0;
                    
                    const pathData = [
                      `M 150 150`,
                      `L ${x1} ${y1}`,
                      `A 100 100 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                      'Z'
                    ].join(' ');
                    
                    currentAngle += angle;
                    
                    return (
                      <g key={month}>
                        <path d={pathData} fill={colors[index % colors.length]} />
                        <text 
                          x={150 + 70 * Math.cos(((startAngle + endAngle) / 2 * Math.PI) / 180)} 
                          y={150 + 70 * Math.sin(((startAngle + endAngle) / 2 * Math.PI) / 180)}
                          textAnchor="middle" 
                          className="text-xs fill-white font-medium"
                        >
                          {percentage > 5 ? `${month}` : ''}
                        </text>
                      </g>
                    );
                  });
                })()}
              </svg>
            </div>
            <div className="mt-4 text-sm text-slate-600">
              Total Orders: {salesData.length} | Total Revenue: ₹{values.reduce((a, b) => a + b, 0).toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default sales;