import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChartBarIcon, CurrencyRupeeIcon, UserGroupIcon, 
  TrendingUpIcon, CalendarIcon, ArrowLeftIcon,
  DocumentTextIcon, ClockIcon, ExclamationTriangleIcon,
  CheckCircleIcon, XCircleIcon, BanknotesIcon,
  PrinterIcon, ArrowDownTrayIcon, FunnelIcon
} from '@heroicons/react/24/outline';

const SalesAnalytics = () => {
  const navigate = useNavigate();
  const [quotations, setQuotations] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    const savedQuotations = JSON.parse(localStorage.getItem('quotations') || '[]');
    setQuotations(savedQuotations);
  }, []);

  const analytics = useMemo(() => {
    const now = new Date();
    let filteredData = quotations;

    // Apply date filtering
    if (dateRange.start && dateRange.end) {
      filteredData = quotations.filter(q => {
        const orderDate = new Date(q.date);
        return orderDate >= new Date(dateRange.start) && orderDate <= new Date(dateRange.end);
      });
    } else {
      filteredData = quotations.filter(q => {
        const orderDate = new Date(q.date);
        switch(selectedPeriod) {
          case 'today':
            return orderDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return orderDate >= weekAgo;
          case 'month':
            return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
          case 'quarter':
            const quarter = Math.floor(now.getMonth() / 3);
            const orderQuarter = Math.floor(orderDate.getMonth() / 3);
            return orderQuarter === quarter && orderDate.getFullYear() === now.getFullYear();
          case 'year':
            return orderDate.getFullYear() === now.getFullYear();
          default:
            return true;
        }
      });
    }

    // Core metrics
    const totalRevenue = filteredData.reduce((sum, q) => sum + (q.total || 0), 0);
    const totalOrders = filteredData.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const confirmedOrders = filteredData.filter(q => q.status === 'Sales Order').length;
    const conversionRate = totalOrders > 0 ? (confirmedOrders / totalOrders) * 100 : 0;

    // Advanced metrics
    const totalAdvanceReceived = filteredData.reduce((sum, q) => sum + (q.advancePayment || 0), 0);
    const outstandingAmount = totalRevenue - totalAdvanceReceived;
    const paidOrders = filteredData.filter(q => q.paymentStatus === 'Paid').length;
    const overdueOrders = filteredData.filter(q => q.paymentStatus === 'Overdue').length;
    const collectionEfficiency = totalRevenue > 0 ? (totalAdvanceReceived / totalRevenue) * 100 : 0;

    // Customer analysis
    const customerStats = {};
    filteredData.forEach(q => {
      if (!customerStats[q.customer]) {
        customerStats[q.customer] = { orders: 0, revenue: 0, lastOrder: q.date };
      }
      customerStats[q.customer].orders += 1;
      customerStats[q.customer].revenue += q.total || 0;
      if (new Date(q.date) > new Date(customerStats[q.customer].lastOrder)) {
        customerStats[q.customer].lastOrder = q.date;
      }
    });

    const topCustomers = Object.entries(customerStats)
      .sort(([,a], [,b]) => b.revenue - a.revenue)
      .slice(0, 10);

    // Product analysis
    const productStats = {};
    filteredData.forEach(q => {
      q.items?.forEach(item => {
        if (!productStats[item.product]) {
          productStats[item.product] = { quantity: 0, revenue: 0, orders: 0 };
        }
        productStats[item.product].quantity += item.quantity || 0;
        productStats[item.product].revenue += (item.quantity || 0) * (item.unitPrice || 0);
        productStats[item.product].orders += 1;
      });
    });

    const topProducts = Object.entries(productStats)
      .sort(([,a], [,b]) => b.revenue - a.revenue)
      .slice(0, 10);

    // Payment status analysis
    const paymentStats = {
      paid: filteredData.filter(q => q.paymentStatus === 'Paid').length,
      pending: filteredData.filter(q => q.paymentStatus === 'Pending').length,
      overdue: filteredData.filter(q => q.paymentStatus === 'Overdue').length
    };

    return {
      totalRevenue,
      totalOrders,
      avgOrderValue,
      conversionRate,
      totalAdvanceReceived,
      outstandingAmount,
      collectionEfficiency,
      paidOrders,
      overdueOrders,
      topCustomers,
      topProducts,
      paymentStats,
      customerCount: Object.keys(customerStats).length
    };
  }, [quotations, selectedPeriod, dateRange]);

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Metric,Value\n" +
      `Total Revenue,₹${analytics.totalRevenue.toFixed(2)}\n` +
      `Total Orders,${analytics.totalOrders}\n` +
      `Average Order Value,₹${analytics.avgOrderValue.toFixed(2)}\n` +
      `Conversion Rate,${analytics.conversionRate.toFixed(2)}%\n` +
      `Collection Efficiency,${analytics.collectionEfficiency.toFixed(2)}%`;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sales-analytics-${selectedPeriod}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/sdashboardpage')}
                className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span className="font-medium">Dashboard</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">Sales Analytics</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={exportData}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <PrinterIcon className="w-4 h-4" />
                Print
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Advanced Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              <FunnelIcon className="w-5 h-5 text-gray-400" />
              <span className="font-medium text-gray-900">Filters:</span>
              
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="all">All Time</option>
              </select>
            </div>
            
            <div className="flex items-center gap-3">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <span className="text-gray-500">to</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              {(dateRange.start || dateRange.end) && (
                <button
                  onClick={() => setDateRange({start: '', end: ''})}
                  className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{analytics.totalRevenue.toFixed(2)}</p>
                <p className="text-xs text-green-600 mt-1">+12% from last period</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CurrencyRupeeIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalOrders}</p>
                <p className="text-xs text-blue-600 mt-1">{analytics.customerCount} customers</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <DocumentTextIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold text-gray-900">₹{analytics.avgOrderValue.toFixed(2)}</p>
                <p className="text-xs text-purple-600 mt-1">Per transaction</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUpIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Collection Rate</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.collectionEfficiency.toFixed(1)}%</p>
                <p className="text-xs text-orange-600 mt-1">₹{analytics.totalAdvanceReceived.toFixed(2)} collected</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <BanknotesIcon className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
              Payment Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">Paid</span>
                </div>
                <span className="font-bold text-green-600">{analytics.paymentStats.paid}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">Pending</span>
                </div>
                <span className="font-bold text-yellow-600">{analytics.paymentStats.pending}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">Overdue</span>
                </div>
                <span className="font-bold text-red-600">{analytics.paymentStats.overdue}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <UserGroupIcon className="w-5 h-5 text-blue-500" />
              Top Customers
            </h3>
            <div className="space-y-3">
              {analytics.topCustomers.slice(0, 5).map(([customer, stats], index) => (
                <div key={customer} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{customer}</p>
                      <p className="text-xs text-gray-500">{stats.orders} orders</p>
                    </div>
                  </div>
                  <p className="font-bold text-green-600 text-sm">₹{stats.revenue.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ChartBarIcon className="w-5 h-5 text-purple-500" />
              Top Products
            </h3>
            <div className="space-y-3">
              {analytics.topProducts.slice(0, 5).map(([product, stats], index) => (
                <div key={product} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-purple-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{product}</p>
                      <p className="text-xs text-gray-500">{stats.quantity} units</p>
                    </div>
                  </div>
                  <p className="font-bold text-green-600 text-sm">₹{stats.revenue.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Outstanding Amounts Alert */}
        {analytics.outstandingAmount > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3">
              <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />
              <div>
                <h3 className="font-semibold text-yellow-800">Outstanding Payments</h3>
                <p className="text-yellow-700">
                  You have ₹{analytics.outstandingAmount.toFixed(2)} in outstanding payments from {analytics.paymentStats.pending + analytics.paymentStats.overdue} orders.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesAnalytics;