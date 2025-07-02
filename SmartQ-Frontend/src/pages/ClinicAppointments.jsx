import React, { useEffect, useState } from "react";
import axios from "axios";

const ClinicAppointments = () => {
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/clinics")
      .then((res) => setClinics(res.data))
      .catch((err) => {
        console.error("Failed to load clinics:", err);

        // fallback sample clinics
        setClinics([
          {
            id: 1,
            name: "Smile Care Clinic",
            address: "Madhapur, Hyderabad",
            availableSlots: 5,
          },
          {
            id: 2,
            name: "City Health Hospital",
            address: "Begumpet, Hyderabad",
            availableSlots: 8,
          },
        ]);
      });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Clinic Appointments
      </h2>

      {clinics.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No clinics available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {clinics.map((clinic) => (
            <div
              key={clinic.id}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {clinic.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                {clinic.address}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                Available Slots: {clinic.availableSlots}
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClinicAppointments;
