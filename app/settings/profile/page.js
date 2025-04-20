"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const router = useRouter();

  return (
    <div>
      <section className="text-center mx-auto">
        <div className="flex justify-between ">
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={() => router.back()}
            className="ml-3 p-2 py-1 rounded-md cursor-pointer hover:bg-gray-400"
          />
          <h2 className="font-bold text-xl mb-5">Profile</h2>
          <p className="mr-7" />
        </div>
        <div className="flex justify-center">
          <Image
            width={100}
            height={100}
            className="h-24 w-24 rounded-full object-cover"
            alt="Profile"
            src="/images/picture.png"
          />
        </div>
        <h3 className="mt-4 font-semibold">Author's Name</h3>
        <p className="text-gray-400">Author</p>
        <p className="text-gray-400 italic">praisedindu@gmail.com</p>
      </section>

      <section className="flex mx-auto flex-col items-center max-w-lg shadow-md rounded-lg bg-white m-16 pt-1 p-2 text-sm">
        <div className="flex justify-between w-full mb-5">
          <p className="py-1">Personal Information</p>{" "}
          <div className="h-6 pt-[2px] my-auto px-[7px] hover:bg-red-100 rounded-md cursor-pointer space-x-1 -mx-2">
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
          <p className="text-gray-400">Chimdindu</p>
        </div>

        <div className="flex justify-between w-full border-b mb-2">
          <p>Last Name</p>
          <p className="text-gray-400">Praise</p>
        </div>
        <div className="flex justify-between w-full border-b mb-2">
          <p>Bio</p>
          <p className="text-gray-400">Author</p>
        </div>
        <div className="flex justify-between w-full border-b mb-3">
          <p>Phone Number</p>
          <p className="text-gray-400">(234) 8167 092 567</p>
        </div>
      </section>

      <section className="flex flex-col items-center max-w-lg mx-auto shadow-md rounded-lg bg-white m-16 pt-1 p-2 text-sm">
        <div className="flex justify-between w-full mb-5">
          <p className="py-1">Address</p>
          <div className="h-6 pt-[2px] my-auto px-[7px] hover:bg-red-100 rounded-md cursor-pointer space-x-1 -mx-2">
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
          <p>Country</p>
          <p className="text-gray-400">Nigeria</p>
        </div>

        <div className="flex justify-between w-full border-b mb-3">
          <p>Location</p>
          <p className="text-gray-400">Asaba, Delta State</p>
        </div>
      </section>
    </div>
  );
};

export default Profile;
