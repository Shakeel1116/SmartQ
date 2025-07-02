import { useParams, useNavigate } from "react-router-dom";
import { services } from "./services";

const allShops = Object.values(services).flatMap((s) => s.shops);

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const shop = allShops.find((s) => s.id === parseInt(id));

  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment successful!");
    navigate("/appointments");
  };

  if (!shop) return <p className="p-4 text-red-500">Shop Not Found</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{shop.name} - Book Appointment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Select Date:
          <input
            type="date"
            name="date"
            className="border p-2 w-full mt-1"
            min={today.toISOString().split("T")[0]}
            max={maxDate.toISOString().split("T")[0]}
            required
          />
        </label>

        <label className="block">
          Select Time:
          <select name="time" className="border p-2 w-full mt-1" required>
            <option value="">-- Choose --</option>
            <option>10:00 AM</option>
            <option>12:00 PM</option>
            <option>2:00 PM</option>
            <option>4:00 PM</option>
          </select>
        </label>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Pay & Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
