"use client"

import Loading from '../../Components/Ui/Loading';
import { orders } from '../../Feature/userSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

function Page() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false);
  const { ordersList,loading } = useSelector((state) => state.user)

  useEffect(() => {
    setIsClient(true)
    dispatch(orders())
  }, []);

  if (!isClient) {
    return null;
  }

  console.log(ordersList?.orders);
  const steps = [
    { key: "pending", label: "Pending" },
    { key: "processing", label: "Processing" },
    { key: "shipped", label: "Shipped" },
    { key: "delivered", label: "Delivered" },
  ];

  const getStepStatus = (currentStatus, stepKey) => {
    const order = ["pending", "processing", "shipped", "delivered"];
    const currentIdx = order.indexOf(currentStatus);
    const stepIdx = order.indexOf(stepKey);
    if (stepIdx < currentIdx) return "completed";
    if (stepIdx === currentIdx) return "active";
    return "upcoming";
  };

  return (
    <div>
      <div className='flex'>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded hover:bg-gray-100"
        >
          <MdArrowBackIosNew />
        </button>
        <p className='text-2xl font-extrabold'>Orders</p>
      </div>

      <div className="flex flex-wrap gap-6 justify-center md:mx-20 mx-4 py-6">
        
        {loading ? <Loading/> :
          ordersList?.orders && ordersList?.orders?.length > 0 ? (
          ordersList?.orders?.map((order) => (
            
            <div
              key={order._id}
              className="w-full sm:w-[300px] border rounded-3xl shadow-md p-4 bg-white hover:shadow-lg transition"
            >
              
              <div className="flex flex-col items-center">
                {/* Order Tracking Line */}
                <div className='flex gap-2 '>
                  {/* {order.status} */}
                  

                  {/* Products List */}
                  <div className='flex flex-wrap justify-center gap-3'>
                    {order?.products.map((item, idx) => (
                      <div key={item?._id} className="text-center">
                        <img
                          src={item?.product?.image?.[0] || "/placeholder.png"}
                          alt={item?.product?.name}
                          className="w-24 h-24 object-cover rounded-xl border"
                        />
                        <h3 className="text-sm font-semibold mt-2">{item?.product?.name}</h3>
                        <p className="text-gray-500 text-xs">Qty: {item?.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <p className="text-xl font-bold text-green-600 mt-4">
                  Total: ₹{order.totalPrice.toFixed(2)}
                </p>

                <div className="flex justify-between items-center w-full mt-4 text-sm text-gray-600">
                  <span className="bg-gray-200 px-2 py-1 rounded-full text-xs capitalize">
                    {order?.status}
                  </span>
                  <span className="text-xs">
                    {new Date(order?.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Payment & Address */}
                <div className="mt-3 text-sm text-gray-500 text-left w-full">
                  <p>
                    Payment: <span className="font-medium text-gray-700">{order?.paymentMethod}</span>
                  </p>
                  <p className="mt-1">
                    Address:{" "}
                    <span className="font-medium text-gray-700">
                      {order?.address?.street}, {order?.address?.city}, {order?.address?.state} - {order?.address?.zip}, {order?.address?.country}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full h-screen">You have no orders.</p>
        )}
      </div>
    </div>

  )
}

export default Page;
