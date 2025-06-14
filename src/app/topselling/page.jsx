"use client"
import Loading from '../../Components/Ui/Loading'
import { getAllProduct } from '../../Feature/prodectSlice'
import { Rating } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

function page() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { data, loading, error } = useSelector(state => state?.product)
  useEffect(() => {
    dispatch(getAllProduct())
  }, [])

  if (loading) return <Loading />
  if (error) return <p>{error}</p>
  return (
    <div>
      <button
        onClick={() => router.back()}
        className="px-4 py-2 rounded hover:bg-gray-100"
      >
        <MdArrowBackIosNew />
      </button>

      <div className='md:mx-20 py-5 flex flex-col items-center justify-center'>
        <p className='text-2xl md:text-3xl font-bold text-center'>TOP SELLING</p>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 py-5'>
          {data?.products?.length > 0 ? (
            [...data.products]
              .sort(() => Math.random() - 0.5)
              .slice(0, 6)
              .map(item => (
                <div
                  key={item?._id}
                  className='w-48 h-[240px] cursor-pointer hover:shadow-2xl p-4 rounded-[10px] '
                  onClick={() => router.push(`/detailspage/${item?._id}`)}
                >
                  <img
                    src={item?.image?.[0]}
                    alt={item?.title}
                    width={200}
                    height={200}
                    className='rounded-2xl object-cover w-40 h-40'
                  />
                  <p className='text-[10px] truncate'>{item?.title}</p>
                  <Rating value={item?.averageRating} size='small' readOnly />
                  <p className='text-[10px]'>${item?.price}</p>
                </div>
              ))
          ) : (
            <p className='text-gray-500 text-sm'>No products available.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default page