// src/Component/Home/Homesection4.jsx
import React from 'react';

// Using a placeholder image/div for the iPhone mock-up seen in the source image
const MobileInvoiceMockup = () => {
    return (
        <div className="relative w-full max-w-sm mx-auto shadow-2xl rounded-3xl overflow-hidden bg-white border-[10px] border-gray-900 scale-90 lg:scale-100">
            {/* Mock phone notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-xl z-20"></div>
            
            {/* The Invoice Content (simplified based on source image) */}
            <div className="p-4 pt-8">
                {/* Header with "PAID" badge */}
                <div className="relative mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Customer Invoice</h3>
                    {/* The angled "PAID" banner is complex to replicate perfectly, using a simple diagonal positioning here */}
                    <div className="absolute top-0 right-0 transform -rotate-12 translate-x-4">
                        <span className="bg-teal-highlight text-white font-bold px-4 py-1 text-sm shadow-lg">PAID</span>
                    </div>
                </div>
                
                <p className="text-sm text-gray-500">INV/2023/00327</p>
                <div className="mt-4 text-sm">
                    <p className="text-gray-600 font-medium">Customer: Fiona's Floral Cafe</p>
                    <p className="text-xs text-gray-500">Champs de Mars, Paris</p>
                    <p className="text-xs text-gray-500">Date: 09/06/2023</p>
                </div>
                
                <div className="border-t pt-4 mt-6">
                    <h4 className="font-semibold text-sm mb-2">Invoice Lines</h4>
                    {/* Item 1 */}
                    <div className="flex justify-between items-start text-sm mb-3">
                        <div>
                            <p className="font-medium">Brazilian Bouncy Brew (Big, Whole bean)</p>
                            <p className="text-xs text-gray-500">Quantity: 5.00 | Unit Price: 240.00</p>
                        </div>
                        <span className="font-bold">1,200.00 €</span>
                    </div>
                    {/* Item 2 */}
                    <div className="flex justify-between items-start text-sm mb-3">
                        <div>
                            <p className="font-medium">New partner onboarding</p>
                            <p className="text-xs text-gray-500">Quantity: 1.00 | Unit Price: 900.00</p>
                        </div>
                        <span className="font-bold">900.00 €</span>
                    </div>
                </div>
            </div>
            {/* Ensure it has enough height to simulate a phone screen */}
            <div className="h-40 bg-white"></div> 
        </div>
    );
};


const Homesection4 = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
                
                {/* Left Column: Mockup */}
                <div className="lg:w-1/2 w-full flex justify-center lg:justify-start relative z-10 mb-12 lg:mb-0">
                    <MobileInvoiceMockup />
                    {/* The Download Doodle Icon */}
                    <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 text-5xl text-teal-highlight">
                        <span role="img" aria-label="Download Icon">⬇️</span> 
                    </div>
                </div>
                
                {/* Right Column: Text and CTA */}
                <div className="lg:w-1/2 w-full lg:pl-16 lg:text-left text-center">
                    <h2 className="text-4xl font-headline text-purple-main leading-tight mb-6 elc text-green-700  font-extrabold">
                        Your invoices <span className="highlight-bg pb-1 inline-block">in your pocket</span>
                    </h2>
                    
                    <p className="text-xl text-gray-700 mb-10">
                        Use the **mobile app** to issue invoices to your customers, update payment status, 
                        or even create batch payments for your vendor bills! Anytime, anywhere.
                    </p>

                    {/* App Store Buttons */}
                    <div className="flex justify-center lg:justify-start space-x-4">
                        {/* Google Play Button */}
                        <a href="#" className="flex items-center bg-gray-100 p-3 rounded-xl hover:shadow transition">
                            <span className="text-3xl mr-2">▶️</span> 
                            <div><p className="text-xs text-gray-600">Get it on</p><p className="font-semibold">Google Play</p></div>
                        </a>
                        {/* App Store Button */}
                        <a href="#" className="flex items-center bg-gray-100 p-3 rounded-xl hover:shadow transition">
                            <span className="text-3xl mr-2"></span> 
                            <div><p className="text-xs text-gray-600">Download on</p><p className="font-semibold">the App Store</p></div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Homesection4;