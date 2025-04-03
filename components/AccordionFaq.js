"use client";
import { useState } from "react";

export default function AccordionFaq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What is IGP?",
      answer:
        "IGP Stands for Itan Global Publishing IGP lets you self-publish eBooks and audiobooks for free, providing direct access to showcase your book on Itan Stores. You can create a dedicated product detail page for your book, enhancing its visibility. Additionally, IGP also provides tools to translate your book into multiple languages and publish audio files (if available), expanding your global readership",
    },
    {
      question: "What types of content can I publish through IGP?",
      answer:
        "IGP enables you to publish eBooks and audiobooks. Currently, we do not accept non-fiction books, and periodicals. We’ll keep you updated when we begin onboarding these genres.Content types typically published using IGP include but are not limited to the following: Fiction -Novels  Book Series Children Books  Comics",
    },
    {
      question:
        "Am I able to use IGP for content currently published elsewhere?",
      answer:
        "Yes, if you own the rights to your book, you can publish it with IGP even if it was previously published elsewhere. If your book already has an ISBN from another publisher, it must retain the same title, and author name when published with IGP to continue using that ISBN. Any modifications to these details will require a new edition and a new ISBN.",
    },
    {
      question: "What file formats are supported for eBook manuscripts?",
      answer: "Microsoft Word (DOC/DOCX), Epub, PDF",
    },
    {
      question: "What file formats are supported for Audiobook files?",
      answer: "MP3 – Widely supported, compressed format with good audio quality.WAV - Widely supported, compressed format with good audio quality.",
    },
  ];

  return (
    <section>
      <div className="mt-8 text-xl xs:text-2xl medium:text-3xl large:text-4xl xl:text-5xl font-semibold text-center medium:mb-8 large:mb-10">
        Frequently Asked Questions
        <h3>FAQs</h3>
      </div>

      <div className="divide-y divide-gray-200 rounded-lg xl:mb-8">
        {faqItems.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => toggleAccordion(index)}
              className="flex items-center justify-between w-full p-5 font-medium text-gray-500 hover:bg-gray-100 gap-3"
            >
              <span className="flex-1 text-left">{item.question}</span>
              <div className="flex items-center justify-center w-6 h-6 xs:w-7 xs:h-7 medium:w-8 medium:h-8 rounded-full bg-[#FEE6E6] text-[#EF5353] flex-shrink-0 transition-all duration-300">
                {activeIndex === index ? (
                  // Minus icon when expanded
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 xs:w-5 xs:h-5 medium:w-6 medium:h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                ) : (
                  // Plus icon when collapsed
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 xs:w-5 xs:h-5 medium:w-6 medium:h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                )}
              </div>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="p-5">
                <p className="text-gray-500">{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
