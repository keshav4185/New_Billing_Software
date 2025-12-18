// src/Component/Home/Homesection5.jsx
import React from 'react';

// Simplified component for the Invoice Payment Portal Card
const PaymentPortalCard = () => {
    return (
        <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-2xl border border-gray-100 mx-auto">
            
            {/* Breadcrumb / Invoice Number */}
            <div className="text-xs text-gray-500 mb-4">
                <a href="#" className="hover:text-purple-main">🏠 Invoices & Bills</a> / INV/2024/00005
            </div>

            {/* Total Amount */}
            <h3 className="text-3xl font-bold text-gray-900 mb-1">$4,427.50</h3>
            
            {/* Due Date */}
            <div className="flex items-center text-sm text-gray-500 mb-6 pb-4 border-b">
                <span className="mr-1">🕒</span> Due in 30 days
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
                <button className="w-full py-3 font-semibold text-white bg-purple-main rounded-lg shadow-md hover:bg-[#4a3249] transition">
                    <span className="mr-2">💳</span> Pay Now
                </button>
                <button className="w-full py-3 font-semibold text-gray-700 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                    <span className="mr-2">⬇️</span> Download
                </button>
            </div>

            {/* Salesperson / Contact Info */}
            <div className="mt-6 pt-4 border-t text-sm space-y-2">
                <div className="flex items-center">
                    <span className="mr-2">👤</span> 
                    <div>
                        <p className="font-semibold">Mitchell Admin</p>
                        <p className="text-xs text-blue-500 cursor-pointer hover:underline">Send message</p>
                    </div>
                </div>
                <p className="text-gray-600">📍 Scranton, United States</p>
                <p className="text-gray-600">📞 +1 555-555-5555</p>
            </div>
        </div>
    );
};

const Homesection5 = () => {
    return (
        <section className="py-24 bg-gray-100/50 relative overflow-hidden">
            
            {/* Top Headline Area (outside the main content box) */}
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center pb-12">
                <div className="relative inline-block">
                    <p className="font-headline text-1xl md:text-2xl text-gray-700 mb-3 absolute -top-20 left-1/2 transform -translate-x-1/2 rotate-[-5deg] elc">
                        So fast you'll get a ticket
                        <span className="block text-2xl mt-1">↑</span>
                    </p>
                    <h2 className="font-headline text-4xl md:text-6xl leading-tight elc text-[#7A4B6D] font-extrabold   ">
                        Get paid in a <span className="text-purple-main">Flash</span>
                    </h2>
                    {/* Lightning Bolt Doodles */}
                    <span className="absolute top-0 right-[-60px] text-7xl md:text-6xl text-yellow-500">⚡</span>
                    <span className="absolute top-[-20px] right-[-80px] text-4xl text-yellow-500 opacity-70">⚡</span>
                </div>
            </div>

            {/* Main Content Area: Card and Text */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between">
                    
                    {/* Left Column: Invoice Card */}
                    <div className="lg:w-1/2 w-full flex justify-center lg:justify-end mb-12 lg:mb-0">
                        <PaymentPortalCard />
                    </div>
                    
                    {/* Right Column: Payment Info and Logos */}
                    <div className="lg:w-1/2 w-full lg:pl-16 lg:pt-10 lg:text-left text-center">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Online payments.</h3>
                        <p className="text-lg text-gray-700 mb-8 max-w-md mx-auto lg:mx-0">
                            Redirect your clients to a flawless customer portal and let them pay with their preferred online payment method.
                        </p>

                        {/* Payment Logos (Simplified placeholders) */}
                        <div className="flex flex-wrap justify-center lg:justify-start items-center space-x-6 text-2xl font-bold text-gray-500">
                            <span className="py-2">adyen</span>
                            <span className="py-2">PayPal</span>
                            <span className="py-2">stripe</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Homesection5;