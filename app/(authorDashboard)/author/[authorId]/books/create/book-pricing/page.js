"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@/context/FormContext";
import Modal from "@/components/Modal";
import { api } from "@/utils/api";

const BookPricing = () => {
  const { formData, updateFormData } = useForm();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Append book details
    formDataToSend.append("book[title]", formData.title);
    formDataToSend.append("book[description]", formData.description);
    formDataToSend.append("book[subtitle]", formData.subtitle);
    formDataToSend.append("book[ebook_price]", formData.ebook_price);
    formDataToSend.append("book[audiobook_price]", formData.audiobook_price);
    formDataToSend.append("book[primary_audience]", formData.primary_audience);
    formDataToSend.append(
      "book[publishing_rights]",
      formData.publishing_rights
    );
    formDataToSend.append(
      "book[terms_and_conditions]",
      formData.terms_and_conditions
    );
    formDataToSend.append("book[edition_number]", formData.edition_number);
    formDataToSend.append("book[contributors]", formData.contributors);
    formDataToSend.append("book[bio]", formData.bio);
    formDataToSend.append("book[categories]", formData.categories);
    formDataToSend.append("book[keywords]", formData.Keywords);
    formDataToSend.append("book[book_isbn]", formData.book_isbn);

    // Append files
    if (formData.cover_image) {
      formDataToSend.append("book[cover_image]", formData.cover_image);
    }
    if (formData.ebook_file) {
      formDataToSend.append("book[ebook_file]", formData.ebook_file);
    }

    try {
      const res = await api.post("/api/v1/books", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        alert("Book uploaded successfully!");
         setIsModalOpen(true);
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
      <p>Enter the book price</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.ebook_price}
          onChange={(e) => updateFormData({ ebook_price: e.target.value })}
          className="border border-gray-600 rounded-md w-96 h-9 px-3"
          placeholder="Ebook Price"
        />
        <h3 className="font-bold text-lg mt-4 mb-1">Account Details</h3>
        <input
          type="text"
          id="bankName"
          className="block h-9 w-96 border rounded-lg px-3"
          placeholder="Bank Name"
        />
        <input
          type="text"
          id="AccountNo"
          className="block h-9 w-96 border rounded-lg px-3 mt-2"
          placeholder="Account Number"
        />
        <input
          type="text"
          id="accountName"
          className="block h-9 w-96 border rounded-lg px-3 mt-2"
          placeholder="Account Name"
        />
        <h3 className="font-bold text-lg mt-5">Terms and Conditions</h3>
        <label className="flex items-center space-x-2 cursor-pointer mt-3">
          <input
            type="radio"
            name="terms_and_conditions"
            value="true"
            checked={formData.terms_and_conditions === true}
            onChange={() => updateFormData({ terms_and_conditions: true })}
            className="hidden"
          />
          <span>Yes</span>
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
          <span>No</span>
        </label>
        <div className="flex justify-between mt-10">
          <button
            onClick={() => router.push("/author/books/create/book-content")}
            className="border border-[#E50913] px-5 py-2 rounded-md hover:bg-[#cd3f46] hover:text-white"
          >
            Back to Content
          </button>
          <button
            type="submit"
            onClick={() => setIsModalOpen(true)}
            className="bg-[#E50913] hover:bg-[#cd3f46] text-white px-8 py-2 rounded-md"
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
