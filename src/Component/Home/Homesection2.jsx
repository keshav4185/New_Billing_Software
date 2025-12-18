
// src/Component/Home/Homesection2.jsx
import React from 'react';

const features = [
    { 
        icon: '📝', 
        title: 'Instant Invoicing', 
        description: 'Create and send professional, branded invoices in seconds, not minutes.'
    },
    { 
        icon: '💵', 
        title: 'Payment Tracking', 
        description: 'Monitor all pending, paid, and overdue invoices with clear, real-time status.'
    },
    { 
        icon: '📊', 
        title: 'Detailed Reporting', 
        description: 'Access powerful analytics on sales, revenue, and customer payment habits.'
    },
];

const Homesection2 = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                
                {/* Section Header */}
                <h2 className="text-4xl font-extrabold mb-4 elc text-[#7A4B6D] ">
                    Everything You Need to Manage Billing
                </h2>
                <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                    Our software simplifies the entire financial lifecycle, giving you more time to focus on your business.
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                    {features.map((feature, index) => (
                        <div 
                            key={index} 
                            className="p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 bg-gray-50"
                        >
                            <div className="text-5xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Optional Call to Action (if needed in a second section) */}
                <div className="mt-16">
                    <a 
                        href="#features" 
                        className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition"
                    >
                
                    </a>
                </div>

            </div>
        </section>
    );
};

export default Homesection2;

