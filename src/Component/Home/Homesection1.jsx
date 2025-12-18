// src/Component/Home/Homesection1.jsx
import React from 'react';

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
    return (
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-20 px-6 lg:px-8 text-center">
            
            {/* Headline */}
            <h1 className="text-5xl  md:text-7xl font-headline text-purple-main leading-none mb-6  text-[#7A4B6D] font-extrabold ">
                Electronic Invoicing
            </h1>
            
            {/* Sub-headline with custom highlight */}
            <div className="text-4xl md:text-7xl font-headline text-gray-800 leading-none mb-12">
                <span className="highlight-bg pb-2 simple text-[#7A4B6D]  font-extrabold">Simple. Free.</span>
            </div>
            
            {/* Description */}
            <p className="text-xl text-gray-600 max-w-2xl mb-12">
                Odoo Invoicing makes it easy to create professional invoices and customize them to your liking.
            </p>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-4 ">
               <a href="trypage"> <Button  className="start" outline >
                    Start now - It's free
                </Button></a>
                <Button outline className="text-base py-3 ">
                    Meet an advisor ▾
                   
                </Button>
            </div>
            
            {/* Footer Text */}
            <p className="text-sm text-gray-500">
                Free, forever, with unlimited users. <a href="#" className="text-blue-500 hover:underline">See why</a>
            </p>



        </div>
    );
};

export default Homesection1; 