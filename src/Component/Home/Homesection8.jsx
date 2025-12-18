// src/Component/Home/Homesection9.jsx
import React from 'react';

const apps = [
    {
        name: "Sales",
        tagline: "Invoice from sales orders",
        icon: "📈", // Simplified icon representation
        color: "bg-orange-400"
    },
    {
        name: "Subscriptions",
        tagline: "Manage recurring invoices",
        icon: "🔄",
        color: "bg-teal-highlight" // Uses custom teal color
    },
    {
        name: "Project",
        tagline: "Set invoicing policies",
        icon: "✅",
        color: "bg-green-400"
    },
    {
        name: "eCommerce",
        tagline: "Access invoices online",
        icon: "🛍️",
        color: "bg-purple-main" // Uses custom purple color
    },
    {
        name: "Point of Sale",
        tagline: "Print invoices in-store",
        icon: "💳",
        color: "bg-red-400"
    },
];

const AppCard = ({ app }) => (
    <div className="bg-gray-50 p-6 rounded-xl transition hover:shadow-lg flex items-center space-x-4 cursor-pointer">
        <div className={`p-3 rounded-xl bg-opacity-20 ${app.color} text-4xl`}>
            {/* Icon Placeholder */}
            {app.icon}
        </div>
        <div>
            <h3 className="text-xl font-semibold text-gray-800">{app.name}</h3>
            <p className="text-gray-600 text-sm">{app.tagline}</p>
        </div>
    </div>
);

const Homesection9 = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-left">
                
                {/* Headline: "One need, one app. Expand as you grow." */}
                <h2 className="text-5xl md:text-6xl font-headline text-[#7A4B6D] leading-tight mb-4 elc font-extrabold">
                    One <span className="highlight-bg pb-1 inline-block">need</span>, one <span className="highlight-bg pb-1 inline-block">app</span>.
                </h2>
                <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mb-12">
                    Expand as you grow.
                </p>

                {/* Apps Grid (Responsive: 1 col on mobile, 2 on sm, 3 on lg) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
                    {apps.map((app, index) => (
                        <AppCard key={index} app={app} />
                    ))}
                </div>

                {/* See All Apps CTA */}
                <div className="mt-12">
                    <a href="/trypage" className="text-purple-main text-lg font-semibold hover:underline flex items-center">
                        See all Apps 
                        <span className="ml-2 text-xl">→</span>
                    </a>
                </div>

            </div>
        </section>
    );
};

export default Homesection9;