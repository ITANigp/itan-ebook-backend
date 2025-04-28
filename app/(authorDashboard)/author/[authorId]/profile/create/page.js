"use client";

import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import Image from "next/image";
import {
  createAuthorProfile,
  getAuthorProfile, 
  updateAuthorProfile,
} from "@/utils/api";
import { api } from "@/utils/api"; // Ensure this is imported

export default function AuthorProfilePage() {
  const [profile, setProfile] = useState({});
  const [profileImg, setProfileImg] = useState(null);
  const [editing, setEditing] = useState(false); // Track whether the user is editing
  const [error, setError] = useState("");

  async function computeChecksum(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const wordArray = CryptoJS.lib.WordArray.create(reader.result);
        const base64 = CryptoJS.enc.Base64.stringify(CryptoJS.MD5(wordArray));
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  async function directUploadFile(file) {
    try {
      const checksum = await computeChecksum(file);

      const response = await api.post("/direct_uploads", {
        blob: {
          filename: file.name,
          byte_size: file.size,
          checksum: checksum,
          content_type: file.type,
        },
      });

      const { signed_id, direct_upload } = response.data;

      if (!direct_upload?.url) {
        throw new Error("Invalid direct upload response");
      }

      const uploadResponse = await fetch(direct_upload.url, {
        method: "PUT",
        headers: {
          ...direct_upload.headers,
          "Content-Type": file.type,
          "Content-Length": file.size.toString(),
          "Content-MD5": checksum,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(`S3 upload failed: ${uploadResponse.status}`);
      }

      console.log(`✅ Successfully uploaded ${file.name} to S3`);
      return signed_id;
    } catch (error) {
      console.error("Direct upload failed:", error);
      throw error;
    }
  }

  // Fetch and set profile data when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getAuthorProfile();
        setProfile(data);
      } catch (err) {
        setError("Failed to fetch author profile.");
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleFileImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImg(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!profileImg && !editing) {
        alert("Please select a profile image.");
        return;
      }

      const profileImage = profileImg
        ? await directUploadFile(profileImg)
        : profile.profile_image;

      if (editing) {
        // If editing, update the profile
        const updatedProfile = await updateAuthorProfile(profile, profileImage);
        console.log("Updated Profile: ", updatedProfile);
        setProfile(updatedProfile);
      } else {
        // If creating, create a new profile
        const createdProfile = await createAuthorProfile(profile, profileImage);
        console.log("Created Profile: ", createdProfile);
        setProfile(createdProfile);
      }
      setEditing(false); // Reset the editing flag after submission
    } catch (error) {
      console.error("Profile Error: ", error);
    }
  };

  const handleEditClick = () => {
    setEditing(true); // Set the editing flag to true when edit is clicked
  };

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-4 my-8 max-w-4xl lg:ml-72 lg:mr-8 lg:mt-24 container"
    >
      <h1 className="text-2xl font-bold mb-6">
        {editing ? "Edit Author's Profile" : "Create Author's Profile"}
      </h1>

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col">
          First Name:
          <input
            type="text"
            className="mt-1 p-2 border rounded-md"
            value={profile.first_name || ""}
            onChange={(e) =>
              setProfile({ ...profile, first_name: e.target.value })
            }
            disabled={!editing}
          />
        </label>

        <label className="flex flex-col">
          Last Name:
          <input
            type="text"
            className="mt-1 p-2 border rounded-md"
            value={profile.last_name || ""}
            onChange={(e) =>
              setProfile({ ...profile, last_name: e.target.value })
            }
            disabled={!editing}
          />
        </label>

        <label className="flex flex-col md:col-span-2">
          Bio:
          <textarea
            className="mt-1 p-2 border rounded-md"
            value={profile.bio || ""}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            disabled={!editing}
          />
        </label>

        <label className="flex flex-col">
          Phone Number:
          <input
            type="text"
            className="mt-1 p-2 border rounded-md"
            value={profile.phone_number || ""}
            onChange={(e) =>
              setProfile({ ...profile, phone_number: e.target.value })
            }
            disabled={!editing}
          />
        </label>

        <label className="flex flex-col">
          Country:
          <input
            type="text"
            className="mt-1 p-2 border rounded-md"
            value={profile.country || ""}
            onChange={(e) =>
              setProfile({ ...profile, country: e.target.value })
            }
            disabled={!editing}
          />
        </label>

        <label className="flex flex-col md:col-span-2">
          Location:
          <input
            type="text"
            className="mt-1 p-2 border rounded-md"
            value={profile.location || ""}
            onChange={(e) =>
              setProfile({ ...profile, location: e.target.value })
            }
            disabled={!editing}
          />
        </label>

        <label className="flex flex-col md:col-span-2">
          Profile Image:
          <input
            type="file"
            className="mt-1"
            onChange={handleFileImage}
            disabled={!editing}
          />
        </label>
      </div>

      {profile.author_profile_image_url && !editing && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Current Profile Image</h3>
          <Image
            src={profile.author_profile_image_url}
            alt="Author Profile"
            width={100}
            height={100}
            className="rounded-full border shadow"
            priority
          />
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {editing ? "Save Changes" : "Submit"}
        </button>

        {!editing && (
          <button
            type="button"
            onClick={handleEditClick}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </form>
  );
}

