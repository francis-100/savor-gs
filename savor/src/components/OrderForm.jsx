// src/components/OrderForm.jsx
import React, { useState } from 'react';

const OrderForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isOnsite, setIsOnsite] = useState(true);
  const [tableNumber, setTableNumber] = useState('');
  const [location, setLocation] = useState('');

  const handleOnsiteChange = () => {
    setIsOnsite(!isOnsite);
  };

  const handlePhoneChange = (e) => {
    // Allow only numbers and limit to 10 digits
    const input = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled before submitting
    if (!name || !phone || (isOnsite && !tableNumber) || (!isOnsite && !location)) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = {
      name,
      phone,
      isOnsite,
      tableNumber: isOnsite ? tableNumber : null,
      location: isOnsite ? null : location,
    };
    onSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order Form</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="text-lg">Name:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded-md"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-lg">Phone:</span>
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            className="w-full border p-2 rounded-md"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-lg">Onsite:</span>
          <input
            type="checkbox"
            checked={isOnsite}
            onChange={handleOnsiteChange}
            className="ml-2"
          />
        </label>
        {isOnsite ? (
          <label className="block mb-4">
            <span className="text-lg">Table:</span>
            <input
              type="number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="w-full border p-2 rounded-md"
              required
            />
          </label>
        ) : (
          <label className="block mb-4">
            <span className="text-lg">Location:</span>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border p-2 rounded-md"
              required
            >
              <option value="" disabled hidden>
                Select Location
              </option>
              <option value="Sample Location 1">Texas</option>
              <option value="Sample Location 2">New York</option>
              {/* Add more options as needed */}
            </select>
          </label>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Complete Order
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
