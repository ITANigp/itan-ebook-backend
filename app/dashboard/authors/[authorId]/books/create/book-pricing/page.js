"use client"

import React, { useState } from "react";

const BookPricing = () => {
      const [selectedOption, setSelectedOption] = useState("option1");
  return (
    <div>
      <h3>Price</h3>
      <p>Enter the price you want customers to pay for your book.</p>
      <p>Book Price</p>
      <div>
        <img src={null} alt="" />
        <input type="text" />
      </div>

      <h3>Terms and Conditions</h3>
      <p>
        By using itan, you agree to these terms. Use the service legally. You're
        responsible for your content. We provide the service "as is" and aren't
        liable for damages. We may update these terms; continued use means
        acceptance.
      </p>
      <p>I Agree</p>
      <div className="flex flex-col space-y-2 p-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="choice"
            value="option1"
            checked={selectedOption === "option1"}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="hidden"
          />
          <div
            className={`w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center ${
              selectedOption === "option1" ? "bg-blue-500" : "bg-white"
            }`}
          >
            {selectedOption === "option1" && (
              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            )}
          </div>
          <span className="text-gray-700">Yes</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="choice"
            value="option2"
            checked={selectedOption === "option2"}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="hidden"
          />
          <div
            className={`w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center ${
              selectedOption === "option2" ? "bg-blue-500" : "bg-white"
            }`}
          >
            {selectedOption === "option2" && (
              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            )}
          </div>
          <span className="text-gray-700">No</span>
        </label>
      </div>

      <div>
        <button>Back to details</button>
        <button>Save as Draft</button>
        <button>Save and continue</button>
      </div>
    </div>
  );
};

export default BookPricing;
