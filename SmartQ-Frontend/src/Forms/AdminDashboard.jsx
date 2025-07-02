import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { vendors as initialVendors } from "./vendorData";
import { serviceTypes } from "./servicesData";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [stats, setStats] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showModal, setShowModal] = useState({
    addVendor: false,
    servicePrice: false,
  });
  const [modalData, setModalData] = useState({
    newVendor: { name: "", email: "", password: "", services: [] },
    currentService: "",
    tempPrice: ""
  });

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin");
    if (!isAdmin) navigate("/admin-login");
    loadVendors();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [vendors]);

  if (!localStorage.getItem("admin")) return null;

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = (vendor) => {
    const errors = {};
    if (!vendor.name?.trim()) errors.name = "Name is required";
    if (!validateEmail(vendor.email)) errors.email = "Valid email is required";
    if (!vendor.password || vendor.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (!vendor.services || vendor.services.length === 0)
      errors.services = "At least one service must be selected";
    return errors;
  };

  const loadVendors = () => {
    const saved = localStorage.getItem("vendors");
    setVendors(saved ? JSON.parse(saved) : initialVendors);
  };

  const saveVendors = (updated) => {
    setVendors(updated);
    localStorage.setItem("vendors", JSON.stringify(updated));
  };

  const calculateStats = () => {
    const stats = {
      totalVendors: vendors.length,
      services: {}
    };
    serviceTypes.forEach(service => {
      stats.services[service] = vendors.filter(v =>
        (v.services || []).some(s => s.name === service)
      ).length;
    });
    setStats(stats);
  };

  const openAddVendorModal = () => {
    setModalData({ newVendor: { name: "", email: "", password: "", services: [] }, currentService: "", tempPrice: "" });
    setShowModal({ ...showModal, addVendor: true });
  };

  const handleAddService = (service) => {
    setModalData({ ...modalData, currentService: service, tempPrice: "" });
    setShowModal({ ...showModal, servicePrice: true });
  };

  const saveServicePrice = (price) => {
    const priceVal = parseFloat(price);
    if (!isNaN(priceVal) && priceVal > 0) {
      setModalData(prev => ({
        ...prev,
        newVendor: {
          ...prev.newVendor,
          services: [...prev.newVendor.services, { name: prev.currentService, price: priceVal }]
        }
      }));
    }
    setShowModal({ ...showModal, servicePrice: false });
  };

  const removeService = (name) => {
    setModalData(prev => ({
      ...prev,
      newVendor: {
        ...prev.newVendor,
        services: prev.newVendor.services.filter(s => s.name !== name)
      }
    }));
  };

  const saveNewVendor = () => {
    const errors = validateForm(modalData.newVendor);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    const newVendor = { id: Date.now(), ...modalData.newVendor, createdAt: new Date().toISOString() };
    saveVendors([...vendors, newVendor]);
    setShowModal({ ...showModal, addVendor: false });
    setFormErrors({});
  };

  const handleDeleteVendor = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this vendor?");
    if (!confirmDelete) return;
    const updated = vendors.filter(v => v.id !== id);
    saveVendors(updated);
  };

  const filtered = vendors.filter(v =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (v.services || []).some(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 max-w-6xl mx-auto text-gray-900 dark:text-white">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button
          onClick={() => {
            localStorage.removeItem("admin");
            navigate("/admin-login");
          }}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded">
          <p>Total Vendors</p>
          <h3 className="text-xl font-bold">{stats.totalVendors}</h3>
        </div>
        {serviceTypes.map(service => (
          <div key={service} className="bg-green-100 dark:bg-green-800 p-4 rounded">
            <p>{service}</p>
            <h3 className="text-xl font-bold">{stats.services?.[service] || 0}</h3>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <button onClick={openAddVendorModal} className="bg-blue-600 text-white px-4 py-2 rounded">Add Vendor</button>
        <input
          className="border p-2 rounded bg-white dark:bg-gray-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search vendors..."
        />
      </div>

      <div className="grid gap-4">
        {filtered.map((vendor) => (
          <div key={vendor.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h4 className="text-lg font-semibold">{vendor.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{vendor.email}</p>
              <ul className="text-sm mt-2">
                {(vendor.services || []).map((s, idx) => (
                  <li key={idx}>{s.name} - Rs.{s.price}</li>
                ))}
              </ul>
              <p className="text-xs text-gray-500 mt-1">Added on: {new Date(vendor.createdAt).toLocaleString()}</p>
            </div>
            <button
              onClick={() => handleDeleteVendor(vendor.id)}
              className="mt-4 md:mt-0 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">No vendors found.</p>
        )}
      </div>

      {/* Add Vendor Modal */}
      {showModal.addVendor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded w-full max-w-lg">
            <h3 className="text-lg font-bold mb-4">Add Vendor</h3>
            <input placeholder="Name" value={modalData.newVendor.name} onChange={(e) => setModalData({ ...modalData, newVendor: { ...modalData.newVendor, name: e.target.value } })} className="w-full border p-2 rounded mb-2 bg-white dark:bg-gray-800 dark:text-white" />
            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}

            <input placeholder="Email" type="email" value={modalData.newVendor.email} onChange={(e) => setModalData({ ...modalData, newVendor: { ...modalData.newVendor, email: e.target.value } })} className="w-full border p-2 rounded mb-2 bg-white dark:bg-gray-800 dark:text-white" />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}

            <input placeholder="Password" type="password" value={modalData.newVendor.password} onChange={(e) => setModalData({ ...modalData, newVendor: { ...modalData.newVendor, password: e.target.value } })} className="w-full border p-2 rounded mb-2 bg-white dark:bg-gray-800 dark:text-white" />
            {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}

            <div className="grid grid-cols-2 gap-2 mb-4">
              {serviceTypes.map(service => (
                <button key={service} className="bg-gray-200 dark:bg-gray-700 p-2 rounded" onClick={() => handleAddService(service)}>{service}</button>
              ))}
            </div>

            <div className="mb-3">
              <p className="font-semibold">Selected Services:</p>
              {modalData.newVendor.services.map((s, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span>{s.name} - Rs.{s.price}</span>
                  <button onClick={() => removeService(s.name)} className="text-red-500 text-xs">Remove</button>
                </div>
              ))}
              {formErrors.services && <p className="text-red-500 text-sm">{formErrors.services}</p>}
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal({ ...showModal, addVendor: false })} className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded">Cancel</button>
              <button onClick={saveNewVendor} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Service Price Modal */}
      {showModal.servicePrice && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded w-full max-w-sm">
            <h3 className="mb-4 font-semibold">Enter Price for {modalData.currentService}</h3>
            <input
              type="number"
              className="w-full border p-2 rounded mb-4 bg-white dark:bg-gray-700 dark:text-white"
              placeholder="Enter Price"
              onChange={(e) => setModalData({ ...modalData, tempPrice: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal({ ...showModal, servicePrice: false })} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded">Cancel</button>
              <button onClick={() => saveServicePrice(modalData.tempPrice)} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
