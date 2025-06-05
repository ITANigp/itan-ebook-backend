'use client';

import { useState } from 'react';

const roles = ['Author', 'Editor', 'Translator', 'Illustrator'];

export default function ContributorsForm({ value, onChange }) {
    const contributors = value || [];

  const handleAdd = () => {
    if (contributors.length < 9) {
      onChange([
        ...contributors,
        { role: "Author", firstName: "", lastName: "" },
      ]);
    }
  };

  const handleRemove = (index) => {
    const updated = contributors.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...contributors];
    updated[index][field] = value;
    onChange(updated);
  };

  console.log("Contributors' data: ", contributors);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-xl font-semibold">Contributors</h2>
      <p className="text-sm text-gray-600">
        Add up to 4 contributors. They’ll display on IGP using the order you
        enter below.
      </p>

      {contributors.map((contributor, index) => (
        <div key={index} className="flex flex-wrap gap-2 items-center">
          <select
            value={contributor.role}
            onChange={(e) => handleChange(index, "role", e.target.value)}
            className="border rounded px-3 py-2"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="First name"
            value={contributor.firstName}
            onChange={(e) => handleChange(index, "firstName", e.target.value)}
            className="border rounded px-3 py-2 flex-1"
          />
          <input
            type="text"
            placeholder="Last name"
            value={contributor.lastName}
            onChange={(e) => handleChange(index, "lastName", e.target.value)}
            className="border rounded px-3 py-2 flex-1"
          />

          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="text-red-600 hover:underline ml-2"
          >
            Remove
          </button>
        </div>
      ))}

      {contributors.length < 9 && (
        <button
          type="button"
          onClick={handleAdd}
          className="mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 border rounded"
        >
          Add Another
        </button>
      )}
    </div>
  );
}
