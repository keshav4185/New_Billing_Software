// src/Component/Home/Homesection3.jsx
import React from 'react';
import backgroundvideo from '../../assets/Home/video.webm';
// ADD any UI image in assets (example path below)
import uiImage from '../../assets/Home/01.svg';

const Button = ({ children, primary = false, className = '', ...props }) => {
    const baseClasses = 'px-8 py-3 font-semibold rounded-lg transition duration-200 shadow-lg cursor-pointer';
    const styleClasses = primary 
        ? 'bg-blue-600 text-white hover:bg-blue-700' 
        : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50';

    return (
        <button className={`${baseClasses} ${styleClasses} ${className}`} {...props}>
            {children}
        </button>
    );
};

const Homesection3 = () => {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-12">
                    
                    {/* Left Column */}
                    <div className="lg:w-1/2 space-y-6 mb-12 lg:mb-0 lg:text-left text-center">
                        <span className="text-sm font-semibold uppercase text-blue-600 tracking-wider">
                            Advanced Functionality
                        </span>
                        <h2 className="text-4xl font-extrabold text-[#7A4B6D] leading-tight elc">
                            Automate Your Payments & Reconciliation
                        </h2>
                        <p className="text-xl text-gray-600">
                            Stop chasing payments manually. Setup automatic recurring invoices, 
                            accept payments directly, and let our system handle the reconciliation for you.
                        </p>
                    </div>

                    {/* Right Column */}
                    <div className="lg:w-1/2 w-full flex justify-center">
                        <div className="relative w-full max-w-lg pt-[56.25%] rounded-xl shadow-2xl overflow-hidden"> 
                            
                            {/* YouTube Video */}
                            <iframe
                                className="absolute inset-0 w-full h-full rounded-xl"
                                src="https://www.youtube.com/embed/PD2eKTzkZ70?autoplay=1&mute=1&loop=1&playlist=PD2eKTzkZ70&controls=0&modestbranding=1"
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title="Feature Video"
                            ></iframe>

                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-black/20"></div>

                            {/* UI Image Overlay */}
                            <img
                                src={uiImage}
                                alt="App UI Preview"
                                className="absolute inset-0 m-auto w-[85%] rounded-lg shadow-2xl z-10"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Homesection3;
