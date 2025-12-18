// src/Component/SignUpModal.jsx
import React from 'react';
// 🛑 IMPORTANT: Importing 'Link' from react-router-dom for client-side navigation
import { Link } from 'react-router-dom'; 


// Note: The function name 'signupco' is kept as requested.
const signupco = () => {
    return (
        // Full screen container for centering the modal with a subtle background pattern
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4" 
             style={{ backgroundImage: 'repeating-linear-gradient(45deg, #f7f7f7 2px, transparent 2px, transparent 10px)' }}>
            
            {/* The White Card/Modal Container */}
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 border border-gray-100">
                
                {/* Odoo Logo */}
                <div className="flex justify-center mb-6">
                    {/* Simplified SVG placeholder for Odoo purple logo */}
                    <svg className="h-6 w-auto" fill="#80628B" viewBox="0 0 100 24" xmlns="http://www.w3.org/2000/svg">
                        <text x="50%" y="70%" fontSize="20" fontWeight="bold" textAnchor="middle">odoo</text>
                    </svg>
                </div>

                {/* Info Alert Box */}
                <div className="bg-blue-100/50 text-gray-700 p-4 rounded-lg mb-6 border border-blue-200">
                    <p className="text-sm">Access and manage your documents and databases from odoo.com.</p>
                </div>

                <form className="space-y-6">
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="John Doe"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-main focus:border-purple-main transition duration-150"
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="name@example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-main focus:border-purple-main transition duration-150"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-main focus:border-purple-main pr-10 transition duration-150"
                                required
                            />
                            {/* Eye Icon */}
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400">
                                👁
                            </span>
                        </div>
                    </div>

                    {/* Sign Up Button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-3 text-white font-semibold rounded-lg transition duration-200 
                                   bg-purple-dark hover:bg-purple-main shadow-md"
                        style={{ backgroundColor: '#80628B' }} // Using the specific purple/maroon color from the image
                    >
                        SIGN UP
                    </button>
                </form>

                {/* Already have an account link */}
                <div className="text-center mt-4">
                    {/* Link to the Sign In page, which should be routed as /signin */}
                    <Link to="/signin" className="text-sm text-purple-main hover:underline">
                        I already have an account
                    </Link>
                </div>

                {/* Privacy Policy Note */}
                <div className="text-center mt-4 text-xs text-gray-500">
                    ⓘ Your personal data will be handled as outlined in our 
                    <a href="#" className="text-purple-main hover:underline ml-1">Privacy Policy.</a>
                </div>
            </div>
        </div>
    );
};

export default signupco;