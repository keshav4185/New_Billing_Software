// src/Component/Home/Features/FeaturesSection4.jsx
import React from 'react';

// Data for the payment features based on image_095858.png and image_fefdfb.png
const paymentFeatures = [
    {
        title: "Invoices overview",
        description: "Get a broad view of all invoices and filter them by status.",
    },
    {
        title: "Payments types",
        description: "SEPA payments and check printing in US format.",
    },
    {
        title: "Multiple currencies",
        description: "Allow customers to pay in their currency with an automatic currency converter and record gains and losses for each conversion. Automated update of currency rates based on chosen frequency: daily, weekly, or monthly.",
    },
    {
        title: "Get paid online",
        description: "Send your invoices by email and add a link to Authorize, Paypal, Ingenico, Buckaroo, or Adyen to get paid quickly, easily, and securely.",
    },
    {
        title: "Batch Payments",
        description: "Select multiple vendor bills and pay them all at once. Credit a batch of customers via SEPA Direct Debit or credit card tokens.",
    },
    {
        title: "Manage and customize sequence numbers",
        description: "Invoice sequence numbers are handled automatically once the invoice is confirmed. If a gap in the sequence occurs, Odoo automatically warns you.",
    },
    {
        title: "Credit limit",
        description: "Specific credit limits can be set to notify the user if the limit chosen for a customer is being exceeded.",
    },
];

const FeaturesSection3 = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                
                {/* Title: "Handle payments" */}
                <h2 className=" font-extrabold text-3xl md:text-4xl font-script text-purple-main leading-tight mb-16 text-center md:text-left font-handwriting text-green-700">
                    Handle payments
                </h2>

                {/* Features Grid (Responsive: 1 col on mobile, 2 on tablet/desktop) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                    {paymentFeatures.map((feature, index) => (
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

export default FeaturesSection3;