import { useEffect, useState } from "react";

const Appointments = () => {
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("selectedVendor");
    if (data) setVendor(JSON.parse(data));
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
      {!vendor ? (
        <p>No vendor selected.</p>
      ) : (
        <div className="bg-white p-4 border rounded shadow">
          <p><strong>Vendor:</strong> {vendor.name}</p>
          <p><strong>Service:</strong> {vendor.services?.join(", ")}</p>
          <p><strong>Available:</strong> {vendor.availability?.openTime} - {vendor.availability?.closeTime}</p>
          <p><strong>Holidays:</strong> {vendor.availability?.holidays?.join(", ") || "None"}</p>
          <p className="mt-4 text-sm text-green-700">Booking available for next 3 months only.</p>
          {/* You can add calendar and payment form here */}
        </div>
      )}
    </div>
  );
};

export default Appointments;
