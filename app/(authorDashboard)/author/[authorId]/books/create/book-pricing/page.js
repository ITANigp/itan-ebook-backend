"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@/context/FormContext";
import Modal from "@/components/Modal";
// import axios from "axios";
import { api } from "@/utils/api";

const BookPricing = () => {
  const { formData, updateFormData } = useForm();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Compute SHA-256 checksum
  async function computeSHA256(file) {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let signed_id = null;

      // Step 1: Upload ebook to AWS S3 using a pre-signed URL
      if (formData.ebook_file) {
        const file = formData.ebook_file;
        const checksum = await computeSHA256(file);

        // Request pre-signed URL from the backend
        const uploadResponse = await api.post(
          "http://localhost:3000/upload",
          {
            blob: {
              filename: file.name,
              byte_size: file.size,
              checksum: checksum,
              content_type: file.type,
            },
          }
        );

        const {
          signed_id: newSignedId,
          direct_upload_url,
          headers,
        } = uploadResponse.data;

        // Upload file to AWS S3
        await api.put(direct_upload_url, file, {
          headers: { ...headers, "Content-Type": file.type },
        });

        signed_id = newSignedId; // Store signed_id for later use
      }

      // Step 2: Submit book data to API
      const formDataToSend = {
        book: {
          title: formData.title,
          description: formData.description,
          subtitle: formData.subtitle,
          ebook_price: formData.ebook_price,
          audiobook_price: formData.audiobook_price,
          primary_audience: formData.primary_audience,
          publishing_rights: formData.publishing_rights,
          terms_and_conditions: formData.terms_and_conditions,
          edition_number: formData.edition_number,
          contributors: formData.contributors,
          bio: formData.bio,
          categories: formData.categories,
          keywords: formData.keywords,
          book_isbn: formData.book_isbn,
          ebook_file_id: signed_id, // Send the signed_id, NOT the file itself
        },
      };

      const res = await api.post("/api/v1/books", formDataToSend);

      if (res.status === 200) {
        alert("Book uploaded successfully!");
        setIsModalOpen(true);
      } else {
        alert("Error uploading book.");
      }
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      alert("Something went wrong. Please try again.");
    } finally {
      setUploading(false);
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
            disabled={uploading}
            className={`px-8 py-2 rounded-md text-white ${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#E50913] hover:bg-[#cd3f46]"
            }`}
          >
            {uploading ? "Uploading..." : "Publish"}
          </button>
        </div>
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default BookPricing;
