import React, { useState, useRef, useEffect } from 'react';
import { 
  XMarkIcon, ChevronDownIcon, TrashIcon, Bars3Icon, 
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
  const [selectedColor, setSelectedColor] = useState('#714B67');
  const [footerText, setFooterText] = useState('keshavgolande46@gmail.com');
  const [expirationDate, setExpirationDate] = useState('');
  const [invoiceAddress, setInvoiceAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState('Immediate Payment');
  const paymentRef = useRef(null);
  const [orderLines, setOrderLines] = useState([]);

  const paymentTerms = ['Immediate Payment', '15 Days', '30 Days', '45 Days'];

  useEffect(() => {
    const handleClick = (e) => {
      if (paymentRef.current && !paymentRef.current.contains(e.target)) {
        setIsPaymentOpen(false);
      }
    };
    if (isPaymentOpen) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isPaymentOpen]);

  const validateCustomer = () => {
    if (!customer?.trim()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return false;
    }
    return true;
  };

  const validateData = () => {
    if (!customer?.trim() || orderLines.length === 0) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return false;
    }
    return true;
  };

  const saveToSalesDashboard = () => {
    const quotationData = {
      id: `S${String(Date.now()).slice(-5)}`,
      date: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true }),
      customer,
      salesperson: 'Keshav',
      total: totalAmount,
      status: isConfirmed ? 'Sales Order' : 'Quotation',
      items: orderLines,
      paymentTerms: selectedTerm,
      expirationDate
    };
    const existingData = JSON.parse(localStorage.getItem('quotations') || '[]');
    localStorage.setItem('quotations', JSON.stringify([quotationData, ...existingData]));
  };

  const addChatMessage = (text) => {
    const newMsg = {
      id: Date.now(),
      user: 'Keshav',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text
    };
    setChatHistory([newMsg, ...chatHistory]);
  };

  const handleActionClick = (btnName) => {
    if (btnName === 'Edit') { setIsConfirmed(false); return; }
    if (btnName === 'Cancel') { setShowCancelModal(true); return; }
    if (btnName === 'Preview') { setShowPreviewModal(true); return; }
    
    if (btnName === 'Print') {
      if (!validateData()) return;
      saveToSalesDashboard();
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`<html><head><title>Print Quotation</title></head><body>
        <div style="padding: 40px; font-family: sans-serif;">
          <h1 style="color: #714B67;">QUOTATION</h1>
          <p>Customer: ${customer}</p>
          <p>Date: ${new Date().toLocaleDateString()}</p>
          <p>Expiration: ${expirationDate || 'Not set'}</p>
          <p>Payment Terms: ${selectedTerm}</p>
          ${invoiceAddress ? `<p>Invoice Address: ${invoiceAddress}</p>` : ''}
          ${deliveryAddress ? `<p>Delivery Address: ${deliveryAddress}</p>` : ''}
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <thead><tr style="background: #f8fafc;">
              <th style="padding: 10px; border: 1px solid #ddd;">Product</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Qty</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Price</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Amount</th>
            </tr></thead>
            <tbody>
              ${orderLines.map(line => `<tr>
                <td style="padding: 10px; border: 1px solid #ddd;">${line.product || 'Product'}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${line.quantity}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">₹${line.unitPrice.toFixed(2)}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">₹${calculateSubtotal(line).toFixed(2)}</td>
              </tr>`).join('')}
            </tbody>
          </table>
          <h2 style="text-align: right; margin-top: 20px;">Total: ₹${totalAmount.toFixed(2)}</h2>
        </div>
      </body></html>`);
      printWindow.document.close();
      printWindow.print();
      return;
    }

    if (!validateCustomer()) return;

    if (btnName === 'Save') {
      if (!validateData()) return;
      saveToSalesDashboard();
      addChatMessage(`Quotation saved for ${customer}`);
    }
    
    if (btnName === 'Confirm') {
      setIsConfirmed(true);
      addChatMessage(`Quotation confirmed for ${customer} → Sales Order created.`);
    }

    if (btnName === 'Send') {
      setShowDocumentModal(true);
    }
  };

  const handlePrevious = () => {
    setIsConfirmed(false);
    setCustomer('');
    setOrderLines([]);
    setChatHistory([]); 
    setSelectedTerm('Immediate Payment');
    setShowCancelModal(false);
  };

  const addLine = () => setOrderLines([...orderLines, { id: Date.now(), product: '', quantity: 1, unitPrice: 0, taxes: 0, discount: 0 }]);
  const updateLine = (id, field, value) => setOrderLines(orderLines.map(line => line.id === id ? { ...line, [field]: value } : line));
  const deleteLine = (id) => setOrderLines(orderLines.filter(line => line.id !== id));
  const handleFocus = (e) => { if (parseFloat(e.target.value) === 0) e.target.select(); };

  const calculateSubtotal = (line) => {
    const base = line.quantity * line.unitPrice;
    const afterDiscount = base - (base * line.discount / 100);
    return afterDiscount + (afterDiscount * line.taxes / 100);
  };

  const untaxedAmount = orderLines.reduce((acc, line) => {
    const base = line.quantity * line.unitPrice;
    return acc + (base - (base * line.discount / 100));
  }, 0);

  const totalAmount = orderLines.reduce((acc, line) => acc + calculateSubtotal(line), 0);
  const getBtnStyle = (isPrimary = false) => isPrimary ? "bg-[#714B67] text-white px-3 py-1 rounded font-bold" : "bg-[#f8f9fa] border border-slate-300 text-slate-700 px-3 py-1 rounded font-medium hover:bg-slate-100";

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-sm overflow-hidden text-slate-700">
      
      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-slate-900/40 z-[200] flex items-center justify-center p-4" onClick={() => setShowPreviewModal(false)}>
          <div className="bg-white rounded shadow-xl max-w-4xl w-full h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-teal-100 p-4 flex justify-between items-center">
              <span className="text-teal-800">Preview Mode</span>
              <XMarkIcon className="w-5 h-5 cursor-pointer" onClick={() => setShowPreviewModal(false)} />
            </div>
            <div className="p-6 overflow-y-auto">
              <h1 className="text-2xl font-bold mb-4">Quotation Preview</h1>
              <p><strong>Customer:</strong> {customer || 'Not specified'}</p>
              <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Expiration:</strong> {expirationDate || 'Not set'}</p>
              <p><strong>Payment Terms:</strong> {selectedTerm}</p>
              {invoiceAddress && <p><strong>Invoice Address:</strong> {invoiceAddress}</p>}
              {deliveryAddress && <p><strong>Delivery Address:</strong> {deliveryAddress}</p>}
              <table className="w-full mt-4 border-collapse border">
                <thead><tr className="bg-gray-100">
                  <th className="border p-2 text-left">Product</th>
                  <th className="border p-2">Quantity</th>
                  <th className="border p-2">Unit Price</th>
                  <th className="border p-2">Tax %</th>
                  <th className="border p-2">Disc %</th>
                  <th className="border p-2">Amount</th>
                </tr></thead>
                <tbody>
                  {orderLines.map(line => (
                    <tr key={line.id}>
                      <td className="border p-2">{line.product || 'Product'}</td>
                      <td className="border p-2 text-center">{line.quantity}</td>
                      <td className="border p-2 text-right">₹{line.unitPrice.toFixed(2)}</td>
                      <td className="border p-2 text-center">{line.taxes}%</td>
                      <td className="border p-2 text-center">{line.discount}%</td>
                      <td className="border p-2 text-right">₹{calculateSubtotal(line).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-right mt-4 text-xl font-bold">Total: ₹{totalAmount.toFixed(2)}</div>
            </div>
          </div>
        </div>
      )}

      {/* Document Modal */}
      {showDocumentModal && (
        <div className="fixed inset-0 bg-slate-900/40 z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg">Send Quotation</h3>
              <XMarkIcon className="w-5 h-5 cursor-pointer" onClick={() => setShowDocumentModal(false)} />
            </div>
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold mb-4 text-slate-800">Email Details</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">To (Customer Email):</label>
                      <input type="email" value={footerText} onChange={(e) => setFooterText(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm" placeholder="Enter customer email" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Subject:</label>
                      <input type="text" value={`Quotation for ${customer}`} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-slate-50" readOnly />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-4 text-slate-800">Quotation Summary</h4>
                  <div className="bg-slate-50 p-4 rounded space-y-3">
                    <div className="flex justify-between"><span className="font-medium">Customer:</span><span>{customer}</span></div>
                    <div className="flex justify-between"><span className="font-medium">Date:</span><span>{new Date().toLocaleDateString()}</span></div>
                    <div className="flex justify-between"><span className="font-medium">Expiration:</span><span>{expirationDate || 'Not set'}</span></div>
                    <div className="flex justify-between"><span className="font-medium">Payment Terms:</span><span>{selectedTerm}</span></div>
                    {invoiceAddress && <div><span className="font-medium">Invoice Address:</span><div className="text-sm text-slate-600 mt-1">{invoiceAddress}</div></div>}
                    {deliveryAddress && <div><span className="font-medium">Delivery Address:</span><div className="text-sm text-slate-600 mt-1">{deliveryAddress}</div></div>}
                    <div className="border-t pt-3 mt-4">
                      <div className="flex justify-between"><span className="font-medium">Products:</span><span>{orderLines.length} items</span></div>
                      <div className="flex justify-between"><span className="font-medium">Untaxed Amount:</span><span>₹{untaxedAmount.toFixed(2)}</span></div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2"><span>Total:</span><span>₹{totalAmount.toFixed(2)}</span></div>
                    </div>
                  </div>
                </div>
              </div>
              {orderLines.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-bold mb-3 text-slate-800">Product Details</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-slate-200">
                      <thead className="bg-slate-100">
                        <tr>
                          <th className="border-b p-2 text-left">Product</th>
                          <th className="border-b p-2 text-center">Qty</th>
                          <th className="border-b p-2 text-right">Unit Price</th>
                          <th className="border-b p-2 text-center">Tax%</th>
                          <th className="border-b p-2 text-center">Disc%</th>
                          <th className="border-b p-2 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderLines.map(line => (
                          <tr key={line.id} className="border-b">
                            <td className="p-2">{line.product || 'Product'}</td>
                            <td className="p-2 text-center">{line.quantity}</td>
                            <td className="p-2 text-right">₹{line.unitPrice.toFixed(2)}</td>
                            <td className="p-2 text-center">{line.taxes}%</td>
                            <td className="p-2 text-center">{line.discount}%</td>
                            <td className="p-2 text-right">₹{calculateSubtotal(line).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 bg-slate-50 border-t flex justify-end gap-2">
              <button onClick={() => setShowDocumentModal(false)} className="bg-white border px-4 py-2 rounded">Cancel</button>
              <button onClick={() => {
                setShowDocumentModal(false);
                saveToSalesDashboard();
                addChatMessage(`Quotation sent to: ${footerText}`);
              }} className="bg-[#714B67] text-white px-4 py-2 rounded font-bold">Send Email</button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-slate-900/40 z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-xl max-w-md w-full">
            <div className="p-4 border-b">
              <h3 className="font-bold">Confirmation</h3>
            </div>
            <div className="p-4">
              <p>Are you sure you want to cancel this order?</p>
            </div>
            <div className="p-4 bg-slate-50 flex gap-2">
              <button onClick={handlePrevious} className="bg-[#714B67] text-white px-4 py-2 rounded font-bold">Ok</button>
              <button onClick={() => setShowCancelModal(false)} className="bg-white border px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showError && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded">
          <ExclamationCircleIcon className="w-5 h-5" />
          <span className="font-bold">
            {!customer?.trim() ? 'Please enter a customer name!' : 'Please add at least one product!'}
          </span>
        </div>
      )}

      {/* Action Bar */}
      <div className="flex items-center justify-between px-2 sm:px-4 py-2 border-b bg-white">
        <div className="flex items-center gap-2 sm:gap-4">
          <button onClick={() => window.history.back()} className="flex items-center gap-1.5 px-2 py-1 text-slate-600 hover:bg-slate-100 rounded">
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="font-bold hidden sm:inline">Back</span>
          </button>
          <div className="flex flex-wrap gap-1 overflow-x-auto">
            {isConfirmed ? (
              <>
                <button onClick={() => handleActionClick('Print')} className={getBtnStyle(true)}>Print</button>
                <button onClick={() => handleActionClick('Edit')} className={getBtnStyle()}>Edit</button>
                <button onClick={() => handleActionClick('Cancel')} className={getBtnStyle()}>Cancel</button>
              </>
            ) : (
              ['Send', 'Print', 'Save', 'Confirm', 'Preview'].map(btn => (
                <button key={btn} onClick={() => handleActionClick(btn)} className={btn === 'Send' ? getBtnStyle(true) : getBtnStyle()}>{btn}</button>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-white border-r p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 sm:mb-6">{isConfirmed ? 'S00071' : 'New Quotation'}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-6 sm:mb-8">
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-start">
                <label className={`text-sm sm:text-base font-bold ${showError ? 'text-red-600' : 'text-[#bb4d4d]'}`}>Customer</label>
                {isConfirmed ? (
                  <span className="sm:col-span-2 py-2 text-sm sm:text-base text-teal-700 font-medium">{customer}</span>
                ) : (
                  <input type="text" placeholder="Type customer name..." value={customer} onChange={(e) => setCustomer(e.target.value)} className={`sm:col-span-2 border-b outline-none py-2 text-sm sm:text-base text-teal-700 ${showError ? 'border-red-500 bg-red-50' : 'border-teal-500/30'}`} />
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-start">
                <label className="text-sm sm:text-base font-bold text-[#bb4d4d]">Invoice Address</label>
                <textarea disabled={isConfirmed} value={invoiceAddress} onChange={(e) => setInvoiceAddress(e.target.value)} placeholder="Enter invoice address..." className="sm:col-span-2 min-h-[60px] border-b border-slate-200 outline-none py-2 text-sm sm:text-base resize-none" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-start">
                <label className="text-sm sm:text-base font-bold text-[#bb4d4d]">Delivery Address</label>
                <textarea disabled={isConfirmed} value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} placeholder="Enter delivery address..." className="sm:col-span-2 min-h-[60px] border-b border-slate-200 outline-none py-2 text-sm sm:text-base resize-none" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                <label className="text-sm sm:text-base font-bold">Expiration</label>
                <input disabled={isConfirmed} type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} className="sm:col-span-2 border-b border-slate-200 outline-none py-2 text-sm sm:text-base" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center relative">
                <label className="text-sm sm:text-base font-bold">Payment Terms</label>
                <div ref={paymentRef} onClick={() => !isConfirmed && setIsPaymentOpen(!isPaymentOpen)} className={`sm:col-span-2 py-2 text-sm sm:text-base border-b ${!isConfirmed ? 'cursor-pointer hover:border-teal-500' : 'border-transparent'} flex justify-between items-center`}>
                  <span className="font-medium text-teal-700">{selectedTerm}</span>
                  {!isConfirmed && <ChevronDownIcon className="w-3 h-3 text-teal-600" />}
                </div>
                {isPaymentOpen && (
                  <div className="absolute top-full left-0 sm:left-[33.33%] w-full sm:w-[66.66%] bg-white border shadow-xl rounded z-50 py-1 mt-1">
                    {paymentTerms.map((term) => (
                      <div 
                        key={term} 
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setSelectedTerm(term); 
                          setIsPaymentOpen(false); 
                        }} 
                        className="px-4 py-2 hover:bg-slate-50 cursor-pointer text-sm"
                      >
                        {term}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px] sm:min-w-[800px]">
              <thead>
                <tr className="border-b">
                  <th className="w-6 sm:w-8 py-2 sm:py-3"></th>
                  <th className="py-2 sm:py-3 pl-1 sm:pl-2 text-xs sm:text-sm">Product</th>
                  <th className="py-2 sm:py-3 text-right w-16 sm:w-24 text-xs sm:text-sm">Qty</th>
                  <th className="py-2 sm:py-3 text-right w-20 sm:w-28 text-xs sm:text-sm">Price</th>
                  <th className="py-2 sm:py-3 text-right w-16 sm:w-24 text-xs sm:text-sm">Tax%</th>
                  <th className="py-2 sm:py-3 text-right w-16 sm:w-24 text-xs sm:text-sm">Disc%</th>
                  <th className="py-2 sm:py-3 text-right pr-1 sm:pr-2 text-xs sm:text-sm">Amount</th>
                </tr>
              </thead>
              <tbody>
                {orderLines.map(line => (
                  <tr key={line.id} className="border-b group hover:bg-slate-50">
                    <td className="py-1 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Bars3Icon className="w-2 h-2 sm:w-3 sm:h-3 text-slate-300" />
                        {!isConfirmed && <TrashIcon onClick={() => deleteLine(line.id)} className="w-2 h-2 sm:w-3 sm:h-3 text-red-300 opacity-0 group-hover:opacity-100 cursor-pointer" />}
                      </div>
                    </td>
                    <td className="py-1 sm:py-2 pl-1 sm:pl-2"><input disabled={isConfirmed} type="text" value={line.product} onChange={(e) => updateLine(line.id, 'product', e.target.value)} className="w-full outline-none bg-transparent text-teal-700 text-xs sm:text-sm" placeholder="Product" /></td>
                    <td className="py-1 sm:py-2 text-right px-1 sm:px-2"><input disabled={isConfirmed} type="number" value={line.quantity} onFocus={handleFocus} onChange={(e) => updateLine(line.id, 'quantity', parseFloat(e.target.value) || 0)} className="w-full text-right outline-none bg-transparent text-xs sm:text-sm" /></td>
                    <td className="py-1 sm:py-2 text-right px-1 sm:px-2"><input disabled={isConfirmed} type="number" value={line.unitPrice} onFocus={handleFocus} onChange={(e) => updateLine(line.id, 'unitPrice', parseFloat(e.target.value) || 0)} className="w-full text-right outline-none bg-transparent text-xs sm:text-sm" /></td>
                    <td className="py-1 sm:py-2 text-right px-1 sm:px-2"><input disabled={isConfirmed} type="number" value={line.taxes} onFocus={handleFocus} onChange={(e) => updateLine(line.id, 'taxes', parseFloat(e.target.value) || 0)} className="w-full text-right outline-none bg-transparent text-xs sm:text-sm" /></td>
                    <td className="py-1 sm:py-2 text-right px-1 sm:px-2"><input disabled={isConfirmed} type="number" value={line.discount} onFocus={handleFocus} onChange={(e) => updateLine(line.id, 'discount', parseFloat(e.target.value) || 0)} className="w-full text-right outline-none bg-transparent text-xs sm:text-sm" /></td>
                    <td className="py-1 sm:py-2 text-right pr-1 sm:pr-2 font-medium text-xs sm:text-sm">₹ {calculateSubtotal(line).toFixed(2)}</td>
                  </tr>
                ))}
                {!isConfirmed && (
                  <tr>
                    <td colSpan="7" className="py-3 sm:py-4 px-1 sm:px-2">
                      <span onClick={addLine} className="cursor-pointer text-[#714B67] font-bold hover:underline text-xs sm:text-sm">+ Add a product</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="flex justify-end mt-4 sm:mt-6">
              <div className="w-48 sm:w-64 space-y-1 sm:space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-slate-500">Untaxed Amount:</span>
                  <span className="text-slate-700">₹ {untaxedAmount.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-200 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium text-sm sm:text-base">Total:</span>
                    <span className="font-bold text-slate-900 text-base sm:text-lg">₹ {totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <aside className="w-full lg:w-[380px] bg-white border-l lg:border-l border-t lg:border-t-0 flex flex-col">
          <div className="p-2 border-b">
            <button className="bg-[#714B67] text-white px-3 py-1 rounded font-bold text-[10px] sm:text-[11px]">Send message</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 sm:space-y-6 max-h-64 lg:max-h-none">
            {chatHistory.length === 0 ? (
              <div className="italic text-slate-400 text-[10px] sm:text-[11px]">Creating a new record...</div>
            ) : (
              chatHistory.map((msg) => (
                <div key={msg.id} className="flex gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm">{msg.user[0]}</div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-xs sm:text-sm">{msg.user}</span>
                      <span className="text-[9px] sm:text-[10px] text-slate-400">{msg.time}</span>
                    </div>
                    <p className="text-[10px] sm:text-[12px] text-slate-600 mt-0.5">{msg.text}</p>
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