import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/services";
import UserSignupPage from "./components/UserSignupPage";
import UserLoginPage from "./components/UserLoginPage"; 
import VendorLogin from "./Forms/VendorLogin";
import VendorDashboard from "./Forms/VendorDashboard";
import AdminLogin from "./Forms/AdminLogin";
import AdminDashboard from "./Forms/AdminDashboard";
import Appointments  from "./Forms/Appointments";




// ✅ Import the generic service page
import ServicePage from "./Forms/ServicePage";

const App = () => {
  const location = useLocation();
  const showFooter = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<AboutUs />} />

          {/* ✅ Generic reusable service page */}
          <Route path="/clinic-appointments" element={<ServicePage />} />
          <Route path="/salon-bookings" element={<ServicePage />} />
          <Route path="/ac-repair" element={<ServicePage />} />
          <Route path="/coaching-sessions" element={<ServicePage />} />
          <Route path="/photography" element={<ServicePage />} />
          <Route path="/event-planning" element={<ServicePage />} />
          <Route path="/driving-school" element={<ServicePage />} />
          <Route path="/home-cleaning" element={<ServicePage />} />
          <Route path="/pet-care" element={<ServicePage />} />
          <Route path="/legal-advice" element={<ServicePage />} />
          <Route path="/car-services" element={<ServicePage />} />
          <Route path="/home-decor" element={<ServicePage />} />
          <Route path="/music-classes" element={<ServicePage />} />
          <Route path="/yoga-sessions" element={<ServicePage />} />
          <Route path="/therapy" element={<ServicePage />} />

          {/* ✅ Auth Routes */}

<Route path="/user-signup" element={<UserSignupPage />} />
<Route path="/user-login" element={<UserLoginPage />} />
          <Route path="/vendor-login" element={<VendorLogin />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/appointments" element={<Appointments />} />

          {/* Fallback route */}
        </Routes>
      </main>

      {showFooter && <Footer />}
    </div>
  );
};

export default App;
