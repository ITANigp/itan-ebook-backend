"use client"

import React, { useState } from 'react'

const BookDetails = () => {
  const [selectedOption, setSelectedOption] = useState("option1");
  return (
    <div>
        <h3>Book Title</h3>
        <p> Enter your book title exactly as it appears on the cover. 
            Subtitles will be separated by a colon. Please double-check 
            spelling, as this field cannot be edited after publication.
        </p>
        <p>Book Title</p>
        <input 
          type='text' 
          required
          id='title'
          />
        <p>Subtitle (Optional)</p>
        <input 
          type='text' 
          required
          id='subtitle'
          />

          <h3>Author</h3>
          <p>Enter the primary author's or contributor's name. 
            Include middle names or prefixes in the 'First Name' 
            field, and suffixes (e.g., Jr., Sr.) in the 'Last Name' 
            field.vv</p>
            <h3>Primary Author or Contributor</h3>

            <div>
                <input type='text' placeholder='First Name'/>
                <input type='text' placeholder='Last Name'/>
            </div>
            <p>Tell your readers/listeners more about you</p>

            <h3>Bio</h3>
            <textarea></textarea>

            <h3>Contributors</h3>
            <p>Add up to 5 contributors. They will appear on 
                itan in the order you list them below.</p>
            <p><span>Contributors</span>(Optional)</p>

            <div>
              <select className="w-full border border-gray-300 p-2 rounded-md">
                  <option value="">Select an option</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
              </select>
              <input type='text' placeholder='First Name'/>
              <input type='text' placeholder='Last Name'/>
            </div>

            <div>
                <button>Remove</button>
                <button>Add Author</button>
            </div>

            <h3>Edition Number</h3>
            <p>The edition number tells readers/listeners whether 
                the book is an original or updated version. Note: 
                This cannot be changed after the book is uploaded.
            </p>
            <p><span>Edition Number</span> (Optional)</p>
            <input type='text' id='editionNo'/>

            <h3>Descrih3tion</h3>
            <p>Summarize your book. This will be your 
              product description on itan, so readers/listeners 
              can learn more about your book.
            </p>
            <textarea id="description"></textarea>

            <h3>Publishing Rights</h3>
            <p>Publishing rights: control 
              your work's use and distribution, 
              or make it public domain.
            </p>



            <div className="flex flex-col space-y-2 p-4">

      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="radio"
          name="choice"
          value="option1"
          checked={selectedOption === "option1"}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="hidden"
        />
        <div
          className={`w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center ${
            selectedOption === "option1" ? "bg-blue-500" : "bg-white"
          }`}
        >
          {selectedOption === "option1" && (
            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
          )}
        </div>
        <span className="text-gray-700">I own the rights</span>
      </label>

      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="radio"
          name="choice"
          value="option2"
          checked={selectedOption === "option2"}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="hidden"
        />
        <div
          className={`w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center ${
            selectedOption === "option2" ? "bg-blue-500" : "bg-white"
          }`}
        >
          {selectedOption === "option2" && (
            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
          )}
        </div>
        <span className="text-gray-700">Its public content</span>
      </label>
    </div>

    <h3>Primary Audience</h3>
    <p>Choose the youngest and oldest ages at 
      which a person can enjoy this book.
    </p>
    <p>Choose Age</p>

  <div>
    <select className="w-full border border-gray-300 p-2 rounded-md">
                  <option value="">Minimum</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
    </select>

    <select className="w-full border border-gray-300 p-2 rounded-md">
                  <option value="">Maximum</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
    </select>
  </div>

  <h3>Categories</h3>
  <p>Select the Fiction genre that best fits your book</p>
  <p>Choose categories</p>
  <select className="w-full border border-gray-300 p-2 rounded-md">
                  <option value="">Choose categories</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
    </select>

    <h3>Keywords</h3>
    <p>Select up to 6 keywords (max 50 characters) 
      that describe your book's unique themes, genres, 
      or topics. Examples: 'medieval fantasy', 'romance novel', 
      'sci-fi adventure'
    </p>
    <p>Your Keywords</p>
    {/* --- ---
        --- ---
        --- --- */}
        <div>
        <button>Save as Draft</button>
        <button>Save and Continue</button>
        </div>

    </div>
  )
}

export default BookDetails