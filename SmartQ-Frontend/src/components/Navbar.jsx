import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle, FaHome, FaUserShield, FaStore } from "react-icons/fa";
import { BsMoon, BsSun } from "react-icons/bs";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isVendor, setIsVendor] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [userData, setUserData] = useState(null);

  const isAdminDashboard = location.pathname === "/admin-dashboard" && isAdmin;

  // Load user roles and theme
  useEffect(() => {
    const savedMode = localStorage.getItem("theme") === "dark";
    setDarkMode(savedMode);
    document.documentElement.classList.toggle("dark", savedMode);

    const user = localStorage.getItem("userData");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
      setIsUser(true);
      if (parsedUser.isGoogleUser) setIsGoogleUser(true);
    }

    const vendor = localStorage.getItem("vendorData");
    if (vendor) {
      setUserData(JSON.parse(vendor));
      setIsVendor(true);
    }

    const admin = localStorage.getItem("adminData");
    if (admin) {
      setUserData(JSON.parse(admin));
      setIsAdmin(true);
    }
  }, [location]);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const scrollToServices = () => {
    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.location.href = "/services";
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAdmin(false);
    setIsVendor(false);
    setIsUser(false);
    setIsGoogleUser(false);
    setUserData(null);
    navigate("/");
  };

  const isLoggedIn = isAdmin || isVendor || isUser || isGoogleUser;

  return (
    <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md fixed top-0 left-0 w-full z-50 border-b border-gray-200/50 dark:border-gray-700/50 transition-all">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center relative">
        <Link
          to="/"
          className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 tracking-wide hover:scale-105 transition-transform duration-200"
        >
          SmartQ
        </Link>

        {isAdminDashboard ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        ) : (
          <div className="hidden md:flex items-center gap-8">
            {!isAdmin && !isVendor && (
              <>
                <Link to="/" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                  <FaHome className="inline-block mr-1" /> Home
                </Link>
                <button
                  onClick={scrollToServices}
                  className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Services
                </button>
                <Link to="/appointments" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Appointments
                </Link>
              </>
            )}

            {isVendor && (
              <Link to="/vendor-dashboard" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                <FaStore className="inline mr-1" /> Dashboard
              </Link>
            )}

            <Link to="/about" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              About Us
            </Link>

            <motion.button
              onClick={toggleDarkMode}
              className="text-xl text-gray-600 dark:text-yellow-300 hover:scale-110 transition"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <BsSun /> : <BsMoon />}
            </motion.button>

            <div className="relative">
              <motion.button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center text-blue-600 dark:text-blue-400 text-2xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaUserCircle />
              </motion.button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 mt-2 z-50 overflow-hidden"
                  >
                    {isLoggedIn ? (
                      <>
                        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                          <p className="font-medium text-gray-800 dark:text-gray-200 truncate">
                            {userData?.user?.name || userData?.user?.username}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {userData?.user?.email}
                          </p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/user-signup" onClick={() => setProfileOpen(false)} className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700">
                          <FaUserCircle className="mr-2" /> User Signup
                        </Link>
                        <Link to="/user-login" onClick={() => setProfileOpen(false)} className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700">
                          <FaUserCircle className="mr-2" /> User Login
                        </Link>
                        <Link to="/vendor-login" onClick={() => setProfileOpen(false)} className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700">
                          <FaStore className="mr-2" /> Vendor Login
                        </Link>
                        <Link to="/admin-login" onClick={() => setProfileOpen(false)} className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700">
                          <FaUserShield className="mr-2" /> Admin Login
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        <motion.button
          className="md:hidden text-3xl text-gray-700 dark:text-gray-200"
          onClick={() => setMenuOpen(!menuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {menuOpen ? "✕" : "☰"}
        </motion.button>
      </div>
    </header>
  );
};

export default Navbar;
