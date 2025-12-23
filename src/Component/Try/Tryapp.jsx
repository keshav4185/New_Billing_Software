// src/Pages/Home/Try/Tryhome.jsx
import React from 'react';
// Import useNavigate for programmatic routing
import { useNavigate } from 'react-router-dom'; 

// Tailwind colors: Main script/title color: #7A4B6D (Dark Pink/Maroon)
// Button color: #80628B (Purple/Maroon)

function Tryapp() {
  const navigate = useNavigate();

  // Function to handle the custom "Start Now" click logic
  const handleStartNowClick = (e) => {
    e.preventDefault(); 
    
    // 🛑 CRITICAL FIX: Removed window.open()
    
    // 1. Navigate the CURRENT tab to the Animated Welcome Page
    // Assuming your animated welcome component is mapped to /welcome
    navigate('/welcome'); 
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-16 pb-16">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold" style={{  color: '#7A4B6D' }}>
          Get Started
        </h1>
        <p className="text-gray-500 mt-2">Free instant access. No credit card required.</p>
      </header>

      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-xl border border-gray-100">
        
        {/* App Selection/Invoicing Header */}
        <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center text-blue-500 font-semibold">
            <span className="text-xl mr-2">📄</span>
            <span>Sales</span>
          </div>
        <a href="trypage">  <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-800 transition duration-200 hover:{}">
            Change App
          </button></a>
        </div>

        <form className="space-y-6"> 
          
          {/* Row 1: First and Last Name */}
          <div>
            <input
              type="text"
              placeholder="First and Last Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

          {/* Row 2: Company Name */}
          <div>
            <input
              type="text"
              placeholder="Company Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

          {/* Row 3: Email and Phone Number (Split) */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <input type="email" placeholder="Email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" required />
            </div>
            <div className="w-1/2">
              <input type="tel" placeholder="Phone Number +91" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" required />
            </div>
          </div>

          {/* Row 4: Country and Language (Split) */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white appearance-none focus:ring-teal-500 focus:border-teal-500 text-gray-700" defaultValue="India">
                <option disabled>Country</option>
                <option>India</option>
                <option>United States</option>
              </select>
            </div>
            <div className="w-1/2">
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white appearance-none focus:ring-teal-500 focus:border-teal-500 text-gray-700" defaultValue="English">
                <option disabled>Language</option>
                <option>English</option>
                <option>French</option>
              </select>
            </div>
          </div>

          {/* Row 5: Company size and Primary Interest (Split) */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white appearance-none focus:ring-teal-500 focus:border-teal-500 text-gray-700" defaultValue="1 - 5 employees">
                <option disabled>Company size</option>
                <option>1 - 5 employees</option>
                <option>6 - 15 employees</option>
                <option>16 - 50 employees</option>
              </select>
            </div>
            <div className="w-1/2">
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white appearance-none focus:ring-teal-500 focus:border-teal-500 text-gray-700" defaultValue="Use it in my company">
                <option disabled>Primary Interest</option>
                <option>Use it in my company</option>
                <option>Student</option>
                <option>Partner</option>
              </select>
            </div>
          </div>
          
          {/* Legal and Button */}
          <div className="pt-4 space-y-4">
            <p className="text-center text-sm text-gray-600">
              By clicking on **Start Now**, you accept our 
              <a href="#" className="text-blue-600 hover:underline ml-1">Privacy Policy</a>
              .
            </p>

          <a href="/Welcome"> <button
              type="button" 
              onClick={handleStartNowClick} // Triggers the navigation to /welcome
              className="w-full max-w-xs mx-auto block px-6 py-3 text-white font-semibold rounded-lg shadow-md transition duration-200"
              style={{ backgroundColor: '#80628B' }}
            >
              Start Now
            </button></a> 
          </div>
        </form>
      </div>
    </div>
  );
}

export default Tryapp;