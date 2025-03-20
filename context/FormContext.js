"use client"; 

import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
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
    keywords:"",
    book_isbn: "",
    primary_audience: "",
    publishing_rights: false,
    terms_and_conditions: false,
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
