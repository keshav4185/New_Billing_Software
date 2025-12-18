import React, { useState, useRef, useEffect } from 'react';
import { 
  XMarkIcon, Cog6ToothIcon, CloudArrowUpIcon, 
  ChevronDownIcon, TrashIcon, Bars3Icon, 
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

const NewQuotation = () => {
  const [activeTab, setActiveTab] = useState('Order Lines');
  const [customer, setCustomer] = useState('');
  const [showError, setShowError] = useState(false);
  const [activeButton, setActiveButton] = useState('Send');

  // Payment Terms States
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState('Immediate');
  const paymentRef = useRef(null);
  const paymentOptions = [
    'Immediate Payment', '15 Days', '21 Days', '30 Days', 
    '45 Days', 'End of Following Month', '10 Days after End of Next Month',
    '30% Now, Balance 60 Days'
  ];

  const [orderLines, setOrderLines] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      if (paymentRef.current && !paymentRef.current.contains(e.target)) setIsPaymentOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleActionClick = (btnName) => {
    if (!customer || customer.trim() === "") {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    setActiveButton(btnName);
  };

  const addLine = () => {
    const newLine = { id: Date.now(), product: '', quantity: 1.00, unitPrice: 0.00 };
    setOrderLines([...orderLines, newLine]);
  };

  const getBtnStyle = (name) => {
    const isActive = activeButton === name;
    return isActive 
      ? "bg-[#714B67] text-white px-3 py-1 rounded font-bold shadow-sm whitespace-nowrap"
      : "bg-[#f8f9fa] border border-slate-300 text-slate-700 px-3 py-1 rounded font-medium hover:bg-slate-100 whitespace-nowrap";
  };

  return (
    <div className="flex flex-col h-screen lg:h-[calc(100vh-46px)] bg-white font-sans text-[13px] overflow-hidden text-slate-700">
      
      {showError && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded shadow-2xl">
          <ExclamationCircleIcon className="w-5 h-5" />
          <span className="font-bold">Please select a Customer before proceeding!</span>
        </div>
      )}

      {/* ACTION BAR */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-white shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border-r pr-4 border-slate-200">
            <XMarkIcon className="w-5 h-5 text-slate-400 cursor-pointer" />
            <div className="flex flex-col">
              <span className="text-[10px] text-teal-600 font-bold uppercase leading-none">Sales Orders / New</span>
              <div className="flex gap-2 mt-1"><Cog6ToothIcon className="w-3.5 h-3.5 text-slate-400" /><CloudArrowUpIcon className="w-3.5 h-3.5 text-slate-400" /></div>
            </div>
          </div>
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {['Send', 'Print', 'Confirm', 'Preview'].map(btn => (
              <button key={btn} onClick={() => handleActionClick(btn)} className={getBtnStyle(btn)}>{btn}</button>
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center h-7 border rounded text-[10px] font-bold">
          <div className="relative flex items-center bg-teal-50 text-teal-700 px-5 h-full border-r border-teal-100 uppercase">
            Quotation <div className="absolute -right-1.5 w-3 h-3 bg-teal-50 border-t border-r border-teal-100 rotate-45 z-10"></div>
          </div>
          <div className="px-5 text-slate-400 uppercase">Quotation Sent</div>
          <div className="px-5 text-slate-400 border-l uppercase">Sales Order</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-white border-r border-slate-200 p-4 md:p-8">
          <h1 className="text-3xl font-medium text-slate-900 mb-6 leading-none">New</h1>

          {/* HEADER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-8">
            <div className="space-y-3">
              <div className="grid grid-cols-3 items-start gap-2">
                <label className={`font-bold mt-1 ${showError ? 'text-red-600' : 'text-[#bb4d4d]'}`}>Customer</label>
                <input type="text" value={customer} onChange={(e) => setCustomer(e.target.value)} className={`col-span-2 border-b outline-none py-1 text-teal-700 ${showError ? 'border-red-500 bg-red-50' : 'border-teal-500/30'}`} />
              </div>
              <div className="grid grid-cols-3 items-start gap-2">
                <label className="font-bold text-[#bb4d4d] mt-1">Invoice Address</label>
                <textarea className="col-span-2 min-h-[45px] border-b border-red-100 bg-red-50/20 outline-none p-1" />
              </div>
              <div className="grid grid-cols-3 items-start gap-2">
                <label className="font-bold text-[#bb4d4d] mt-1">Delivery Address</label>
                <textarea className="col-span-2 min-h-[45px] border-b border-red-100 bg-red-50/20 outline-none p-1" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-3 items-center gap-2"><label className="font-bold">Expiration</label><input type="date" className="col-span-2 border-b border-transparent outline-none py-1" /></div>
              
              {/* PAYMENT TERMS DROPDOWN */}
              <div className="grid grid-cols-3 items-center gap-2 relative" ref={paymentRef}>
                <label className="font-bold">Payment Terms</label>
                <div onClick={() => setIsPaymentOpen(!isPaymentOpen)} className="col-span-2 py-1 text-slate-400 border-b border-transparent hover:border-teal-500 cursor-pointer flex justify-between items-center group">
                  <span className="italic">{selectedTerm}</span>
                  <ChevronDownIcon className="w-3 h-3 text-teal-600" />
                </div>
                {isPaymentOpen && (
                  <div className="absolute top-full left-1/3 w-full bg-white border border-slate-200 shadow-xl z-50 mt-1">
                    <ul className="py-1">
                      {paymentOptions.map(opt => (
                        <li key={opt} onClick={() => { setSelectedTerm(opt); setIsPaymentOpen(false); }} className="px-4 py-1.5 cursor-pointer hover:bg-slate-100 text-[12px]">{opt}</li>
                      ))}
                      <li className="px-4 py-1.5 border-t text-teal-600 font-bold cursor-pointer italic hover:bg-slate-50">Search more...</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* TABS */}
          <div className="border-b flex gap-6 mb-4">
            {['Order Lines', 'Other Info', 'Notes'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-1.5 font-bold text-[11px] uppercase border-b-2 transition-colors ${activeTab === tab ? 'border-[#714B67] text-slate-900' : 'border-transparent text-slate-400'}`}>{tab}</button>
            ))}
          </div>

          {activeTab === 'Order Lines' ? (
            <div className="overflow-x-auto min-h-[250px]">
              <table className="w-full text-left min-w-[950px]">
                <thead>
                  <tr className="text-[10px] font-bold text-slate-700 border-b uppercase">
                    <th className="w-8 py-1.5"></th>
                    <th className="py-1.5 pl-2">Product</th>
                    <th className="py-1.5 text-right w-24">Quantity</th>
                    <th className="py-1.5 text-right w-20">Unit</th>
                    <th className="py-1.5 text-right w-24">Unit Price</th>
                    <th className="py-1.5 text-right w-24">Taxes</th>
                    <th className="py-1.5 text-right w-20">Disc.%</th>
                    <th className="py-1.5 text-right pr-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orderLines.map(line => (
                    <tr key={line.id} className="border-b border-slate-100 group hover:bg-slate-50">
                      <td className="py-1 text-center"><Bars3Icon className="w-3 h-3 text-slate-300" /></td>
                      <td className="py-2 pl-2"><input type="text" className="w-full outline-none bg-transparent text-teal-700" placeholder="Search product" /></td>
                      <td className="py-2 text-right px-2 bg-slate-50/50"><input type="number" defaultValue="1.00" className="w-full text-right outline-none bg-transparent" /></td>
                      <td className="py-2 text-right">Units</td>
                      <td className="py-2 text-right px-2 bg-slate-50/50">0.00</td>
                      <td colSpan={3} className="py-2 text-right pr-2 font-medium">₹ 0.00</td>
                    </tr>
                  ))}
                  <tr className="text-teal-600 text-[11px] font-medium">
                    <td colSpan="8" className="py-4 px-2">
                      <span onClick={addLine} className="cursor-pointer hover:underline mr-5">Add a product</span>
                      <span className="cursor-pointer hover:underline">Add a section</span>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* END LAYOUT / TOTALS */}
              <div className="flex justify-end mt-6">
                <div className="w-64 space-y-1 border-t border-slate-100 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Untaxed Amount:</span>
                    <span className="font-bold text-slate-900">₹ 0.00</span>
                  </div>
                  <div className="flex justify-between items-center text-lg pt-1">
                    <span className="text-slate-900 font-bold">Total:</span>
                    <span className="font-bold text-slate-900 border-t-2 border-slate-900 pt-1">₹ 0.00</span>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'Other Info' ? (
            /* OTHER INFO REMAINS UNCHANGED */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-6">
                <section>
                  <h3 className="font-bold uppercase text-[10px] text-slate-900 border-b pb-1 mb-3">Sales</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3"><label>Salesperson</label><div className="col-span-2 border-b border-slate-100 min-h-[20px]"></div></div>
                    <div className="grid grid-cols-3"><label>Sales Team</label><div className="col-span-2 text-slate-400">Sales</div></div>
                    <div className="grid grid-cols-3"><label>Online signature ?</label><input type="checkbox" className="mt-1" /></div>
                    <div className="grid grid-cols-3"><label>Online payment ?</label><input type="checkbox" className="mt-1" /></div>
                  </div>
                </section>
                <section>
                  <h3 className="font-bold uppercase text-[10px] text-slate-900 border-b pb-1 mb-3">Shipping</h3>
                  <div className="grid grid-cols-3"><label>Delivery Date ?</label><div className="col-span-2 border-b border-slate-100"></div></div>
                </section>
              </div>
              <div className="space-y-6">
                <section>
                  <h3 className="font-bold uppercase text-[10px] text-slate-900 border-b pb-1 mb-3">Invoicing</h3>
                  <div className="grid grid-cols-3"><label>Fiscal Position ?</label><div className="col-span-2 border-b border-slate-100"></div></div>
                </section>
                <section>
                  <h3 className="font-bold uppercase text-[10px] text-slate-900 border-b pb-1 mb-3">Tracking</h3>
                  <div className="grid grid-cols-3"><label>Source Document ?</label><div className="col-span-2 border-b border-slate-100"></div></div>
                </section>
              </div>
            </div>
          ) : (
            <div className="italic text-slate-400">No notes added...</div>
          )}
        </main>

        <aside className="w-full lg:w-[380px] bg-white border-l border-slate-200 flex flex-col shrink-0">
          <div className="p-2 border-b flex gap-1 items-center bg-white shrink-0">
            <button className="bg-[#714B67] text-white px-3 py-1 rounded font-bold text-[11px]">Send message</button>
            <button className="bg-slate-50 border border-slate-200 px-3 py-1 rounded font-bold text-[11px]">Log note</button>
            <button className="bg-slate-50 border border-slate-200 px-3 py-1 rounded font-bold text-[11px]">Activity</button>
          </div>
          <div className="flex-1 p-5 italic text-slate-400 text-[11px]">Creating a new record...</div>
        </aside>
      </div>
    </div>
  );
};

export default NewQuotation;