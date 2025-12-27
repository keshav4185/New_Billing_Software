import React, { useState, useMemo, useEffect } from 'react';
import { 
  XMarkIcon, Cog6ToothIcon, 
  ChevronDownIcon, MagnifyingGlassIcon,
  ChevronLeftIcon, ListBulletIcon, 
  TableCellsIcon, CalendarDaysIcon,
  ChartBarIcon, CloudArrowUpIcon,
  PaperClipIcon, TrashIcon,
  EnvelopeIcon, EyeIcon
} from '@heroicons/react/24/outline';

const Salesorder = () => {
  const [view, setView] = useState('list');
  const [isEditable, setIsEditable] = useState(true);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false); // New state for Preview
  const [searchQuery, setSearchQuery] = useState('');
  const [customer, setCustomer] = useState('');
  const [expirationDate, setExpirationDate] = useState('2026-01-23'); 
  const [paymentTerms, setPaymentTerms] = useState('Immediate');
  const [orderLines, setOrderLines] = useState([]);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [activityMessages, setActivityMessages] = useState([{
    id: 1,
    user: 'Keshav',
    time: '2:48 pm',
    message: 'Creating a new record...'
  }]);
  const [quotations, setQuotations] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('quotations') || '[]');
    const salesOrders = savedOrders.filter(order => order.status === 'Sales Order');
    setQuotations(salesOrders);
  }, []);

  // --- VALIDATION: CHECK CUSTOMER NAME ---
  const validateCustomer = () => {
    if (!customer.trim()) {
      alert('Please enter a customer name before performing this action.');
      return false;
    }
    return true;
  };

  // --- LOGIC: SEND EMAIL ---
  const handleSendEmail = () => {
    if (!validateCustomer()) return;
    
    // Add activity message immediately
    const newMessage = {
      id: Date.now(),
      user: 'Keshav',
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      message: `Sending mail to ${customer}`
    };
    setActivityMessages([newMessage, ...activityMessages]);
    
    setShowEmailModal(true);
  };

  const handleFinalSendEmail = () => {
    if (!customerEmail.trim()) {
      alert('Please enter customer email address');
      return;
    }
    
    // Add activity message
    const newMessage = {
      id: Date.now(),
      user: 'Keshav',
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      message: `Quotation sent to ${customer} (${customerEmail})`
    };
    setActivityMessages([newMessage, ...activityMessages]);
    
    handleSave();
    
    // Generate professional bill in new window
    const billWindow = window.open('', '_blank');
    billWindow.document.write(`
      <html>
        <head>
          <title>Sales Order - ${customer}</title>
          <style>
            body { font-family: 'Arial', sans-serif; margin: 0; padding: 40px; color: #333; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #714B67; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-size: 28px; font-weight: bold; color: #714B67; margin: 0; }
            .company-info { text-align: right; }
            .title { font-size: 32px; font-weight: bold; color: #714B67; margin: 0; }
            .subtitle { color: #666; margin: 5px 0 0 0; }
            .info-section { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin: 30px 0; }
            .info-block h4 { color: #714B67; font-size: 14px; margin: 0 0 10px 0; text-transform: uppercase; }
            .info-block p { margin: 5px 0; line-height: 1.4; }
            table { width: 100%; border-collapse: collapse; margin: 30px 0; }
            th { background: #f8f9fa; padding: 12px; text-align: left; border: 1px solid #ddd; font-weight: bold; color: #714B67; }
            td { padding: 12px; border: 1px solid #ddd; }
            .total-section { text-align: right; margin-top: 30px; }
            .total-row { display: flex; justify-content: flex-end; margin: 5px 0; }
            .total-label { width: 150px; text-align: right; padding-right: 20px; }
            .total-amount { font-weight: bold; width: 100px; }
            .grand-total { font-size: 18px; color: #714B67; border-top: 2px solid #714B67; padding-top: 10px; margin-top: 10px; }
            .footer { margin-top: 50px; text-align: center; color: #666; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px; }
            .email-notice { background: #e8f5e8; padding: 20px; margin: 20px 0; border-left: 4px solid #28a745; }
          </style>
        </head>
        <body>
          <div class="email-notice">
            <h3 style="color: #28a745; margin: 0 0 10px 0;">✓ Sales Order Sent Successfully!</h3>
            <p style="margin: 0;">Sales Order has been sent to: <strong>${customerEmail}</strong></p>
          </div>
          
          <div class="header">
            <div style="display: flex; align-items: center;">
              <svg width="60" height="60" viewBox="0 0 100 100" style="margin-right: 15px;">
                <circle cx="50" cy="50" r="45" fill="#714B67" stroke="#5a3c52" stroke-width="2"/>
                <text x="50" y="58" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle">S</text>
              </svg>
              <div>
                <div class="logo">SMART</div>
                <div style="color: #666; font-size: 14px;">Business Solutions</div>
              </div>
            </div>
            <div class="company-info">
              <h1 class="title">SALES ORDER</h1>
              <p class="subtitle">Order #: SO${String(Date.now()).slice(-5)}</p>
              <p class="subtitle">Date: ${new Date().toLocaleDateString()}</p>
            </div>
          </div>
          
          <div class="info-section">
            <div class="info-block">
              <h4>Bill To:</h4>
              <p><strong>${customer}</strong></p>
              <p>Email: ${customerEmail}</p>
              <p>${customerAddress}</p>
            </div>
            <div class="info-block">
              <h4>Order Details:</h4>
              <p><strong>Expiration:</strong> ${expirationDate || 'Not specified'}</p>
              <p><strong>Payment Terms:</strong> ${paymentTerms}</p>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th style="width: 40%;">Product/Service</th>
                <th style="width: 10%; text-align: center;">Qty</th>
                <th style="width: 15%; text-align: right;">Unit Price</th>
                <th style="width: 10%; text-align: center;">Tax %</th>
                <th style="width: 10%; text-align: center;">Disc %</th>
                <th style="width: 15%; text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${orderLines.map(line => `
                <tr>
                  <td><strong>${line.product || 'Product'}</strong></td>
                  <td style="text-align: center;">${line.quantity}</td>
                  <td style="text-align: right;">₹${line.price.toFixed(2)}</td>
                  <td style="text-align: center;">${line.taxes}%</td>
                  <td style="text-align: center;">${line.discount}%</td>
                  <td style="text-align: right;">₹${((line.quantity * line.price) * (1 - line.discount/100)).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="total-section">
            <div class="total-row">
              <div class="total-label">Subtotal:</div>
              <div class="total-amount">₹${untaxedAmount.toFixed(2)}</div>
            </div>
            <div class="total-row grand-total">
              <div class="total-label">Total:</div>
              <div class="total-amount">₹${totalAmount.toFixed(2)}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>Thank you for your business!</p>
            <p>Smart Business Solutions | contact@smart.com | www.smart.com</p>
          </div>
        </body>
      </html>
    `);
    billWindow.document.close();
    
    alert(`Quotation sent successfully to ${customerEmail}!`);
    setShowEmailModal(false);
    
    // Reset form for new sales order
    setCustomer('');
    setCustomerEmail('');
    setCustomerAddress('');
    setOrderLines([]);
    setExpirationDate('2026-01-23');
    setPaymentTerms('Immediate');
    
    // Open email client
    window.open(`mailto:${customerEmail}?subject=Quotation for ${customer}&body=Dear ${customer},%0D%0A%0D%0APlease find attached your quotation.%0D%0A%0D%0AThank you for your business!%0D%0A%0D%0ABest regards,%0D%0AKeshav`, '_blank');
  };

  // --- LOGIC: PRINT ORDER ---
  const handlePrint = () => {
    if (!validateCustomer()) return;
    handleSave(); // Auto-save before printing
    const printContent = `
      <html>
        <head>
          <title>Print Sales Order - ${customer}</title>
          <style>
            body { font-family: 'Arial', sans-serif; margin: 0; padding: 40px; color: #333; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #714B67; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-size: 28px; font-weight: bold; color: #714B67; margin: 0; }
            .company-info { text-align: right; }
            .title { font-size: 32px; font-weight: bold; color: #714B67; margin: 0; }
            .subtitle { color: #666; margin: 5px 0 0 0; }
            .info-section { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin: 30px 0; }
            .info-block h4 { color: #714B67; font-size: 14px; margin: 0 0 10px 0; text-transform: uppercase; }
            .info-block p { margin: 5px 0; line-height: 1.4; }
            table { width: 100%; border-collapse: collapse; margin: 30px 0; }
            th { background: #f8f9fa; padding: 12px; text-align: left; border: 1px solid #ddd; font-weight: bold; color: #714B67; }
            td { padding: 12px; border: 1px solid #ddd; }
            .total-section { text-align: right; margin-top: 30px; }
            .total-row { display: flex; justify-content: flex-end; margin: 5px 0; }
            .total-label { width: 150px; text-align: right; padding-right: 20px; }
            .total-amount { font-weight: bold; width: 100px; }
            .grand-total { font-size: 18px; color: #714B67; border-top: 2px solid #714B67; padding-top: 10px; margin-top: 10px; }
            .footer { margin-top: 50px; text-align: center; color: #666; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div style="display: flex; align-items: center;">
              <svg width="60" height="60" viewBox="0 0 100 100" style="margin-right: 15px;">
                <circle cx="50" cy="50" r="45" fill="#714B67" stroke="#5a3c52" stroke-width="2"/>
                <text x="50" y="58" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle">S</text>
              </svg>
              <div>
                <div class="logo">SMART</div>
                <div style="color: #666; font-size: 14px;">Business Solutions</div>
              </div>
            </div>
            <div class="company-info">
              <h1 class="title">SALES ORDER</h1>
              <p class="subtitle">Order #: SO${String(Date.now()).slice(-5)}</p>
              <p class="subtitle">Date: ${new Date().toLocaleDateString()}</p>
            </div>
          </div>
          
          <div class="info-section">
            <div class="info-block">
              <h4>Bill To:</h4>
              <p><strong>${customer}</strong></p>
              <p>Email: ${customerEmail}</p>
              <p>${customerAddress}</p>
            </div>
            <div class="info-block">
              <h4>Order Details:</h4>
              <p><strong>Expiration:</strong> ${expirationDate || 'Not specified'}</p>
              <p><strong>Payment Terms:</strong> ${paymentTerms}</p>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th style="width: 40%;">Product/Service</th>
                <th style="width: 10%; text-align: center;">Qty</th>
                <th style="width: 15%; text-align: right;">Unit Price</th>
                <th style="width: 10%; text-align: center;">Tax %</th>
                <th style="width: 10%; text-align: center;">Disc %</th>
                <th style="width: 15%; text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${orderLines.map(line => `
                <tr>
                  <td><strong>${line.product || 'Product'}</strong></td>
                  <td style="text-align: center;">${line.quantity}</td>
                  <td style="text-align: right;">₹${line.price.toFixed(2)}</td>
                  <td style="text-align: center;">${line.taxes}%</td>
                  <td style="text-align: center;">${line.discount}%</td>
                  <td style="text-align: right;">₹${((line.quantity * line.price) * (1 - line.discount/100)).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="total-section">
            <div class="total-row">
              <div class="total-label">Subtotal:</div>
              <div class="total-amount">₹${untaxedAmount.toFixed(2)}</div>
            </div>
            <div class="total-row grand-total">
              <div class="total-label">Total:</div>
              <div class="total-amount">₹${totalAmount.toFixed(2)}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>Thank you for your business!</p>
            <p>Smart Business Solutions | contact@smart.com | www.smart.com</p>
          </div>
        </body>
      </html>
    `;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  // --- LOGIC: PREVIEW ORDER ---
  const handlePreview = () => {
    if (!validateCustomer()) return;
    setShowPreviewModal(true);
  };

  const handleSave = () => {
    if (!validateCustomer()) return;
    const nextIdNumber = quotations.length > 0 
      ? parseInt(quotations[0].id.replace('S', '')) + 1 
      : 1;
    const formattedId = `S${String(nextIdNumber).padStart(5, '0')}`;
    const newOrder = {
      id: formattedId,
      date: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true }),
      customer, salesperson: 'Keshav', total: totalAmount, status: 'Sales Order'
    };
    
    // Save to both local state and dashboard
    const updatedQuotations = [newOrder, ...quotations];
    setQuotations(updatedQuotations);
    
    // Save to localStorage for dashboard
    const existingDashboardOrders = JSON.parse(localStorage.getItem('quotations') || '[]');
    const updatedDashboardOrders = [newOrder, ...existingDashboardOrders];
    localStorage.setItem('quotations', JSON.stringify(updatedDashboardOrders));
    
    setView('list'); 
    setOrderLines([]); setCustomer('');
  };

  const deleteOrder = (id, e) => {
    e.stopPropagation();
    if(window.confirm("Are you sure?")) setQuotations(quotations.filter(q => q.id !== id));
  };

  const addProduct = () => {
    setOrderLines([...orderLines, { id: Date.now(), product: '', quantity: 1, price: 0, discount: 0, taxes: 15 }]);
  };

  const updateLine = (id, field, value) => {
    setOrderLines(orderLines.map(line => line.id === id ? { ...line, [field]: value } : line));
  };

  const removeLine = (id) => setOrderLines(orderLines.filter(line => line.id !== id));

  const untaxedAmount = useMemo(() => {
    return orderLines.reduce((sum, line) => sum + ((line.quantity * line.price) * (1 - line.discount / 100)), 0);
  }, [orderLines]);

  const totalAmount = useMemo(() => {
    return orderLines.reduce((sum, line) => {
      const discounted = (line.quantity * line.price) * (1 - line.discount / 100);
      return sum + (discounted * (1 + line.taxes / 100));
    }, 0);
  }, [orderLines]);

  const filteredQuotations = useMemo(() => {
    return quotations.filter(q => 
      q.status === 'Sales Order' && 
      (q.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
       q.id.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, quotations]);

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-[13px] text-slate-700 overflow-hidden relative">
      
      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-800">Sales Order Details - {selectedOrder.id}</h3>
              <button onClick={() => setShowOrderModal(false)}>
                <XMarkIcon className="w-6 h-6 text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">Order Number</label>
                    <p className="text-lg font-bold text-slate-900">{selectedOrder.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Customer</label>
                    <p className="text-slate-900 font-medium">{selectedOrder.customer}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Creation Date</label>
                    <p className="text-slate-900">{selectedOrder.date}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">Status</label>
                    <p>
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-white uppercase bg-[#714B67]">
                        {selectedOrder.status}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Salesperson</label>
                    <p className="text-slate-900">{selectedOrder.salesperson || 'Keshav'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Total Amount</label>
                    <p className="text-xl font-bold text-blue-600">₹ {selectedOrder.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t flex justify-end gap-3">
              <button 
                onClick={() => setShowOrderModal(false)}
                className="px-4 py-2 font-bold text-slate-600 border rounded hover:bg-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- PREVIEW MODAL --- */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black/60 z-[110] flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <EyeIcon className="w-5 h-5 text-[#714B67]" /> Order Preview
              </h3>
              <button onClick={() => setShowPreviewModal(false)}><XMarkIcon className="w-6 h-6 text-slate-400 hover:text-red-500" /></button>
            </div>
            <div className="p-10 overflow-y-auto space-y-8">
              <div className="flex justify-between border-b pb-6">
                <div>
                   <h2 className="text-3xl font-black text-[#714B67]">SALES ORDER</h2>
                   <p className="text-slate-400 mt-1">Date: {new Date().toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-bold uppercase text-slate-400">Customer</p>
                   <p className="text-xl font-bold text-slate-800">{customer}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                 <div className="bg-slate-50 p-3 rounded">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Payment Terms</p>
                    <p className="font-semibold">{paymentTerms}</p>
                 </div>
                 <div className="bg-slate-50 p-3 rounded">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Expiration</p>
                    <p className="font-semibold">{expirationDate}</p>
                 </div>
                 <div className="bg-slate-50 p-3 rounded">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Salesperson</p>
                    <p className="font-semibold">Keshav</p>
                 </div>
              </div>

              <table className="w-full text-left">
                <thead className="border-b-2 border-slate-100 text-[11px] font-bold uppercase text-slate-400">
                  <tr>
                    <th className="py-3">Product</th>
                    <th className="py-3 text-right">Qty</th>
                    <th className="py-3 text-right">Unit Price</th>
                    <th className="py-3 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orderLines.map(line => (
                    <tr key={line.id} className="border-b border-slate-50">
                      <td className="py-3 font-medium text-slate-700">{line.product || '---'}</td>
                      <td className="py-3 text-right text-slate-600">{line.quantity}</td>
                      <td className="py-3 text-right text-slate-600">₹{line.price.toFixed(2)}</td>
                      <td className="py-3 text-right font-bold text-slate-800">₹{((line.quantity * line.price) * (1 - line.discount/100)).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end pt-4">
                <div className="w-64 space-y-2">
                   <div className="flex justify-between text-slate-500 font-medium"><span>Untaxed Amount</span><span>₹{untaxedAmount.toFixed(2)}</span></div>
                   <div className="flex justify-between text-2xl font-black text-[#714B67] pt-4 border-t-2"><span>Total</span><span>₹{totalAmount.toFixed(2)}</span></div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t flex justify-center">
               <button onClick={() => setShowPreviewModal(false)} className="bg-[#714B67] text-white px-10 py-2 rounded-full font-bold shadow-lg hover:bg-[#5a3c52] transition-all">Close Preview</button>
            </div>
          </div>
        </div>
      )}

      {/* --- EMAIL MODAL --- */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <EnvelopeIcon className="w-5 h-5 text-[#714B67]" /> Send Sales Order
              </h3>
              <button onClick={() => setShowEmailModal(false)}><XMarkIcon className="w-6 h-6 text-slate-400 hover:text-slate-600" /></button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold mb-4 text-slate-800">Email Details</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Customer Email *</label>
                      <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm" placeholder="Enter customer email address" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Subject</label>
                      <input type="text" value={`Sales Order for ${customer}`} className="w-full border border-slate-300 rounded px-3 py-2 text-sm bg-slate-50" readOnly />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-4 text-slate-800">Order Summary</h4>
                  <div className="bg-slate-50 p-4 rounded space-y-3">
                    <div className="flex justify-between"><span className="font-medium">Customer:</span><span>{customer}</span></div>
                    <div className="flex justify-between"><span className="font-medium">Date:</span><span>{new Date().toLocaleDateString()}</span></div>
                    <div className="flex justify-between"><span className="font-medium">Expiration:</span><span>{expirationDate}</span></div>
                    <div className="flex justify-between"><span className="font-medium">Payment Terms:</span><span>{paymentTerms}</span></div>
                    <div className="border-t pt-3 mt-4">
                      <div className="flex justify-between"><span className="font-medium">Products:</span><span>{orderLines.length} items</span></div>
                      <div className="flex justify-between"><span className="font-medium">Untaxed Amount:</span><span>₹{untaxedAmount.toFixed(2)}</span></div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2"><span>Total:</span><span>₹{totalAmount.toFixed(2)}</span></div>
                    </div>
                  </div>
                </div>
              </div>
              {orderLines.length > 0 && (
                <div>
                  <h4 className="font-bold mb-3 text-slate-800">Product Details</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-slate-200">
                      <thead className="bg-slate-100">
                        <tr>
                          <th className="border-b p-2 text-left">Product</th>
                          <th className="border-b p-2 text-center">Qty</th>
                          <th className="border-b p-2 text-right">Unit Price</th>
                          <th className="border-b p-2 text-center">Disc%</th>
                          <th className="border-b p-2 text-center">Tax%</th>
                          <th className="border-b p-2 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderLines.map(line => (
                          <tr key={line.id} className="border-b">
                            <td className="p-2">{line.product || 'Product'}</td>
                            <td className="p-2 text-center">{line.quantity}</td>
                            <td className="p-2 text-right">₹{line.price.toFixed(2)}</td>
                            <td className="p-2 text-center">{line.discount}%</td>
                            <td className="p-2 text-center">{line.taxes}%</td>
                            <td className="p-2 text-right">₹{((line.quantity * line.price) * (1 - line.discount/100)).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 bg-slate-50 border-t flex justify-end gap-3">
              <button onClick={() => setShowEmailModal(false)} className="px-4 py-2 font-bold text-slate-600 border rounded hover:bg-white">Cancel</button>
              <button onClick={handleFinalSendEmail} className="px-6 py-2 font-bold text-white bg-[#714B67] rounded hover:bg-[#5a3c52]">Send Email</button>
            </div>
          </div>
        </div>
      )}

      {/* --- TOP CONTROL BAR --- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-2 bg-white border-b shrink-0 gap-3 sm:gap-0">
        <div className="flex items-center gap-3">
          {view === 'list' ? (
            <>
              <button onClick={() => {setCustomer(''); setOrderLines([]); setView('form')}} className="bg-[#714B67] text-white px-3 py-1 rounded font-bold text-[14px] hover:bg-[#5a3c52]">New</button>
              <a href="/sdashboardpage"><button className="bg-[#714B67] text-white px-3 py-1 rounded font-bold text-[14px] hover:bg-[#5a3c52]">back</button></a>
            </>
          ) : (
            <button onClick={handleSave} className="bg-[#714B67] text-white px-3 py-1 rounded font-bold text-[14px] hover:bg-[#5a3c52]">Save</button>
          )}
          
          <div className="flex items-center gap-2 text-[18px] text-[#4c6784]">
            {view === 'form' && <button onClick={() => setView('list')} className="p-1 hover:bg-slate-100 rounded-full text-slate-400"><ChevronLeftIcon className="w-5 h-5" /></button>}
            <span className={`font-medium ${view === 'form' ? 'cursor-pointer hover:underline text-teal-600' : ''}`} onClick={() => setView('list')}>Sales Orders</span>
            {view === 'form' && <div className="hidden sm:flex items-center gap-2 ml-2"><span className="text-slate-300">/</span><span className="font-bold text-slate-800">{customer || 'New'}</span></div>}
          </div>
        </div>

        {view === 'list' && (
          <div className="relative flex items-center border-b border-slate-300 w-full sm:w-80 pb-0.5 group">
            <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 mr-2" />
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="outline-none w-full italic bg-transparent" />
            <ChevronDownIcon className="w-3 h-3 ml-auto text-slate-400" />
          </div>
        )}
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 overflow-hidden bg-slate-50/30">
        {view === 'list' ? (
          <div className="h-full overflow-y-auto bg-white px-2 pt-2">
            {quotations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 italic"><TableCellsIcon className="w-12 h-12 mb-2 opacity-20" /><p>No sales orders found.</p></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px] sm:min-w-[600px]">
                  <thead>
                    <tr className="text-slate-900 font-bold border-b border-slate-300">
                      <th className="py-2 w-6 px-1 sm:w-8 sm:px-2"><input type="checkbox" className="rounded scale-75 sm:scale-100" /></th>
                      <th className="py-2 text-[10px] sm:text-[11px] uppercase">Number</th>
                      <th className="py-2 text-[10px] sm:text-[11px] uppercase hidden sm:table-cell">Date</th>
                      <th className="py-2 text-[10px] sm:text-[11px] uppercase">Customer</th>
                      <th className="py-2 text-right pr-2 sm:pr-4 text-[10px] sm:text-[11px] uppercase">Total</th>
                      <th className="py-2 text-[10px] sm:text-[11px] uppercase hidden lg:table-cell">Status</th>
                      <th className="w-8 sm:w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuotations.map((q) => (
                      <tr key={q.id} className="hover:bg-slate-50 border-b border-slate-100 cursor-pointer group" onClick={() => {setSelectedOrder(q); setShowOrderModal(true);}}>
                        <td className="py-2 px-1 sm:px-2"><input type="checkbox" className="scale-75 sm:scale-100" /></td>
                        <td className="py-2 font-bold text-slate-900 text-base">{q.id}</td>
                        <td className="py-2 text-slate-500 hidden sm:table-cell text-base">{q.date}</td>
                        <td className="py-2 text-slate-600 text-base truncate max-w-[100px] sm:max-w-none">{q.customer}</td>
                        <td className="py-2 text-right pr-2 sm:pr-4 text-blue-600 font-bold text-base">₹ {q.total.toFixed(2)}</td>
                        <td className="py-2 hidden lg:table-cell"><span className="px-2 sm:px-3 py-0.5 rounded-full text-[11px] sm:text-[12px] font-bold text-white bg-[#714B67] uppercase">{q.status}</span></td>
                        <td className="py-2 text-center">
                          <TrashIcon onClick={(e) => deleteOrder(q.id, e)} className="w-3 h-3 sm:w-4 sm:h-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-full bg-white overflow-hidden">
            <div className="flex-1 flex flex-col border-r overflow-y-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-4 py-2 border-b bg-white sticky top-0 z-10 gap-2 sm:gap-0">
                {!isEditable ? (
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 w-full sm:w-auto">
                    <button onClick={() => setView('form')} className="bg-gray-500 text-white px-2 sm:px-4 py-1 rounded font-bold text-sm sm:text-base hover:bg-gray-600 flex-1 sm:flex-none">Back</button>
                    <button onClick={() => setIsEditable(true)} className="bg-blue-600 text-white px-2 sm:px-4 py-1 rounded font-bold text-sm sm:text-base hover:bg-blue-700 flex-1 sm:flex-none">Edit</button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 w-full sm:w-auto">
                    <button onClick={handleSendEmail} className="bg-[#714B67] text-white px-2 sm:px-4 py-1 rounded font-bold text-sm sm:text-base hover:bg-[#5a3c52] flex-1 sm:flex-none">Send</button>
                    <button onClick={handlePrint} className="bg-white border px-2 sm:px-4 py-1 rounded font-bold text-sm sm:text-base hover:bg-slate-50 flex-1 sm:flex-none">Print</button>
                    <button onClick={handlePreview} className="bg-white border px-2 sm:px-4 py-1 rounded font-bold text-slate-700 text-sm sm:text-base hover:bg-slate-50 flex-1 sm:flex-none">Preview</button>
                    <button onClick={() => {if(window.confirm('Are you sure you want to confirm this order?')) {handleSave(); setIsEditable(false);}}} className="bg-green-600 text-white px-2 sm:px-4 py-1 rounded font-bold text-sm sm:text-base hover:bg-green-700 flex-1 sm:flex-none">Confirm</button>
                    <button onClick={() => setView('list')} className="bg-gray-500 text-white px-2 sm:px-4 py-1 rounded font-bold text-sm sm:text-base hover:bg-gray-600 flex-1 sm:flex-none">Cancel</button>
                  </div>
                )}
              </div>

              <div className="p-3 sm:p-6 lg:p-10 max-w-5xl w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-x-20 mb-6 sm:mb-10">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2 lg:gap-0 items-start sm:items-center">
                      <label className="font-bold text-[#e2574c] text-sm sm:text-base">Customer</label>
                      <input type="text" value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="Customer name..." className="sm:col-span-2 border-b border-teal-500/50 outline-none text-teal-800 py-1 text-sm sm:text-base" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2 lg:gap-0 items-start sm:items-center">
                      <label className="font-bold text-[#e2574c] text-sm sm:text-base">Email</label>
                      <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} placeholder="customer@email.com" className="sm:col-span-2 border-b border-teal-500/50 outline-none text-teal-800 py-1 text-sm sm:text-base" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2 lg:gap-0 items-start sm:items-center">
                      <label className="font-bold text-[#e2574c] text-sm sm:text-base">Address</label>
                      <input type="text" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} placeholder="Customer address..." className="sm:col-span-2 border-b border-teal-500/50 outline-none text-teal-800 py-1 text-sm sm:text-base" />
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2 lg:gap-0 items-start sm:items-center">
                      <label className="font-bold text-slate-700 text-sm sm:text-base">Expiration</label>
                      <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} className="sm:col-span-2 border-b outline-none text-slate-800 py-1 text-sm sm:text-base" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2 lg:gap-0 items-start sm:items-center">
                      <label className="font-bold text-slate-700 text-sm sm:text-base">Payment Terms</label>
                      <select value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)} className="sm:col-span-2 bg-transparent border-b outline-none py-1 text-sm sm:text-base">
                        <option value="Immediate">Immediate</option>
                        <option value="15 Days">15 Days</option>
                        <option value="30 Days">30 Days</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[600px] sm:min-w-[700px]">
                    <thead className="border-b text-[12px] sm:text-[13px] font-bold uppercase text-slate-400">
                      <tr>
                        <th className="py-2 w-1/4 min-w-[100px] sm:min-w-[120px]">Product</th>
                        <th className="py-2 text-right min-w-[50px] sm:min-w-[60px]">Qty</th>
                        <th className="py-2 text-right min-w-[70px] sm:min-w-[80px]">Price</th>
                        <th className="py-2 text-right min-w-[60px] sm:min-w-[70px] hidden sm:table-cell">Disc %</th>
                        <th className="py-2 text-center min-w-[60px] sm:min-w-[70px] hidden md:table-cell">Tax %</th>
                        <th className="py-2 text-right pr-4 sm:pr-8 min-w-[80px] sm:min-w-[100px]">Total</th>
                        <th className="w-6 sm:w-8"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderLines.map((line) => (
                        <tr key={line.id} className="border-b border-slate-100 group">
                          <td className="py-2"><input type="text" value={line.product} onChange={(e) => updateLine(line.id, 'product', e.target.value)} placeholder="Product..." className="w-full outline-none p-1 focus:bg-slate-50 rounded min-w-[80px] sm:min-w-[100px] text-base" /></td>
                          <td className="py-2 text-right"><input type="number" value={line.quantity} onChange={(e) => updateLine(line.id, 'quantity', parseFloat(e.target.value) || 0)} className="w-10 sm:w-12 text-right outline-none text-base" /></td>
                          <td className="py-2 text-right"><input type="number" value={line.price} onChange={(e) => updateLine(line.id, 'price', parseFloat(e.target.value) || 0)} className="w-14 sm:w-20 text-right outline-none text-base" /></td>
                          <td className="py-2 text-right hidden sm:table-cell"><input type="number" value={line.discount} onChange={(e) => updateLine(line.id, 'discount', parseFloat(e.target.value) || 0)} className="w-10 sm:w-12 text-right text-orange-600 outline-none text-base" /></td>
                          <td className="py-2 text-center hidden md:table-cell"><input type="number" value={line.taxes} onChange={(e) => updateLine(line.id, 'taxes', parseFloat(e.target.value) || 0)} className="w-10 sm:w-12 text-center text-slate-500 outline-none text-base" /></td>
                          <td className="py-2 text-right pr-4 sm:pr-8 font-medium text-base">₹ {((line.quantity * line.price) * (1 - line.discount/100)).toFixed(2)}</td>
                          <td className="py-2"><TrashIcon onClick={() => removeLine(line.id)} className="w-3 h-3 sm:w-4 sm:h-4 text-slate-300 hover:text-red-500 cursor-pointer opacity-0 group-hover:opacity-100" /></td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="7" className="py-3 sm:py-4"><span onClick={addProduct} className="cursor-pointer text-[#714B67] font-bold hover:underline text-base">+ Add product</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col sm:flex-row justify-between mt-6 sm:mt-10 border-t pt-3 sm:pt-4 gap-3 sm:gap-4">
                  <div className="flex-1 italic text-slate-400 text-xs sm:text-sm">Notes...</div>
                  <div className="w-full sm:w-64 space-y-1 sm:space-y-2">
                    <div className="flex justify-between text-slate-600 text-sm sm:text-base"><span>Untaxed:</span><span>₹ {untaxedAmount.toFixed(2)}</span></div>
                    <div className="flex justify-between font-bold text-lg sm:text-xl text-slate-900 pt-1 sm:pt-2 border-t"><span>Total:</span><span>₹ {totalAmount.toFixed(2)}</span></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Sidebar */}
            <aside className="w-80 bg-white border-l flex flex-col">
              <div className="p-3 border-b">
                <div className="flex gap-2">
                  <button className="bg-[#714B67] text-white px-3 py-1 rounded text-sm font-medium">Send message</button>
                  <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm">Log note</button>
                  <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm">Activity</button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="text-center text-gray-400 text-sm mb-4">Today</div>
                {activityMessages.map((msg) => (
                  <div key={msg.id} className="flex gap-3 mb-4">
                    <div className="w-8 h-8 bg-teal-500 rounded flex items-center justify-center text-white font-bold text-sm">K</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{msg.user}</span>
                        <span className="text-xs text-gray-400">{msg.time}</span>
                      </div>
                      <p className="text-sm text-gray-600">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default Salesorder;