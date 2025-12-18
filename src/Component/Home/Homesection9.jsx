// src/Component/Home/Homesection10.jsx
import React from 'react';

const Homesection9 = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                
                {/* Visual Elements (Firework/Sparkle Doodles) */}
                <div className="relative mb-12">
                    {/* Simplified Doodle Emulation */}
                    <span className="absolute left-1/4 top-[-20px] text-yellow-500 text-6xl transform rotate-12 hidden sm:block">✨</span>
                    <span className="absolute right-1/4 top-[-5px] text-yellow-500 text-6xl transform -rotate-12 hidden sm:block">✨</span>
                    <span className="absolute left-1/3 top-[-50px] text-orange-400 text-opacity-70 text-4xl transform -rotate-45 hidden md:block">★</span>
                    <span className="absolute right-1/3 top-[-35px] text-orange-400 text-opacity-70 text-4xl transform rotate-45 hidden md:block">★</span>
                    
                    {/* Headline: "Reignite the spark of accomplishment" */}
                    <h2 className="text-3xl md:text-8xl font-headline text-[#7A4B6D] leading-none elc font-extrabold">
                        Reignite the <span className="text-purple-main">spark</span>
                    </h2>
                    <h2 className="text-4xl md:text-8xl font-headline text-teal-highlight leading-none elc text-[#7A4B6D]  font-extrabold">
                        of accomplishment
                    </h2>
                </div>
                
                {/* CTA Button (Matches the style in the image) */}
               <a href="trypage"> <button 
                    className="px-10 py-4 font-semibold rounded-lg transition duration-200 
                               bg-purple-main hover:bg-[#a52a2a] text-black text-xl shadow-lg mt-8 "
                >
                    Start now - It's free
                </button></a>

                {/* Arrow and Subtext */}
                <div className="flex flex-col items-center mt-4">
                    <span className="text-teal-highlight text-3xl font-bold mb-1">↑</span>
                    <p className="text-sm text-gray-600">No credit card required</p>
                    <p className="text-sm text-gray-600">Instant access</p>
                </div>

            </div>
        </section>
    );
};

export default Homesection9;