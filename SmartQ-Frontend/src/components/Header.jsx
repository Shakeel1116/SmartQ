import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle, FiClock, FiUsers, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";

const reviews = [
  {
    name: "Joseph M.",
    message: "SmartQ made my salon booking so smooth. Loved the experience!",
    rating: 5,
    date: "2 days ago"
  },
  {
    name: "Mahendra M.",
    message: "Booked a doctor's appointment and skipped the queue. Amazing service!",
    rating: 4,
    date: "1 week ago"
  },
  {
    name: "Simha B.",
    message: "Great for AC repairs—super fast and easy to manage! Will use again.",
    rating: 5,
    date: "3 days ago"
  },
  {
    name: "Priya K.",
    message: "Never waited in line again for my yoga classes. Game changer!",
    rating: 5,
    date: "2 weeks ago"
  },
  {
    name: "Rahul S.",
    message: "The business dashboard helped me manage my auto shop bookings efficiently.",
    rating: 4,
    date: "5 days ago"
  },
];

const stats = [
  { value: "10K+", label: "Daily Bookings", icon: <FiCheckCircle className="w-6 h-6" /> },
  { value: "500+", label: "Partner Businesses", icon: <FiUsers className="w-6 h-6" /> },
  { value: "98%", label: "Satisfaction Rate", icon: <FiStar className="w-6 h-6" /> },
  { value: "24/7", label: "Support Available", icon: <FiClock className="w-6 h-6" /> },
];

const services = [
  { name: "Healthcare", description: "Doctor appointments, lab tests, and more" },
  { name: "Beauty & Wellness", description: "Salons, spas, and fitness classes" },
  { name: "Home Services", description: "Repairs, cleaning, and maintenance" },
  { name: "Professional Services", description: "Legal, coaching, and consultations" },
];

const Header = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 pt-28 pb-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <motion.div 
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-24 h-24 bg-blue-200 rounded-full opacity-10 blur-xl top-10 left-10"
        />
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-40 h-40 bg-purple-200 rounded-full opacity-10 blur-xl top-32 right-24"
        />
        <motion.div 
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-28 h-28 bg-pink-200 rounded-full opacity-10 blur-xl bottom-10 left-1/3"
        />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-block px-4 py-2 mb-4 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 rounded-full"
          >
            Revolutionizing Appointment Booking
          </motion.span>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              SmartQ
            </span> - Your Queue-Free Future
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Streamline your appointments across healthcare, beauty, home services, and more. 
            Save time, reduce stress, and enjoy seamless scheduling.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/user-signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Get Started Now
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-medium rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
              >
                How It Works <FiArrowRight className="inline ml-2" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-blue-600 dark:text-blue-400 mb-3">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">{stat.value}</h3>
              <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Services Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Services We Simplify
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all border-l-4 border-blue-500"
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{service.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Reviews Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
              Trusted by Thousands
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join our community of satisfied users and businesses who've transformed their scheduling experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {reviews.slice(0, 3).map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-4 text-lg">
                  “{review.message}”
                </p>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-blue-600 dark:text-blue-400">
                    — {review.name}
                  </p>
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    {review.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {reviews.slice(3).map((review, idx) => (
              <motion.div
                key={idx + 3}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  “{review.message}”
                </p>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-blue-600 dark:text-blue-400">
                    — {review.name}
                  </p>
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    {review.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Scheduling?</h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Join thousands of users and businesses who are saving time and improving customer satisfaction with SmartQ.
          </p>
          <Link to="/user-signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-blue-600 font-medium rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Sign Up Free Today
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Header;