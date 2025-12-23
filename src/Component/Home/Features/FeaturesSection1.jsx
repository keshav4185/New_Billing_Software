
import React, { useEffect, useState } from 'react';

// Reusing a simplified version of the Button component for self-containment
const Button = ({ children, primary = false, outline = false, className = '' }) => {
    const baseClasses = 'px-6 py-3 font-semibold rounded-lg transition duration-200 text-sm md:text-base shadow-md';
    let styleClasses;
    if (primary) {
        styleClasses = 'bg-purple-main text-white hover:bg-[#4a3249]';
    } else if (outline) {
        styleClasses = 'bg-white text-black border border-gray-300 hover:bg-[#7A4B6D] hover:text-black';
    } else {
        styleClasses = 'bg-teal-highlight text-black hover:bg-[#7A4B6D] hover:text-black';
    } 

    return (
        <button className={`${baseClasses} ${styleClasses} ${className}`}>
            {children}
        </button>
    );
};

const FeaturesSection1 = () => {
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
        <section className="py-24 md:py-32 relative overflow-hidden">
            {/* Background Image with Parallax */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
                style={{
                    backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
                            <defs>
                                <linearGradient id="featuresBg" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:%23f8fafc;stop-opacity:1" />
                                    <stop offset="50%" style="stop-color:%23e2e8f0;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:%23cbd5e1;stop-opacity:1" />
                                </linearGradient>
                                <pattern id="invoice-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="%237A4B6D" stroke-width="0.5" opacity="0.1"/>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(%23featuresBg)"/>
                            <rect width="100%" height="100%" fill="url(%23invoice-grid)"/>
                            <circle cx="300" cy="200" r="120" fill="%237A4B6D" opacity="0.05"/>
                            <circle cx="900" cy="600" r="150" fill="%2315b090" opacity="0.04"/>
                        </svg>
                    `)}')
                    `,
                    transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px) scale(1.05)`
                }}
            ></div>
            
            {/* Parallax Layer 1 */}
            <div 
                className="absolute inset-0 opacity-15 transition-transform duration-800 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`
                }}
            >
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
            </div>
            <div 
                className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center transition-transform duration-300 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                }}
            >
                
                {/* Main Headline */}
                <h1 className="text-3xl md:text-7xl font-handwriting text-[#7A4B6D] leading-tight mb-4 font-extrabold drop-shadow-lg">
                    The <span className="text-purple-main">Invoicing</span>
                </h1>
                <h1 className="text-3xl md:text-7xl font-handwriting text-[#7A4B6D] leading-tight mb-8 font-extrabold drop-shadow-lg">
                    Features You Need
                </h1>
                
                {/* Subtext */}
                <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-10">
                    From simple billing to automated payment collection and comprehensive reporting, Odoo does it all seamlessly.
                </p>

                {/* Call-to-Action Buttons */}
                <div className="flex justify-center space-x-4">
                    <a href="trypage"><Button className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200" outline>
                        Try It Free
                    </Button></a>
                    <Button className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                        Watch Demo
                    </Button>
                </div>
                
                {/* Optional: Small trust indicator */}
                <p className="mt-8 text-sm text-gray-500">
                    Trusted by 7+ million users worldwide.
                </p>

            </div>
            
            {/* Background elements (Odoo style swooshes/shapes) */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-highlight rounded-full opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-main rounded-full opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>

        </section>
    );
};

export default FeaturesSection1;