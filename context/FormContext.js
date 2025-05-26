"use client"; 

import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    audiobook_price: "",
    bio: "",
    contributors: "",
    cover_image: null,  // For image upload
    description: "",
    edition_number: 0,
    title: "",
    subtitle: "",
    ebook_file: null,    // For PDF or EPUB
    ebook_price: "",
    keywords: ["", "", "", ""],
    book_isbn: "",
    primary_audience: "",
    publishing_rights: null,
    terms_and_conditions: null,
    ai_generated_image: null,
    explicit_images: null,
  });

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom hook for using the form context
export const useForm = () => useContext(FormContext);
