import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format, addDays } from "date-fns";

const ServicePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [selectedTimes, setSelectedTimes] = useState({});
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loadVendors = () => {
    const pathToServiceMap = {
      "/clinic-appointments": "clinic",
      "/salon-bookings": "salon",
      "/ac-repair": "repair",
      "/coaching-sessions": "coaching",
      "/photography": "photography",
      "/event-planning": "event",
      "/driving-school": "driving",
      "/home-cleaning": "cleaning",
      "/pet-care": "pet",
      "/legal-advice": "legal",
      "/car-services": "car",
      "/home-decor": "decor",
      "/music-classes": "music",
      "/yoga-sessions": "yoga",
      "/therapy": "therapy"
    };

    const currentPath = location.pathname;
    const mappedService = pathToServiceMap[currentPath];
    setServiceName(mappedService);

    const allVendors = JSON.parse(localStorage.getItem("vendors") || "[]");
    const filtered = allVendors.filter((vendor) =>
      vendor.services?.some(s => s.name === mappedService)
    );

    setVendors(filtered);
    setFilteredVendors(filtered);
    setLoading(false);
  };

  useEffect(() => {
    loadVendors();
  }, [location.pathname]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredVendors(vendors);
    } else {
      const filtered = vendors.filter(vendor =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVendors(filtered);
    }
  }, [searchTerm, vendors]);

  const generateTimeSlots = (vendor) => {
    const today = new Date(selectedDate);
    const dayOfWeek = format(today, 'EEEE').toLowerCase();
    if (dayOfWeek === 'sunday') return ["Closed"];

    const slots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];
    const bookedTimes = vendor.bookings?.filter(
      (b) => b.date === selectedDate
    ).map((b) => b.time) || [];

    const available = slots.filter(slot => !bookedTimes.includes(slot));
    return available.length > 0 ? available : ["Closed"];
  };

  const handleBook = (vendor) => {
    const selectedTime = selectedTimes[vendor.id];
    if (!selectedTime || selectedTime === "Closed") {
      alert("Please select a valid time slot.");
      return;
    }

    const allVendors = JSON.parse(localStorage.getItem("vendors") || "[]");
    const updatedVendors = allVendors.map(v => {
      if (v.id === vendor.id) {
        const newBooking = {
          date: selectedDate,
          time: selectedTime,
          service: serviceName,
          customer: JSON.parse(localStorage.getItem("user"))?.email || "guest",
          status: "confirmed"
        };
        return {
          ...v,
          bookings: [...(v.bookings || []), newBooking]
        };
      }
      return v;
    });

    localStorage.setItem("vendors", JSON.stringify(updatedVendors));
    loadVendors();
    setSelectedTimes({});

    const bookingDetails = {
      vendor,
      service: serviceName,
      date: selectedDate,
      time: selectedTime,
      user: JSON.parse(localStorage.getItem("user"))
    };

    localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
    navigate("/appointments");
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTimes({});
  };

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = addDays(today, i);
      dates.push(format(date, 'yyyy-MM-dd'));
    }
    return dates;
  };

  const calculateRating = (vendor) => {
    if (!vendor.ratings || vendor.ratings.length === 0) return 0;
    const sum = vendor.ratings.reduce((acc, curr) => acc + curr.value, 0);
    return (sum / vendor.ratings.length).toFixed(1);
  };

  if (loading) return <div className="max-w-5xl mx-auto p-6 text-center text-gray-700 dark:text-gray-200">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <h2 className="text-2xl font-bold capitalize mb-6">{serviceName} Service Providers</h2>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search vendors by name, location or description..."
          className="flex-grow p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <label htmlFor="date-select" className="font-medium">Select Date:</label>
          <select
            id="date-select"
            className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
          >
            {getAvailableDates().map(date => (
              <option key={date} value={date}>{format(new Date(date), 'EEE, MMM d')}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredVendors.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">❌ No vendors found for this service.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredVendors.map((vendor) => {
            const timeSlots = generateTimeSlots(vendor);
            const rating = calculateRating(vendor);
            return (
              <div key={vendor.id} className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 border rounded shadow-md dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{vendor.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{vendor.email}</p>
                    {vendor.location && <p className="text-sm mb-1"><strong>Location:</strong> {vendor.location}</p>}
                    {vendor.description && <p className="text-sm mb-2">{vendor.description}</p>}
                    <p className="text-sm"><strong>Services:</strong> {vendor.services.map(s => s.name).join(", ")}</p>
                    {vendor.services?.some(s => s.name === serviceName) && (
                      <p className="text-sm mb-1"><strong>Price:</strong> ₹{vendor.services.find(s => s.name === serviceName).price}</p>
                    )}
                  </div>
                  {rating > 0 && (
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center dark:bg-blue-900 dark:text-blue-300">
                      <span className="font-bold mr-1">{rating}</span><span>★</span>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <h4 className="font-medium mb-2">Available Time Slots:</h4>
                  {timeSlots[0] === "Closed" ? (
                    <p className="text-red-500">Closed on this day</p>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() =>
                            setSelectedTimes((prev) => ({
                              ...prev,
                              [vendor.id]: time
                            }))
                          }
                          className={`p-2 border rounded text-sm ${
                            selectedTimes[vendor.id] === time
                              ? 'bg-blue-600 text-white'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <p className="font-bold">
                    {vendor.services?.some(s => s.name === serviceName)
                      ? `₹${vendor.services.find(s => s.name === serviceName).price}`
                      : "Price not available"}
                  </p>
                  <button
                    onClick={() => handleBook(vendor)}
                    disabled={timeSlots[0] === "Closed"}
                    className={`px-4 py-2 rounded ${
                      timeSlots[0] === "Closed"
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ServicePage;
