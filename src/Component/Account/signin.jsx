// src/Component/SignInModal.jsx
import React, { useEffect, useState } from 'react';

const Signin = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
            {/* Background Image with Parallax */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
                style={{
                    backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
                            <defs>
                                <linearGradient id="loginBg" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:%23667eea;stop-opacity:1" />
                                    <stop offset="50%" style="stop-color:%23764ba2;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:%2380628B;stop-opacity:1" />
                                </linearGradient>
                                <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <circle cx="10" cy="10" r="1" fill="%23ffffff" opacity="0.1"/>
                                </pattern>
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="%23ffffff" stroke-width="0.5" opacity="0.1"/>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(%23loginBg)"/>
                            <rect width="100%" height="100%" fill="url(%23dots)"/>
                            <rect width="100%" height="100%" fill="url(%23grid)"/>
                            <circle cx="300" cy="200" r="150" fill="%23ffffff" opacity="0.05"/>
                            <circle cx="900" cy="600" r="200" fill="%23ffffff" opacity="0.03"/>
                            <circle cx="1100" cy="300" r="100" fill="%23ffffff" opacity="0.05"/>
                        </svg>
                    `)}')
                    `,
                    transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px) scale(1.1)`
                }}
            ></div>
            
            {/* Parallax Layer 1 - Floating Elements */}
            <div 
                className="absolute inset-0 opacity-10 transition-transform duration-800 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`
                }}
            >
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200 rounded-full mix-blend-overlay filter blur-3xl"></div>
            </div>
            
            {/* Parallax Layer 2 - Accent Elements */}
            <div 
                className="absolute inset-0 opacity-15 transition-transform duration-600 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`
                }}
            >
                <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-indigo-300 rounded-full mix-blend-overlay filter blur-2xl"></div>
            </div>
            
            {/* Floating UI Elements */}
            <div 
                className="absolute inset-0 overflow-hidden pointer-events-none transition-transform duration-500 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.08}px, ${mousePosition.y * 0.08}px)`
                }}
            >
                <div className="absolute top-1/4 left-1/5 w-6 h-6 bg-white rounded opacity-20 float-animation"></div>
                <div className="absolute top-1/3 right-1/5 w-8 h-8 bg-purple-200 rounded-full opacity-15 float-animation" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-white rounded opacity-25 float-animation" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-3/4 right-1/3 w-5 h-5 bg-indigo-200 rounded-full opacity-20 float-animation" style={{animationDelay: '3s'}}></div>
            </div>
            
            {/* The White Card/Modal Container with Parallax */}
            <div 
                className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-white/20 transition-transform duration-300 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                }}
            >
                
                {/* Odoo Logo */}
                <div className="flex justify-center mb-6">
                    {/* Simplified SVG placeholder for Odoo purple logo */}
                    <svg className="h-6 w-auto" fill="#80628B" viewBox="0 0 100 24" xmlns="http://www.w3.org/2000/svg">
                        <text x="50%" y="70%" fontSize="20" fontWeight="bold" textAnchor="middle">Smart</text>
                    </svg>
                </div>

                {/* Info Alert Box */}
                <div className="bg-blue-100/50 text-gray-700 p-4 rounded-lg mb-6 border border-blue-200">
                    <p className="text-sm">Access and manage your documents and databases from Smart.com.</p>
                </div>

                <form className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
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
                            <a href="/Resetpassword" className="text-sm text-purple-main hover:underline">
                                Reset Password
                            </a>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-main focus:border-purple-main pr-10 transition duration-150"
                                required
                            />
                            {/* Eye Icon Toggle */}
                            <span 
                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 hover:text-purple-600 transition-colors duration-200"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "🙈" : "👁"}
                            </span>
                        </div>
                    </div>

                    {/* Sign In Button with Enhanced Effects */}
                <a href="/NavbarLogged">   <button type="submit"
                        className="w-full px-4 py-3 text-white font-semibold rounded-lg transition-all duration-300 
                                   bg-purple-dark hover:bg-purple-main shadow-lg hover:shadow-purple-500/50 hover:shadow-2xl 
                                   transform hover:scale-105 hover:-translate-y-1 active:scale-95 relative overflow-hidden"
                        style={{ 
                            backgroundColor: '#80628B',
                            background: 'linear-gradient(135deg, #80628B 0%, #764ba2 50%, #667eea 100%)'
                        }}
                    >
                        <span className="relative z-10">SIGN IN</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                    </button></a> 
                </form>

                {/* Don't have an account link */}
                <div className="text-center mt-6">
                    <a href="/Signup" className="text-sm text-teal-highlight hover:underline">
                        Don't have an account?
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Signin;