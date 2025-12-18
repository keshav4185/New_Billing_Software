import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HandRaisedIcon } from '@heroicons/react/24/solid';

const Welcome = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsExiting(true); 
      
      const navTimer = setTimeout(() => {
        // Updated this line to match your route path
        navigate('/sdashboardpage'); 
      }, 600);

      return () => clearTimeout(navTimer);
    }, 3500);

    return () => clearTimeout(loadTimer);
  }, [navigate]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md transition-all duration-700 ease-in-out ${isExiting ? 'opacity-0 scale-110' : 'opacity-100'}`}>
      <div className="absolute w-[600px] h-[600px] bg-[#714B67]/10 rounded-full blur-[120px] animate-pulse" />

      <div className={`relative w-full max-w-lg p-10 bg-white border-2 border-[#714B67] rounded-[2.5rem] shadow-2xl mx-4 transition-transform duration-700 ${isExiting ? 'scale-90' : 'scale-100 animate-in zoom-in-95'}`}>
        
        {/* Radar Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {!isExiting && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#714B67]/20 rounded-full animate-ping" />
          )}
          <div className="relative z-20 flex items-center justify-center w-16 h-16 bg-[#714B67] rounded-full border-[6px] border-white shadow-lg">
            <HandRaisedIcon className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="mt-8">
          <h1 className="text-[3.8rem] font-bold text-[#714B67] leading-[1.05] mb-6 tracking-tighter">
            Welcome to <br /> Odoo
          </h1>
          <div className="space-y-4">
            <p className="text-gray-500 text-lg font-medium tracking-wide">
              {isExiting ? 'Loading Dashboard...' : 'Searching for your instance'}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-12 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden relative">
          <div 
            className={`absolute h-full bg-[#714B67] transition-all duration-[3500ms] ease-out ${isExiting ? 'w-full' : 'w-0'}`}
            style={{ width: isExiting ? '100%' : '75%' }} 
          />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="h-full w-32 bg-gradient-to-r from-transparent via-[#714B67]/5 to-transparent animate-[scan_3s_linear_infinite]" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan { 0% { transform: translateX(-150%); } 100% { transform: translateX(450%); } }
      `}} />
    </div>
  );
};

export default Welcome;