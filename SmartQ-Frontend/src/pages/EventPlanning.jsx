import React, { useEffect, useState } from "react";
import axios from "axios";

const EventPlanning = () => {
  const [planners, setPlanners] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/event-planning")
      .then((res) => setPlanners(res.data))
      .catch((err) => {
        console.error("Failed to load event planners:", err);
        setPlanners([
          {
            id: 1,
            name: "Grand Events Co.",
            location: "Jubilee Hills, Hyderabad",
            availableSlots: 2,
          },
          {
            id: 2,
            name: "Memorable Moments",
            location: "Madhapur, Hyderabad",
            availableSlots: 4,
          },
        ]);
      });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Event Planning
      </h2>

      {planners.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No planners available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {planners.map((planner) => (
            <div
              key={planner.id}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {planner.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                {planner.location}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                Available Slots: {planner.availableSlots}
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

export default EventPlanning;