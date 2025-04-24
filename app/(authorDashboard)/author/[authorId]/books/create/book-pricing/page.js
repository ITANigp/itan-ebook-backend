"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@/context/FormContext";
import Modal from "@/components/Modal";
import CryptoJS from "crypto-js";
import { api } from "@/utils/api";

import { storedAuthorInfo } from "@/utils/storedAuthorInfo"

// MD5 checksum calculation function (Base64 format as S3 requires)
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

// File upload function to handle the direct upload process
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

export default function BookPricing() {
  const { formData, updateFormData } = useForm();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // useEffect(() => {
  //   if (id && id !== "null" && id !== "undefined") {
  //     api
  //       .get(`http://localhost:3000/api/v1/books/${id}`)
  //       .then((response) => {
  //         updateFormData({ ...response.data.data });
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching book:", error);
  //       });
  //   }
  // }, [id]);

  const { id: authorId } = storedAuthorInfo;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      // Validate required fields
      // if (!id && !formData.title?.trim()) {
      //   throw new Error("Title is required");
      // }
      // if (!id && !formData.ebook_file) {
      //   throw new Error("Ebook file and cover image are required");
      // }

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

      const [ebookSignedId, coverImageSignedId] = await Promise.all([
        uploadPromises.ebook_file,
        uploadPromises.cover_image,
      ]);

      // Create FormData for final submission
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (
          key !== "ebook_file" &&
          key !== "cover_image" &&
          value !== undefined
        ) {
          formDataToSend.append(`book[${key}]`, value);
        }
      });

      formDataToSend.append("book[ebook_file]", ebookSignedId);
      formDataToSend.append("book[cover_image]", coverImageSignedId);

      // Add this check to handle both null and "null"
      const isValidId = id && id !== "null" && id !== "undefined";

      // Submit to the Rails API
      const response = await api({
        data: formDataToSend,
        method: isValidId ? "PUT" : "POST",
        url: isValidId ? `/books/${id}` : "/books",
      });

      if (response.status >= 200 && response.status < 300) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error during upload process:", error);
      alert(error.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }

    // Clear stored form data after submission
    localStorage.removeItem("bookFormData");
  };

  return (
    <>
    {/* // <div className="w-full flex justify-center">
    //   <div className="w-full max-w-[800px]"> */}
        <h3 className="font-bold text-lg mt-5">Price</h3>
        <p className="my-1">Enter the book price</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={formData.ebook_price || ""}
            onChange={(e) => updateFormData({ ebook_price: e.target.value })}
            className="border border-gray-600 rounded-md w-full max-w-96 h-9 px-3"
            placeholder="Ebook Price"
          />

          {/* Account Details and other fields
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
        /> */}

          {/* Terms and Conditions */}
          <h3 className="font-bold text-lg mt-5">Terms and Conditions</h3>
          <p className="text-sm max-w-[700px] w-full">
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

          {/* Upload status indicators */}
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
          <div className="flex flex-col-reverse sm:justify-between my-10 sm:flex-row">
            <button
              onClick={() =>
                router.push(
                  `/author/${authorId}/books/create/book-content?id=${id}`
                )
              }
              className="border border-[#E50913] px-5 py-2 rounded-md hover:bg-[#cd3f46] hover:text-white"
              type="button"
            >
              Back to Content
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="bg-[#E50913] hover:bg-[#cd3f46] text-white px-8 py-2 rounded-md mb-3 sm:mb-0"
            >
              {uploading ? "Uploading..." : "Publish"}
            </button>
          </div>
        </form>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* </div>
    </div> */}
    </>
  );
}
