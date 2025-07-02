import React, { useEffect, useState } from "react";
import axios from "axios";

const LegalAdvice = () => {
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/legal-advice")
      .then((res) => setLawyers(res.data))
      .catch((err) => {
        console.error("Failed to load lawyers:", err);
        setLawyers([
          {
            id: 1,
            name: "Justice Law Associates",
            location: "City Center, Hyderabad",
            availableSlots: 2,
          },
          {
            id: 2,
            name: "Legal Solutions",
            location: "Financial District, Hyderabad",
            availableSlots: 1,
          },
        ]);
      });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Legal Advice
      </h2>

      {lawyers.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No lawyers available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {lawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {lawyer.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                {lawyer.location}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                Available Slots: {lawyer.availableSlots}
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Consult Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LegalAdvice;