// src/Component/Home/Homesection8.jsx
import React from 'react';

// Define the data for the feature cards
const features = [
    {
        title: "160 countries supported",
        description: "Full support with electronic invoicing, bank integrations, taxes statements, etc.",
        link: "List of supported countries",
        image: null // No inline image, only text/link
    },
    {
        title: "Issue refunds",
        description: "Create credit notes and manage reimbursements Electronic invoicing, bank integrations,tax statements, and local compliance —all in one global billing platform.",
        image:  null
    },
    {
        title: "Handle recurring invoices",
        description: "Set the frequency of invoicing for subscriptions of recurring services and products.",
        image: "RecurringInvoicesMockup" // Placeholder for the screenshot
    },
    {
        title: "Sales reports",
        description: "Get direct access to key information with dynamic and customizable dashboards.",
        image:"RecurringInvoicesMockup"
    },
    {
        title: "Multiple currencies",
        description: "Issue invoices and receive payments in different currencies with an automatic update of the conversion rate.",
        image: "InvoiceDashboardMockup.png"
    },
    {
        title: "Your invoice, your style",
        description: "Customize your invoices according to your branding.",
        image: "InvoiceStyleMockup" // Placeholder for the customization screenshot
    },
    {
        title: "Snail mail",
        description: "Automate the sending of invoices and payment follow-ups by post.",
        image: null
    },
];

// Helper Component for a single card
const FeatureCard = ({ feature }) => {
    // Mockup components for the features that include screenshots
    const Mockup = () => {
        if (feature.image === "RecurringInvoicesMockup") {
            return (
                <div className="bg-gray-100 p-3 rounded-lg mt-4 shadow-inner text-xs text-gray-700 overflow-x-auto">
                    {/* Simplified table structure based on the screenshot */}
                    <p className="font-semibold mb-2">Recurring Plans ⚙️</p>
                    <table className="min-w-[300px] w-full">
                        <thead>
                            <tr className="text-left text-gray-500">
                                <th className="py-1">Name</th>
                                <th className="py-1">Billing Period</th>
                                <th className="py-1">Closing After</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-gray-200">
                                <td className="py-1">Monthly</td>
                                <td className="py-1">1 Month</td>
                                <td className="py-1">60 days</td>
                            </tr>
                            <tr className="border-t border-gray-200">
                                <td className="py-1">6 Months</td>
                                <td className="py-1">6 Months</td>
                                <td className="py-1">15 days</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
        if (feature.image === "InvoiceStyleMockup") {
            return (
                <div className="bg-gray-100 p-3 rounded-lg mt-4 shadow-inner text-xs text-gray-700">
                    {/* Simplified color picker/preview based on the screenshot */}
                    <div className="flex justify-between items-start">
                        <div className="w-1/3">
                            <p className="text-gray-500 mb-1">Company Origin</p>
                            <p className="font-bold text-lg text-purple-main leading-none">Monkey Coffee Lab</p>
                            <div className="flex space-x-1 mt-2">
                                <div className="w-4 h-4 rounded-full bg-red-600 border border-gray-300"></div>
                                <div className="w-4 h-4 rounded-full bg-orange-300 border border-gray-300"></div>
                                <div className="w-4 h-4 rounded-full bg-gray-600 border border-purple-main ring-2 ring-purple-main"></div>
                            </div>
                        </div>
                        <div className="w-2/3 ml-4 border p-2 bg-white text-right">
                            <p className="text-[10px] text-gray-400">Invoice R430230</p>
                            <p className="font-semibold text-sm">2,350.00 €</p>
                            <p className="text-[10px] text-red-600 mt-2">Unpaid</p>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };


    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-50 transition hover:shadow-xl flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                <span className="text-yellow-500 text-2xl">⭐</span>
            </div>
            
            <div className="text-gray-600">
                <p className="text-base">{feature.description}</p>
                {feature.link && (
                    <a href="#" className="text-purple-main font-medium hover:underline mt-1 block text-sm">
                        {feature.link}
                    </a>
                )}
            </div>

            {/* Render the mockup if an image tag is defined */}
            {feature.image && <Mockup />}
        </div>
    );
};


const Homesection7 = () => {
    return (
        <section className="py-24 bg-gray-100/50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                
                {/* Headline: "All the features done right." */}
                <h2 className="text-5xl md:text-6xl font-headline text-[#7A4B6D] leading-tight mb-12 font-extrabold">
                    All the <span className="highlight-bg pb-1 inline-block">features</span> done right.
                </h2>
                
                {/* Features Grid (Responsive: 1 col on mobile, 2 on md, 3 on lg) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                    ))}
                </div>

                {/* Final CTA link */}
                <div className="mt-12">
                    <a href="/Featurespage" className="text-purple-main text-lg font-semibold hover:underline flex items-center justify-center">
                        See all features 
                        <span className="ml-2 text-xl">→</span>
                    </a>
                </div>

            </div>
        </section>
    );
};

export default Homesection7;