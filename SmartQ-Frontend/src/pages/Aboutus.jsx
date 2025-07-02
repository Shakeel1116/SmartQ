import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="pt-28 pb-20 bg-gray-50 dark:bg-gray-900 min-h-screen px-4">
      <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8"
        >
          About SmartQ
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-700 dark:text-gray-300 text-center mb-12"
        >
          SmartQ is a real-time queue and appointment management system built to ease service
          scheduling for clinics, salons, service centers, and coaching institutes. We bring
          automation, clarity, and convenience to both service providers and their customers.
        </motion.p>

        {/* Sections */}
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
          >
            <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
              Our Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              To streamline appointment systems for small businesses and service providers by
              offering an easy-to-use digital platform that reduces wait times and enhances
              customer satisfaction.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
          >
            <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
              Our Vision
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              To become the go-to platform for digital queue management across multiple industries,
              reducing operational stress and empowering service owners with real-time visibility and
              control.
            </p>
          </motion.div>
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Need Support or Want to Collaborate?
          </h3>
          <p className="text-blue-600 dark:text-blue-400">📧 shaikshakeel860@gmail.com</p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
