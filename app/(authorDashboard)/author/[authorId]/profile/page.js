"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import FormModal from "@/components/ProfileFormModal";

import CryptoJS from "crypto-js";
import {
  createAuthorProfile,
  getAuthorProfile,
  updateAuthorProfile,
} from "@/utils/auth/authorApi";
import { api } from "@/utils/auth/authorApi"; // Ensure this is imported

const Profile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [profile, setProfile] = useState({});
  const router = useRouter();
  // const [profileImg, setProfileImg] = useState(null);
  // const [editing, setEditing] = useState(false); // Track whether the user is editing
  const [error, setError] = useState("");

  // async function computeChecksum(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsArrayBuffer(file);
  //     reader.onload = () => {
  //       const wordArray = CryptoJS.lib.WordArray.create(reader.result);
  //       const base64 = CryptoJS.enc.Base64.stringify(CryptoJS.MD5(wordArray));
  //       resolve(base64);
  //     };
  //     reader.onerror = (error) => reject(error);
  //   });
  // }

  // async function directUploadFile(file) {
  //   try {
  //     const checksum = await computeChecksum(file);

  //     const response = await api.post("/direct_uploads", {
  //       blob: {
  //         filename: file.name,
  //         byte_size: file.size,
  //         checksum: checksum,
  //         content_type: file.type,
  //       },
  //     });

  //     const { signed_id, direct_upload } = response.data;

  //     if (!direct_upload?.url) {
  //       throw new Error("Invalid direct upload response");
  //     }

  //     const uploadResponse = await fetch(direct_upload.url, {
  //       method: "PUT",
  //       headers: {
  //         ...direct_upload.headers,
  //         // "Content-Type": file.type,
  //         "Content-Length": file.size.toString(),
  //         "Content-MD5": checksum,
  //       },
  //       body: file,
  //     });

  //     if (!uploadResponse.ok) {
  //       const errorText = await uploadResponse.text();
  //       throw new Error(`S3 upload failed: ${uploadResponse.status}`);
  //     }

  //     console.log(`✅ Successfully uploaded ${file.name} to S3`);
  //     return signed_id;
  //   } catch (error) {
  //     console.error("Direct upload failed:", error);
  //     throw error;
  //   }
  // }

  // Fetch and set profile data when the component mounts
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const { data } = await getAuthorProfile();
  //       setProfile(data);
  //     } catch (err) {
  //       setError("Failed to fetch author profile.");
  //       console.error(err);
  //     }
  //   };

  //   fetchProfile();
  // }, []);

  // const handleFileImage = (e) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setProfileImg(e.target.files[0]);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (!profileImg && !editing) {
  //       alert("Please select a profile image.");
  //       return;
  //     }

  //     const profileImage = profileImg
  //       ? await directUploadFile(profileImg)
  //       : profile.profile_image;

  //     if (editing) {
  //       // If editing, update the profile
  //       const updatedProfile = await updateAuthorProfile(profile, profileImage);
  //       console.log("Updated Profile: ", updatedProfile);
  //       setProfile(updatedProfile);
  //     } else {
  //       // If creating, create a new profile
  //       const createdProfile = await createAuthorProfile(profile, profileImage);
  //       console.log("Created Profile: ", createdProfile);
  //       setProfile(createdProfile);
  //     }
  //     setEditing(false); // Reset the editing flag after submission
  //   } catch (error) {
  //     console.error("Profile Error: ", error);
  //   }
  // };

  // const handleEditClick = () => {
  //   setEditing(true); // Set the editing flag to true when edit is clicked
  // };

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  // Fetch and set profile data when the component mounts
  const fetchProfile = async () => {
    try {
      const { data } = await getAuthorProfile();
      setProfile(data);
      console.log("Fetched Profile Data: ", data);
    } catch (err) {
      // setError("Failed to fetch author profile.");
      console.error(err);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <section className="text-center mx-auto">
        <div className="flex justify-between lg:hidden">
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={() => router.back()}
            className="ml-3 p-2 py-1 rounded-md cursor-pointer hover:bg-gray-400"
          />
          <h2 className="font-bold text-xl mb-5">Profile</h2>
          <p className="mr-7 lg:hidden" />
        </div>
        <div className="lg:flex max-w-lg lg:shadow-md lg:rounded-lg lg:bg-white space-x-2 p-3 mx-auto mb-5">
          <div className="flex justify-center lg:justify-start">
            <Image
              width={100}
              height={100}
              className="h-24 w-24 rounded-full object-cover"
              alt="Profile"
              src="/images/picture.png"
            />
          </div>
          <div className="lg:flex lg:flex-col lg:items-start">
            <h3 className="mt-4 font-semibold">
              {/* {profile.first_name} {profile.last_name} */}
              Paul Oluyemi
            </h3>
            <p className="text-gray-400">Author</p>
            <p className="text-gray-400 italic">
              {/* {profile.email} */}
              oluola96@gmail.com
            </p>
          </div>
        </div>
      </section>

      <section className="flex mx-auto flex-col items-center max-w-lg shadow-md rounded-lg bg-white lg:mt-0 lg:mb-5 m-16 pt-1 p-2 text-sm">
        <div className="flex justify-between w-full mb-5">
          <p className="py-1">Personal Information</p>{" "}
          <div className="h-6 pt-[2px] my-auto px-[7px] hover:bg-red-100 rounded-md cursor-pointer space-x-1 -mx-2">
            <Image
              width={12}
              height={15}
              className=" inline"
              src="/images/edit-profile.png"
              alt="edit"
              onClick={() => setOpenModal(true)}
            />
            <p className="text-red-500 text-sm inline">Edit</p>
          </div>
        </div>

        <div className="flex justify-between w-full border-b mb-2">
          <p>First Name</p>
          <p className="text-gray-400">
            {profile.first_name}
          </p>
        </div>

        <div className="flex justify-between w-full border-b mb-2">
          <p>Last Name</p>
          <p className="text-gray-400">
            {profile.last_name}
          </p>
        </div>
        <div className="flex justify-between w-full border-b mb-2">
          <p>Bio</p>
          <p className="text-gray-400">{profile.bio}</p>
        </div>
        <div className="flex justify-between w-full border-b mb-3">
          <p>Phone Number</p>
          <p className="text-gray-400">
            {profile.phone_number}
          </p>
        </div>
      </section>

      <section className="flex flex-col items-center max-w-lg mx-auto shadow-md rounded-lg bg-white m-5 lg:mt-0 pt-1 p-2 text-sm">
        <div className="flex justify-between w-full mb-5">
          <p className="py-1">Address</p>
          <div className="h-6 pt-[2px] my-auto px-[7px] hover:bg-red-100 rounded-md cursor-pointer space-x-1 -mx-2">
            <div />
          </div>
        </div>

        <div className="flex justify-between w-full border-b mb-2">
          <p>Country</p>
          <p className="text-gray-400">
            {profile.country}
          </p>
        </div>

        <div className="flex justify-between w-full border-b mb-3">
          <p>Location</p>
          <p className="text-gray-400">
            {profile.location === "null" ? "..." : profile.location}
          </p>
        </div>
      </section>
      <FormModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onProfileUpdate={fetchProfile}
      />
    </div>
  );
};

export default Profile;
