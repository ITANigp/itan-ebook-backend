"use client";

import { useState } from "react";
import genreData from "@/constants/dataGenres";

const BookForm = () => {
  // State to track selected genre and sub-categories
  const [genre, setGenre] = useState("");
  const [subCategories, setSubCategories] = useState([]);

  // Handle genre selection
  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    setSubCategories([]); // Reset sub-categories when genre changes
  };

  // Handle sub-category checkbox selection
  const handleSubCategoryChange = (e) => {
    const value = e.target.value;
    setSubCategories((prevState) =>
      prevState.includes(value)
        ? prevState.filter((item) => item !== value)
        : [...prevState, value]
    );
  };

  // Helper function to render sub-categories
  const renderSubCategories = (genreData) => {
    if (Array.isArray(genreData)) {
      // If the genreData is an array, map directly to sub-categories
      return genreData.map((subCat, index) => (
        <label key={index} className="inline-flex items-center space-x-2 mr-3">
          <input
            type="checkbox"
            value={subCat}
            checked={subCategories.includes(subCat)}
            onChange={handleSubCategoryChange}
            className="h-4 w-4"
          />
          <span>{subCat}</span>
        </label>
      ));
    } else {
      // If genreData is an object (e.g., Religious Fiction), loop through nested categories
      return Object.keys(genreData).map((subCategoryGroup, index) => (
        <div key={index}>
          <h3 className="font-semibold">{subCategoryGroup}</h3>
          <div className="space-y-2 ml-4">
            {genreData[subCategoryGroup].map((subCat, index) => (
              <label
                key={index}
                className="inline-flex items-center space-x-2 mr-3"
              >
                <input
                  type="checkbox"
                  value={subCat}
                  checked={subCategories.includes(subCat)}
                  onChange={handleSubCategoryChange}
                  className="h-4 w-4"
                />
                <span>{subCat}</span>
              </label>
            ))}
          </div>
        </div>
      ));
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white border rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        Select Book Genre and Sub-categories
      </h2>

      {/* Genre Dropdown */}
      <div className="mb-4">
        <label className="block font-semibold text-lg mb-2">Select Genre</label>
        <select
          className="w-full p-2 border rounded-md"
          value={genre}
          onChange={handleGenreChange}
        >
          <option value="">-- Choose a Genre --</option>
          {Object.keys(genreData).map((gen, index) => (
            <option key={index} value={gen}>
              {gen}
            </option>
          ))}
        </select>
      </div>

      {/* Sub-category Checkboxes */}
      {genre && (
        <div className="mb-4">
          <label className="block mt-2 font-semibold text-lg">
            Select Sub-categories
          </label>
          <div className="space-y-2">
            {renderSubCategories(genreData[genre])}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-6 py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
};

export default BookForm;
