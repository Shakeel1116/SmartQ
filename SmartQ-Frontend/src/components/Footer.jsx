import React from "react";
import { motion } from "framer-motion";
import { 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin, 
  FaGithub,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

const Footer = () => {
  // Footer links data
  const quickLinks = [
    { name: "Services", href: "/#services" },
    { name: "Appointments", href: "/appointments" },
    { name: "Pricing", href: "/pricing" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: "https://facebook.com", color: "hover:text-blue-500" },
    { icon: <FaInstagram />, href: "https://instagram.com", color: "hover:text-pink-500" },
    { icon: <FaLinkedin />, href: "https://linkedin.com", color: "hover:text-blue-400" },
    { icon: <FaGithub />, href: "https://github.com", color: "hover:text-gray-300" },
  ];

  const contactInfo = [
    { icon: <FaMapMarkerAlt />, text: "123 Business Ave, Tech City" },
    { icon: <FaPhoneAlt />, text: "+1 (555) 123-4567" },
    { icon: <FaEnvelope />, text: "info@smartq.example" },
    { icon: <FaClock />, text: "Mon-Fri: 9AM - 6PM" },
  ];

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-900 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-900 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
        {/* Brand column */}
        <motion.div
          whileHover={{ y: -5 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            SmartQ
          </h2>
          <p className="text-gray-400">
            Revolutionizing appointment scheduling with real-time queue management for businesses and service providers.
          </p>
          <div className="flex space-x-4 pt-2">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xl ${social.color} transition-colors`}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick links column */}
        <motion.div
          whileHover={{ y: -5 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="space-y-3">
            {quickLinks.map((link, index) => (
              <motion.li 
                key={index}
                whileHover={{ x: 5 }}
              >
                <a 
                  href={link.href} 
                  className="flex items-center text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <FiArrowUpRight className="mr-2" />
                  {link.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact info column */}
        <motion.div
          whileHover={{ y: -5 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-white">Contact Us</h3>
          <ul className="space-y-3">
            {contactInfo.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-400 mr-3 mt-1">{item.icon}</span>
                <span className="text-gray-400">{item.text}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Newsletter column */}
        <motion.div
          whileHover={{ y: -5 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-white">Newsletter</h3>
          <p className="text-gray-400">
            Subscribe to get updates on new features and offers.
          </p>
          <form className="space-y-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
            <motion.button
              type="submit"
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} SmartQ. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            {legalLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href}
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Back to top button */}
          <motion.button
            onClick={scrollToTop}
            className="hidden md:flex items-center text-gray-400 hover:text-white transition-colors mt-4 md:mt-0"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to top
            <FiArrowUpRight className="ml-1 transform rotate-90" />
          </motion.button>
        </div>
      </div>

      {/* Floating back to top button for mobile */}
      <motion.button
        onClick={scrollToTop}
        className="md:hidden fixed bottom-6 right-6 bg-gray-800 bg-opacity-80 backdrop-blur-sm p-3 rounded-full shadow-lg z-20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiArrowUpRight className="text-white transform rotate-90" />
      </motion.button>
    </motion.footer>
  );
};

export default Footer;