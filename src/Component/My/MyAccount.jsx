import React from 'react';
import { 
  ShoppingBagIcon, 
  EnvelopeIcon, 
  ClockIcon, 
  MapPinIcon, 
  SignalIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';

const MyAccount = () => {
  const cards = [
    { title: 'Your Orders', desc: 'Follow, view or pay your orders', Icon: ShoppingBagIcon },
    { title: 'Your Invoices', desc: 'Follow, download or pay your invoices', Icon: EnvelopeIcon },
    { title: 'Timesheets', desc: 'Review all timesheets related to your projects', Icon: ClockIcon },
    { title: 'Addresses', desc: 'Add, remove or modify your addresses', Icon: MapPinIcon },
    { title: 'Connection & Security', desc: 'Configure your connection parameters', Icon: SignalIcon },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-700">
      {/* Header */}
      

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-6">
        <h1 className="text-3xl font-bold mb-6 text-slate-900">My account</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Cards Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-min">
            {cards.map((card, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 bg-[#f8f9fa] rounded-lg hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-slate-200">
                <card.Icon className="w-10 h-10 text-slate-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-lg text-slate-800">{card.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Sidebar Info */}
          <div className="lg:w-80 space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-indigo-700 rounded flex items-center justify-center text-white text-xl font-bold">
                K
              </div>
              <h2 className="text-xl font-bold">Keshav</h2>
            </div>

            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex gap-2">
                <MapPinIcon className="w-5 h-5 shrink-0 text-slate-400" />
                <p>Apartment/flat no: 112, floor no: 1, Building name: golden plaza, Pune 412307, Maharashtra, India</p>
              </div>
              <div className="flex gap-2">
                <span className="font-bold">📞</span>
                <p>+91 77768 81055</p>
              </div>
              <div className="flex gap-2">
                <EnvelopeIcon className="w-5 h-5 text-slate-400" />
                <p>keshavgolande46@gmail.com</p>
              </div>
              <button className="flex items-center gap-2 text-teal-600 font-medium hover:underline">
                <PencilSquareIcon className="w-4 h-4" /> Edit information
              </button>
            </div>

            <div className="pt-6 border-t">
              <h3 className="text-xl font-bold mb-3">Useful Links</h3>
              <ul className="space-y-2 text-teal-600 font-medium">
                <li><a href="#" className="hover:underline">My Partner Dashboard</a></li>
                <li><a href="#" className="hover:underline">My Apps Dashboard</a></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyAccount;