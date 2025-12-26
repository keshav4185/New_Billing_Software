// src/Component/Home/Homesection6.jsx
import React from 'react';

// Simplified component for the Invoices Dashboard/Follow-up Table
const FollowUpDashboardMockup = () => {
    return (
        <div className="w-full max-w-5xl p-4 md:p-6 bg-white rounded-xl shadow-2xl border border-gray-100 mx-auto">
            
            {/* Toolbar / Search Bar (Simplified) */}
            <div className="flex justify-between items-center pb-3 mb-4 border-b">
                <div className="flex space-x-3 text-sm">
                    <button className="px-3 py-1 rounded bg-purple-main text-white">New</button>
                    <button className="px-3 py-1 rounded border border-gray-300 text-gray-700">Upload</button>
                    <span className="text-gray-500 hidden sm:inline">Invoices ⓘ</span> {/* Hide on tiny screens */}
                </div>
                <div className="text-sm text-gray-500">1-80 / 81</div>
            </div>

            {/* Invoices Table (Responsive fix: Wrap table in scrollable div) */}
            <div className="overflow-x-auto"> 
                <table className="min-w-[700px] divide-y divide-gray-200 text-sm"> 
                    <thead>
                        <tr className="text-left text-gray-500 uppercase tracking-wider">
                            <th className="py-2 w-1/12">Number</th>
                            <th className="py-2 w-2/12">Customer</th>
                            <th className="py-2 w-1/12">Due Date</th>
                            <th className="py-2 w-3/12">Activities</th>
                            <th className="py-2 w-1/12 text-right">Total</th>
                            <th className="py-2 w-2/12 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {/* Row 1: Paid Today */}
                        <tr className="hover:bg-gray-50">
                            <td className="py-3 font-medium text-gray-900">24-0073</td>
                            <td className="py-3">Abigail Peterson</td>
                            <td className="py-3 text-green-600 font-semibold">Today</td>
                            <td className="py-3 text-blue-600">✔ Follow-up on payment</td>
                            <td className="py-3 text-right">12.00 €</td>
                            <td className="py-3 text-center"><span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-200 text-green-800">Paid</span></td>
                        </tr>
                        {/* Row 2: Overdue */}
                        <tr className="hover:bg-gray-50">
                            <td className="py-3 font-medium text-gray-900">24-0072</td>
                            <td className="py-3">YourCompany, Joel Wills</td>
                            <td className="py-3 text-red-600">Overdue</td>
                            <td className="py-3 text-blue-600">📞 Call</td>
                            <td className="py-3 text-right">750.00 €</td>
                            <td className="py-3 text-center"><span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-yellow-200 text-yellow-800">In Payment</span></td>
                        </tr>
                        {/* Row 3: Follow-up needed */}
                        <tr className="hover:bg-gray-50">
                            <td className="py-3 font-medium text-gray-900">24-0043</td>
                            <td className="py-3">Asia Foster</td>
                            <td className="py-3">28 days</td>
                            <td className="py-3 text-blue-600">ⓘ Include upsell</td>
                            <td className="py-3 text-right">88,711.50 €</td>
                            <td className="py-3 text-center"><span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-red-200 text-red-800">Not Paid</span></td>
                        </tr>
                    </tbody>
                </table>
            </div> {/* End of overflow-x-auto div */}
            
        </div>
    );
};

const Homesection6 = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                
                {/* Headline: Adjusted font sizes for better responsiveness and removed non-standard 'elc' class */}
                <h2 className="text-4xl md:text-4xl font-headline text-green-700   leading-tight mb-2 elc font-extrabold">
                    Connect your bank <span className="text-teal-highlight">☑️</span>
                </h2>
                <h3 className="text-5xl md:text-4xl font-headline leading-tight mb-8 elc text-green-700 font-extrabold">
                    <span className="text-purple-main">⚙️</span> Automate <span className="highlight-bg pb-1 inline-block">follow-ups</span>
                </h3>
                
                {/* Subtext */}
                <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-12">
                    Track open payments with clear statuses and due dates. 
                    Set reminders for entries that need follow-up.
                </p>

                {/* Dashboard Mockup */}
                <FollowUpDashboardMockup />

            </div>
        </section>
    );
};

export default Homesection6;