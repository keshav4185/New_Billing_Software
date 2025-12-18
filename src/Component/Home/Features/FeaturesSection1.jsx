// import React from 'react'

// function FeaturesSection1() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default FeaturesSection1

// src/Component/Home/Features/FeaturesSection1.jsx
import React from 'react';

// Reusing a simplified version of the Button component for self-containment
const Button = ({ children, primary = false, className = '' }) => {
    const baseClasses = 'px-6 py-3 font-semibold rounded-lg transition duration-200 text-sm md:text-base shadow-md';
    const styleClasses = primary 
        ? 'bg-purple-main text-white hover:bg-[#4a3249]' 
        : 'bg-teal-highlight text-gray-900 hover:bg-[#15b090]'; 

    return (
        <button className={`${baseClasses} ${styleClasses} ${className}`}>
            {children}
        </button>
    );
};

const FeaturesSection1 = () => {
    return (
        <section className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                
                {/* Main Headline */}
                <h1 className="text-3xl md:text-7xl font-handwriting text-[#7A4B6D] leading-tight mb-4 font-extrabold">
                    The <span className="text-purple-main">Invoicing</span>
                </h1>
                <h1 className="text-3xl md:text-7xl font-handwriting text-[#7A4B6D] leading-tight mb-8 font-extrabold"
>
                    Features You Need
                </h1>
                
                {/* Subtext */}
                <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-10">
                    From simple billing to automated payment collection and comprehensive reporting, Odoo does it all seamlessly.
                </p>

                {/* Call-to-Action Buttons */}
                <div className="flex justify-center space-x-4">
                    <a href="trypage"><Button outline>
                        Try It Free
                    </Button></a>
                    <Button>
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