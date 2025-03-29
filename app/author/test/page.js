import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeBranch,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Test = () => {
  return (
    <div className="flex flex-col space-y-[6px]  items-start my-6 w-36 h-24 rounded-md shadow-lg bg-white">
      <div className="flex pl-1 py-[1.5px] pr-8 justify-center items-center space-x-[3px] ml-[5px] mt-2 hover:bg-slate-200 rounded-md cursor-pointer">
        {/* <img src="/images/merge.png" alt="Merge Books" className="h-3 w-3" />{" "} */}
        <FontAwesomeIcon
          icon={faCodeBranch}
          // size="sm"
          className="h-3 w-3"
        />
        <p className="text-sm">Merge Books</p>
      </div>
      <div className="flex pl-1 py-[1.5px] pr-2 justify-center items-center space-x-[3px] ml-[5px] mt-2 hover:bg-slate-200 rounded-md cursor-pointer">
        {/* <img
          src="/images/edit.png"
          alt="Edit Book Details"
          className="h-3 w-3"
        /> */}
        <FontAwesomeIcon
          icon={faPenToSquare}
          // size="sm"
          className="h-3 w-3"
        />
        <p className="text-sm">Edit Book Details</p>
      </div>
      <div className="flex justify-center items-center py-[1.5px] pl-1 space-x-[3px] ml-[5px] mt-2 pr-[43px] hover:bg-slate-200 rounded-md cursor-pointer">
        {/* <img src="/images/delete.png" alt="Delete Book" className="h-4 w-4" />{" "} */}
        <FontAwesomeIcon
          icon={faTrash}
          // size="sm"
          className="h-3 w-2"
        />
        <p className="text-sm">Delete Book</p>
      </div>
    </div>
  );
}

export default Test