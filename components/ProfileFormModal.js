"use client";

import React, { useState } from "react";

const Modal = ({ isOpen, onClose }) => {
    console.log("This is the Form Modal", isOpen)
  if (!isOpen) return null; // Don't render if modal is closed
  const [formData, setFormData] = useState({
    bio: "",
    phone: "",
    country: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add form submission logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center lg:ml-64 fixed inset-0 bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <div className="text-2xl font-bold text-black">itan</div>
        </div>
        <h2 className="text-center text-xl font-semibold mb-6">
          Profile Details
        </h2>
        <form 
        //   onSubmit={handleSubmit} 
          className="space-y-4"
          >
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-red-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-red-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Bio</label>
            <textarea
              name="bio"
              placeholder="Describe yourself..."
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-2 border border-red-300 rounded"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-red-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Country of Origin
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-2 border border-red-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-red-300 rounded"
            />
          </div>
          <button
            // type="submit"
            className="w-full bg-red-400 hover:bg-red-500 text-white font-bold py-2 rounded mt-4"
            onClick={onClose}
          >
            Save Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
