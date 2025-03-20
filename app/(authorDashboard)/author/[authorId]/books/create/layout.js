import React from 'react'

const layout = ({ children }) => {
  return (
    <div className='ml-72 mr-8  mt-20 '>
      <h3>Add Ebook</h3>


<div className='flex w-[800px]'> 
<div className="flex justify-between items-center bg-gray-200 h-12 w-48 pr-2 rounded-md">
  <p className="flex-1 text-center">Book Details</p>
  <img
    src="/icons/check-mark.png"
    className="w-3 h-3"
  />
</div>
<div className="ml-2 flex justify-between items-center bg-gray-200 h-12 w-48 pr-2 rounded-md">
  <p className="flex-1 text-center">Book Content</p>
  <img
    src="/icons/check-mark.png"
    className="w-3 h-3"
  />
</div>
<div className="ml-2 flex justify-between items-center bg-gray-200 h-12 w-48 pr-2 rounded-md">
  <p className="flex-1 text-center">Book Pricing</p>
  <img
    src="/icons/check-mark.png"
    className="w-3 h-3"
  />
</div>
      </div>
      {children}
    </div>
  )
}

export default layout