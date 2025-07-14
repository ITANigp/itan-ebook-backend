"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import CryptoJS from "crypto-js";
import toast from "react-hot-toast";

import { api } from "@/utils/auth/authorApi";
import { useForm } from "@/context/FormContext";
import { storedAuthorInfo } from "@/utils/storedAuthorInfo";
import Modal from "@/components/Modal";

// Compute MD5 checksum in Base64 format
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

// Upload file directly to S3 using signed URL
async function directUploadFile(file) {
  if (!file) return null;

  try {
    const checksum = await computeChecksum(file);
    const response = await api.post("/direct_uploads", {
      blob: {
        filename: file.name,
        byte_size: file.size,
        checksum,
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
        "Content-Length": file.size.toString(),
        "Content-MD5": checksum,
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(`S3 upload failed: ${errorText}`);
    }

    console.log(`✅ Successfully uploaded ${file.name} to S3`);
    return signed_id;
  } catch (error) {
    console.error("Direct upload failed:", error);
    throw error;
  }
}

export default function BookPricing() {
  const { formData, updateFormData } = useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isNew = !id || id === "null" || id === "undefined";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const { id: authorId } = storedAuthorInfo;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      // If new book, ensure files are provided
      if (isNew && !formData.ebook_file) {
        throw new Error("Ebook file is required");
      }
      if (isNew && !formData.cover_image) {
        throw new Error("Cover image is required");
      }

      const uploadPromises = {};

      if (
        formData.ebook_file &&
        (isNew || formData.ebook_file instanceof File)
      ) {
        setUploadProgress((prev) => ({ ...prev, ebook_file: "uploading" }));
        uploadPromises.ebook_file = directUploadFile(formData.ebook_file).then(
          (signedId) => {
            setUploadProgress((prev) => ({ ...prev, ebook_file: "complete" }));
            return signedId;
          }
        );
      }

      if (
        formData.cover_image &&
        (isNew || formData.cover_image instanceof File)
      ) {
        setUploadProgress((prev) => ({ ...prev, cover_image: "uploading" }));
        uploadPromises.cover_image = directUploadFile(
          formData.cover_image
        ).then((signedId) => {
          setUploadProgress((prev) => ({ ...prev, cover_image: "complete" }));
          return signedId;
        });
      }

      const uploadedFiles = await Promise.all([
        uploadPromises.ebook_file || Promise.resolve(null),
        uploadPromises.cover_image || Promise.resolve(null),
      ]);

      const [ebookSignedId, coverImageSignedId] = uploadedFiles;

      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (
          key !== "ebook_price" &&
          key !== "ebook_file" &&
          key !== "cover_image" &&
          value !== undefined
        ) {
          // Convert arrays or objects to JSON
          if (Array.isArray(value) || typeof value === "object") {
            formDataToSend.append(`book[${key}]`, JSON.stringify(value));
          } else {
            formDataToSend.append(`book[${key}]`, value);
          }
        } else if (key === "ebook_price") {
          // Ensure price is sent as decimal string with 2 decimal places
          const priceValue =
            typeof value === "number" ? value.toFixed(2) : value;
          formDataToSend.append(`book[${key}]`, priceValue);
          console.log("Price being sent:", priceValue);
        }
      });
      
      if (ebookSignedId)
        formDataToSend.append("book[ebook_file]", ebookSignedId);
      if (coverImageSignedId)
        formDataToSend.append("book[cover_image]", coverImageSignedId);


      console.log("Submitting data to:", isNew ? "/books" : `/books/${id}`);
      for (let pair of formDataToSend.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }


      

      const response = await api({
        data: formDataToSend,
        method: isNew ? "POST" : "PUT",
        url: isNew ? "/books" : `/books/${id}`,
      });

      if (response.status >= 200 && response.status < 300) {
        setIsModalOpen(true);
        localStorage.removeItem("bookFormData");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert(error.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative mt-5">
        <h3 className="font-bold text-lg mb-2">Price</h3>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            $
          </span>
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.ebook_price || ""}
            onChange={(e) => {
              const value =
                e.target.value === "" ? "" : parseFloat(e.target.value);
              updateFormData({ ebook_price: value });
            }}
            className="border border-gray-600 rounded-md w-full max-w-96 h-9 pl-7 pr-3"
            placeholder="0.00"
          />
        </div>
      </div>

      <h3 className="font-bold text-lg mt-5">Terms and Conditions</h3>
      <p className="text-sm max-w-[700px]">
        By using itan, you agree to these terms...
      </p>

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
        {formData.terms_and_conditions === false && (
          <p className="text-red-600 mt-2 text-xs">
            You must agree to the terms and conditions to publish.
          </p>
        )}
      </div>

      {/* Upload status */}
      {uploadProgress.ebook_file && (
        <p className="mt-2">
          E-book: {uploadProgress.ebook_file === "complete" ? "✅" : "⏳"}
        </p>
      )}
      {uploadProgress.cover_image && (
        <p className="mt-2">
          Cover Image: {uploadProgress.cover_image === "complete" ? "✅" : "⏳"}
        </p>
      )}

      {/* Buttons */}
      <div className="flex justify-between mt-10">
        <button
          type="button"
          onClick={() =>
            router.push(
              `/author/${authorId}/books/create/book-content?id=${id}`
            )
          }
          className="border border-[#E50913] px-5 py-2 rounded-md hover:bg-[#cd3f46] hover:text-white"
        >
          Back to Content
        </button>
        <button
          type="submit"
          disabled={!formData.terms_and_conditions || uploading}
          className={`bg-[#E50913] hover:bg-[#cd3f46] text-white px-8 py-2 rounded-md ${!formData.terms_and_conditions || uploading ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          {uploading ? "Uploading..." : isNew ? "Publish" : "Save Edit"}
        </button>
      </div>

      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
            router.push(`/author/${authorId}/books`);
          }}
          isOpen={isModalOpen}
        />
      )}
    </form>
  );
}
