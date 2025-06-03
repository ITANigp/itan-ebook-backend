"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useForm } from "@/context/FormContext";
import { storedAuthorInfo } from "@/utils/storedAuthorInfo";
import { api } from "@/utils/auth/authorApi";

const BookContent = () => {
  const { formData, updateFormData } = useForm();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("");
  const [errors, setErrors] = useState({});

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const ebookInputRef = useRef();
  const coverInputRef = useRef();

  // useEffect(() => {
  //   const savedData = localStorage.getItem("bookFormData");
  //   if (savedData) {
  //     updateFormData(JSON.parse(savedData));
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem("bookFormData", JSON.stringify(formData));
  }, [formData]);

  const validateForm = () => {
    let newErrors = {};

    console.log("book id @ form2: ", id);

    if (id == "null") {
      if (!formData.ebook_file) {
        newErrors.ebook_file = "Ebook file is required.";
      }

      if (!formData.cover_image) {
        newErrors.cover_image = "Ebook file is required.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // useEffect(() => {
  //   if (id && id !== "null" && id !== "undefined") {
  //     // Prevent refetching if data already exists
  //     api
  //       .get(`/books/${id}`)
  //       .then((response) => {
  //         updateFormData(response.data.data); // Update the form context
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching book:", error);
  //       });
  //   }
  // }, [id]);

  const { id: authorId } = storedAuthorInfo;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    updateFormData({ [e.target.name]: file });
  };

  const handleEbookButtonClick = () => {
    ebookInputRef.current?.click();
  };
  const handleCoverButtonClick = () => {
    coverInputRef.current?.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form2 is valid, submitting data...", formData);
      router.push(`/author/${authorId}/books/create/book-pricing?id=${id}`);
    }
  };

  return (
    <div>
      <h3 className="font-bold text-lg mt-7 mb-3">Manuscript</h3>
      <p>
        Upload your manuscript [i.e. your book’s interior content]. We recommend
        using a PDF file.
      </p>

      <label className="flex items-center space-x-1 cursor-pointer">
        <input
          type="checkbox"
          // checked={checked}
          // onChange={(e) => setChecked(e.target.checked)}
          className="w-2 h-2"
        />
        <span className="text-gray-700 text-xs">
          Enable Digital Rights Management (DRM) to secure your digital content.
          Warning: DRM settings are permanent and cannot be altered after
          publication.
        </span>
      </label>

      <h3 className="font-bold mt-3">
        Does the content has explicit images or text
      </h3>
      <div className="flex flex-col space-y-2">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="explicit_images"
            value="true"
            checked={formData.explicit_images === true}
            onChange={() => updateFormData({ explicit_images: true })}
            className="hidden"
          />
          <div
            className={`w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center ${
              formData.explicit_images === true ? "bg-blue-500" : "bg-white"
            }`}
          >
            {formData.explicit_images === true && (
              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            )}
          </div>
          <span className="text-gray-700">Yes</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="explicit_images"
            value="false"
            checked={formData.explicit_images === false}
            onChange={() => updateFormData({ explicit_images: false })}
            className="hidden"
          />
          <div
            className={`w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center ${
              formData.explicit_images === false ? "bg-blue-500" : "bg-white"
            }`}
          >
            {formData.explicit_images === false && (
              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            )}
          </div>
          <span className="text-gray-700">No</span>
        </label>
      </div>

      <div>
        <div className="bg-[#E50913] hover:bg-[#b70911] w-48 flex items-center justify-center mx-auto h-10 rounded-md mt-6">
          <img
            src="/images/upload-book.png"
            alt="upload book"
            className="w-4 h-4 mx-2"
          />
          <button className="text-white mr-2" onClick={handleEbookButtonClick}>
            Upload manuscript
          </button>
        </div>
        {errors.ebook_file && (
          <p className="text-red-500">{errors.ebook_file}</p>
        )}
      </div>
      <input
        type="file"
        name="ebook_file"
        // required={id ? false : true}
        // value={formData.ebook_file ?? ""}
        ref={ebookInputRef}
        accept=".pdf,.epub"
        onChange={handleFileChange}
        className="border p-2 w-full hidden"
      />
      <h3 className="my-2 font-bold text-lg">Book Cover</h3>
      <p className="w-full">
        Make a lasting impression! Upload a captivating front cover that
        showcases your book's personality and draws readers in.
      </p>

      <input
        type="file"
        name="cover_image"
        accept="image/*"
        ref={coverInputRef}
        // value={formData.cover_image ?? ""}
        onChange={handleFileChange}
        className="border p-2 w-full hidden"
      />

      <div>
        <div className="w-48 flex items-center justify-center mx-auto h-10 rounded-md mt-6 border-2 border-gray-300 hover:bg-gray-100">
          <img
            src="/images/upload-cover.png"
            alt="upload book"
            className="w-4 h-4 mx-2"
          />
          <button
            className="text-gray-800 mr-2 text-sm"
            onClick={handleCoverButtonClick}
          >
            Upload Book Cover
          </button>
        </div>
        {errors.cover_image && (
          <p className="text-red-500">{errors.cover_image}</p>
        )}
      </div>

      <h3 className="font-bold text-lg mb-2 mt-6">AI Content Generated</h3>
      <p className="w-72 sm:w-full">
        Itan is collecting information about the use of Artificial Intelligence
        (AI) tools in creating content
      </p>
      <p className="text-sm font-semibold my-2">
        Did you use AI tools in creating texts, images, and/or translations in
        your book?
      </p>

      <div className="flex flex-col space-y-2">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="ai_generated_image"
            value="true"
            checked={formData.ai_generated_image === true}
            onChange={() => updateFormData({ ai_generated_image: true })}
            className="hidden"
          />
          <div
            className={`w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center ${
              formData.ai_generated_image === true ? "bg-blue-500" : "bg-white"
            }`}
          >
            {formData.ai_generated_image === true && (
              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            )}
          </div>
          <span className="text-gray-700">Yes</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="ai_generated_image"
            value="false"
            checked={formData.ai_generated_image === false}
            onChange={() => updateFormData({ ai_generated_image: false })}
            className="hidden"
          />
          <div
            className={`w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center ${
              formData.ai_generated_image === false ? "bg-blue-500" : "bg-white"
            }`}
          >
            {formData.ai_generated_image === false && (
              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            )}
          </div>
          <span className="text-gray-700">No</span>
        </label>
      </div>

      <h3 className="font-bold text-lg mt-5 mb-2">Book ISBN</h3>
      <p className="mb-1">ISBN (Optional) </p>
      <input
        type="text"
        className="h-[35px] w-72 bg-gray-50 border focus:border-none text-gray-900 rounded-lg focus:ring-1 focus:outline-none focus:ring-[#E50913]"
        value={formData.book_isbn}
        onChange={(e) => updateFormData({ book_isbn: e.target.value })}
      />
      <p className="mt-3 mb-1">Publisher (Optional) </p>
      <input
        type="text"
        value={formData.publisher}
        onChange={(e) => updateFormData({ publisher: e.target.value })}
        className="h-[35px] w-72 bg-gray-50 border focus:border-none text-gray-900 rounded-lg focus:ring-1 focus:outline-none focus:ring-[#E50913]"
      />

      <div className="flex flex-col-reverse sm:justify-between mb-10 mt-24 sm:flex-row">
        <button
          onClick={() =>
            router.push(
              `/author/${authorId}/books/create/book-details?id=${id}`
            )
          }
          className="border hover:bg-[#cd3f46] hover:text-white border-[#E50913] px-5 py-[7px] rounded-md "
        >
          Back to details
        </button>
        <button
          onClick={(e) => {
            handleSubmit(e);
            router.push(
              `/author/${authorId}/books/create/book-pricing?id=${id}`
            );
          }}
          className="bg-[#E50913] hover:bg-[#cd3f46] text-white px-8 py-[5px] rounded-md mb-3 sm:mb-0"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookContent;
