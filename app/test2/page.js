"use client";

// import { useState } from "react";
// import genreData from "@/constants/dataGenres";

// const BookForm = () => {
//   const [genre, setGenre] = useState("");
//   const [selectedSubCategories, setSelectedSubCategories] = useState([]);

//   const handleGenreChange = (e) => {
//     setGenre(e.target.value);
//     setSelectedSubCategories([]);
//   };

//   const handleSubCategoryChange = (e) => {
//     const value = e.target.value;

//     const alreadySelected = selectedSubCategories.some(
//       (item) => item.genre === genre && item.value === value
//     );

//     if (alreadySelected) {
//       setSelectedSubCategories((prev) =>
//         prev.filter((item) => !(item.genre === genre && item.value === value))
//       );
//     } else {
//       setSelectedSubCategories((prev) => [...prev, { genre, value }]);
//     }
//   };

//   const isChecked = (value) =>
//     selectedSubCategories.some(
//       (item) => item.genre === genre && item.value === value
//     );

//   const renderSubCategories = (data) => {
//     if (Array.isArray(data)) {
//       return data.map((subCat, index) => (
//         <label key={index} className="inline-flex items-center space-x-2 mr-3">
//           <input
//             type="checkbox"
//             value={subCat}
//             checked={isChecked(subCat)}
//             onChange={handleSubCategoryChange}
//             className="h-4 w-4"
//           />
//           <span>{subCat}</span>
//         </label>
//       ));
//     } else {
//       return Object.keys(data).map((group, index) => (
//         <div key={index}>
//           <h3 className="font-semibold">{group}</h3>
//           <div className="space-y-2 ml-4">
//             {data[group].map((subCat, i) => (
//               <label
//                 key={i}
//                 className="inline-flex items-center space-x-2 mr-3"
//               >
//                 <input
//                   type="checkbox"
//                   value={subCat}
//                   checked={isChecked(subCat)}
//                   onChange={handleSubCategoryChange}
//                   className="h-4 w-4"
//                 />
//                 <span>{subCat}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       ));
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white border rounded-md shadow-md">
//       <h2 className="text-2xl font-bold mb-6">
//         Select Book Genre and Sub-categories
//       </h2>

//       {/* Genre Dropdown */}
//       <div className="mb-4">
//         <label className="block font-semibold text-lg mb-2">Select Genre</label>
//         <select
//           className="w-full p-2 border rounded-md"
//           value={genre}
//           onChange={handleGenreChange}
//         >
//           <option value="">-- Choose a Genre --</option>
//           {Object.keys(genreData).map((gen, index) => (
//             <option key={index} value={gen}>
//               {gen}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Sub-category Checkboxes */}
//       {genre && (
//         <div className="mb-4">
//           <label className="block mt-2 font-semibold text-lg">
//             Select Sub-categories
//           </label>
//           <div className="space-y-2">
//             {renderSubCategories(genreData[genre])}
//           </div>
//         </div>
//       )}

//       {/* Debug */}
//       <pre className="text-xs bg-gray-100 p-2 mt-4 rounded">
//         {JSON.stringify(selectedSubCategories, null, 2)}
//       </pre>

//       <button
//         type="submit"
//         className="mt-6 py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
//       >
//         Submit
//       </button>
//     </div>
//   );
// };

// export default BookForm;

// import { useState } from "react";
// import genreData from "@/constants/dataGenres";

// export default function CategorySelector() {
//   const [category, setCategory] = useState("");
//   const [subcategory, setSubcategory] = useState("");
//   const [placement, setPlacement] = useState([]);

//   const handleCategoryChange = (e) => {
//     setCategory(e.target.value);
//     setSubcategory("");
//     setPlacement([]);
//   };

//   const handleSubcategoryChange = (e) => {
//     setSubcategory(e.target.value);
//     setPlacement([]);
//   };

//   const handlePlacementChange = (e) => {
//     const value = e.target.value;
//     if (placement.includes(value)) {
//       setPlacement(placement.filter((item) => item !== value));
//     } else {
//       if (placement.length < 3) setPlacement([...placement, value]);
//     }
//   };

