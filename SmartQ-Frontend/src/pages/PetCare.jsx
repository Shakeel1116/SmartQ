import React, { useEffect, useState } from "react";
import axios from "axios";

const PetCare = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/pet-care")
      .then((res) => setServices(res.data))
      .catch((err) => {
        console.error("Failed to load pet care services:", err);
        setServices([
          {
            id: 1,
            name: "Paws & Claws",
            location: "Banjara Hills, Hyderabad",
            availableSlots: 3,
          },
          {
            id: 2,
            name: "Pet Paradise",
            location: "Gachibowli, Hyderabad",
            availableSlots: 6,
          },
        ]);
      });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Pet Care Services
      </h2>

      {services.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No services available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                {service.location}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                Available Slots: {service.availableSlots}
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

export default PetCare;