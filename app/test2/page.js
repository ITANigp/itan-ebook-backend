"use client";

import { useState } from "react";
import genreData from "@/constants/dataGenres";

const BookForm = () => {
  const [genre, setGenre] = useState("");
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    setSelectedSubCategories([]);
  };

  const handleSubCategoryChange = (e) => {
    const value = e.target.value;

    const alreadySelected = selectedSubCategories.some(
      (item) => item.genre === genre && item.value === value
    );

    if (alreadySelected) {
      setSelectedSubCategories((prev) =>
        prev.filter((item) => !(item.genre === genre && item.value === value))
      );
    } else {
      setSelectedSubCategories((prev) => [...prev, { genre, value }]);
    }
  };

  const isChecked = (value) =>
    selectedSubCategories.some(
      (item) => item.genre === genre && item.value === value
    );

  const renderSubCategories = (data) => {
    if (Array.isArray(data)) {
      return data.map((subCat, index) => (
        <label key={index} className="inline-flex items-center space-x-2 mr-3">
          <input
            type="checkbox"
            value={subCat}
            checked={isChecked(subCat)}
            onChange={handleSubCategoryChange}
            className="h-4 w-4"
          />
          <span>{subCat}</span>
        </label>
      ));
    } else {
      return Object.keys(data).map((group, index) => (
        <div key={index}>
          <h3 className="font-semibold">{group}</h3>
          <div className="space-y-2 ml-4">
            {data[group].map((subCat, i) => (
              <label
                key={i}
                className="inline-flex items-center space-x-2 mr-3"
              >
                <input
                  type="checkbox"
                  value={subCat}
                  checked={isChecked(subCat)}
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

      {/* Debug */}
      <pre className="text-xs bg-gray-100 p-2 mt-4 rounded">
        {JSON.stringify(selectedSubCategories, null, 2)}
      </pre>

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
