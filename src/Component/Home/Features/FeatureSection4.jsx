// src/Component/Home/Features/FeaturesSection5.jsx
import React from 'react';

const reportFeatures = [
    {
        title: "Invoice analysis report",
        description: "Get a comprehensive overview of your invoices and sales status.",
    },
    {
        title: "Sales reports",
        description: "Get direct access to key information with dynamic and customizable dashboards.",
    },
    // Note: The source image only provides two main reports. You could expand this list 
    // with typical accounting reports if needed, but for now, we stick to the source.
];

const FeaturesSection4 = () => {
    return (
        // Switching back to bg-gray-50 to provide visual separation from the previous white section
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                
                {/* Title: "Reports" */}
                <h2 className=" font-extrabold text-3xl md:text-4xl font-script text-purple-main leading-tight mb-16 text-center md:text-left font-handwriting text-green-700">
                    Reports
                </h2>

                {/* Features Grid (Responsive: 1 col on mobile, 2 on tablet/desktop) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                    {reportFeatures.map((feature, index) => (
                        <div key={index} className="flex flex-col">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-lg text-gray-700">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
                
            </div>
        </section>
    );
};

export default FeaturesSection4;