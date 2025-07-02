import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { clearOtherRoles } from "../Forms/roleUtils";
import "react-toastify/dist/ReactToastify.css";

const UserLoginPage = () => {
  const [form, setForm] = useState({ 
    email: "", 
    password: "" 
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if any user is already logged in
    const roles = ["userData", "vendorData", "adminData"];
    for (const role of roles) {
      if (localStorage.getItem(role)) {
        navigate("/");
        return;
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Mark the field as touched
    setTouched({ ...touched, [name]: true });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validateForm();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const { data } = await axios.post("http://localhost:8080/api/auth/login", form);

      if (data?.user) {
        clearOtherRoles("userData");
        localStorage.setItem("userData", JSON.stringify({ 
          user: data.user, 
          token: data.token 
        }));
        toast.success(`Welcome back, ${data.user.name || data.user.username}!`);
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error("Login failed: Invalid response from server");
      }
    } catch (err) {
      console.error("Login error:", err);
      
      if (err.response) {
        const { status, data } = err.response;
        
        if (status === 401) {
          toast.error("Invalid email or password");
        } else if (status === 404) {
          toast.error("Account not found. Please sign up.");
          setTimeout(() => navigate("/signup"), 2000);
        } else if (status === 403) {
          toast.error("Account not verified. Please check your email.");
        } else {
          toast.error("Login failed. Please try again.");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (response) => {
    setGoogleLoading(true);
    
    try {
      const { credential } = response;
      const decoded = jwtDecode(credential);

      const { data } = await axios.post("http://localhost:8080/api/auth/google", {
        token: credential,
      });

      if (!data?.user) {
        throw new Error("Invalid server response");
      }

      clearOtherRoles("userData");
      localStorage.setItem(
        "userData",
        JSON.stringify({ 
          user: data.user, 
          token: data.token, 
          isGoogleUser: true 
        })
      );
      toast.success(`Welcome ${data.user.name || data.user.username}!`);
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error("Google login error:", err);
      
      if (err.response?.status === 404) {
        toast.error("Account not found. Please sign up first.");
        setTimeout(() => navigate("/signup"), 2000);
      } else {
        toast.error("Google login failed. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error("Google login failed. Please try again or use another method.");
  };

  const handleForgotPassword = () => {
    if (!form.email) {
      toast.info("Please enter your email first");
      return;
    }
    navigate("/forgot-password", { state: { email: form.email } });
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
        <form
          onSubmit={handleLogin}
          className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-md w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
            Welcome Back
          </h2>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              placeholder="Enter your email"
              required
              className={`w-full p-2 rounded border ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {touched.email && errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              placeholder="Enter your password"
              required
              className={`w-full p-2 rounded border ${errors.password ? "border-red-500" : "border-gray-300"}`}
            />
            {touched.password && errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="mb-6 flex justify-end">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="my-4 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 dark:text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="flex justify-center mb-4">
            <GoogleLogin 
              onSuccess={handleGoogleSuccess} 
              onError={handleGoogleError} 
              text="continue_with"
              disabled={googleLoading}
            />
          </div>

          <p className="text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link 
              to="/user-signup" 
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign up
            </Link>
          </p>
        </form>

        <ToastContainer 
          position="top-right" 
          autoClose={5000} 
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default UserLoginPage;