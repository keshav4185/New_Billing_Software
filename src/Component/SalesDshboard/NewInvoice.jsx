import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  XMarkIcon, ChevronDownIcon, TrashIcon, Bars3Icon, 
  ExclamationCircleIcon, ArrowLeftIcon 
} from '@heroicons/react/24/outline';
import logo from '../../assets/logo.jpg';

const NewInvoice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editingOrder = location.state?.order;
  const isEditing = !!editingOrder;
  
  const [isConfirmed, setIsConfirmed] = useState(editingOrder?.status === 'Invoice' || false);
  const [showCancelModal, setShowCancelModal] = useState(false); 
  const [activeTab, setActiveTab] = useState('Invoice Lines');
  const [customer, setCustomer] = useState(editingOrder?.customer || '');
  const [customerPhone, setCustomerPhone] = useState(editingOrder?.customerPhone || '');
  const [customerGST, setCustomerGST] = useState(editingOrder?.customerGST || '');
  const [showError, setShowError] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#1F3A5F');
  const [footerText, setFooterText] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(editingOrder?.invoiceDate || new Date().toISOString().split('T')[0]);
  const [expirationDate, setExpirationDate] = useState(editingOrder?.expirationDate || '');
  const [dueDate, setDueDate] = useState(editingOrder?.dueDate || '');
  const [invoiceAddress, setInvoiceAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(editingOrder?.paymentTerms || 'Net 30');
  const paymentRef = useRef(null);
  const [orderLines, setOrderLines] = useState(editingOrder?.items || []);
  const [editingOrderId, setEditingOrderId] = useState(editingOrder?.id || null);
  const [paymentMethod, setPaymentMethod] = useState(editingOrder?.paymentMethod || 'Bank Transfer');
  const [isPaymentMethodOpen, setIsPaymentMethodOpen] = useState(false);
  const [paymentMethodRef, setPaymentMethodRef] = useState(useRef(null));
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('123 Business Street, City - 400001');
  const [companyGST, setCompanyGST] = useState('27XXXXX1234X1ZX');
  const [companyLogo, setCompanyLogo] = useState(logo);
  const [termsConditions, setTermsConditions] = useState('1. Payment due within specified terms\n2. Late payment charges may apply\n3. Subject to local jurisdiction');
  const [bankDetails, setBankDetails] = useState('Bank: HDFC Bank\nA/C: 1234567890\nIFSC: HDFC0001234');
  const [showSignature, setShowSignature] = useState(true);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [upiId, setUpiId] = useState('smartbusiness@paytm');
  const [includeCGST, setIncludeCGST] = useState(true);
  const [includeSGST, setIncludeSGST] = useState(true);
  const [advancePayment, setAdvancePayment] = useState(editingOrder?.advancePayment || 0);
  const [paymentStatus, setPaymentStatus] = useState(editingOrder?.paymentStatus || 'Unpaid');
  const [showCustomerHistory, setShowCustomerHistory] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState(() => {
    if (editingOrder) return editingOrder.id;
    
    // Get next serial number from localStorage
    const lastSerial = parseInt(localStorage.getItem('lastInvoiceSerial') || '0');
    const nextSerial = lastSerial + 1;
    
    return `INV-${nextSerial.toString().padStart(4, '0')}`;
  });

  // --- NEW FUNCTIONALITY START: Product List Search ---
  const [availableProducts, setAvailableProducts] = useState([]);
  const [activeSearchId, setActiveSearchId] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProductData, setNewProductData] = useState({
    name: '',
    price: '',
    cost: '',
    category: 'General',
    stock: '',
    description: '',
    image: ''
  });

  // Load products from localStorage on component mount
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('my_products') || '[]');
    setAvailableProducts(savedProducts);
  }, []);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCompanyLogo(event.target.result);
        // Don't store in localStorage - it exceeds quota for large images
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductSelect = (lineId, productObj) => {
    setOrderLines(orderLines.map(line => 
      line.id === lineId ? { 
        ...line, 
        product: productObj.name, 
        unitPrice: parseFloat(productObj.price) || 0 
      } : line
    ));
    setActiveSearchId(null); // Close dropdown after selection
  };

  // Auto-save new products to localStorage
  const saveNewProduct = (productData) => {
    // Validate productData has required properties
    if (!productData || !productData.name || !productData.name.trim()) {
      return null;
    }
    const existingProducts = JSON.parse(localStorage.getItem('my_products') || '[]');
    const productExists = existingProducts.some(p => p.name.toLowerCase() === productData.name.toLowerCase());
    
    if (!productExists) {
      const newProduct = {
        id: Date.now(),
        ...productData
      };
      
      const updatedProducts = [...existingProducts, newProduct];
      localStorage.setItem('my_products', JSON.stringify(updatedProducts));
      setAvailableProducts(updatedProducts);
      return newProduct;
    }
    return null;
  };

  const handleAddNewProduct = () => {
    if (!newProductData.name.trim() || !newProductData.price) {
      alert('Please enter product name and price');
      return;
    }
    
    const savedProduct = saveNewProduct(newProductData);
    if (savedProduct) {
      // Add to current order line
      const currentLineId = activeSearchId;
      if (currentLineId) {
        setOrderLines(orderLines.map(line => 
          line.id === currentLineId ? { 
            ...line, 
            product: savedProduct.name, 
            unitPrice: parseFloat(savedProduct.price) || 0,
            productInfo: {
              id: savedProduct.id,
              cost: savedProduct.cost,
              category: savedProduct.category,
              stock: savedProduct.stock,
              description: savedProduct.description,
              image: savedProduct.image
            }
          } : line
        ));
      }
      
      // Reset form and close modal
      setNewProductData({
        name: '',
        price: '',
        cost: '',
        category: 'General',
        stock: '',
        description: '',
        image: ''
      });
      setShowAddProductModal(false);
      setActiveSearchId(null);
      
      addChatMessage(`✅ New product "${savedProduct.name}" added successfully`);
    } else {
      alert('Product already exists!');
    }
  };

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewProductData({...newProductData, image: event.target.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const getCustomerHistory = () => {
    const allInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    return allInvoices.filter(q => q.customer.toLowerCase() === customer.toLowerCase());
  };

  const handleWhatsAppShare = () => {
    const message = `*${isConfirmed ? 'INVOICE' : 'INVOICE'}*\n\n` +
      `Invoice #: ${invoiceNumber}\n` +
      `Customer: ${customer}\n` +
      `Total: ₹${(untaxedAmount + (untaxedAmount * ((includeCGST ? 0.09 : 0) + (includeSGST ? 0.09 : 0)))).toFixed(2)}\n` +
      `Payment Status: ${paymentStatus}\n\n` +
      `Thank you for your business!\n` +
      `- ${companyName || 'Smart Business Solutions'}`;
    
    const whatsappUrl = `https://wa.me/${customerPhone?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    addChatMessage(`📱 WhatsApp message sent to ${customer}`);
  };

  const getPaymentStatusColor = (status) => {
    switch(status) {
      case 'Paid': return 'bg-green-500';
      case 'Pending': return 'bg-yellow-500';
      case 'Overdue': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  // --- NEW FUNCTIONALITY END ---

  const paymentTerms = ['Net 15', 'Net 30', 'Net 45', 'Due on Receipt'];
  const paymentMethods = ['Bank Transfer', 'Cash', 'Card', 'UPI', 'Cheque'];

  // Show QR Scanner when Online payment is selected
  useEffect(() => {
    if (paymentMethod === 'Online' && isConfirmed) {
      setShowQRScanner(true);
    }
  }, [paymentMethod, isConfirmed]);

  useEffect(() => {
    const handleClick = (e) => {
      if (paymentRef.current && !paymentRef.current.contains(e.target)) {
        setIsPaymentOpen(false);
      }
      if (paymentMethodRef.current && !paymentMethodRef.current.contains(e.target)) {
        setIsPaymentMethodOpen(false);
      }
    };
    if (isPaymentOpen || isPaymentMethodOpen) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isPaymentOpen, isPaymentMethodOpen]);

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
    // Update serial number in localStorage when saving
    if (!isEditing) {
      const currentSerial = parseInt(invoiceNumber.slice(4));
      localStorage.setItem('lastInvoiceSerial', currentSerial.toString());
    }
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN');
    const timeStr = now.toLocaleTimeString('en-IN');
    const invoiceData = {
      id: editingOrderId || invoiceNumber,
      invoiceDate: invoiceDate,
      dueDate: dueDate,
      date: editingOrder?.date || `${dateStr} ${timeStr}`,
      createdAt: editingOrder?.createdAt || now.toISOString(),
      customer,
      customerPhone,
      customerGST,
      customerEmail,
      invoiceAddress,
      deliveryAddress,
      termsConditions,
      bankDetails,
      salesperson: editingOrder?.salesperson || 'Admin',
      total: totalAmount,
      status: isConfirmed ? 'Invoice' : 'Invoice',
      items: orderLines,
      paymentTerms: selectedTerm,
      paymentMethod,
      paymentStatus,
      dueDate,
      advancePayment,
      subtotal: untaxedAmount,
      cgst: includeCGST ? (untaxedAmount * 0.09) : 0,
      sgst: includeSGST ? (untaxedAmount * 0.09) : 0,
      grandTotal: untaxedAmount + (untaxedAmount * ((includeCGST ? 0.09 : 0) + (includeSGST ? 0.09 : 0))),
      remainingAmount: Math.max(0, (untaxedAmount + (untaxedAmount * ((includeCGST ? 0.09 : 0) + (includeSGST ? 0.09 : 0)))) - advancePayment)
    };
    
    const existingData = JSON.parse(localStorage.getItem('invoices') || '[]');
    
    if (isEditing) {
      // Update existing record
      const updatedData = existingData.map(item => 
        item.id === editingOrderId ? invoiceData : item
      );
      localStorage.setItem('invoices', JSON.stringify(updatedData));
    } else {
      // Add new record
      localStorage.setItem('invoices', JSON.stringify([invoiceData, ...existingData]));
    }
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
      if (!printWindow) {
        alert('Popup blocked. Please allow pop-ups for this site to print.');
        return;
      }
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Invoice</title>
            <style>
              body { font-family: 'Arial', sans-serif; margin: 0; padding: 40px; color: #333; }
              .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #1F3A5F; padding-bottom: 20px; margin-bottom: 30px; }
              .logo-section { display: flex; align-items: center; gap: 15px; }
              .logo-img { height: 60px; width: auto; }
              .logo-text { font-size: 28px; font-weight: bold; color: #1F3A5F; }
              .company-info { text-align: right; }
              @media print { .logo-img { height: 50px; } }
              @media screen and (max-width: 768px) { .logo-img { height: 40px; } .logo-text { font-size: 20px; } }
              .title { font-size: 32px; font-weight: bold; color: #1F3A5F; margin: 0; }
              .subtitle { color: #666; margin: 5px 0 0 0; }
              .info-section { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin: 30px 0; }
              .info-block h4 { color: #1F3A5F; font-size: 14px; margin: 0 0 10px 0; text-transform: uppercase; }
              .info-block p { margin: 5px 0; line-height: 1.4; }
              table { width: 100%; border-collapse: collapse; margin: 30px 0; }
              th { background: #f8f9fa; padding: 12px; text-align: left; border: 1px solid #ddd; font-weight: bold; color: #1F3A5F; }
              td { padding: 12px; border: 1px solid #ddd; }
              .total-section { text-align: right; margin-top: 30px; }
              .total-row { display: flex; justify-content: flex-end; margin: 5px 0; }
              .total-label { width: 150px; text-align: right; padding-right: 20px; }
              .total-amount { font-weight: bold; width: 100px; }
              .grand-total { font-size: 18px; color: #1F3A5F; border-top: 2px solid #1F3A5F; padding-top: 10px; margin-top: 10px; }
              .footer { margin-top: 50px; text-align: center; color: #666; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px; }
              .terms-section { margin-top: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
              .terms-block h4 { color: #1F3A5F; font-size: 14px; margin: 0 0 10px 0; }
              .terms-block p { font-size: 12px; line-height: 1.4; margin: 0; white-space: pre-line; }
              .signature-section { margin-top: 40px; display: flex; justify-content: space-between; }
              .signature-box { text-align: center; width: 200px; }
              .signature-line { border-bottom: 1px solid #333; height: 40px; margin-bottom: 5px; }
              @media print { body { margin: 0; } }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo-section">
                <img src="${companyLogo}" alt="Company Logo" class="logo-img" />
              </div>
              <div class="company-info">
                <h1 class="title">INVOICE</h1>
                <p class="subtitle">Invoice #: ${invoiceNumber}</p>
                <p class="subtitle">Date: ${new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <div class="info-section">
              <div class="info-block">
                <h4>Bill To:</h4>
                <p><strong>${customer}</strong></p>
                ${invoiceAddress ? `<p>${invoiceAddress.replace(/\n/g, '<br>')}</p>` : ''}
              </div>
              <div class="info-block">
                <h4>Invoice Details:</h4>
                <p><strong>Expiration:</strong> ${expirationDate || 'Not specified'}</p>
                <p><strong>Payment Terms:</strong> ${selectedTerm}</p>
                <p><strong>Payment Method:</strong> ${paymentMethod}</p>
                ${deliveryAddress ? `<p><strong>Delivery Address:</strong><br>${deliveryAddress.replace(/\n/g, '<br>')}</p>` : ''}
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
                    <td style="text-align: right;">₹${(Number(line.unitPrice) || 0).toFixed(2)}</td>
                    <td style="text-align: center;">${line.taxes}%</td>
                    <td style="text-align: center;">${line.discount}%</td>
                    <td style="text-align: right;">₹${calculateSubtotal(line).toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            
            <div class="total-section">
              <div class="total-row">
                <div class="total-label">Gross Amount:</div>
                <div class="total-amount">₹${grossAmount.toFixed(2)}</div>
              </div>
              <div class="total-row">
                <div class="total-label">Total Discount:</div>
                <div class="total-amount">-₹${totalDiscount.toFixed(2)}</div>
              </div>
              <div class="total-row">
                <div class="total-label">Subtotal:</div>
                <div class="total-amount">₹${untaxedAmount.toFixed(2)}</div>
              </div>
              ${includeCGST ? `
                <div class="total-row">
                  <div class="total-label">CGST (9%):</div>
                  <div class="total-amount">₹${(untaxedAmount * 0.09).toFixed(2)}</div>
                </div>
              ` : ''}
              ${includeSGST ? `
                <div class="total-row">
                  <div class="total-label">SGST (9%):</div>
                  <div class="total-amount">₹${(untaxedAmount * 0.09).toFixed(2)}</div>
                </div>
              ` : ''}
              <div class="total-row grand-total">
                <div class="total-label">Total:</div>
                <div class="total-amount">₹${(untaxedAmount + (untaxedAmount * ((includeCGST ? 0.09 : 0) + (includeSGST ? 0.09 : 0)))).toFixed(2)}</div>
              </div>
              ${advancePayment > 0 ? `
                <div class="total-row" style="color: #28a745; font-weight: bold; margin-top: 10px; border-top: 1px solid #ddd; padding-top: 10px;">
                  <div class="total-label">Advance Paid:</div>
                  <div class="total-amount">₹${advancePayment.toFixed(2)}</div>
                </div>
                <div class="total-row" style="color: #dc3545; font-weight: bold;">
                  <div class="total-label">Remaining Amount:</div>
                  <div class="total-amount">₹${Math.max(0, (untaxedAmount + (untaxedAmount * ((includeCGST ? 0.09 : 0) + (includeSGST ? 0.09 : 0)))) - advancePayment).toFixed(2)}</div>
                </div>
              ` : ''}
            </div>
            
            <div class="terms-section">
              <div class="terms-block">
                <h4>Terms & Conditions</h4>
                <p>${termsConditions}</p>
              </div>
              <div class="terms-block">
                <h4>Bank Details</h4>
                <p>${bankDetails}</p>
              </div>
            </div>
            
            <div class="signature-section">
              <div class="signature-box">
                <div class="signature-line"></div>
                <p>Customer Signature</p>
              </div>
              <div class="signature-box">
                <div class="signature-line"></div>
                <p>Authorized Signature</p>
                <p style="font-size: 10px; margin-top: 5px;">Smart Business Solutions</p>
              </div>
            </div>
            
            <div class="footer">
              <p>Thank you for your business!</p>
              <p>Smart Business Solutions | ${footerText} | www.smart.com</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
      return;
    }

    if (!validateCustomer()) return;

    if (btnName === 'Save') {
      if (!validateData()) return;
      saveToSalesDashboard();
      addChatMessage(isEditing ? `${isConfirmed ? 'Invoice' : 'Draft Invoice'} updated for ${customer}` : `Invoice saved for ${customer}`);
      if (isEditing) {
        setTimeout(() => navigate('/sdashboardpage'), 1000);
      }
    }
    
    if (btnName === 'Confirm') {
      setIsConfirmed(true);
      addChatMessage(`Invoice confirmed for ${customer} → Invoice finalized.`);
    }

    if (btnName === 'Send') {
      if (!validateData()) return;
      setShowDocumentModal(true);
      return;
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

  const addLine = () => setOrderLines([...orderLines, { id: Date.now(), product: '', quantity: 0, unitPrice: 0, taxes: 0, discount: 0 }]);
  const updateLine = (id, field, value) => {
    setOrderLines(orderLines.map(line => {
      if (line.id === id) {
        const updatedLine = { ...line, [field]: value };
        
        // Auto-save product when both name and price are filled
        if (field === 'unitPrice' && updatedLine.product && parseFloat(value) > 0) {
          saveNewProduct({ name: updatedLine.product, price: parseFloat(value) });
        }
        
        return updatedLine;
      }
      return line;
    }));
  };
  const deleteLine = (id) => setOrderLines(orderLines.filter(line => line.id !== id));
  const handleFocus = (e) => { if (parseFloat(e.target.value) === 0) e.target.select(); };

  const calculateSubtotal = (line) => {
    const qty = Number(line.quantity) || 0;
    const price = Number(line.unitPrice) || 0;
    const discount = Number(line.discount) || 0;
    const taxes = Number(line.taxes) || 0;
    const base = qty * price;
    const afterDiscount = base - (base * (discount / 100));
    return afterDiscount + (afterDiscount * (taxes / 100));
  };

  const grossAmount = orderLines.reduce((acc, line) => {
    const qty = Number(line.quantity) || 0;
    const price = Number(line.unitPrice) || 0;
    return acc + (qty * price);
  }, 0);

  const totalDiscount = orderLines.reduce((acc, line) => {
    const qty = Number(line.quantity) || 0;
    const price = Number(line.unitPrice) || 0;
    const discount = Number(line.discount) || 0;
    const base = qty * price;
    return acc + (base * (discount / 100));
  }, 0);

  const untaxedAmount = grossAmount - totalDiscount;

  const totalAmount = orderLines.reduce((acc, line) => acc + calculateSubtotal(line), 0);
  const getBtnStyle = (isPrimary = false) => isPrimary ? "bg-[#1F3A5F] text-white px-3 py-1 rounded font-bold" : "bg-[#f8f9fa] border border-slate-300 text-slate-700 px-3 py-1 rounded font-medium hover:bg-slate-100";

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-sm overflow-hidden text-slate-700">
      
      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-slate-900/40 z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-xl max-w-md w-full">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg">Add New Product</h3>
              <XMarkIcon className="w-5 h-5 cursor-pointer" onClick={() => setShowAddProductModal(false)} />
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Photo</label>
                <div className="w-full h-32 bg-slate-100 rounded overflow-hidden border relative">
                  {newProductData.image ? (
                    <img src={newProductData.image} className="w-full h-full object-cover" alt="Product" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                  )}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleProductImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <span className="text-white text-sm font-bold">Choose Photo</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Product Name *</label>
                <input 
                  type="text" 
                  value={newProductData.name} 
                  onChange={(e) => setNewProductData({...newProductData, name: e.target.value})} 
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm" 
                  placeholder="Enter product name"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Selling Price *</label>
                  <input 
                    type="number" 
                    value={newProductData.price} 
                    onChange={(e) => setNewProductData({...newProductData, price: e.target.value})} 
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm" 
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cost Price</label>
                  <input 
                    type="number" 
                    value={newProductData.cost} 
                    onChange={(e) => setNewProductData({...newProductData, cost: e.target.value})} 
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm" 
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select 
                    value={newProductData.category} 
                    onChange={(e) => setNewProductData({...newProductData, category: e.target.value})} 
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                  >
                    <option value="General">General</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Food">Food</option>
                    <option value="Books">Books</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Stock Quantity</label>
                  <input 
                    type="number" 
                    value={newProductData.stock} 
                    onChange={(e) => setNewProductData({...newProductData, stock: e.target.value})} 
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm" 
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                  value={newProductData.description} 
                  onChange={(e) => setNewProductData({...newProductData, description: e.target.value})} 
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm h-20 resize-none" 
                  placeholder="Product description..."
                />
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t flex justify-end gap-2">
              <button onClick={() => setShowAddProductModal(false)} className="bg-white border px-4 py-2 rounded">Cancel</button>
              <button onClick={handleAddNewProduct} className="bg-[#1F3A5F] text-white px-4 py-2 rounded font-bold">Add Product</button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-slate-900/40 z-[200] flex items-center justify-center p-2 sm:p-4" onClick={() => setShowPreviewModal(false)}>
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-5xl h-[95vh] sm:h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-[#1F3A5F] to-[#162A43] text-white p-2 sm:p-4 flex justify-between items-center">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs sm:text-sm">📄</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-lg">Professional Invoice Preview</h3>
                  <p className="text-white/80 text-xs sm:text-sm">#{invoiceNumber}</p>
                </div>
              </div>
              <button onClick={() => setShowPreviewModal(false)} className="text-white/80 hover:text-white p-1 sm:p-2 rounded-full hover:bg-white/10">
                <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            
            <div className="p-2 sm:p-4 md:p-8 overflow-y-auto h-full bg-gray-50">
              {/* Professional Invoice Layout */}
              <div className="bg-white rounded-lg shadow-lg p-2 sm:p-4 md:p-8 max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-8 pb-3 sm:pb-6 border-b-2 border-[#1F3A5F]">
                  <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-0">
                    <img src={companyLogo} alt="Company Logo" className="w-12 h-12 sm:w-16 sm:h-16 object-contain" />
                  </div>
                  <div className="text-left sm:text-right">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1F3A5F] mb-1 sm:mb-2">{isConfirmed ? 'SALES ORDER' : 'INVOICE'}</h2>
                    <p className="text-sm sm:text-base text-gray-600">#{invoiceNumber}</p>
                    <p className="text-sm sm:text-base text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Company & Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-4 sm:mb-8">
                  <div>
                    <h4 className="font-bold text-[#1F3A5F] text-xs sm:text-sm uppercase mb-2 sm:mb-3">Company Details</h4>
                    <div className="bg-gray-50 p-2 sm:p-4 rounded">
                      <p className="font-bold text-sm sm:text-base">{companyName}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{companyAddress}</p>
                      <p className="text-xs sm:text-sm text-gray-600">GST: {companyGST}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1F3A5F] text-xs sm:text-sm uppercase mb-2 sm:mb-3">Bill To</h4>
                    <div className="bg-gray-50 p-2 sm:p-4 rounded">
                      <p className="font-bold text-sm sm:text-base">{customer || 'Customer Name'}</p>
                      {customerPhone && <p className="text-xs sm:text-sm text-gray-600">Phone: {customerPhone}</p>}
                      {customerGST && <p className="text-xs sm:text-sm text-gray-600">GST: {customerGST}</p>}
                      {invoiceAddress && <p className="text-xs sm:text-sm text-gray-600 mt-2">{invoiceAddress}</p>}
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-8">
                  <div className="bg-blue-50 p-2 sm:p-4 rounded text-center">
                    <p className="text-xs sm:text-sm text-gray-600">Payment Terms</p>
                    <p className="font-bold text-blue-600 text-sm sm:text-base">{selectedTerm}</p>
                  </div>
                  <div className="bg-green-50 p-2 sm:p-4 rounded text-center">
                    <p className="text-xs sm:text-sm text-gray-600">Payment Method</p>
                    <p className="font-bold text-green-600 text-sm sm:text-base">{paymentMethod}</p>
                  </div>
                  <div className="bg-purple-50 p-2 sm:p-4 rounded text-center">
                    <p className="text-xs sm:text-sm text-gray-600">Expiration</p>
                    <p className="font-bold text-purple-600 text-sm sm:text-base">{expirationDate || 'Not set'}</p>
                  </div>
                </div>

                {/* Products Table */}
                {orderLines.length > 0 && (
                  <div className="mb-8">
                    <h4 className="font-bold text-[#1F3A5F] text-sm uppercase mb-4">Product Details</h4>
                    <div className="overflow-hidden rounded-lg border">
                      <table className="w-full">
                        <thead className="bg-[#1F3A5F] text-white">
                          <tr>
                            <th className="text-left p-3 font-semibold">Product/Service</th>
                            <th className="text-center p-3 font-semibold">Qty</th>
                            <th className="text-right p-3 font-semibold">Unit Price</th>
                            <th className="text-center p-3 font-semibold">Tax%</th>
                            <th className="text-center p-3 font-semibold">Disc%</th>
                            <th className="text-right p-3 font-semibold">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderLines.map((line, index) => (
                            <tr key={line.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                              <td className="p-3 font-medium">{line.product || 'Product'}</td>
                              <td className="p-3 text-center">{line.quantity}</td>
                              <td className="p-3 text-right">₹{(Number(line.unitPrice) || 0).toFixed(2)}</td>
                              <td className="p-3 text-center">{line.taxes}%</td>
                              <td className="p-3 text-center">{line.discount}%</td>
                              <td className="p-3 text-right font-semibold">₹{calculateSubtotal(line).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Totals */}
                <div className="flex justify-end mb-8">
                  <div className="w-80">
                      <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Gross Amount:</span>
                        <span className="font-semibold">₹{grossAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Total Discount:</span>
                        <span className="font-semibold">-₹{totalDiscount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-semibold">₹{untaxedAmount.toFixed(2)}</span>
                      </div>
                      {includeCGST && (
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">CGST (9%):</span>
                          <span className="font-semibold">₹{(untaxedAmount * 0.09).toFixed(2)}</span>
                        </div>
                      )}
                      {includeSGST && (
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">SGST (9%):</span>
                          <span className="font-semibold">₹{(untaxedAmount * 0.09).toFixed(2)}</span>
                        </div>
                      )}
                      <div className="border-t-2 border-[#1F3A5F] pt-3 mt-3">
                        <div className="flex justify-between">
                          <span className="text-xl font-bold text-[#1F3A5F]">Grand Total:</span>
                          <span className="text-xl font-bold text-[#1F3A5F]">₹{(untaxedAmount + (untaxedAmount * ((includeCGST ? 0.09 : 0) + (includeSGST ? 0.09 : 0)))).toFixed(2)}</span>
                        </div>
                        {advancePayment > 0 && (
                          <>
                            <div className="flex justify-between mt-2 pt-2 border-t border-gray-300">
                              <span className="text-lg font-bold text-green-600">Advance Paid:</span>
                              <span className="text-lg font-bold text-green-600">₹{advancePayment.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="text-lg font-bold text-orange-600">Remaining Amount:</span>
                              <span className="text-lg font-bold text-orange-600">₹{Math.max(0, (untaxedAmount + (untaxedAmount * ((includeCGST ? 0.09 : 0) + (includeSGST ? 0.09 : 0)))) - advancePayment).toFixed(2)}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms & Bank Details */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-bold text-[#714B67] text-sm uppercase mb-3">Terms & Conditions</h4>
                    <div className="bg-gray-50 p-4 rounded text-xs leading-relaxed whitespace-pre-line">
                      {termsConditions}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#714B67] text-sm uppercase mb-3">Bank Details</h4>
                    <div className="bg-gray-50 p-4 rounded text-xs leading-relaxed whitespace-pre-line">
                      {bankDetails}
                    </div>
                  </div>
                </div>

                {/* Signatures */}
                <div className="flex justify-between items-end pt-8">
                  <div className="text-center">
                    <div className="w-48 h-16 border-b-2 border-gray-300 mb-2"></div>
                    <p className="text-sm font-semibold text-gray-600">Customer Signature</p>
                  </div>
                  <div className="text-center">
                    <div className="w-48 h-16 border-b-2 border-gray-300 mb-2"></div>
                    <p className="text-sm font-semibold text-gray-600">Authorized Signature</p>
                    <p className="text-xs text-gray-500 mt-1">{companyName}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 pt-6 border-t border-gray-200">
                  <p className="text-gray-600 font-semibold">Thank you for your business!</p>
                  <p className="text-sm text-gray-500 mt-2">{companyName} | www.smart.com</p>
                  <p className="text-xs text-gray-400 mt-1">Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
            
            {/* Preview Footer Actions */}
            <div className="bg-white border-t p-2 sm:p-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <span className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${isConfirmed ? 'bg-green-500' : 'bg-blue-500'}`}></span>
                Status: {isConfirmed ? 'Confirmed Sales Order' : 'Draft Invoice'}
              </div>
              <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => setShowPreviewModal(false)}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-xs sm:text-sm"
                >
                  Close Preview
                </button>
                <button 
                  onClick={() => {
                    setShowPreviewModal(false);
                    handleActionClick('Print');
                  }}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-[#714B67] text-white rounded-lg hover:bg-[#5a3c52] font-medium text-xs sm:text-sm"
                >
                  Print Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Document Modal with Logo */}
      {showDocumentModal && (
        <div className="fixed inset-0 bg-slate-900/40 z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg">Send Invoice</h3>
              <XMarkIcon className="w-5 h-5 cursor-pointer" onClick={() => setShowDocumentModal(false)} />
            </div>
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Email Form */}
                <div>
                  <h4 className="font-bold mb-4 text-slate-800">Email Details</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">To:</label>
                      <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2 text-sm" placeholder="Enter customer email" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Subject:</label>
                      <input type="text" value={`Invoice ${invoiceNumber} - ${customer}`} readOnly className="w-full border border-slate-300 rounded px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Message:</label>
                      <textarea className="w-full h-32 border border-slate-300 rounded px-3 py-2 text-sm" defaultValue={`Dear ${customer},\n\nPlease find your invoice ${invoiceNumber} attached.\n\nTotal Amount: ₹${(untaxedAmount + (untaxedAmount * ((includeCGST ? 0.09 : 0) + (includeSGST ? 0.09 : 0)))).toFixed(2)}\n\nThank you for your business.\n\nBest regards`} />
                    </div>
                  </div>
                </div>
                
                {/* Invoice Preview with Logo */}
                <div>
                  <h4 className="font-bold mb-4 text-slate-800">Invoice Preview</h4>
                  <div className="bg-white border rounded-lg p-4 max-h-96 overflow-y-auto">
                    {/* Header with Logo */}
                    <div className="flex justify-between items-center mb-4 pb-3 border-b">
                      <div className="flex items-center gap-3">
                        <img src={companyLogo} alt="Logo" className="h-12 w-auto" />
                      </div>
                      <div className="text-right">
                        <h2 className="text-lg font-bold text-[#714B67]">INVOICE</h2>
                        <p className="text-sm text-gray-600">{invoiceNumber}</p>
                        <p className="text-sm text-gray-600">{new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    {/* Customer Info */}
                    <div className="mb-4">
                      <h5 className="font-bold text-sm mb-2">Bill To:</h5>
                      <p className="font-medium">{customer}</p>
                      {customerPhone && <p className="text-sm text-gray-600">Phone: {customerPhone}</p>}
                      {customerGST && <p className="text-sm text-gray-600">GST: {customerGST}</p>}
                    </div>
                    
                    {/* Products */}
                    {orderLines.length > 0 && (
                      <div className="mb-4">
                        <h5 className="font-bold text-sm mb-2">Products:</h5>
                        <div className="space-y-1">
                          {orderLines.map(line => (
                            <div key={line.id} className="flex justify-between text-sm">
                              <span>{line.product || 'Product'} (x{line.quantity})</span>
                              <span>₹{calculateSubtotal(line).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Totals */}
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Subtotal:</span>
                        <span>₹{untaxedAmount.toFixed(2)}</span>
                      </div>
                      {includeCGST && (
                        <div className="flex justify-between text-sm mb-1">
                          <span>CGST (9%):</span>
                          <span>₹{(untaxedAmount * 0.09).toFixed(2)}</span>
                        </div>
                      )}
                      {includeSGST && (
                        <div className="flex justify-between text-sm mb-1">
                          <span>SGST (9%):</span>
                          <span>₹{(untaxedAmount * 0.09).toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total:</span>
                        <span>₹{(untaxedAmount + (untaxedAmount * ((includeCGST ? 0.09 : 0) + (includeSGST ? 0.09 : 0)))).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t flex justify-end gap-2">
              <button onClick={() => setShowDocumentModal(false)} className="bg-white border px-4 py-2 rounded">Cancel</button>
              <button onClick={() => {
                if (!customerEmail.trim()) {
                  alert('Please enter customer email address');
                  return;
                }
                saveToSalesDashboard();
                addChatMessage(`📧 Invoice ${invoiceNumber} sent successfully to ${customerEmail}`);
                setShowDocumentModal(false);
                alert(`Email sent successfully to ${customerEmail}!`);
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

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-black/60 z-[250] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💳</span>
                  <div>
                    <h3 className="font-bold text-lg">Online Payment</h3>
                    <p className="text-white/80 text-sm">Scan QR to Pay</p>
                  </div>
                </div>
                <button onClick={() => setShowQRScanner(false)} className="text-white/80 hover:text-white">
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 text-center">
              <div className="bg-white border-4 border-gray-200 rounded-lg p-4 mb-4 inline-block">
                <div className="w-48 h-48 bg-gray-100 rounded flex items-center justify-center">
                  <div className="grid grid-cols-8 gap-1 w-40 h-40">
                    {Array.from({length: 64}, (_, i) => (
                      <div key={i} className={`w-full h-full ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`} />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span>Amount:</span>
                  <span className="font-bold text-xl text-green-600">₹{(untaxedAmount + (untaxedAmount * 0.18)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>UPI ID:</span>
                  <span className="font-mono text-sm">{upiId}</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button onClick={() => setShowQRScanner(false)} className="flex-1 bg-gray-500 text-white py-2 rounded">Close</button>
                <button onClick={() => {
                  addChatMessage(`💳 Payment completed for ₹${(untaxedAmount + (untaxedAmount * 0.18)).toFixed(2)}`);
                  setShowQRScanner(false);
                }} className="flex-1 bg-green-500 text-white py-2 rounded">Payment Done</button>
              </div>
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
          <button onClick={() => isEditing ? navigate('/sdashboardpage') : window.history.back()} className="flex items-center gap-1.5 px-2 py-1 text-slate-600 hover:bg-slate-100 rounded">
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
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              {isEditing ? 
                (isConfirmed ? `Invoice - ${editingOrderId}` : `Edit Draft Invoice - ${editingOrderId}`) : 
                (isConfirmed ? 'New Invoice' : 'New Invoice')
              }
            </h1>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${isConfirmed ? 'bg-green-500' : 'bg-orange-500'}`}>
                {isConfirmed ? 'FINALIZED' : 'DRAFT'}
              </span>
              <span className="text-sm text-slate-500">#{invoiceNumber}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-6 sm:mb-8">
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-start">
                <label className={`text-sm sm:text-base font-bold ${showError ? 'text-red-600' : 'text-[#bb4d4d]'}`}>Customer</label>
                {isConfirmed ? (
                  <div className="sm:col-span-2 flex items-center gap-2">
                    <span className="py-2 text-sm sm:text-base text-teal-700 font-medium">{customer}</span>
                    <button 
                      onClick={() => setShowCustomerHistory(true)}
                      className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200"
                    >
                      History
                    </button>
                  </div>
                ) : (
                  <input type="text" placeholder="Type customer name..." value={customer} onChange={(e) => setCustomer(e.target.value)} className={`sm:col-span-2 border-b outline-none py-2 text-sm sm:text-base text-teal-700 ${showError ? 'border-red-500 bg-red-50' : 'border-teal-500/30'}`} />
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-start">
                <label className="text-sm sm:text-base font-bold text-[#bb4d4d]">Phone</label>
                <input disabled={isConfirmed} type="tel" placeholder="Customer phone..." value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="sm:col-span-2 border-b border-slate-200 outline-none py-2 text-sm sm:text-base" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-start">
                <label className="text-sm sm:text-base font-bold text-[#bb4d4d]">GST Number</label>
                <input disabled={isConfirmed} type="text" placeholder="GST number..." value={customerGST} onChange={(e) => setCustomerGST(e.target.value)} className="sm:col-span-2 border-b border-slate-200 outline-none py-2 text-sm sm:text-base" />
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
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-bold text-slate-700 mb-3">Company Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <strong className="text-sm min-w-[60px]">Logo:</strong>
                    <div className="flex items-center gap-2 flex-1">
                      <img src={companyLogo} alt="Logo" className="w-8 h-8 object-contain border rounded" />
                      <input 
                        disabled={isConfirmed}
                        type="file" 
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-[#714B67] file:text-white hover:file:bg-[#5a3c52]"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <strong className="text-sm min-w-[60px]">Name:</strong>
                    <input 
                      disabled={isConfirmed} 
                      type="text" 
                      value={companyName} 
                      onChange={(e) => setCompanyName(e.target.value)} 
                      className="flex-1 border-b border-slate-200 outline-none py-1 text-sm bg-transparent" 
                      placeholder="Company name"
                    />
                  </div>
                  <div className="flex items-start gap-2">
                    <strong className="text-sm min-w-[60px] mt-1">Address:</strong>
                    <textarea 
                      disabled={isConfirmed} 
                      value={companyAddress} 
                      onChange={(e) => setCompanyAddress(e.target.value)} 
                      className="flex-1 border-b border-slate-200 outline-none py-1 text-sm bg-transparent resize-none" 
                      placeholder="Company address"
                      rows="2"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <strong className="text-sm min-w-[60px]">GST:</strong>
                    <input 
                      disabled={isConfirmed} 
                      type="text" 
                      value={companyGST} 
                      onChange={(e) => setCompanyGST(e.target.value)} 
                      className="flex-1 border-b border-slate-200 outline-none py-1 text-sm bg-transparent" 
                      placeholder="GST number"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                <label className="text-sm sm:text-base font-bold">Due Date</label>
                <input disabled={isConfirmed} type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="sm:col-span-2 border-b border-slate-200 outline-none py-2 text-sm sm:text-base" />
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center relative">
                <label className="text-sm sm:text-base font-bold">Payment Method</label>
                <div ref={paymentMethodRef} onClick={() => !isConfirmed && setIsPaymentMethodOpen(!isPaymentMethodOpen)} className={`sm:col-span-2 py-2 text-sm sm:text-base border-b ${!isConfirmed ? 'cursor-pointer hover:border-teal-500' : 'border-transparent'} flex justify-between items-center`}>
                  <span className="font-medium text-teal-700">{paymentMethod}</span>
                  {!isConfirmed && <ChevronDownIcon className="w-3 h-3 text-teal-600" />}
                </div>
                {isPaymentMethodOpen && (
                  <div className="absolute top-full left-0 sm:left-[33.33%] w-full sm:w-[66.66%] bg-white border shadow-xl rounded z-50 py-1 mt-1">
                    {paymentMethods.map((method) => (
                      <div 
                        key={method} 
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setPaymentMethod(method); 
                          setIsPaymentMethodOpen(false); 
                        }} 
                        className="px-4 py-2 hover:bg-slate-50 cursor-pointer text-sm"
                      >
                        {method}
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
                    
                    {/* UPDATED PRODUCT CELL WITH DROPDOWN */}
                    <td className="py-1 sm:py-2 pl-1 sm:pl-2 relative">
                      <input 
                        disabled={isConfirmed} 
                        type="text" 
                        value={line.product} 
                        onFocus={() => !isConfirmed && setActiveSearchId(line.id)}
                        onBlur={() => setTimeout(() => setActiveSearchId(null), 150)}
                        onChange={(e) => {
                          updateLine(line.id, 'product', e.target.value);
                          setActiveSearchId(line.id);
                        }} 
                        className="w-full outline-none bg-transparent text-teal-700 text-xs sm:text-sm" 
                        placeholder="Product" 
                      />
                      {/* Product Selection List */}
                      {!isConfirmed && activeSearchId === line.id && line.product.length > 0 && (
                        <div className="absolute top-full left-0 w-full bg-white border border-slate-200 shadow-xl z-[999] rounded-b overflow-hidden">
                          {availableProducts
                            .filter(p => p.name.toLowerCase().includes(line.product.toLowerCase()))
                            .map(prod => (
                              <div 
                                key={prod.id}
                                onMouseDown={() => handleProductSelect(line.id, prod)}
                                className="px-3 py-2 hover:bg-slate-50 cursor-pointer flex justify-between items-center text-xs"
                              >
                                <span className="font-bold text-slate-700">{prod.name}</span>
                                <span className="text-teal-600 font-bold">₹{prod.price}</span>
                              </div>
                            ))}
                          {/* Add New Product Option */}
                          <div 
                            onMouseDown={() => {
                              setNewProductData({...newProductData, name: line.product});
                              setShowAddProductModal(true);
                            }}
                            className="px-3 py-2 hover:bg-blue-50 cursor-pointer border-t border-slate-200 text-xs bg-blue-25"
                          >
                            <span className="text-blue-600 font-bold">+ Add "{line.product}" as new product</span>
                          </div>
                        </div>
                      )}
                    </td>

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
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-slate-500">Total Discount:</span>
                  <span className="text-slate-700">-₹ {totalDiscount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={includeCGST} onChange={(e) => setIncludeCGST(e.target.checked)} disabled={isConfirmed} className="w-3 h-3" />
                    <span className="text-slate-500">CGST (9%):</span>
                  </div>
                  <span className="text-slate-700">₹ {includeCGST ? (untaxedAmount * 0.09).toFixed(2) : '0.00'}</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={includeSGST} onChange={(e) => setIncludeSGST(e.target.checked)} disabled={isConfirmed} className="w-3 h-3" />
                    <span className="text-slate-500">SGST (9%):</span>
                  </div>
                  <span className="text-slate-700">₹ {includeSGST ? (untaxedAmount * 0.09).toFixed(2) : '0.00'}</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-slate-500">Advance Payment:</span>
                  <input 
                    disabled={isConfirmed} 
                    type="number" 
                    value={advancePayment} 
                    onChange={(e) => setAdvancePayment(parseFloat(e.target.value) || 0)} 
                    className="w-20 sm:w-24 text-right outline-none border-b border-slate-200 py-1 text-xs sm:text-sm" 
                    placeholder="0.00"
                  />
                </div>
                <div className="border-t border-slate-200 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium text-sm sm:text-base">Total:</span>
                    <span className="font-bold text-slate-900 text-base sm:text-lg">₹ {(untaxedAmount + (untaxedAmount * ((includeCGST ? 0.09 : 0) + (includeSGST ? 0.09 : 0)))).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs sm:text-sm text-orange-600">
                    <span className="font-medium">Remaining Amount:</span>
                    <span className="font-bold">₹ {Math.max(0, (untaxedAmount + (untaxedAmount * ((includeCGST ? 0.09 : 0) + (includeSGST ? 0.09 : 0)))) - advancePayment).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Terms & Conditions */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-slate-700 mb-3">Terms & Conditions</h3>
                <textarea 
                  disabled={isConfirmed} 
                  value={termsConditions} 
                  onChange={(e) => setTermsConditions(e.target.value)} 
                  className="w-full h-24 border border-slate-200 rounded p-3 text-xs resize-none"
                  placeholder="Enter terms and conditions..."
                />
              </div>
              <div>
                <h3 className="font-bold text-slate-700 mb-3">Bank Details</h3>
                <textarea 
                  disabled={isConfirmed} 
                  value={bankDetails} 
                  onChange={(e) => setBankDetails(e.target.value)} 
                  className="w-full h-24 border border-slate-200 rounded p-3 text-xs resize-none"
                  placeholder="Enter bank details..."
                />
              </div>
            </div>
            
            {/* Signature Section */}
            {showSignature && (
              <div className="mt-8 flex justify-between items-end">
                <div className="text-center">
                  <div className="w-48 border-b border-slate-300 mb-2"></div>
                  <p className="text-xs text-slate-600">Customer Signature</p>
                </div>
                <div className="text-center">
                  <div className="w-48 border-b border-slate-300 mb-2"></div>
                  <p className="text-xs text-slate-600">Authorized Signature</p>
                </div>
              </div>
            )}
          </div>
        </main>

        <aside className="w-full lg:w-[380px] bg-white border-l lg:border-l border-t lg:border-t-0 flex flex-col">
          <div className="p-2 border-b">
            <button className="bg-[#714B67] text-white px-3 py-1 rounded font-bold text-[10px] sm:text-[11px]">Send message</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 sm:space-y-6 max-h-64 lg:max-h-none">
            {chatHistory.length === 0 ? (
              <div className="italic text-slate-400 text-[10px] sm:text-[11px]">
                {isEditing ? `Editing ${editingOrder.status.toLowerCase()}...` : 'Creating a new record...'}
              </div>
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

      {/* Customer History Modal */}
      {showCustomerHistory && (
        <div className="fixed inset-0 bg-slate-900/40 z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg">Customer History - {customer}</h3>
              <XMarkIcon className="w-5 h-5 cursor-pointer" onClick={() => setShowCustomerHistory(false)} />
            </div>
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {getCustomerHistory().length > 0 ? (
                <div className="space-y-4">
                  {getCustomerHistory().map((order, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-slate-50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-slate-900">{order.id}</h4>
                          <p className="text-sm text-slate-600">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">₹{(Number(order.total) || 0).toFixed(2)}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold text-white ${order.paymentStatus === 'Paid' ? 'bg-green-500' : order.paymentStatus === 'Overdue' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                            {order.paymentStatus || 'Pending'}
                          </span>
                        </div>
                      </div>
                      {order.items && order.items.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-slate-700 mb-1">Items:</p>
                          <div className="text-xs text-slate-600">
                            {order.items.map((item, i) => (
                              <span key={i}>{item.product} (x{item.quantity}){i < order.items.length - 1 ? ', ' : ''}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <p>No previous orders found for this customer</p>
                </div>
              )}
            </div>
            <div className="p-4 bg-slate-50 border-t flex justify-end">
              <button onClick={() => setShowCustomerHistory(false)} className="bg-white border px-4 py-2 rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewInvoice;  