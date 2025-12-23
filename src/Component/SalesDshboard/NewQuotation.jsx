	import React, { useState, useRef, useEffect } from 'react';
import { 
  XMarkIcon, Cog6ToothIcon, CloudArrowUpIcon, 
  ChevronDownIcon, TrashIcon, Bars3Icon, 
  ExclamationCircleIcon, ArrowLeftIcon 
} from '@heroicons/react/24/outline';

const NewQuotation = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false); 
  const [activeTab, setActiveTab] = useState('Order Lines');
  const [customer, setCustomer] = useState('');
  const [showError, setShowError] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState('Light');
  const [selectedColor, setSelectedColor] = useState('#714B67');
  const [tagline, setTagline] = useState('');
  const [footerText, setFooterText] = useState('keshavgolande46@gmail.com');
  const [companyAddress, setCompanyAddress] = useState('cdsscom.odoo.com');
  const [companyCountry, setCompanyCountry] = useState('India');
  const [logoText, setLogoText] = useState('Your logo');
  const [logoImage, setLogoImage] = useState(null);
  
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setLogoImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };
  
  const [chatHistory, setChatHistory] = useState([]);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState('Immediate');
  const paymentRef = useRef(null);
  const [orderLines, setOrderLines] = useState([]);

  // List of payment terms
  const paymentTerms = [
    'Immediate Payment',
    '15 Days',
    '21 Days',
    '30 Days',
    '45 Days',
    '2 Months',
    'End of Following Month'
  ];

  useEffect(() => {
    const handleClick = (e) => {
      if (paymentRef.current && !paymentRef.current.contains(e.target)) setIsPaymentOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleBackNavigation = () => {
    window.history.back();
  };

  const handleActionClick = (btnName) => {
    if (btnName === 'Previous') { handlePrevious(); return; }
    if (btnName === 'Edit') { setIsConfirmed(false); return; }
    if (btnName === 'Cancel') { setShowCancelModal(true); return; }

    if (!customer || customer.trim() === "") {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    
    if (btnName === 'Confirm') {
        setIsConfirmed(true);
        const newMsg = {
            id: Date.now(),
            user: 'Keshav',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: `Quotation confirmed for ${customer} → Sales Order created.`
        };
        setChatHistory([newMsg, ...chatHistory]);
    }

    if (btnName === 'Send') {
        if (!customer || customer.trim() === "") {
          setShowError(true);
          setTimeout(() => setShowError(false), 3000);
          return;
        }
        setShowDocumentModal(true);
        return;
    }
    
    if (btnName === 'Preview') {
        setShowPreviewModal(true);
        return;
    }
  };

  const handlePrevious = () => {
    setIsConfirmed(false);
    setCustomer('');
    setOrderLines([]);
    setChatHistory([]); 
    setSelectedTerm('Immediate');
    setShowCancelModal(false);
  };

  const addLine = () => {
    const newLine = { id: Date.now(), product: '', quantity: 1, unitPrice: 0, taxes: 0, discount: 0 };
    setOrderLines([...orderLines, newLine]);
  };

  const updateLine = (id, field, value) => {
    const updatedLines = orderLines.map(line => line.id === id ? { ...line, [field]: value } : line);
    setOrderLines(updatedLines);
  };

  const deleteLine = (id) => setOrderLines(orderLines.filter(line => line.id !== id));

  const handleFocus = (e) => {
    if (parseFloat(e.target.value) === 0) e.target.select();
  };

  const calculateSubtotal = (line) => {
    const base = line.quantity * line.unitPrice;
    const discountAmount = base * (line.discount / 100);
    const afterDiscount = base - discountAmount;
    const taxAmount = afterDiscount * (line.taxes / 100);
    return afterDiscount + taxAmount;
  };

  const totalAmount = orderLines.reduce((acc, line) => acc + calculateSubtotal(line), 0);

  const getBtnStyle = (name, isPrimary = false) => {
    return isPrimary 
      ? "bg-[#714B67] text-white px-3 py-1 rounded font-bold shadow-sm whitespace-nowrap"
      : "bg-[#f8f9fa] border border-slate-300 text-slate-700 px-3 py-1 rounded font-medium hover:bg-slate-100 whitespace-nowrap";
  };

  return (
    <div className="flex flex-col h-screen lg:h-[calc(100vh-46px)] bg-white font-sans text-sm overflow-hidden text-slate-700 relative">
      
      {/* PREVIEW MODAL */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-slate-900/40 z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-xl max-w-6xl w-full h-[90vh] overflow-hidden">
            <div className="bg-teal-100 p-4 flex justify-between items-center">
              <span className="text-teal-800">This is a preview of the customer portal. → Back to edit mode</span>
              <XMarkIcon className="w-5 h-5 cursor-pointer text-teal-800" onClick={() => setShowPreviewModal(false)} />
            </div>
            
            <div className="flex h-full">
              <div className="w-full p-6 overflow-y-auto">
                <div className="mb-6">
                  <div className="text-xs text-gray-500 mb-2">🏠 / Sales Orders / Quotation S00006</div>
                  <h1 className="text-3xl font-bold mb-4">Quotation - S00006</h1>
                </div>
                
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-bold mb-4">Sale Information</h3>
                    <div className="space-y-2">
                      <div><span className="font-medium">Date:</span> {new Date().toLocaleDateString()}</div>
                      <div><span className="font-medium">Expiration Date:</span> {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold mb-4">Invoicing and Shipping Address</h3>
                    <div className="font-bold">{customer || 'Customer Name'}</div>
                    <div className="text-sm text-gray-600">📧 {footerText}</div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Products</th>
                        <th className="text-center py-2">Quantity</th>
                        <th className="text-right py-2">Unit Price</th>
                        <th className="text-right py-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderLines.length > 0 ? orderLines.map(line => (
                        <tr key={line.id} className="border-b">
                          <td className="py-2">{line.product || 'Product'}</td>
                          <td className="text-center py-2">{line.quantity}.00 Units</td>
                          <td className="text-right py-2">₹ {line.unitPrice.toFixed(2)}</td>
                          <td className="text-right py-2">₹ {calculateSubtotal(line).toFixed(2)}</td>
                        </tr>
                      )) : (
                        <tr className="border-b">
                          <td className="py-2">No products added</td>
                          <td className="text-center py-2">-</td>
                          <td className="text-right py-2">-</td>
                          <td className="text-right py-2">₹ 0.00</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  
                  <div className="text-right mt-4">
                    <div className="text-xl font-bold">Total: ₹ {totalAmount.toFixed(2)}</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold mb-4">Payment terms</h3>
                  <div>Payment terms: {selectedTerm}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENT LAYOUT MODAL */}
      {showDocumentModal && (
        <div className="fixed inset-0 bg-slate-900/40 z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-xl max-w-6xl w-full h-[90vh] overflow-hidden flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/3 p-4 lg:p-6 border-b lg:border-b-0 lg:border-r overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">Configure your document layout</h3>
                <XMarkIcon className="w-5 h-5 cursor-pointer text-slate-400" onClick={() => setShowDocumentModal(false)} />
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Logo</label>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded flex items-center justify-center" style={{backgroundColor: selectedColor}}>
                      {logoImage ? (
                        <img src={logoImage} alt="Logo" className="w-full h-full object-cover rounded" />
                      ) : (
                        <span className="text-white text-xs">📷</span>
                      )}
                    </div>
                    <input type="text" value={logoText} onChange={(e) => setLogoText(e.target.value)} className="flex-1 text-sm border border-slate-300 rounded px-2 py-1" style={{color: selectedColor}} />
                  </div>
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="w-full text-sm border border-slate-300 rounded px-2 py-1" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Colors</label>
                  <div className="flex gap-2">
                    {['#714B67', '#000000', '#1f2937', '#059669', '#dc2626', '#2563eb'].map(color => (
                      <div key={color} onClick={() => setSelectedColor(color)} className={`w-8 h-8 rounded-full cursor-pointer border-2 ${selectedColor === color ? 'border-slate-400' : 'border-transparent'}`} style={{backgroundColor: color}}></div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Address</label>
                  <div className="space-y-1">
                    <input type="text" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} className="w-full text-sm text-blue-600 border border-slate-300 rounded px-2 py-1" />
                    <input type="text" value={companyCountry} onChange={(e) => setCompanyCountry(e.target.value)} className="w-full text-sm text-blue-600 border border-slate-300 rounded px-2 py-1" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Tagline</label>
                  <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="e.g. Global Business Solutions" className="w-full border border-slate-300 rounded px-2 py-1 text-sm" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Footer</label>
                  <input type="text" value={footerText} onChange={(e) => setFooterText(e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm" />
                </div>
              </div>
              
              <div className="flex gap-2 mt-6">
                <button onClick={() => {
                  setShowDocumentModal(false);
                  const newMsg = {
                    id: Date.now(),
                    user: 'Keshav',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    text: `Quotation sent to: ${footerText}`
                  };
                  setChatHistory([newMsg, ...chatHistory]);
                }} className="bg-[#714B67] text-white px-4 py-2 rounded font-bold">Continue</button>
                <button onClick={() => setShowDocumentModal(false)} className="bg-white border border-slate-300 px-4 py-2 rounded font-bold text-slate-700 hover:bg-slate-50">Discard</button>
              </div>
            </div>
            
            <div className="flex-1 p-4 lg:p-6 bg-slate-50 flex items-start justify-center overflow-y-auto min-h-[400px] lg:min-h-0">
              <div className="bg-white shadow-lg rounded p-3 lg:p-6 w-full max-w-sm lg:max-w-md mx-auto mt-4 lg:mt-0">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded flex items-center justify-center" style={{backgroundColor: selectedColor}}>
                      {logoImage ? (
                        <img src={logoImage} alt="Logo" className="w-full h-full object-cover rounded" />
                      ) : (
                        <span className="text-white text-xs">📷</span>
                      )}
                    </div>
                    <span className="font-medium" style={{color: selectedColor}}>{logoText}</span>
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    <div>{companyAddress}</div>
                    <div>{companyCountry}</div>
                  </div>
                </div>
                
                <div className="text-right mb-4">
                  <div className="text-sm text-slate-600">{customer || 'Customer Name'}</div>
                </div>
                
                <h2 className="text-lg font-bold mb-4" style={{color: selectedColor}}>Quotation # S00001</h2>
                
                {tagline && (
                  <div className="text-center text-sm text-slate-600 mb-4 italic">{tagline}</div>
                )}
                
                <div className="grid grid-cols-3 gap-4 text-xs mb-4">
                  <div>
                    <div className="font-bold">Quotation Date</div>
                    <div>{new Date().toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="font-bold">Expiration</div>
                    <div>{new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="font-bold">Payment Terms</div>
                    <div>{selectedTerm}</div>
                  </div>
                </div>
                
                <table className="w-full text-xs mb-4">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-1">Description</th>
                      <th className="text-right py-1">Quantity</th>
                      <th className="text-right py-1">Unit Price</th>
                      <th className="text-right py-1">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderLines.length > 0 ? orderLines.map(line => (
                      <tr key={line.id}>
                        <td className="py-1">{line.product || 'Product'}</td>
                        <td className="text-right py-1">{line.quantity} units</td>
                        <td className="text-right py-1">₹ {line.unitPrice.toFixed(2)}</td>
                        <td className="text-right py-1">₹ {calculateSubtotal(line).toFixed(2)}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td className="py-1">No products added</td>
                        <td className="text-right py-1">-</td>
                        <td className="text-right py-1">-</td>
                        <td className="text-right py-1">₹ 0.00</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                
                <div className="text-right border-t pt-2">
                  <div className="font-bold">Total: ₹ {totalAmount.toFixed(2)}</div>
                </div>
                
                <div className="text-center text-xs text-slate-500 mt-4">
                  {footerText}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POPUP MODAL */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-slate-900/40 z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-xl max-w-md w-full overflow-hidden">
            <div className="flex justify-between items-center px-4 py-3 border-b">
              <h3 className="text-lg font-bold text-slate-800">Confirmation</h3>
              <XMarkIcon className="w-5 h-5 cursor-pointer text-slate-400" onClick={() => setShowCancelModal(false)} />
            </div>
            <div className="p-6">
              <p className="text-slate-600 text-base">Are you sure you want to cancel this order? This will open a new quotation tab.</p>
            </div>
            <div className="px-4 py-3 bg-slate-50 flex gap-2">
              <button onClick={handlePrevious} className="bg-[#714B67] text-white px-4 py-1.5 rounded font-bold">Ok</button>
              <button onClick={() => setShowCancelModal(false)} className="bg-white border border-slate-300 px-4 py-1.5 rounded font-bold text-slate-700 hover:bg-slate-50">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showError && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded shadow-2xl">
          <ExclamationCircleIcon className="w-5 h-5" />
          <span className="font-bold">Please select a Customer before proceeding!</span>
        </div>
      )}

      {/* ACTION BAR */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-white shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={handleBackNavigation} className="flex items-center gap-1.5 px-2 py-1 text-slate-600 hover:bg-slate-100 rounded transition-colors border-r pr-4 border-slate-200">
            <ArrowLeftIcon className="w-4 h-4 stroke-[2.5px]" />
            <span className="font-bold">Back</span>
          </button>

          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {isConfirmed ? (
                <>
                    <button onClick={() => handleActionClick('Print')} className={getBtnStyle('Print', true)}>Print</button>
                    <button onClick={() => handleActionClick('Edit')} className={getBtnStyle('Edit')}>Edit</button>
                    <button onClick={() => handleActionClick('Cancel')} className={getBtnStyle('Cancel')}>Cancel</button>
                </>
            ) : (
                ['Send', 'Print', 'Confirm', 'Preview'].map(btn => (
                    <button key={btn} onClick={() => handleActionClick(btn)} className={btn === 'Send' ? getBtnStyle(btn, true) : getBtnStyle(btn)}>{btn}</button>
                ))
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-white border-r border-slate-200 p-4 md:p-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-6 leading-none">
              {isConfirmed ? 'S00071' : 'New Quotation'}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-8">
            <div className="space-y-3">
              <div className="grid grid-cols-3 items-start gap-2">
                <label className={`text-base font-bold mt-1 ${showError ? 'text-red-600' : 'text-[#bb4d4d]'}`}>Customer</label>
                {isConfirmed ? (
                    <span className="col-span-2 py-2 text-base text-teal-700 font-medium">{customer}</span>
                ) : (
                    <input type="text" placeholder="Type customer name..." value={customer} onChange={(e) => setCustomer(e.target.value)} className={`col-span-2 border-b outline-none py-2 text-base text-teal-700 ${showError ? 'border-red-500 bg-red-50' : 'border-teal-500/30'}`} />
                )}
              </div>
              <div className="grid grid-cols-3 items-start gap-2">
                <label className="text-base font-bold text-[#bb4d4d] mt-1">Invoice Address</label>
                <textarea disabled={isConfirmed} className="col-span-2 min-h-[45px] border-b border-red-100 bg-red-50/20 outline-none p-1 disabled:bg-transparent disabled:border-transparent" />
              </div>
              <div className="grid grid-cols-3 items-start gap-2">
                <label className="text-base font-bold text-[#bb4d4d] mt-1">Delivery Address</label>
                <textarea disabled={isConfirmed} className="col-span-2 min-h-[45px] border-b border-red-100 bg-red-50/20 outline-none p-1 disabled:bg-transparent disabled:border-transparent" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-3 items-center gap-2"><label className="text-base font-bold">Expiration</label><input disabled={isConfirmed} type="date" className="col-span-2 border-b border-transparent outline-none py-2 text-base bg-transparent" /></div>
              
              {/* UPDATED PAYMENT TERMS DROPDOWN */}
              <div className="grid grid-cols-3 items-center gap-2 relative" ref={paymentRef}>
                <label className="text-base font-bold">Payment Terms</label>
                <div 
                  onClick={() => !isConfirmed && setIsPaymentOpen(!isPaymentOpen)} 
                  className={`col-span-2 py-2 text-base text-slate-700 border-b ${!isConfirmed ? 'border-slate-200 hover:border-teal-500 cursor-pointer' : 'border-transparent cursor-default'} flex justify-between items-center group transition-colors`}
                >
                  <span className={selectedTerm === 'Immediate' ? 'italic text-slate-400' : 'font-medium text-teal-700'}>
                    {selectedTerm}
                  </span>
                  {!isConfirmed && <ChevronDownIcon className="w-3 h-3 text-teal-600" />}
                </div>

                {/* DROPDOWN MENU */}
                {isPaymentOpen && (
                  <div className="absolute top-full left-[33.33%] w-[66.66%] bg-white border border-slate-200 shadow-xl rounded z-50 py-1 mt-1 animate-in fade-in slide-in-from-top-2 duration-200">
                    {paymentTerms.map((term) => (
                      <div 
                        key={term}
                        onClick={() => {
                          setSelectedTerm(term);
                          setIsPaymentOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-slate-50 cursor-pointer text-sm text-slate-700 flex items-center justify-between"
                      >
                        {term}
                        {selectedTerm === term && <div className="w-1.5 h-1.5 bg-[#714B67] rounded-full"></div>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-b flex gap-6 mb-4">
            {['Order Lines', 'Other Info', 'Notes'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-2 font-bold text-sm uppercase border-b-2 transition-colors ${activeTab === tab ? 'border-[#714B67] text-slate-900' : 'border-transparent text-slate-400'}`}>{tab}</button>
            ))}
          </div>

          {activeTab === 'Order Lines' ? (
            <div className="overflow-x-auto min-h-[250px]">
              <table className="w-full text-left min-w-[950px]">
                <thead>
                  <tr className="text-sm font-bold text-slate-700 border-b uppercase">
                    <th className="w-8 py-1.5"></th>
                    <th className="py-3 pl-2 text-base">Product</th>
                    <th className="py-3 text-right w-24 text-base">Quantity</th>
                    {isConfirmed && (
                        <>
                        <th className="py-3 text-right w-24 text-base">Delivered</th>
                        <th className="py-3 text-right w-24 text-base">Invoiced</th>
                        </>
                    )}
                    <th className="py-3 text-right w-28 text-base">Unit Price</th>
                    <th className="py-3 text-right w-28 text-base">Taxes %</th>
                    <th className="py-3 text-right w-24 text-base">Disc.%</th>
                    <th className="py-3 text-right pr-2 text-base">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orderLines.map(line => (
                    <tr key={line.id} className="border-b border-slate-100 group hover:bg-slate-50">
                      <td className="py-1 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Bars3Icon className="w-3 h-3 text-slate-300" />
                          {!isConfirmed && <TrashIcon onClick={() => deleteLine(line.id)} className="w-3 h-3 text-red-300 opacity-0 group-hover:opacity-100 cursor-pointer" />}
                        </div>
                      </td>
                      <td className="py-2 pl-2"><input disabled={isConfirmed} type="text" value={line.product} onChange={(e) => updateLine(line.id, 'product', e.target.value)} className="w-full outline-none bg-transparent text-teal-700" placeholder="Search product" /></td>
                      <td className="py-2 text-right px-2 bg-slate-50/50"><input disabled={isConfirmed} type="number" value={line.quantity} onFocus={handleFocus} onChange={(e) => updateLine(line.id, 'quantity', parseFloat(e.target.value) || 0)} className="w-full text-right outline-none bg-transparent" /></td>
                      {isConfirmed && (
                          <>
                          <td className="py-2 text-right px-2 text-teal-600 font-medium">0.00</td>
                          <td className="py-2 text-right px-2 text-teal-600 font-medium">0.00</td>
                          </>
                      )}
                      <td className="py-2 text-right px-2 bg-slate-50/50"><input disabled={isConfirmed} type="number" value={line.unitPrice} onFocus={handleFocus} onChange={(e) => updateLine(line.id, 'unitPrice', parseFloat(e.target.value) || 0)} className="w-full text-right outline-none bg-transparent" /></td>
                      <td className="py-2 text-right px-2"><input disabled={isConfirmed} type="number" value={line.taxes} onFocus={handleFocus} onChange={(e) => updateLine(line.id, 'taxes', parseFloat(e.target.value) || 0)} className="w-full text-right outline-none bg-transparent" /></td>
                      <td className="py-2 text-right px-2"><input disabled={isConfirmed} type="number" value={line.discount} onFocus={handleFocus} onChange={(e) => updateLine(line.id, 'discount', parseFloat(e.target.value) || 0)} className="w-full text-right outline-none bg-transparent" /></td>
                      <td className="py-2 text-right pr-2 font-medium">₹ {calculateSubtotal(line).toFixed(2)}</td>
                    </tr>
                  ))}
                  {!isConfirmed && (
                    <tr className="text-teal-600 text-sm font-medium">
                        <td colSpan="8" className="py-4 px-2">
                          <span onClick={addLine} className="cursor-pointer hover:underline mr-5 text-base font-semibold">Add a product</span>
                        </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="flex justify-end mt-6">
                <div className="w-64 space-y-1 border-t border-slate-100 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Total:</span>
                    <span className="font-bold text-slate-900 border-t-2 border-slate-900 pt-1 text-lg">₹ {totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'Other Info' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <div className="space-y-3">
                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-base font-bold">Salesperson</label>
                    <input disabled={isConfirmed} type="text" className="col-span-2 border-b border-slate-200 outline-none py-2 text-base" />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-base font-bold">Sales Team</label>
                    <input disabled={isConfirmed} type="text" className="col-span-2 border-b border-slate-200 outline-none py-2 text-base" />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-base font-bold">Customer Reference</label>
                    <input disabled={isConfirmed} type="text" className="col-span-2 border-b border-slate-200 outline-none py-2 text-base" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-base font-bold">Order Date</label>
                    <input disabled={isConfirmed} type="date" className="col-span-2 border-b border-slate-200 outline-none py-2 text-base" />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-base font-bold">Commitment Date</label>
                    <input disabled={isConfirmed} type="date" className="col-span-2 border-b border-slate-200 outline-none py-2 text-base" />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2">
                    <label className="text-base font-bold">Pricelist</label>
                    <select disabled={isConfirmed} className="col-span-2 border-b border-slate-200 outline-none py-2 text-base bg-transparent">
                      <option>Public Pricelist</option>
                      <option>Partner Pricelist</option>
                      <option>VIP Pricelist</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'Notes' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-base font-bold block mb-2">Terms and Conditions</label>
                  <textarea disabled={isConfirmed} className="w-full border border-slate-200 rounded p-3 text-base min-h-[120px] outline-none" placeholder="Enter terms and conditions..."></textarea>
                </div>
                <div>
                  <label className="text-base font-bold block mb-2">Internal Notes</label>
                  <textarea disabled={isConfirmed} className="w-full border border-slate-200 rounded p-3 text-base min-h-[120px] outline-none" placeholder="Internal notes (not visible to customer)..."></textarea>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 text-slate-500 italic">
               {activeTab} content section...
            </div>
          )}
        </main>

        <aside className="w-full lg:w-[380px] bg-white border-l border-slate-200 flex flex-col shrink-0">
          <div className="p-2 border-b flex gap-1 items-center bg-white shrink-0">
            <button className="bg-[#714B67] text-white px-3 py-1 rounded font-bold text-[11px]">Send message</button>
            {/* <button className="bg-slate-50 border border-slate-200 px-3 py-1 rounded font-bold text-[11px]">Log note</button>
            <button className="bg-slate-50 border border-slate-200 px-3 py-1 rounded font-bold text-[11px]">Activity</button> */}
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {chatHistory.length === 0 ? (
                <div className="italic text-slate-400 text-[11px]">Creating a new record...</div>
            ) : (
                chatHistory.map((msg) => (
                    <div key={msg.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">{msg.user[0]}</div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-800">{msg.user}</span>
                                <span className="text-[10px] text-slate-400">{msg.time}</span>
                            </div>
                            <p className="text-[12px] text-slate-600 mt-0.5">{msg.text}</p>
                        </div>
                    </div>
                ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default NewQuotation;
