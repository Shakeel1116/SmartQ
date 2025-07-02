import React, { useEffect, useState } from "react";
import axios from "axios";

const MusicClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/music-classes")
      .then((res) => setClasses(res.data))
      .catch((err) => {
        console.error("Failed to load music classes:", err);
        setClasses([
          {
            id: 1,
            name: "Melody Music Academy",
            location: "Ameerpet, Hyderabad",
            availableSlots: 6,
          },
          {
            id: 2,
            name: "Harmony School of Music",
            location: "Hitech City, Hyderabad",
            availableSlots: 3,
          },
        ]);
      });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Music Classes
      </h2>

      {classes.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No classes available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {classItem.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                {classItem.location}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                Available Slots: {classItem.availableSlots}
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

export default MusicClasses;