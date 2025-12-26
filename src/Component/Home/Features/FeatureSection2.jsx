// src/Component/Home/Features/FeaturesSection2And3Combined.jsx
import React from 'react';

const invoiceFeatures = [
    // --- Features from former FeaturesSection2 (Manage Invoices) ---
    {
        title: "Create customer invoices",
        description: "Issue clear, complete and professional invoices in seconds.",
        group: "Manage invoices"
    },
    {
        title: "Print or send by email",
        description: "Print a hard copy of your invoices to send them by post or email.",
        group: "Manage invoices"
    },
    {
        title: "Issue refunds",
        description: "Create credit notes and manage reimbursements.",
        group: "Manage invoices"
    },
    {
        title: "Multi-company rules",
        description: "Automatically mirror orders and invoices in multi-company setup.",
        group: "Manage invoices"
    },
    {
        title: "Address autocomplete",
        description: "Enter a valid VAT number, and Odoo will autocomplete the customer's name and address (Europe only).",
        group: "Manage invoices"
    },
    {
        title: "3-Way matching payments",
        description: "Compare the information on purchase orders, vendor bills, and receipts to determine whether or not your bill should be paid.",
        group: "Manage invoices"
    },
    {
        title: "Manage supplier invoices",
        description: "Record supplier invoices in the system to manage payments and integrate them into your accounting.",
        group: "Manage invoices"
    },
    {
        title: "Handle recurring invoices",
        description: "Set product invoicing frequency according to contract specifications.",
        group: "Manage invoices"
    },
    // --- Features from former FeaturesSection3 (Compliance/Other) ---
    {
        title: "Include Incoterms®",
        description: "Use Incoterms standards to ensure you have the right contract terms.",
        group: "Accounting & Compliance"
    },
    {
        title: "Payments terms",
        description: "Set up and use your preferred payment terms.",
        group: "Accounting & Compliance"
    },
    {
        title: "Customers payments",
        description: "Easily keep track of payments with options such as batch deposit.",
        group: "Accounting & Compliance"
    },
    {
        title: "Automated tax",
        description: "Set up your tax rules to automatically calculate taxes on your invoice, and define where rounding occurs to get accurate reports.",
        group: "Accounting & Compliance"
    },
    {
        title: "Compliance with International invoicing requirements",
        description: "Germany, Italy, Spain, Belgium, and many more.",
        group: "Accounting & Compliance"
    },
    {
        title: "Peppol",
        description: "Odoo supports - but not only - the Peppol electronic invoice format for countries' part of the EAS.",
        group: "Accounting & Compliance"
    },
    {
        title: "Customization",
        description: "Choose your preferred design, style, and logo to personalize your invoices.",
        group: "Accounting & Compliance"
    },
    {
        title: "Vendor bills import",
        description: "Manage your vendor bills easily with document digitization. Set up an email alias to directly get all your bills on your Odoo database.",
        group: "Accounting & Compliance"
    },
];

const FeaturesSection2 = () => {
    // Group features by their assigned category
    const groupedFeatures = invoiceFeatures.reduce((acc, feature) => {
        if (!acc[feature.group]) {
            acc[feature.group] = [];
        }
        acc[feature.group].push(feature);
        return acc;
    }, {});

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                
                {/* --- Group 1: Manage Invoices --- */}
                <h2 className=" font-extrabold text-3xl md:text-4xl font-script text-purple-main leading-tight mb-16 text-center md:text-left font-handwriting text-green-700">
                    {Object.keys(groupedFeatures)[0]}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 mb-24 ">
                    {groupedFeatures["Manage invoices"].map((feature, index) => (
                        <div key={index} className="flex flex-col">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2 ">
                                {feature.title}
                            </h3>
                            <p className="text-lg text-gray-700">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* --- Group 2: Accounting & Compliance --- */}
                <h2 className=" font-extrabold text-3xl md:text-4xl font-script text-teal-highlight leading-tight mb-16 text-center md:text-left border-t pt-16 font-handwriting text-green-700">
                    {Object.keys(groupedFeatures)[1]}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12   ">
                    {groupedFeatures["Accounting & Compliance"].map((feature, index) => (
                        <div key={index} className="flex flex-col">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2 ">
                                {feature.title}
                            </h3>
                            <p className="text-lg text-gray-700 ">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection2;