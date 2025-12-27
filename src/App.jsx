
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import Featurespage from './Pages/Home/Features/Featurespage';
import Account from './Pages/Home/Account/Account';
import Signin from './Pages/Home/Account/Account';
import Resetpassword from './Pages/Home/Account/Resetpassword';
import Signup from './Pages/Home/Account/Signup';
import Tryhome from './Pages/Home/TryPage/trypage';
import Tutorial from './Pages/Community/tutorial';
import DocumentationPage from './Pages/Community/documentationpage';
import Welcomepage from './Pages/Home/TryPage/welcomepage';
import Tryapppage from './Pages/Home/TryPage/tryapppage'; 
import Sdashboardpage from './Pages/SDashboard/sdashboardpage';
import Snewpage from './Pages/SDashboard/snewpage';
import Sorderpage from './Pages/orderpage/sorderpage';
import Scustomerpage from './Pages/orderpage/scustomerpage';
import Salesteampage from './Pages/orderpage/salesteampage';
import Productpage from './Pages/Productpage/productpage';
import ProductFormnew from './Pages/Productpage/productfrompage';
import Toinvoicepage from './Pages/Invoicepage/Toinvoicepage';
import Myaccountpage from './Pages/Mypage/myaccountpage';
import Salespage from './Pages/Reportingpage/salespage';

// Layout component with navbar and footer
const LayoutWithNavbar = ({ children }) => (
  <>
    <Navbar/>
    {children}
    <Footer/>
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes with navbar and footer */}
        <Route path="/" element={<LayoutWithNavbar><HomePage /></LayoutWithNavbar>} />
        <Route path="/Featurespage" element={<LayoutWithNavbar><Featurespage /></LayoutWithNavbar>} />
        <Route path="/Account" element={<LayoutWithNavbar><Account /></LayoutWithNavbar>} />
        <Route path="/Signin" element={<LayoutWithNavbar><Signin /></LayoutWithNavbar>} />
        <Route path="/Resetpassword" element={<LayoutWithNavbar><Resetpassword /></LayoutWithNavbar>} />
        <Route path="/Signup" element={<LayoutWithNavbar><Signup /></LayoutWithNavbar>} />
        <Route path="/trypage" element={<LayoutWithNavbar><Tryhome /></LayoutWithNavbar>} />
        <Route path="/tutorial" element={<LayoutWithNavbar><Tutorial /></LayoutWithNavbar>} />
        <Route path="/documentation" element={<LayoutWithNavbar><DocumentationPage /></LayoutWithNavbar>} />
        <Route path="/welcome" element={<LayoutWithNavbar><Welcomepage /></LayoutWithNavbar>} />
        <Route path="/tryapppage" element={<LayoutWithNavbar><Tryapppage /></LayoutWithNavbar>} />
        <Route path="/myaccountpage" element={<LayoutWithNavbar><Myaccountpage /></LayoutWithNavbar>} />
      <Route path="/salespage" element={<Salespage />} />


        {/* Dashboard routes without navbar and footer */}
        <Route path="/sdashboardpage" element={<Sdashboardpage />} />
        <Route path="/snewpage" element={<Snewpage />} />
        <Route path="/sorderpage" element={<Sorderpage />} />
        <Route path="/scustomerpage" element={<Scustomerpage />} />
        <Route path="/salesteampage" element={<Salesteampage />} />
        <Route path="/productpage" element={<Productpage />} />
        <Route path="/productform" element={<ProductFormnew />}/>
        <Route path="/toinvoicepage" element={<Toinvoicepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
