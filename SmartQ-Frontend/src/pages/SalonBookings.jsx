import react from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const SalonBookings = () => {
  const [salons, setSalons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/salons")
      .then((res) => setSalons(res.data))
      .catch((err) => {
        console.error("Failed to load salons. Showing sample data instead.", err);
        setSalons([
          {
            id: 1,
            name: "Glamour Studio",
            address: "Banjara Hills, Hyderabad",
            availableSlots: 4,
          },
          {
            id: 2,
            name: "Elite Salon",
            address: "Kukatpally, Hyderabad",
            availableSlots: 6,
          },
        ]);
      });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Salon Bookings
      </h2>

      {salons.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No salons available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {salons.map((salon) => (
            <div
              key={salon.id}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {salon.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                {salon.address}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                Available Slots: {salon.availableSlots}
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SalonBookings;
