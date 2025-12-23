import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeftIcon, MagnifyingGlassIcon, 
  EllipsisVerticalIcon, UserPlusIcon,
  ChevronDownIcon, Cog6ToothIcon
} from '@heroicons/react/24/outline';

const SalesTeams = () => {
  const navigate = useNavigate();

  const teams = [
    { id: 1, name: 'Sales', color: 'border-purple-500', members: 0 },
    { id: 2, name: 'Nitin Team', color: 'border-pink-500', members: 0 },
    { id: 3, name: 'Sadanand Team', color: 'border-orange-500', members: 0 },
    { id: 4, name: 'Prasad Team', color: 'border-red-600', members: 0 },
    { id: 5, name: 'Nikhil Team', color: 'border-orange-400', members: 0 },
  ];

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-[13px] text-slate-700 overflow-hidden">
      
      {/* CONTROL BAR - Matches your existing UI style */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[18px] text-slate-600 font-medium">
            <button 
              onClick={() => navigate(-1)} 
              className="p-1 hover:bg-slate-100 rounded-full transition-colors mr-1"
            >
              <ChevronLeftIcon className="w-5 h-5 text-slate-500" />
            </button>
            <span>Sales Teams</span>
            <Cog6ToothIcon className="w-4 h-4 text-slate-400 cursor-pointer ml-1" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex items-center border-b border-slate-300 w-64 pb-0.5">
            <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="outline-none w-full italic text-slate-700 bg-transparent" 
            />
            <ChevronDownIcon className="w-3 h-3 text-slate-400" />
          </div>
          
          {/* <div className="text-slate-500 text-[12px]">
            1-5 / 5
            <span className="ml-2 inline-flex gap-1">
              <button className="px-1 bg-slate-50 border rounded text-slate-300">{'<'}</button>
              <button className="px-1 bg-slate-50 border rounded text-slate-300">{'>'}</button>
            </span>
          </div> */}
        </div>
      </div>

      {/* KANBAN GRID AREA - Matches image_634f6f.png */}
      <div className="flex-1 overflow-auto p-4 bg-slate-50/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {teams.map((team) => (
            <div 
              key={team.id} 
              className={`bg-white border ${team.color} border-l-[3px] rounded shadow-sm flex flex-col justify-between min-h-[120px] p-3 hover:shadow-md transition-shadow cursor-pointer`}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-slate-800">{team.name}</h3>
                <EllipsisVerticalIcon className="w-5 h-5 text-slate-400 hover:text-slate-600" />
              </div>

              <div className="flex justify-end items-center mt-auto gap-3">
                {team.name === 'Sales' && (
                  <img 
                    src="https://ui-avatars.com/api/?name=Mitchell+Admin&background=4c3c4c&color=fff" 
                    className="w-6 h-6 rounded shadow-sm" 
                    alt="Mitchell Admin"
                  />
                )}
                <UserPlusIcon className="w-5 h-5 text-slate-400 hover:text-[#714B67]" title="Add Member" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesTeams;