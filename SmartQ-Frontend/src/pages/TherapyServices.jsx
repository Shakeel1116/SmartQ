import React, { useEffect, useState } from "react";
import axios from "axios";

const TherapyServices = () => {
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/therapy")
      .then((res) => setTherapists(res.data))
      .catch((err) => {
        console.error("Failed to load therapists:", err);
        setTherapists([
          {
            id: 1,
            name: "Mindful Therapy Center",
            location: "Jubilee Hills, Hyderabad",
            availableSlots: 3,
          },
          {
            id: 2,
            name: "Healing Touch",
            location: "Madhapur, Hyderabad",
            availableSlots: 2,
          },
        ]);
      });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Therapy Services
      </h2>

      {therapists.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No therapists available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {therapists.map((therapist) => (
            <div
              key={therapist.id}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {therapist.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                {therapist.location}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                Available Slots: {therapist.availableSlots}
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Book Session
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TherapyServices;