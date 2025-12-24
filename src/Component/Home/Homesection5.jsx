// src/Component/Home/Homesection5.jsx
import React, { useEffect, useState } from 'react';

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
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Image with Parallax */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
                style={{
                    backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
                            <defs>
                                <linearGradient id="paymentBg" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:%23f1f5f9;stop-opacity:1" />
                                    <stop offset="50%" style="stop-color:%23e2e8f0;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:%23cbd5e1;stop-opacity:1" />
                                </linearGradient>
                                <pattern id="lightning" width="60" height="60" patternUnits="userSpaceOnUse">
                                    <path d="M30 10 L20 35 L35 35 L25 50 L40 25 L25 25 Z" fill="%23fbbf24" opacity="0.1"/>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(%23paymentBg)"/>
                            <rect width="100%" height="100%" fill="url(%23lightning)"/>
                            <circle cx="200" cy="150" r="100" fill="%237c3aed" opacity="0.08"/>
                            <circle cx="1000" cy="200" r="150" fill="%233b82f6" opacity="0.06"/>
                            <circle cx="800" cy="600" r="120" fill="%236366f1" opacity="0.08"/>
                            <path d="M 0 400 Q 300 350 600 400 T 1200 400" stroke="%237c3aed" stroke-width="3" fill="none" opacity="0.15"/>
                        </svg>
                    `)}')
                    `,
                    transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px) scale(1.05)`
                }}
            ></div>
            
            {/* Parallax Layer 1 - Payment Elements */}
            <div 
                className="absolute inset-0 opacity-15 transition-transform duration-800 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`
                }}
            >
                <div className="absolute top-20 left-1/4 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
                <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
            </div>
            
            {/* Parallax Layer 2 - Lightning Effects */}
            <div 
                className="absolute inset-0 opacity-20 transition-transform duration-600 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`
                }}
            >
                <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl"></div>
            </div>
            
            {/* Top Headline Area (outside the main content box) */}
            <div 
                className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center pb-12 transition-transform duration-300 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                }}
            >
                <div className="relative inline-block">
                    <p className="font-headline text-1xl md:text-2xl text-gray-700 mb-3 absolute -top-20 left-1/2 transform -translate-x-1/2 rotate-[-5deg] elc">
                        So fast you'll get a ticket
                        <span className="block text-2xl mt-1">↑</span>
                    </p>
                    <h2 className="font-headline text-4xl md:text-6xl leading-tight elc text-[#7A4B6D] font-extrabold   ">
                        Get paid in a <span className="text-purple-main">Flash</span>
                    </h2>
                    {/* Lightning Bolt Doodles with Parallax */}
                    <span 
                        className="absolute top-0 right-[-60px] text-7xl md:text-6xl text-yellow-500 transition-transform duration-500"
                        style={{transform: `translate(${mousePosition.x * 0.08}px, ${mousePosition.y * 0.08}px)`}}
                    >⚡</span>
                    <span 
                        className="absolute top-[-20px] right-[-80px] text-4xl text-yellow-500 opacity-70 transition-transform duration-700"
                        style={{transform: `translate(${mousePosition.x * 0.12}px, ${mousePosition.y * 0.12}px)`}}
                    >⚡</span>
                </div>
            </div>

            {/* Main Content Area: Card and Text */}
            <div 
                className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 transition-transform duration-400 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
                }}
            >
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
                       
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Homesection5;