//   const getSubcategories = () => {
//     if (!category || typeof genreData[category] !== "object") return [];
//     return Array.isArray(genreData[category])
//       ? []
//       : Object.keys(genreData[category]);
//   };

//   const getPlacements = () => {
//     if (!category) return [];
//     const sub = genreData[category];
//     if (Array.isArray(sub)) return sub;
//     if (subcategory && sub[subcategory]) return sub[subcategory];
//     return [];
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Categories</h2>

//       <div className="mb-4">
//         <label className="block mb-1">Category</label>
//         <select
//           className="w-full p-2 border border-gray-300 rounded"
//           value={category}
//           onChange={handleCategoryChange}
//         >
//           <option value="">Select category</option>
//           {Object.keys(genreData).map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>
//       </div>

//       {getSubcategories().length > 0 && (
//         <div className="mb-4">
//           <label className="block mb-1">Subcategory</label>
//           <select
//             className="w-full p-2 border border-gray-300 rounded"
//             value={subcategory}
//             onChange={handleSubcategoryChange}
//           >
//             <option value="">Select subcategory</option>
//             {getSubcategories().map((sub) => (
//               <option key={sub} value={sub}>
//                 {sub}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {getPlacements().length > 0 && (
//         <div className="mb-4">
//           <label className="block mb-1">Placement (Choose up to 3)</label>
//           <div className="grid grid-cols-2 gap-2">
//             {getPlacements().map((place) => (
//               <label key={place} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   value={place}
//                   checked={placement.includes(place)}
//                   onChange={handlePlacementChange}
//                   className="accent-yellow-500"
//                 />
//                 <span>{place}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       )}

//       {placement.length > 0 && (
//         <div className="mt-4">
//           <p className="font-semibold">Selected Placements:</p>
//           <ul className="list-disc list-inside">
//             {placement.map((p) => (
//               <li key={p}>{p}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div className="mt-6 flex justify-end">
//         <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
//           Save categories
//         </button>
//       </div>
//     </div>
//   );
// }



// import { useState } from 'react';
// import genreData from '@/constants/dataGenres';

// // type SelectedGenre = { main: string; sub?: string; detail?: string };

// export default function GenreSelector() {
//   const [selected, setSelected] = useState({});
//   const [selections, setSelections] = useState([]);

//   const mainCategories = Object.keys(genreData);

//   const getSubCategories = () => {
//     const value = genreData[selected.main];
//     if (Array.isArray(value)) return [];
//     return Object.keys(value || {});
//   };

//   const getDetails = () => {
//     const sub = selected.sub;
//     const value = genreData[selected.main];
//     if (Array.isArray(value)) return value;
//     return value?.[sub] || [];
//   };

//   const handleAdd = () => {
//     if (selected.main && selected.detail) {
//       setSelections([...selections, { ...selected }]);
//       setSelected({});
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
//       <h2 className="text-lg font-semibold mb-4">Select Genre</h2>

//       <div className="space-y-4">
//         {/* Main Category */}
//         <select
//           className="w-full border p-2 rounded"
//           value={selected.main || ''}
//           onChange={(e) =>
//             setSelected({ main: e.target.value, sub: undefined, detail: undefined })
//           }
//         >
//           <option value="">Select Main Genre</option>
//           {mainCategories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>

//         {/* Sub Category */}
//         {selected.main && getSubCategories().length > 0 && (
//           <select
//             className="w-full border p-2 rounded"
//             value={selected.sub || ''}
//             onChange={(e) => setSelected((prev) => ({ ...prev, sub: e.target.value, detail: undefined }))}
//           >
//             <option value="">Select Subcategory</option>
//             {getSubCategories().map((sub) => (
//               <option key={sub} value={sub}>
//                 {sub}
//               </option>
//             ))}
//           </select>
//         )}

