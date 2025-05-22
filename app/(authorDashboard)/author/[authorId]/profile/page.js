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
  const [error, setError] = useState("");


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
    <div className="h-screen">
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
        <div className="lg:flex max-w-lg lg:items-center lg:shadow-md lg:rounded-lg lg:bg-white space-x-2 p-3 mx-auto mb-5">
          <div className="flex justify-center lg:justify-start lg:items-center">
            <Image
              width={50}
              height={50}
              className="h-16 w-16 p-2 rounded-full bg-slate-400 object-cover"
              alt="Profile"
              src={
                profile.author_image
                  ? profile.author_image
                  : `/images/avatar.png`
              }
            />
          </div>
          <div className="lg:flex lg:flex-col lg:items-start">
            <h3 className="mt-4 font-semibold">
              {profile.first_name} {profile.last_name}
            </h3>
            <p className="text-gray-400">Author</p>
            <p className="text-gray-400 italic">{profile.email}</p>
          </div>
        </div>
      </section>

      <section className="flex mx-auto flex-col items-center max-w-lg shadow-md rounded-lg bg-white lg:mt-0 lg:mb-5 m-16 pt-1 p-2 text-sm">
        <div className="flex justify-between w-full mb-5">
          <p className="py-1">Personal Information</p>{" "}
          <div
            onClick={() => setOpenModal(true)}
            className="h-6 pt-[2px] my-auto px-[7px] hover:bg-red-100 rounded-md cursor-pointer space-x-1 -mx-2"
          >
            <Image
              width={12}
              height={15}
              className=" inline"
              src="/images/edit-profile.png"
              alt="edit"
            />
            <p className="text-red-500 text-sm inline">Edit</p>
          </div>
        </div>

        <div className="flex justify-between w-full border-b mb-2">
          <p>First Name</p>
          <p className="text-gray-400">{profile.first_name}</p>
        </div>

        <div className="flex justify-between w-full border-b mb-2">
          <p>Last Name</p>
          <p className="text-gray-400">{profile.last_name}</p>
        </div>
        <div className="flex justify-between w-full border-b mb-2">
          <p>Bio</p>
          <p className="text-gray-400">{profile.bio}</p>
        </div>
        <div className="flex justify-between w-full border-b mb-3">
          <p>Phone Number</p>
          <p className="text-gray-400">{profile.phone_number}</p>
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
          <p className="text-gray-400">{profile.country}</p>
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
