import React, { useEffect, useState } from "react";
import axios from "axios";

const CoachingSessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/coaching")
      .then((res) => setSessions(res.data))
      .catch((err) => {
        console.error("Failed to load sessions:", err);

        // Fallback sample data
        setSessions([
          {
            id: 1,
            name: "JEE Crash Course",
            trainer: "Mr. Ramesh",
            location: "Ameerpet, Hyderabad",
            slots: 10,
          },
          {
            id: 2,
            name: "SSC CGL Prep",
            trainer: "Ms. Priya",
            location: "Kukatpally, Hyderabad",
            slots: 6,
          },
        ]);
      });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Coaching Sessions
      </h2>

      {sessions.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No sessions available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {session.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Trainer: {session.trainer}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Location: {session.location}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                Available Slots: {session.slots}
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

export default CoachingSessions;
