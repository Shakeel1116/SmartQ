import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { format, addDays, isToday, isTomorrow, parseISO } from 'date-fns';

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [workingHours, setWorkingHours] = useState({});
  const [slotDuration, setSlotDuration] = useState(30);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const loadVendorData = () => {
      const storedVendor = localStorage.getItem('vendor');
      if (!storedVendor) {
        navigate('/vendor-login');
      } else {
        const vendorData = JSON.parse(storedVendor);
        const defaultHours = {
          monday: { open: '09:00', close: '18:00' },
          tuesday: { open: '09:00', close: '18:00' },
          wednesday: { open: '09:00', close: '18:00' },
          thursday: { open: '09:00', close: '18:00' },
          friday: { open: '09:00', close: '18:00' },
          saturday: { open: '09:00', close: '18:00' },
          sunday: {}, // Closed
        };
        const finalHours = { ...defaultHours, ...(vendorData.workingHours || {}) };
        finalHours.sunday = {}; // Ensure Sunday is always off
        setVendor(vendorData);
        setWorkingHours(finalHours);
        setSlotDuration(vendorData.slotDuration || 30);
        setIsLoading(false);
      }
    };

    loadVendorData();
  }, [navigate]);

  // Restrict navigation when vendor is logged in
  useEffect(() => {
    const handleBackButton = (e) => {
      if (vendor) {
        e.preventDefault();
        // Optionally show a message that they can't navigate away
        alert('Please logout first to visit other pages');
      }
    };

    window.addEventListener('popstate', handleBackButton);
    return () => window.removeEventListener('popstate', handleBackButton);
  }, [vendor]);

  useEffect(() => {
    if (vendor) {
      generateSlotsForDate(selectedDate);
    }
  }, [selectedDate, vendor, workingHours, slotDuration]);

  const generateSlotsForDate = (date) => {
    const day = format(new Date(date), 'EEEE').toLowerCase();
    const hours = workingHours[day];
    if (!hours || !hours.open || !hours.close) {
      setAvailableSlots([]);
      setBookedSlots([]);
      return;
    }

    const [startHour, startMinute] = hours.open.split(':').map(Number);
    const [endHour, endMinute] = hours.close.split(':').map(Number);

    const slots = [];
    let currentHour = startHour;
    let currentMinute = startMinute;

    while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
      const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute
        .toString()
        .padStart(2, '0')}`;
      slots.push(timeString);
      currentMinute += slotDuration;
      if (currentMinute >= 60) {
        currentMinute -= 60;
        currentHour += 1;
      }
    }

    const bookingsForDate = vendor.bookings?.filter((booking) => booking.date === date) || [];
    setAvailableSlots(slots);
    setBookedSlots(bookingsForDate.map((b) => b.time));
    setSelectedSlot(null);
  };

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = addDays(today, i);
      dates.push({
        date: format(date, 'yyyy-MM-dd'),
        label: format(date, 'EEE, MMM d'),
        isToday: isToday(date),
        isTomorrow: isTomorrow(date),
      });
    }
    return dates;
  };

  const handleLogout = () => {
    localStorage.removeItem('vendor');
    navigate('/vendor-login');
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSlotClick = (slot) => {
    if (bookedSlots.includes(slot)) {
      return;
    }
    setSelectedSlot(slot === selectedSlot ? null : slot);
  };

  const handleBlockSlot = () => {
    if (!selectedSlot) return;
    
    const updatedVendor = {
      ...vendor,
      bookings: [
        ...(vendor.bookings || []),
        {
          date: selectedDate,
          time: selectedSlot,
          customer: 'Blocked by Vendor',
          service: 'Blocked Slot'
        }
      ]
    };
    
    localStorage.setItem('vendor', JSON.stringify(updatedVendor));
    setVendor(updatedVendor);
    setBookedSlots([...bookedSlots, selectedSlot]);
    setSelectedSlot(null);
  };

  const handleUnblockSlot = (slot) => {
    const updatedVendor = {
      ...vendor,
      bookings: vendor.bookings?.filter(b => !(b.date === selectedDate && b.time === slot)) || []
    };
    
    localStorage.setItem('vendor', JSON.stringify(updatedVendor));
    setVendor(updatedVendor);
    setBookedSlots(bookedSlots.filter(t => t !== slot));
  };

  const selectedDay = format(new Date(selectedDate), 'EEEE');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!vendor) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Restricted Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-gray-900">
                Vendor Dashboard
              </span>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="p-6">
        {/* Vendor Info */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <p className="mb-1"><strong>Name:</strong> {vendor.name}</p>
          <p className="mb-1"><strong>Email:</strong> {vendor.email}</p>
          <p className="mb-1"><strong>Service Type:</strong> {vendor.serviceType}</p>
          <p><strong>Slot Duration:</strong> {slotDuration} minutes</p>
        </div>

        {/* Services */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Services & Prices</h3>
          {vendor.services && vendor.services.length > 0 ? (
            <ul className="space-y-1">
              {vendor.services.map((service, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{service.name}</span>
                  <span className="font-medium">₹{service.price}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No services available.</p>
          )}
        </div>

        {/* Date Selection */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <label className="block mb-2 font-medium">Select Date</label>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {getAvailableDates().map(({ date, label, isToday, isTomorrow }) => (
              <button
                key={date}
                onClick={() => handleDateChange(date)}
                className={`px-3 py-2 rounded-md text-sm whitespace-nowrap ${
                  selectedDate === date
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {label} {isToday ? '(Today)' : isTomorrow ? '(Tomorrow)' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">
              Time Slots - {selectedDay} ({format(parseISO(selectedDate), 'MMM d, yyyy')})
            </h3>
            {selectedSlot && (
              <button
                onClick={handleBlockSlot}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
              >
                Block Selected Slot
              </button>
            )}
          </div>

          {availableSlots.length === 0 ? (
            <div className="text-gray-500 p-4 text-center">
              {selectedDay === 'Sunday' ? 'Closed on Sunday' : 'No slots available for this day'}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {availableSlots.map((slot, idx) => {
                const isBooked = bookedSlots.includes(slot);
                const isSelected = selectedSlot === slot;
                
                return (
                  <div
                    key={idx}
                    onClick={() => handleSlotClick(slot)}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      isBooked
                        ? 'bg-red-100 border-red-300 text-red-700'
                        : isSelected
                        ? 'bg-blue-100 border-blue-500 text-blue-700'
                        : 'bg-green-100 border-green-300 text-green-700 hover:border-green-500'
                    }`}
                  >
                    <div className="font-medium text-center">{slot}</div>
                    {isBooked && (
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs">Booked</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUnblockSlot(slot);
                          }}
                          className="text-xs bg-red-500 text-white px-1 rounded hover:bg-red-600"
                        >
                          Unblock
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Current Selection Info */}
        {selectedSlot && (
          <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-blue-700">
              Selected slot: <strong>{selectedSlot}</strong> on <strong>{format(parseISO(selectedDate), 'MMM d, yyyy')}</strong>
            </p>
            <p className="text-sm text-blue-600 mt-1">
              Click "Block Selected Slot" to mark this time as unavailable
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;