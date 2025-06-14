import React from 'react'

function ProductDetails({ item }) {

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-start">
        <p className="min-w-[100px] text-gray-600 font-medium">Title:</p>
        <p className="text-gray-800">{item?.title}</p>
      </div>
      <div className="flex gap-4 items-start">
        <p className="min-w-[100px] text-gray-600 font-medium">Brand:</p>
        <p className="text-gray-800">{item?.brand}</p>
      </div>
      <div className="flex gap-4 items-start">
        <p className="min-w-[100px] text-gray-600 font-medium">Category:</p>
        <p className="text-gray-800">{item?.category}</p>
      </div>
      <div className="flex gap-4 items-start">
        <p className="min-w-[100px] text-gray-600 font-medium">Description:</p>
        <p className="text-gray-800 whitespace-pre-line">{item?.description}</p>
      </div>
    </div>

  )
}

export default ProductDetails