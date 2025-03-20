"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@/context/FormContext";
import Modal from "@/components/Modal";
import CryptoJS from "crypto-js";
import { api } from "@/utils/api";

// MD5 checksum calculation function (ActiveStorage expects MD5)
// async function computeChecksum(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsArrayBuffer(file);
//     reader.onload = () => {
//       const wordArray = CryptoJS.lib.WordArray.create(reader.result);
//       const hash = CryptoJS.MD5(wordArray).toString();
//       resolve(hash);
//     };
//     reader.onerror = (error) => reject(error);
//   });
// }

// Fixed MD5 checksum calculation function (Base64 format as S3 requires)
async function computeChecksum(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const wordArray = CryptoJS.lib.WordArray.create(reader.result);
      // Convert to Base64 instead of hex
      const base64 = CryptoJS.enc.Base64.stringify(CryptoJS.MD5(wordArray));
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
}

// File upload function to handle the direct upload process
async function directUploadFile(file) {
  try {
    // Step 1: Get the direct upload URL
    const checksum = await computeChecksum(file);
    console.log(
      `File: ${file.name}, Size: ${file.size}, Checksum: ${checksum}`
    );

    const response = await api.post("/direct_uploads", {
      blob: {
        filename: file.name,
        byte_size: file.size,
        checksum: checksum,
        content_type: file.type,
      },
    });

    console.log("Direct Upload Response:", response.data);

    // Verify the response structure
    const { signed_id, direct_upload } = response.data;

    if (!direct_upload?.url) {
      console.error("Missing direct_upload.url in response:", response.data);
      throw new Error("Invalid direct upload response");
    }

    console.log(`Uploading ${file.name} to ${direct_upload.url}`);
    console.log("With headers:", direct_upload.headers);

    // Step 2: Upload directly to the S3 URL with proper error handling
    const uploadResponse = await fetch(direct_upload.url, {
        method: "PUT",
        headers: {
          ...direct_upload.headers,
          "Content-Type": file.type,
          "Content-Length": file.size.toString(),
          "Content-MD5": checksum, // Now correctly in base64 format
        },
        body: file,
      });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error(`S3 upload failed (${uploadResponse.status}):`, errorText);
      throw new Error(`S3 upload failed: ${uploadResponse.status}`);
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      // Validate required fields
      if (!formData.title?.trim()) {
        throw new Error("Title is required");
      }

      // Validate required files
      for (const fileType of ["ebook_file", "cover_image"]) {
        if (!formData[fileType]) {
          throw new Error(`${fileType.replace("_", " ")} is required`);
        }
      }

      // Upload files directly to S3
      const uploadPromises = {};
      for (const fileType of ["ebook_file", "cover_image"]) {
        setUploadProgress((prev) => ({ ...prev, [fileType]: "uploading" }));
        uploadPromises[fileType] = directUploadFile(formData[fileType]).then(
          (signedId) => {
            setUploadProgress((prev) => ({ ...prev, [fileType]: "complete" }));
            return signedId;
          }
        );
      }

      // Wait for all uploads to complete
      const uploadResults = await Promise.all([
        uploadPromises.ebook_file,
        uploadPromises.cover_image,
      ]);

      // Create FormData for final submission
      const formDataToSend = new FormData();

      // Add all text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (
          key !== "ebook_file" &&
          key !== "cover_image" &&
          value !== undefined
        ) {
          formDataToSend.append(`book[${key}]`, value);
        }
      });

      // Add the signed IDs
      formDataToSend.append("book[ebook_file]", uploadResults[0]);
      formDataToSend.append("book[cover_image]", uploadResults[1]);

      // Submit to the Rails API
      const response = await api.post("/api/v1/books", formDataToSend);

      if (response.status >= 200 && response.status < 300) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error during upload process:", error);
      alert(error.message || "Upload failed. Please try again.");
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
          value={formData.ebook_price || ""}
          onChange={(e) => updateFormData({ ebook_price: e.target.value })}
          className="border border-gray-600 rounded-md w-96 h-9 px-3"
          placeholder="Ebook Price"
        />

        {/* Account Details and other fields */}
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

        {/* Terms and Conditions */}
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

        {/* Upload status indicators (optional) */}
        {uploadProgress.ebook_file && (
          <div className="mt-2">
            E-book: {uploadProgress.ebook_file === "complete" ? "✅" : "⏳"}
          </div>
        )}
        {uploadProgress.cover_image && (
          <div className="mt-2">
            Cover Image:{" "}
            {uploadProgress.cover_image === "complete" ? "✅" : "⏳"}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between mt-10">
          <button
            onClick={() => router.push("/author/books/create/book-content")}
            className="border border-[#E50913] px-5 py-2 rounded-md hover:bg-[#cd3f46] hover:text-white"
            type="button"
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
}
