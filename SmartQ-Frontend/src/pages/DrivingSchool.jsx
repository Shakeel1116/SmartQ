import React, { useEffect, useState } from "react";
import axios from "axios";

const DrivingSchool = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/driving-schools")
      .then((res) => setSchools(res.data))
      .catch((err) => {
        console.error("Failed to load driving schools:", err);
        setSchools([
          {
            id: 1,
            name: "Safe Wheels Academy",
            location: "Secunderabad, Hyderabad",
            availableSlots: 8,
          },
          {
            id: 2,
            name: "Expert Drivers Institute",
            location: "Hitech City, Hyderabad",
            availableSlots: 5,
          },
        ]);
      });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Driving Schools
      </h2>

      {schools.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No schools available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {schools.map((school) => (
            <div
              key={school.id}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {school.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                {school.location}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                Available Slots: {school.availableSlots}
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DrivingSchool;