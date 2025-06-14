"use client"

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBinFill } from "react-icons/ri";
import { MdArrowBackIosNew } from "react-icons/md";
import { GoTag } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import { useRouter } from 'next/navigation';
import { cart, editCart, removeFromCart } from '../../Feature/userSlice';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../src/Components/Ui/select';
import Loading from '../../../src/Components/Ui/Loading';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';

function page() {
  const { cartData, loading } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const router = useRouter()

  

  useEffect(() => {
    dispatch(cart());
  }, [dispatch]);

  const subtotal = Array.isArray(cartData)
    ? cartData.reduce((acc, cur) => acc + (parseFloat(cur?.product?.price || 0) * cur?.quantity), 0)
    : 0;

  const discount = Math.round(subtotal * 0.2);
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  const removeItem = async (id) => {
    toast.promise(
      dispatch(removeFromCart(id)).unwrap().then(() => dispatch(cart())),
      {
        loading: 'Removing...',
        success: <b>Item removed</b>,
        error: <b>Failed to remove item!</b>,
      }
    );
  };



  return (
    <div className=' '>
      <button
        onClick={() => router.back()}
        className="px-4 py-2 rounded hover:bg-gray-100"
      >
        <MdArrowBackIosNew />
      </button>
      <h1 className='text-2xl md:text-4xl font-extrabold mb-8'>YOUR CART</h1>
      <div className='min-h-screen px-4 md:px-20 py-10'>



        {loading ? (<Loading />) :
          !cartData ? (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100, damping: 12 }}
                className="text-gray-400 mb-4"
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <FaShoppingCart size={80} />
                </motion.div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl font-semibold"
              >
                Your Cart is Empty 🛒
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-500 mt-2 text-sm"
              >
                Looks like you haven’t added any items yet.
              </motion.p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/newarrivals')}
                className="mt-6 px-6 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition"
              >
                Continue Shopping
              </motion.button>
            </div>
          ) : (
            <div className='flex flex-col lg:flex-row gap-10'>

              <div className='flex flex-col gap-6 w-full lg:w-2/3'>
                  {cartData.length > 0 && cartData?.map((item, index) => (
                  <div key={index} className='flex flex-col md:flex-row gap-4 items-center p-4 border rounded-xl shadow-sm bg-white'>
                    <img
                        src={item?.product?.image[0] || "/fallback.png"}
                      alt={item?.title || "Product"}
                      width={120}
                      height={120}
                      className='rounded-xl object-cover'
                    />
                    <div className='flex flex-col gap-1 w-full'>
                      <div className='flex items-center justify-between'>
                        <p className='font-semibold text-lg'>{item?.product?.title}</p>
                        <button onClick={() => removeItem(item._id)} className='text-red-500'>
                          <RiDeleteBinFill size={20} />
                        </button>
                      </div>
                      <p className='text-sm text-gray-500'>Size: <span className='uppercase'>{item?.size}</span></p>
                      <p className='text-sm text-gray-500'>Color: <span className='capitalize'>{item?.color}</span></p>
                      <div className='flex items-center justify-between mt-2'>
                        <p className='text-green-600 font-semibold text-lg'>${item?.product?.price * item?.quantity}</p>

                        <div>
                          <Select
                            onValueChange={(value) => {
                              const newQty = parseInt(value);
                              if (newQty >= 1) {
                                dispatch(editCart({ id: item?.product?._id, quantity: newQty }))
                                  .then(() => {
                                    dispatch(cart())
                                    toast.success('updated successfully!');
                                  })
                                  .catch(() => {
                                    toast.error('Failed to update quantity.');
                                  })
                              }
                            }}
                          >
                            <SelectTrigger className="w-[100px]">
                              <SelectValue placeholder={String(item?.quantity)} />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6].map((num) => (
                                <SelectItem key={num} value={String(num)}>
                                  {num}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}
              </div>


              <div className='w-full lg:w-1/3 border rounded-xl p-6 bg-white shadow-sm'>
                <h2 className='text-lg font-medium mb-6'>Order Summary</h2>
                <div className='mb-6'>
                  <div className='flex justify-between mb-3 text-sm'>
                    <p className='text-gray-600 text-[15px]'>Subtotal</p>
                    <p className='text-black text-[15px] font-semibold'>${subtotal}</p>
                  </div>
                  <div className='flex justify-between mb-3 text-sm'>
                    <p className='text-gray-600 text-[15px]'>Discount (-20%)</p>
                    <p className='text-red-500 text-[15px]'>-${discount}</p>
                  </div>
                  <div className='flex justify-between mb-3 text-sm'>
                    <p className='text-gray-600 text-[15px]'>Delivery Fee</p>
                    <p className='text-gray-600 text-[15px]'>${deliveryFee}</p>
                  </div>
                  <hr className='my-4' />
                  <div className='flex justify-between text-sm mb-6'>
                    <p>Total</p>
                    <p className='font-semibold'>${total}</p>
                  </div>
                </div>

                <div className='flex flex-wrap gap-3 items-center justify-between mb-6'>
                  <div className='flex gap-2 items-center bg-gray-200 placeholder-gray-400 py-3 px-4 w-full rounded-full'>
                    <GoTag className='text-gray-400' />
                    <input
                      type="text"
                      placeholder='Add promo code'
                      className='focus:outline-none'
                    />
                  </div>
                  <button className='bg-black text-white w-full py-3 rounded-full cursor-pointer'>
                    Apply
                  </button>
                </div>

                <div className='flex items-center justify-center gap-1 bg-black text-white py-3 rounded-full cursor-pointer' onClick={() => router.push('/checkout')}>
                  <p>Go to Checkout</p> <GoArrowRight className='text-2xl' />
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default page
