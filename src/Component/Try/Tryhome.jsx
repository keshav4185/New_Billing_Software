import React, { useState, useMemo } from 'react';
import { CheckCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'; // Requires: npm install @heroicons/react

const APPS = [
  { id: 'crm', name: 'CRM', icon: '💎', color: 'text-teal-500' },
  { id: 'sales', name: 'Sales', icon: '📊', color: 'text-orange-500' },
  { id: 'pos', name: 'Point of Sale', icon: '🏪', color: 'text-purple-500' },
  { id: 'rest', name: 'Restaurant', icon: '🍽️', color: 'text-red-500' },
  { id: 'sub', name: 'Subscriptions', icon: '🔄', color: 'text-cyan-500' },
  { id: 'rent', name: 'Rental', icon: '🔑', color: 'text-blue-500' },
  { id: 'inv', name: 'Inventory', icon: '📦', color: 'text-yellow-600' },
  { id: 'acc', name: 'Accounting', icon: '🏦', color: 'text-emerald-500' },
];

const Tryhome = () => {
  const [selectedAppIds, setSelectedAppIds] = useState(['sales']); // Set initial selection
  const [searchQuery, setSearchQuery] = useState('');

  // Toggle selection for multiple apps
  const toggleApp = (id) => {
    setSelectedAppIds(prev => 
      prev.includes(id) ? prev.filter(appId => appId !== id) : [...prev, id]
    );
  };

  // Filter apps based on search input
  const filteredApps = useMemo(() => {
    return APPS.filter(app => 
      app.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const selectedApps = APPS.filter(app => selectedAppIds.includes(app.id));

  return (
    <div className="min-h-screen bg-[#f8f9fa] animate-in fade-in duration-700">
      
      {/* Header Section */}
      <div className="pt-16 pb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-headline leading-none mb-6 text-green-700 font-extrabold drop-shadow-lg" style={{ fontFamily: 'cursive, sans-serif' }}>
          Choose your <span className="relative inline-block">
            Apps
            <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#00ca99] rounded-full"></span>
          </span>
        </h1>
        <p className="text-xl text-[#1a2533] font-medium">
          Free instant access. No credit card required.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-12 flex flex-col lg:flex-row gap-8 pb-20">
        
        {/* Left Main Content */}
        <div className="flex-1">
          {/* Search Bar */}
          <div className="relative mb-8 max-w-md">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search apps..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#714B67] focus:border-transparent outline-none transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <h2 className="text-3xl text-green-700 font-extrabold mb-8 italic" style={{ fontFamily: 'cursive, sans-serif' }}>
            Available Apps
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredApps.map((app) => (
              <button
                key={app.id}
                onClick={() => toggleApp(app.id)}
                className={`relative flex items-center gap-4 p-5 bg-white rounded-lg border-2 transition-all duration-200 text-left shadow-sm group
                  ${selectedAppIds.includes(app.id) 
                    ? 'border-[#714B67] ring-1 ring-[#714B67]' 
                    : 'border-transparent hover:border-gray-200 hover:shadow-md'
                  }`}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg group-hover:scale-110 transition-transform">
                   <span className={`text-2xl ${app.color}`}>{app.icon}</span>
                </div>
                <span className="font-bold text-[#1a2533] text-lg">{app.name}</span>

                {/* Checkmark badge */}
                {selectedAppIds.includes(app.id) && (
                  <div className="absolute -top-3 -right-3 bg-white rounded-full p-0.5 shadow-sm">
                    <CheckCircleIcon className="w-7 h-7 text-[#714B67] fill-current" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-80 bg-white rounded-2xl shadow-xl p-8 flex flex-col h-fit sticky top-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-[#1a2533] mb-6">
            {selectedAppIds.length} {selectedAppIds.length === 1 ? 'App' : 'Apps'} selected
          </h3>

          {/* List of Selected Apps */}
          <div className="space-y-3 mb-8 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {selectedApps.map(app => (
              <div key={app.id} className="flex items-center gap-4 animate-in slide-in-from-left-2 duration-300">
                <div className="p-2 bg-gray-50 border border-gray-100 rounded-lg text-lg">
                  {app.icon}
                </div>
                <span className="font-bold text-gray-700">{app.name}</span>
              </div>
            ))}
          </div>

          {/* Pricing Info Box */}
          <div className="bg-[#e2f3eb] text-[#0c533c] p-5 rounded-2xl text-center mb-8">
            <p className="text-sm font-medium">
              Free, with <span className="font-bold underline">unlimited</span> users, forever.
            </p>
          </div>

        <a href="/tryapppage">  <button className="w-full bg-white-700 hover:bg-green-700 text-black hover:bg-indigo-400 hover:text-white font-bold py-5 rounded-xl transition-all active:scale-95 shadow-lg shadow-purple-900/20 text-xl border-2">
            Continue
          </button></a>
        </div>
      </div>
    </div>
  );
};

export default Tryhome;