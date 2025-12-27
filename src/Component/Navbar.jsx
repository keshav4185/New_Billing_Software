
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.jpg';
// Reusing your Button component structure
const Button = ({ children, primary = false, outline = false, className = '', ...props }) => {
    const baseClasses = 'px-4 py-2 font-semibold rounded-lg transition duration-200 cursor-pointer text-sm';
    
    let styleClasses = 'text-gray-600 hover:text-gray-800';
    if (primary) {
        styleClasses = 'bg-purple-main text-white hover:bg-[#4a3249] shadow'; 
    } else if (outline) {
        styleClasses = 'bg-white  text-gray-800 border border-gray-300 hover:bg-[#7A4B6D]  hover:text-white';
    }

    return (
        <button className={`${baseClasses} ${styleClasses} ${className}`} {...props}>
            {children}
        </button>
    );
};

// 🔗 Navbar items with routes
const navItems = [
    { name: '', path: '/' },
    { name: 'Overview', path: '/' },
    { name: 'Features', path: '/Featurespage' },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userName, setUserName] = useState('Keshav');
    
    // Check if user is signed in (you can use localStorage or other state management)
    React.useEffect(() => {
        const signedIn = localStorage.getItem('isSignedIn');
        if (signedIn === 'true') {
            setIsSignedIn(true);
        }
    }, []);
    
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto py-2 px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    
                    {/* Logo and Desktop Navigation */}
                    <div className="flex items-center space-x-12  "> 
                        <Link to="/" className="flex items-center space-x-2">
                           <img src={Logo} alt="Logo" className='h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 object-contain -my-4'/>
                        </Link>

                        {/* Desktop Menu */}
                        <nav className="hidden md:flex space-x-10 text-sm">
                            {navItems.slice(1).map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="text-gray-600 hover:text-gray-800 transition font-medium"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Desktop Buttons + Mobile Hamburger */}
                    <div className="flex items-center space-x-3">
                        <div className="hidden md:flex items-center space-x-3">
                            {isSignedIn ? (
                                <>
                                    <Link to="/myaccountpage" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                                        <div className="w-8 h-8 bg-indigo-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                            {userName.charAt(0)}
                                        </div>
                                        <span className="font-medium text-gray-700">{userName}</span>
                                    </Link>
                                    <a href="trypage">   <Button outline className="try hover:bg-indigo-400  ">Try it free</Button> </a>
                                </>
                            ) : (
                                <>
                                    <a href="/Account">  <Button outline className="w-full hover:bg-indigo-400 " >Sign in</Button></a> 
                                    <a href="trypage">   <Button outline className="try hover:bg-indigo-400  ">Try it free</Button> </a>
                                </>
                            )}
                        </div>

                        {/* Hamburger */}
                        <button 
                            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <nav className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white border-t shadow-lg`}>
                <div className="px-3 pt-3 pb-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={closeMenu}
                            className="block px-3 py-2 rounded-md text-base font-medium
                                       text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition"
                        >
                            {item.name}
                        </Link>
                    ))}

                    <div className="pt-4 space-y-2 ">
                        {isSignedIn ? (
                            <>
                                <Link to="/myaccountpage" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                                    <div className="w-8 h-8 bg-indigo-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                        {userName.charAt(0)}
                                    </div>
                                    <span className="font-medium text-gray-700">{userName}</span>
                                </Link>
                                <a href="/trypage">  <Button outline className="w-full try">Try it free</Button></a>
                            </>
                        ) : (
                            <>
                                <a href="/Account">  <Button outline className="w-full" >Sign in</Button></a> 
                                <a href="/trypage">  <Button outline className="w-full try">Try it free</Button></a>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
