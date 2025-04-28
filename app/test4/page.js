import React from 'react'

const Test = () => {
  const preview = false;
  return (
    <div>
      <div className="flex flex-col items-center space-y-2">
        <div className="relative group">
          <img
            src={preview || "/images/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border border-gray-300"
          />
          <label
            htmlFor="profile-pic-upload"
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm opacity-0 group-hover:opacity-100 cursor-pointer rounded-full"
          >
            Edit
          </label>
          <input
            id="profile-pic-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        {preview && (
          <button
            onClick={handleRemove}
            className="text-sm text-red-500 hover:underline"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

export default Test