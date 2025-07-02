import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("card");
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  useEffect(() => {
    const bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));
    const userData = JSON.parse(localStorage.getItem("user"));
    
    setBooking(bookingDetails);
    setUser(userData);
    
    // Check if returning from login with payment intent
    const paymentRedirect = localStorage.getItem("paymentRedirect");
    if (paymentRedirect && userData) {
      localStorage.removeItem("paymentRedirect");
      setShowPayment(true);
    }
    
    if (bookingDetails?.paymentCompleted) {
      setPaymentSuccess(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple demo authentication
    if (loginForm.email && loginForm.password.length >= 6) {
      const userData = { email: loginForm.email, name: "Demo User" };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setShowLogin(false);
      
      // If login was triggered from payment, show payment options
      if (showPayment) {
        setShowPayment(true);
      }
    } else {
      alert("Please enter valid email and password (min 6 characters)");
    }
  };

  const handlePayment = (method) => {
    if (!user) {
      // Store payment intent and redirect to login
      localStorage.setItem("paymentRedirect", "true");
      navigate("/user-login");
      return;
    }

    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const paymentId = `pay_${Math.random().toString(36).substring(2, 10)}`;
      const amount = booking.vendor.services.find(s => s.name === booking.service).price;
      
      const updatedBooking = {
        ...booking,
        paymentCompleted: true,
        paymentId,
        amount,
        paymentMethod: method,
        user: user.email
      };
      
      localStorage.setItem("bookingDetails", JSON.stringify(updatedBooking));
      setBooking(updatedBooking);
      setPaymentSuccess(true);
      setLoading(false);
      
      // Update vendor bookings
      const vendors = JSON.parse(localStorage.getItem("vendors") || []);
      const updatedVendors = vendors.map(v => {
        if (v.id === booking.vendor.id) {
          return {
            ...v,
            bookings: [
              ...(v.bookings || []),
              {
                date: booking.date,
                time: booking.time,
                service: booking.service,
                customer: user.email,
                status: "confirmed",
                paymentId,
                amount,
                paymentMethod: method
              }
            ]
          };
        }
        return v;
      });
      localStorage.setItem("vendors", JSON.stringify(updatedVendors));
    }, 2000);
  };

  if (!booking) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
        <h2 className="text-xl font-bold mb-4">No Appointment Found</h2>
        <p className="mb-4 text-gray-600">You haven't booked any appointment yet.</p>
        <button
          onClick={() => navigate("/services")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to Home
        </button>
      </div>
    );
  }

  const servicePrice = booking.vendor.services?.find(s => s.name === booking.service)?.price || 0;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Your Appointment Details</h2>

      <div className="space-y-3 text-sm mb-6">
        <p><strong>Service:</strong> {booking.service}</p>
        <p><strong>Date:</strong> {booking.date}</p>
        <p><strong>Time:</strong> {booking.time}</p>
        <p><strong>Vendor:</strong> {booking.vendor.name}</p>
        <p><strong>Amount:</strong> ₹{servicePrice}</p>
        <p><strong>Status:</strong> {paymentSuccess ? (
          <span className="text-green-600">Confirmed ✅ (Paid via {booking.paymentMethod})</span>
        ) : (
          <span className="text-orange-600">Pending Payment</span>
        )}</p>
        {user && <p><strong>Booked by:</strong> {user.email}</p>}
      </div>

      {!paymentSuccess && !showPayment && (
        <div className="mt-6 space-x-4">
          <button
            onClick={() => {
              if (!user) {
                localStorage.setItem("paymentRedirect", "true");
                navigate("/google-login");
              } else {
                setShowPayment(true);
              }
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Proceed to Payment
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Cancel Booking
          </button>
        </div>
      )}

      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">Login to Continue</h3>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="w-full p-2 border rounded"
                  required
                  minLength="6"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPayment && !paymentSuccess && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">Payment Options</h3>
          
          <div className="flex border-b mb-4">
            <button
              className={`px-4 py-2 ${activeTab === 'card' ? 'border-b-2 border-blue-500 font-medium' : ''}`}
              onClick={() => setActiveTab('card')}
            >
              Credit/Debit Card
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'upi' ? 'border-b-2 border-blue-500 font-medium' : ''}`}
              onClick={() => setActiveTab('upi')}
            >
              UPI
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'phone' ? 'border-b-2 border-blue-500 font-medium' : ''}`}
              onClick={() => setActiveTab('phone')}
            >
              Phone Payment
            </button>
          </div>
          
          {activeTab === 'card' && (
            <div className="bg-gray-100 p-4 rounded mb-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Card Number</label>
                <input 
                  type="text" 
                  placeholder="1234 5678 9012 3456" 
                  className="w-full p-2 border rounded"
                  disabled={loading}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Expiry Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY" 
                    className="w-full p-2 border rounded"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CVV</label>
                  <input 
                    type="text" 
                    placeholder="123" 
                    className="w-full p-2 border rounded"
                    disabled={loading}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name on Card</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full p-2 border rounded"
                  disabled={loading}
                />
              </div>
              
              <button
                onClick={() => handlePayment('card')}
                disabled={loading}
                className={`w-full py-2 px-4 rounded text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {loading ? 'Processing...' : `Pay ₹${servicePrice}`}
              </button>
            </div>
          )}
          
          {activeTab === 'upi' && (
            <div className="bg-gray-100 p-4 rounded mb-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">UPI ID</label>
                <input 
                  type="text" 
                  placeholder="yourname@upi" 
                  className="w-full p-2 border rounded"
                  disabled={loading}
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2 mb-4">
                {['googlepay', 'phonepe', 'paytm', 'amazonpay'].map(app => (
                  <button 
                    key={app}
                    className="p-2 border rounded flex items-center justify-center"
                  >
                    <img 
                      src={`https://logo.clearbit.com/${app}.com`} 
                      alt={app} 
                      className="h-6"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/24';
                      }}
                    />
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => handlePayment('upi')}
                disabled={loading}
                className={`w-full py-2 px-4 rounded text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {loading ? 'Processing...' : `Pay ₹${servicePrice} via UPI`}
              </button>
            </div>
          )}
          
          {activeTab === 'phone' && (
            <div className="bg-gray-100 p-4 rounded mb-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="9876543210" 
                  className="w-full p-2 border rounded"
                  disabled={loading}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Carrier</label>
                <select className="w-full p-2 border rounded" disabled={loading}>
                  <option>Airtel Payments Bank</option>
                  <option>Jio Payments Bank</option>
                  <option>Vodafone m-pesa</option>
                </select>
              </div>
              
              <button
                onClick={() => handlePayment('phone')}
                disabled={loading}
                className={`w-full py-2 px-4 rounded text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {loading ? 'Processing...' : `Pay ₹${servicePrice} via Phone`}
              </button>
            </div>
          )}
          
          <p className="text-sm text-gray-600 mt-2">
            This is a demo payment flow. No real money will be charged.
          </p>
        </div>
      )}

      {paymentSuccess && (
        <div className="mt-6">
          <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
            <p className="font-medium">Payment successful! Your appointment is confirmed.</p>
            <p className="text-sm mt-1">Payment ID: {booking.paymentId}</p>
            <p className="text-sm">Method: {booking.paymentMethod}</p>
          </div>
          
          <button
            onClick={() => navigate("/services")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Book Another Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default Appointments;