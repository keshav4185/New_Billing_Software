// src/Component/Home/Homesection1.jsx
import React, { useEffect, useState } from 'react';

// Reusing the button component locally for styling consistency
const Button = ({ children, primary = false, outline = false, className = '', ...props }) => {
    const baseClasses = 'px-6 py-3 font-semibold rounded-lg transition duration-200 cursor-pointer text-base';
    
    let styleClasses;
    if (primary) {
        // Unique button style for 'Start now - It's free'
        styleClasses = 'bg-purple-main text-white hover:bg-purple-700 shadow-md';
    } else if (outline) {
        // Unique button style for 'Meet an advisor' (minimal border/shadow)
        styleClasses = 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 shadow-sm';
    } else {
        styleClasses = 'text-gray-600';
    }

    return (
        <button className={`${baseClasses} ${styleClasses} ${className}`} {...props}>
            {children}
        </button>
    );
};


const Homesection1 = () => {
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
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Image with Parallax */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out"
                style={{
                    backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
                            <defs>
                                <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:%23f8fafc;stop-opacity:1" />
                                    <stop offset="50%" style="stop-color:%23e0e7ff;stop-opacity:0" />
                                    <stop offset="100%" style="stop-color:%23ddd6fe;stop-opacity:1" />
                                </linearGradient>
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="%23e2e8f0" stroke-width="0.5" opacity="0.3"/>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(%23bg)"/>
                            <rect width="100%" height="100%" fill="url(%23grid)"/>
                            <circle cx="200" cy="150" r="80" fill="%237c3aed" opacity="0.1"/>
                            <circle cx="900" cy="200" r="120" fill="%233b82f6" opacity="0.08"/>
                            <circle cx="1000" cy="600" r="100" fill="%236366f1" opacity="0.1"/>
                            <rect x="100" y="400" width="200" height="4" fill="%237c3aed" opacity="0.2" rx="2"/>
                            <rect x="800" y="500" width="150" height="4" fill="%233b82f6" opacity="0.2" rx="2"/>
                            <rect x="300" y="300" width="100" height="4" fill="%236366f1" opacity="0.2" rx="2"/>
                        </svg>
                    `)}')
                    `,
                    transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px) scale(1.1)`
                }}
            ></div>
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-blue-50/60 to-indigo-100/80"></div>
            
            {/* Parallax Layer 1 - Financial Elements */}
            <div 
                className="absolute inset-0 opacity-15 transition-transform duration-1000 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`
                }}
            >
                <div className="absolute top-20 left-20 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl pulse-slow"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl pulse-slow" style={{animationDelay: '2s'}}></div>
            </div>
            
            {/* Parallax Layer 2 - Chart Elements */}
            <div 
                className="absolute inset-0 opacity-12 transition-transform duration-700 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.06}px, ${mousePosition.y * 0.06}px)`
                }}
            >
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl pulse-slow" style={{animationDelay: '1s'}}></div>
            </div>
            
            {/* Parallax Layer 3 - Floating UI Elements */}
            <div 
                className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-500 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.08}px, ${mousePosition.y * 0.08}px)`
                }}
            >
                <div className="absolute top-1/4 left-1/5 w-6 h-6 bg-purple-500 rounded opacity-25 float-animation"></div>
                <div className="absolute top-1/3 right-1/5 w-8 h-8 bg-blue-500 rounded-full opacity-20 float-animation" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-indigo-500 rounded opacity-25 float-animation" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/2 right-1/3 w-6 h-6 bg-purple-400 rounded-full opacity-20 float-animation" style={{animationDelay: '3s'}}></div>
                <div className="absolute top-3/4 left-1/2 w-5 h-5 bg-blue-400 rounded opacity-25 float-animation" style={{animationDelay: '4s'}}></div>
            </div>
            
            {/* Content with subtle parallax */}
            <div 
                className="relative z-20 max-w-4xl mx-auto flex flex-col items-center justify-center py-20 px-6 lg:px-8 text-center min-h-screen transition-transform duration-300 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
                }}
            >
            
            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-headline leading-none mb-6 text-[#7A4B6D] font-extrabold drop-shadow-lg">
                Electronic Invoicing
            </h1>
            
            {/* Sub-headline with custom highlight */}
            <div className="text-4xl md:text-7xl font-headline leading-none mb-12">
                <span className="highlight-bg pb-2 simple text-[#7A4B6D] font-extrabold drop-shadow-md">Simple. Free.</span>
            </div>
            
            {/* Description */}
            <p className="text-xl text-gray-600 max-w-2xl mb-12">
                Odoo Invoicing makes it easy to create professional invoices and customize them to your liking.
            </p>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-4">
               <a href="trypage"> <Button className="start shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200" outline>
                    Start now - It's free
                </Button></a>
                <Button outline className="text-base py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                    Meet an advisor ▾
                </Button>
            </div>
            
            {/* Footer Text */}
            <p className="text-sm text-gray-500">
                Free, forever, with unlimited users. <a href="#" className="text-blue-500 hover:underline">See why</a>
            </p>



            </div>
        </div>
    );
};

export default Homesection1; 