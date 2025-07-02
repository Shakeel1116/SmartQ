import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const UserSignupPage = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
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
    setTouched({ ...touched, [name]: true });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    } else if (form.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
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
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validateForm();
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:8080/api/auth/signup", {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      if (data?.user) {
        localStorage.setItem("userData", JSON.stringify({
          user: data.user,
          token: data.token,
        }));
        toast.success("Signup successful! Redirecting...", {
          autoClose: 2000,
          onClose: () => navigate("/"),
        });
      }
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response) {
        const errorMessage = (
          err.response.data?.message ||
          err.response.data?.error ||
          err.response.data ||
          "User already exists"
        ).toString().toLowerCase();
        if (err.response.status === 409) {
          if (errorMessage.includes("email")) {
            toast.error("This email is already registered. Please login instead.");
            setErrors({ ...errors, email: "Email already registered" });
            setTimeout(() => navigate("/user-login"), 2000);
          } else if (errorMessage.includes("username")) {
            toast.error("This username is already taken. Please choose another.");
            setErrors({ ...errors, username: "Username already taken" });
          } else {
            toast.error("Account already exists. Please login.");
            setTimeout(() => navigate("/user-login"), 2000);
          }
        } else if (err.response.status === 400) {
          toast.error("Invalid input data. Please check your details.");
        } else {
          toast.error(`Signup failed: ${err.response.statusText}`);
        }
      } else if (err.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred.");
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
      if (!data?.user) throw new Error("Invalid Google response");
      localStorage.setItem("userData", JSON.stringify({
        user: data.user,
        token: data.token,
        isGoogleUser: true,
      }));
      toast.success(`Welcome ${data.user.name || data.user.username}! Redirecting...`, {
        autoClose: 2000,
        onClose: () => navigate("/"),
      });
    } catch (err) {
      console.error("Google login error:", err);
      toast.error("Google signup failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error("Google signup failed. Please try again or use another method.");
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
        <form
          onSubmit={handleSignup}
          className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-md w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
            Create Your Account
          </h2>

          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              required
              className={`w-full p-2 rounded border ${errors.username ? "border-red-500" : "border-gray-300"}`}
            />
            {touched.username && errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username}</p>
            )}
          </div>

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
              required
              minLength={8}
              className={`w-full p-2 rounded border ${errors.password ? "border-red-500" : "border-gray-300"}`}
            />
            {touched.password && errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              required
              minLength={8}
              className={`w-full p-2 rounded border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
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
              text="signup_with"
              disabled={googleLoading}
            />
          </div>

          <p className="text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link 
              to="/user-login" 
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Log in
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

export default UserSignupPage;
