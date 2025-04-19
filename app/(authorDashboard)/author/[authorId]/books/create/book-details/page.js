"use client"

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useForm } from "@/context/FormContext";
import { storedAuthorInfo } from '@/utils/storedAuthorInfo';
import { api } from "@/utils/api"

const BookDetails = () => {
  const { formData, updateFormData } = useForm();
  // const [selectedOption, setSelectedOption] = useState("option1");
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    localStorage.setItem("bookFormData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const savedData = localStorage.getItem("bookFormData");
    if (savedData) {
      updateFormData(JSON.parse(savedData));
    }
  }, []);


   const validateForm = () => {
     let newErrors = {};

     if (!id && (!formData.title || formData.title.trim() === "")) {
       newErrors.title = "Book title is required.";
     }

    //  if (id && (formData.subtitle && formData.subtitle.length > 200)) {
    //    newErrors.subtitle = "Subtitle must be less than 200 characters.";
    //  }


     if (id && (formData.edition_number && isNaN(formData.edition_number))) {
       newErrors.edition_number = "Edition number must be a number.";
     }

    //  if (!formData.description || formData.description.trim() === "") {
    //    newErrors.description = "Description is required.";
    //  if (formData.description.length > 1000) {
    //    newErrors.description = "Description must be under 1000 characters.";
    //  }

     if (!id && (!formData.categories || formData.categories.trim() === "")) {
       newErrors.categories = "Category is required.";
     }

     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
   };

  useEffect(() => {
    if (id && id !== "null" && id !== "undefined") {
      // Prevent refetching if data already exists
      api
        .get(`/books/${id}`)
        .then((response) => {
          updateFormData(response.data.data); // Update the form context
        })
        .catch((error) => {
          console.error("Error fetching book:", error);
        });
    }
  }, [id]);

  const { id: authorId } = storedAuthorInfo;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form1 is valid, submitting data...", formData);
      router.push(`/author/${authorId}/books/create/book-content?id=${id}`)
    }
  };

  return (
    <div>
      <h3 className="mt-7 font-bold">Book Title</h3>
      <p className="my-2 md:w-[650px] text-sm sm:text-base">
        {" "}
        Enter your book title exactly as it appears on the cover. Subtitles will
        be separated by a colon. Please double-check spelling, as this field
        cannot be edited after publication.
      </p>
      <p>Book Title</p>
      <input
        type="text"
        // required={!id}
        value={formData.title}
        required
        onChange={(e) => updateFormData({ title: e.target.value })}
        className="h-[35px] w-full max-w-[650px] bg-gray-50 border focus:border-none text-gray-900 rounded-md focus:ring-1 focus:outline-none focus:ring-[#E50913]"
      />
      {errors.title && <p className="text-red-500">{errors.title}</p>}
      <p className="mt-3">Subtitle (Optional)</p>
      <input
        type="text"
        // required={id ? false : true}
        value={formData.subtitle}
        onChange={(e) => updateFormData({ subtitle: e.target.value })}
        className="h-[35px] w-full max-w-[650px] bg-gray-50 border focus:border-none text-gray-900 rounded-md focus:ring-1 focus:outline-none focus:ring-[#E50913]"
      />

      <h3 className="mt-3 font-bold ">Author's Bio</h3>
      <p className="text-sm md:w-[650px]">
        Enter the author's name exactly as it appears on the book cover,
        including any middle names in the <br className="hidden sm:block" />
        'First Name' field.
      </p>
      <h3 className="mt-3 font-bold">Author Name</h3>

      <div className="w-full max-w-[650px] flex">
        <input
          type="text"
          title="First Name (Optional: Include your middle name here as well)"
          placeholder="First Name (Include your middle name)"
          className="h-[35px] w-full bg-gray-50 border focus:border-none text-gray-900 rounded-lg focus:ring-1 focus:outline-none focus:ring-[#E50913] mr-3 placeholder:text-ellipsis placeholder:overflow-hidden placeholder:whitespace-nowrap placeholder:w-full"
          onFocus={(e) =>
            (e.target.placeholder = "(Include your middle name here as well)")
          }
          onBlur={(e) =>
            (e.target.placeholder = "First Name (Include your middle name)")
          }
        />
        <input
          type="text"
          placeholder="Last Name"
          className="h-[35px] w-full bg-gray-50 border focus:border-none text-gray-900 rounded-lg focus:ring-1 focus:outline-none focus:ring-[#E50913]"
        />
      </div>

      <h3 className="font-bold mt-8">Bio</h3>
      <textarea
        className="h-40 w-full max-w-[650px] bg-gray-50 border focus:border-none text-gray-900 rounded-lg focus:ring-1 focus:outline-none focus:ring-[#E50913]"
        placeholder="Not more than 500 characters"
        value={formData.bio}
        onChange={(e) => updateFormData({ bio: e.target.value })}
      ></textarea>

      <h3 className="font-bold">Edition Number</h3>
      <p className="my-3 w-full max-w-[650px] text-sm sm:text-base">
        The edition number tells readers/listeners whether the book is an
        original or updated version.
        <br /> Note: This cannot be changed after the book is uploaded.
      </p>
      <p>
        <span className="font-bold">Edition Number</span> (Optional)
      </p>
      <input
        type="text"
        // id="editionNo"
        value={formData.edition_number}
        onChange={(e) => updateFormData({ edition_number: e.target.value })}
        className="h-[35px] w-full max-w-[650px] bg-gray-50 border focus:border-none text-gray-900 rounded-lg focus:ring-1 focus:outline-none focus:ring-[#E50913]"
      />

      <h3 className="font-bold mb-2 mt-3">Description</h3>
      <p className="w-full max-w-[650px] mb-1 text-sm sm:text-base">
        Summarize your book. This will be your product description on itan, so
        readers/listeners can learn more about your book.
      </p>
      <textarea
        placeholder="Not more than 1,000 characters"
        className="h-40 w-full max-w-[650px] bg-gray-50 border focus:border-none text-gray-900 rounded-lg focus:ring-1 focus:outline-none focus:ring-[#E50913]"
        value={formData.description}
        onChange={(e) => updateFormData({ description: e.target.value })}
      ></textarea>

      <h3 className="font-bold mt-3">Publishing Rights</h3>
      <p className="w-full max-w-[650px] my-3">
        Publishing rights: control your work's use and distribution, or make it
        public domain.
      </p>

      <div className="flex flex-col space-y-2">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="publishing_rights"
            value="true"
            checked={formData.publishing_rights === true}
            onChange={() => updateFormData({ publishing_rights: true })}
            className="hidden"
          />
          <div
            className={`w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center ${
              formData.publishing_rights === true ? "bg-blue-500" : "bg-white"
            }`}
          >
            {formData.publishing_rights === true && (
              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            )}
          </div>
          <span className="text-gray-700">I own the rights</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="publishing_rights"
            value="false"
            checked={formData.publishing_rights === false}
            onChange={() => updateFormData({ publishing_rights: false })}
            className="hidden"
          />
          <div
            className={`w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center ${
              formData.publishing_rights === false ? "bg-blue-500" : "bg-white"
            }`}
          >
            {formData.publishing_rights === false && (
              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            )}
          </div>
          <span className="text-gray-700">Public content</span>
        </label>
      </div>

      <h3 className="font-bold text-lg mb-3 mt-10">Primary Audience</h3>
      <p className="text-sm sm:text-base">
        Choose the youngest and oldest ages at which a person can enjoy this
        book.
      </p>
      <p className="mt-3">Choose Age</p>

      <div className="w-72 sm:w-96">
        <select
          className="w-full border border-gray-300 p-2 rounded-md"
          value={formData.primary_audience}
          onChange={(e) => updateFormData({ primary_audience: e.target.value })}
        >
          <option value="">Select age group</option>
          <option value="18">18</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
      </div>

      <h3 className="font-bold text-lg mt-6">Categories</h3>
      <p className="my-3 text-sm sm:text-base">
        Select the Fiction genre that best fits your book
      </p>
      <p>Choose categories</p>
      <select
        className="border border-gray-300 p-2 rounded-md w-72 sm:w-[550px]"
        value={formData.categories}
        onChange={(e) => updateFormData({ categories: e.target.value })}
      >
        <option value="">Choose categories</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      {errors.categories && <p className="text-red-500">{errors.categories}</p>}

      <h3 className="font-bold text-lg mt-7 mb-3">Keywords</h3>
      <p className="w-full max-w-[650px] my-3 text-sm sm:text-base">
        Select up to 6 keywords (max 50 characters) that describe your book's
        unique themes, genres, or topics. Examples: 'medieval fantasy', 'romance
        novel', 'sci-fi adventure'
      </p>
      <p className="">Your Keywords</p>
      <div className="w-full max-w-[650px] flex">
        <input
          type="text"
          className="h-[35px] w-full bg-gray-50 border focus:border-none text-gray-900 rounded-lg focus:ring-1 focus:outline-none focus:ring-[#E50913] mr-3"
        />
        <input
          type="text"
          className="h-[35px] w-full bg-gray-50 border focus:border-none text-gray-900 rounded-lg focus:ring-1 focus:outline-none focus:ring-[#E50913]"
        />
      </div>
      <div className="mt-5 mb-8 flex w-full max-w-[650px]">
        <input
          type="text"
          className="h-[35px] w-full bg-gray-50 border focus:border-none text-gray-900 rounded-lg focus:ring-1 focus:outline-none focus:ring-[#E50913] mr-3"
        />
        <input
          type="text"
          className="h-[35px] w-full bg-gray-50 border focus:border-none text-gray-900 rounded-lg focus:ring-1 focus:outline-none focus:ring-[#E50913]"
        />
      </div>

      <h3 className="font-bold">Tags</h3>
      <div className="h-[1px] bg-gray-200 w-full max-w-[650px] mb-2" />
      <div>
        <div className="justify-between items-center px-[7px] py-[5px] bg-[#121212] inline-flex rounded-md mr-[5px]">
          <p className="text-white">Dark Story</p>{" "}
          <img
            src="/images/close.png"
            alt="close"
            className="w-4 h-4 ml-4 cursor-pointer"
          />
        </div>
        <div className="justify-between items-center px-[7px] py-[5px] bg-[#121212] inline-flex rounded-md">
          <p className="text-white">Black detective fiction</p>{" "}
          <img
            src="/images/close.png"
            alt="close"
            className="w-4 h-4 ml-4 cursor-pointer"
          />
        </div>
      </div>

      <div className="flex items-center border border-[#929292] w-full max-w-[650px] rounded-md my-8">
        <img
          src="/images/add-icon.png"
          alt=""
          className="h-7 w-7 block ml-[5px] hover:bg-slate-300 p-1 rounded-md cursor-pointer"
        />{" "}
        <input
          type="text"
          placeholder="Add a tag and press enter"
          className="flex-1 outline-none border-none focus:ring-0 focus:outline-none rounded-md"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-[#E50913] hover:bg-[#cd3f46]  float-right text-white px-8 py-[5px] mb-10 rounded-md w-24"
      >
        Next
      </button>
    </div>
  );
}

export default BookDetails