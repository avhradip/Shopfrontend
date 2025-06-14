"use client"

import { getwishlistFun, wishlistFun } from '../../Feature/userSlice'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { MdArrowBackIosNew } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion';
import { FaHeartBroken } from 'react-icons/fa';

function page() {
  const { wishlistItems, loading, error, user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    dispatch(getwishlistFun())
  }, [])

  console.log(wishlistItems.wishlistedItems);


  const userWishlisted = wishlistItems.wishlistedItems?.some((item) =>
    item.userId._id === user._id
  )

  const wishlist = ({ id }) => {
    toast.promise(
      dispatch(wishlistFun(id)).unwrap().then((res) => {
        if (res?.success) {
          dispatch(getwishlistFun());
          return res.message;
        } else {
          throw new Error(res?.message || 'Add to wishlist failed');
        }
      }),
      {
        loading: 'Adding to wishlist...',
        success: (msg) => <b>{msg}</b>,
        error: (err) => <b>{err.message || 'Failed to add to wishlist.'}</b>,
      }
    );
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
        <p className='text-2xl md:text-2xl font-extrabold'>Whishlist</p>
      </div>
      <div className='flex flex-wrap justify-center gap-10 h-screen mt-10'>
        {wishlistItems?.wishlistedItems?.length > 0 ?
          wishlistItems?.wishlistedItems?.map(item => (
            <div key={item._id} className="w-60 h-fit flex-shrink-0 shadow-2xl rounded-xl" onClick={() => router.push(`/detailspage/${item?.product?._id}`)}>
              <img src={item?.product?.image[0]} alt={item?.product?.title} className='w-full h-60 aspect-square rounded-xl' />
              <div className='p-2'>
                <p className='truncate whitespace-nowrap overflow-hidden'>{item?.product?.title}</p>
                <div className='flex w-full justify-between items-center'>
                  <p>${item?.product?.price}</p>
                  <button
                    onClick={() => wishlist({ id: item?.product?._id })}
                    className={`p-2 rounded-full text-lg shadow transition-colors ${userWishlisted
                      ? "text-red-500"
                      : "text-gray-400 hover:text-red-400"
                      } bg-white hover:bg-gray-100`}
                  >
                    {userWishlisted ? <FaHeart /> : <FaRegHeart />}
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 100, damping: 10 }}
                className="text-red-400 mb-4"
              >
                <FaHeartBroken size={80} />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl font-semibold"
              >
                Your Wishlist is Empty 💔
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-500 mt-2 text-sm"
              >
                Looks like you haven't added anything yet.
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
          )
        }
      </div>
    </div>
  )
}

export default page