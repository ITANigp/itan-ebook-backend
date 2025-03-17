"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation"

import axios from "axios";

import { useForm } from "@/context/FormContext"
import Modal from "@/components/Modal";
import { api } from "@/utils/api";

const BookPricing = () => {
  const { formData, updateFormData } = useForm();
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState("option1");
  const [isModalOpen, setIsModalOpen] = useState(false);


const handleSubmit = async () => {
  const formDataToSend = new FormData();

  // Append book details correctly using "book[attribute]" format
  formDataToSend.append("book[title]", formData.title);
  formDataToSend.append("book[description]", formData.description);
  formDataToSend.append("book[subtitle]", formData.subtitle);
  formDataToSend.append("book[ebook_price]", formData.ebook_price);
  formDataToSend.append("book[audiobook_price]", formData.audiobook_price);
  formDataToSend.append("book[primary_audience]", formData.primary_audience);
  formDataToSend.append("book[publishing_rights]", formData.publishing_rights);
  formDataToSend.append("book[terms_and_conditions]", formData.terms_and_conditions);
  formDataToSend.append("book[edition_number]", formData.edition_number);
  formDataToSend.append("book[contributors]", formData.contributors);
  formDataToSend.append("book[bio]", formData.bio);
  formDataToSend.append("book[categories]", formData.categories);
  formDataToSend.append("book[Keywords]", formData.Keywords);
  formDataToSend.append("book[book_isbn]", formData.book_isbn);

  // Append files correctly
  if (formData.cover_image) {
    formDataToSend.append("book[cover_image]", formData.cover_image);
  }
  if (formData.ebook_file) {
    formDataToSend.append("book[ebook_file]", formData.ebook_file);
  }

  console.log("formDataToSend:", formDataToSend);

  try {
    const res = await api.post(
      "http://localhost:3000/api/v1/books",
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.status === 200) {
      alert("Book uploaded successfully!");
    } else {
      alert("Error uploading book.");
    }
  } catch (error) {
    console.error("Upload error:", error.response?.data || error.message);
    alert("Something went wrong. Please try again.");
  }
};


  return (
    <div>
      <h3 className="font-bold text-lg mt-5">Price</h3>
      <p className="my-1">Enter the book price</p>
      <p>Book Price</p>
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center border border-gray-600 rounded-md w-96 h-9">
          <img
            src="/images/dollar.png"
            alt="dollar"
            className="h-3 w-2 ml-2 absolute"
          />
          <input
            type="text"
            value={formData.ebook_price}
            onChange={(e) => updateFormData({ ebook_price: e.target.value })}
            className="border-none outline-none focus:ring-0 w-full h-full rounded-md py-[1px] px-[19px] bg-gray-50 "
          />
        </div>

        <h3 className="font-bold text-lg mt-4 mb-1">Account Details</h3>
        <p>Enter your bank details</p>
        <div className="my-2">
          <label htmlFor="bankName" className=" font-semibold">
            Bank Name
          </label>
          <input
            type="text"
            id="bankName"
            className="block h-9 w-96 bg-gray-50 border focus:border-none text-gray-900 rounded-lg focus:ring-1 focus:outline-none focus:ring-[#E50913]"
          />
        </div>

        <div>
          <label htmlFor="AccountNo" className="mb-1 mt-3 font-semibold">
            Account Number
          </label>
          <input
            type="text"
            id="AccountNo"
            className="block h-9 w-96 bg-gray-50 border focus:border-none text-gray-900 rounded-lg focus:ring-1 focus:outline-none focus:ring-[#E50913]"
          />
        </div>
        <div className="mt-2">
          <label htmlFor="accountName" className="font-semibold mb-1 mt-3 ">
            Account Name
          </label>
          <input
            type="text"
            id="accountName"
            className="block h-9 w-96 bg-gray-50 border focus:border-none text-gray-900 rounded-lg focus:ring-1 focus:outline-none focus:ring-[#E50913]"
          />
        </div>

        <h3 className="font-bold text-lg mt-5 mb-2">Terms and Conditions</h3>
        <p className="text-sm w-[700px]">
          By using itan, you agree to these terms. Use the service legally.
          You're responsible for your content. We provide the service "as is"
          and aren't liable for damages. We may update these terms; continued
          use means acceptance.
        </p>
        <p className="mt-4 font-bold">I Agree</p>
        <div className="flex flex-col space-y-2 mt-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="terms_and_conditions"
              value="true"
              checked={formData.terms_and_conditions === true}
              onChange={() => updateFormData({ terms_and_conditions: true })}
              className="hidden"
            />
            <div
              className={`w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center ${
                formData.terms_and_conditions === true
                  ? "bg-blue-500"
                  : "bg-white"
              }`}
            >
              {formData.terms_and_conditions === true && (
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
              )}
            </div>
            <span className="text-gray-700">Yes</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="terms_and_conditions"
              value="false"
              checked={formData.terms_and_conditions === false}
              onChange={() => updateFormData({ terms_and_conditions: false })}
              className="hidden"
            />
            <div
              className={`w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center ${
                formData.terms_and_conditions === false
                  ? "bg-blue-500"
                  : "bg-white"
              }`}
            >
              {formData.terms_and_conditions === false && (
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
              )}
            </div>
            <span className="text-gray-700">No</span>
          </label>
        </div>

        <div className="flex justify-between mb-10 mt-24">
          <button
            onClick={() =>
              router.push(
                "/dashboard/authors/4b0f4db7-aebf-4ba2-b5a8-10eb6ff93832/books/create/book-content"
              )
            }
            className="border hover:bg-[#cd3f46] hover:text-white border-[#E50913] px-5 py-[7px] rounded-md"
          >
            Back to Content
          </button>
          <button
            type="submit"
            onClick={() => setIsModalOpen(true)}
            className="bg-[#E50913] hover:bg-[#cd3f46] text-white px-8 py-[5px] rounded-md"
          >
            Publish
          </button>
        </div>
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default BookPricing;