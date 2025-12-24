// src/Component/Footer.jsx
import React from 'react';

// Simplified Icon Placeholder Component
const SocialIcon = ({ children }) => (
    <a href="#" className="text-gray-400 hover:text-white transition">
        {children}
    </a>
);

const Footer = () => {
    return (
        // The background color is a very dark gray/near-black, border matches the purple-main accent
        <footer className="bg-[#212121] text-white pt-12 border-t-8 border-purple-main"> 
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                
                {/* Odoo Logo (Centered) */}
                <div className="flex justify-center mb-8">
                    <svg className="h-6 w-auto" fill="white" viewBox="0 0 100 24" xmlns="http://www.w3.org/2000/svg">
                        {/* Simplified Odoo Logo Path - represents the white text logo */}
                        <text x="50%" y="70%" fontSize="20" fontWeight="bold" textAnchor="middle">Smart</text>
                    </svg>
                </div>

                {/* Main Content Grid (Responsive: 2/3 columns on mobile/tablet, 4 on desktop) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                    
                    {/* Column 1: Community & Open Source */}
                    <div className="col-span-2 sm:col-span-1">
                        <h4 className="font-bold mb-4 text-lg">Community</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="/tutorial" className="hover:text-white transition">Tutorials</a></li>
                            <li><a href="/documentation" className="hover:text-white transition">Documentation</a></li>
                          
                        </ul>

                        <h4 className="font-bold mt-6 mb-4 text-lg">Open Source</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition">Download</a></li>
                            <li><a href="#" className="hover:text-white transition">Github</a></li>
                            <li><a href="#" className="hover:text-white transition">Runbot</a></li>
                            <li><a href="#" className="hover:text-white transition">Translations</a></li>
                        </ul>
                    </div>
                    
                    {/* Column 2: Services */}
                    <div>
                        <h4 className="font-bold mb-4 text-lg">Services</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition">Odoo.sh Hosting</a></li>
                            <li><a href="#" className="hover:text-white transition">Support</a></li>
                            <li><a href="#" className="hover:text-white transition">Upgrade</a></li>
                            <li><a href="#" className="hover:text-white transition">Custom Developments</a></li>
                            <li><a href="#" className="hover:text-white transition">Education</a></li>
                            <li><a href="#" className="hover:text-white transition">Find an Accountant</a></li>
                            <li><a href="#" className="hover:text-white transition">Find a Partner</a></li>
                            <li><a href="#" className="hover:text-white transition">Become a Partner</a></li>
                        </ul>
                    </div>

                    {/* Column 3: About us */}
                    <div>
                        <h4 className="font-bold mb-4 text-lg">About us</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition">Our company</a></li>
                            <li><a href="#" className="hover:text-white transition">Brand Assets</a></li>
                            <li><a href="#" className="hover:text-white transition">Contact us</a></li>
                            <li><a href="#" className="hover:text-white transition">Jobs</a></li>
                            <li><a href="#" className="hover:text-white transition">Events</a></li>
                            <li><a href="#" className="hover:text-white transition">Podcast</a></li>
                            <li><a href="#" className="hover:text-white transition">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition">Customers</a></li>
                            <li><a href="#" className="hover:text-white transition">Legal &bull; Privacy</a></li>
                            <li><a href="#" className="hover:text-white transition">Security</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Language, Description, Social Media */}
                    <div className="col-span-2 lg:col-span-1 border-t sm:border-t-0 border-gray-600 pt-6 sm:pt-0">
                        {/* Language Selector */}
                        <div className="mb-6">
                            <span className="text-gray-400 flex items-center space-x-2 cursor-pointer hover:text-white transition text-sm">
                                🇺🇸 English ▾
                            </span>
                        </div>

                        <div className="border-t border-gray-600 pt-4">
                            <p className="text-sm text-gray-400 mb-4">
                                Smart is a suite of open source business apps that cover all your company needs: CRM, eCommerce, accounting, inventory, point of sale, project management, etc.
                            </p>
                            <p className="text-sm text-gray-400 mb-6">
                                Smart unique value proposition is to be at the same time very easy to use and fully integrated.
                            </p>
                            
                            {/* Social Media Links (Using simple text/emojis as placeholders for complex SVGs) */}
                            <div className="flex space-x-4 text-xl">
                                <SocialIcon>🇫</SocialIcon> {/* Facebook */}
                                <SocialIcon>🇽</SocialIcon> {/* X/Twitter */}
                                <SocialIcon>in</SocialIcon> {/* LinkedIn */}
                                <SocialIcon>tiktok</SocialIcon> {/* TikTok */}
                                <SocialIcon>📞</SocialIcon> {/* Phone/WhatsApp */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar / Copyright */}
                <div className="mt-12 pt-6 pb-4 border-t border-gray-700 text-center text-sm text-gray-400">
                    Website is develop by keshav golande <span className="font-semi-bold text-white">SMART</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;