//         {/* Detail Category */}
//         {(selected.main && (getDetails().length > 0 || Array.isArray(getDetails()))) && (
//           <select
//             className="w-full border p-2 rounded"
//             value={selected.detail || ''}
//             onChange={(e) => setSelected((prev) => ({ ...prev, detail: e.target.value }))}
//           >
//             <option value="">Select Specific</option>
//             {getDetails().map((detail) => (
//               <option key={detail} value={detail}>
//                 {detail}
//               </option>
//             ))}
//           </select>
//         )}

//         <button
//           onClick={handleAdd}
//           disabled={!selected.main || !selected.detail}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//         >
//           Add Genre
//         </button>

//         {/* Selected Items */}
//         <div className="mt-4">
//           <h3 className="font-semibold mb-2">Selected Genres</h3>
//           {selections.map((sel, idx) => (
//             <div key={idx} className="flex justify-between items-center bg-gray-100 p-2 rounded mb-1">
//               <span>
//                 {sel.main} {sel.sub && `› ${sel.sub}`} › {sel.detail}
//               </span>
//               <button
//                 onClick={() =>
//                   setSelections(selections.filter((_, i) => i !== idx))
//                 }
//                 className="text-red-500 hover:underline"
//               >
//                 Remove ✕
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }







import { useState } from "react";
import genreData from "@/constants/dataGenres";

export default function GenreSelector() {
  const [selected, setSelected] = useState({});
  const [selections, setSelections] = useState([]);

  const mainCategories = Object.keys(genreData);

  const getSubCategories = () => {
    const value = genreData[selected.main];
    if (Array.isArray(value)) return [];
    return Object.keys(value || {});
  };

  const getDetails = () => {
    const value = genreData[selected.main];
    if (Array.isArray(value)) return value;
    return value?.[selected.sub] || [];
  };

  const handleAdd = () => {
    if (selected.main && selected.detail && selections.length < 3) {
      setSelections([...selections, { ...selected }]);
      setSelected({});
    }
  };

  const hasMaxSelections = selections.length >= 3;

  console.log("Selected genre array: ", selections);
  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Select Genre (Max 3)</h2>

      <div className="space-y-4">
        {/* Main Category */}
        <select
          className="w-full border p-2 rounded"
          value={selected.main || ""}
          onChange={(e) =>
            setSelected({
              main: e.target.value,
              sub: undefined,
              detail: undefined,
            })
          }
          disabled={hasMaxSelections}
        >
          <option value="">Select Main Genre</option>
          {mainCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Subcategory */}
        {selected.main && getSubCategories().length > 0 && (
          <select
            className="w-full border p-2 rounded"
            value={selected.sub || ""}
            onChange={(e) =>
              setSelected((prev) => ({
                ...prev,
                sub: e.target.value,
                detail: undefined,
              }))
            }
            disabled={hasMaxSelections}
          >
            <option value="">Select Subcategory</option>
            {getSubCategories().map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        )}

        {/* Detail */}
        {selected.main && getDetails().length > 0 && (
          <select
            className="w-full border p-2 rounded"
            value={selected.detail || ""}
            onChange={(e) =>
              setSelected((prev) => ({ ...prev, detail: e.target.value }))
            }
            disabled={hasMaxSelections}
          >
            <option value="">Select Specific</option>
            {getDetails().map((detail) => (
              <option key={detail} value={detail}>
                {detail}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={handleAdd}
          disabled={!selected.main || !selected.detail || hasMaxSelections}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Add Genre
        </button>

        {hasMaxSelections && (
          <p className="text-sm text-red-600 font-medium">
            You can only select up to 3 genres.
          </p>
        )}

        {/* Selected Genres */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Selected Genres</h3>
          {selections.map((sel, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-gray-100 p-2 rounded mb-1"
            >
              <span>
                {sel.main} {sel.sub ? `› ${sel.sub}` : ""} › {sel.detail}
              </span>
              <button
                onClick={() =>
                  setSelections(selections.filter((_, i) => i !== idx))
                }
                className="text-red-500 hover:underline"
              >
                Remove ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
