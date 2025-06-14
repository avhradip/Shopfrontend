'use client'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from './Ui/button'
import Image from 'next/image'
import { getAllProduct } from '../Feature/prodectSlice'
import { Rating } from '@mui/material'
import { useRouter } from 'next/navigation'
import Loading from './Ui/Loading'

function NewArrivals() {
    const router = useRouter()
    const dispatch = useDispatch()
    const { data, loading } = useSelector((state) => state.product)

    useEffect(() => {
        dispatch(getAllProduct())
    }, [dispatch])

    return (
        <div className='flex flex-col items-center justify-center py-10 mx-4 md:mx-10 gap-6'>
            <p className='text-2xl md:text-3xl font-bold'>NEW ARRIVALS</p>

            <div className="w-full max-w-7xl mx-auto px-2 py-4 flex gap-4 overflow-x-auto scrollbar-none example">
                {loading ? (
                    <div className='w-full flex justify-center'>
                        <Loading className='animate-spin w-10 h-10 text-gray-500' />
                    </div>
                ) : (
                    data?.products?.slice(-5).reverse().map((item) => (
                        <div
                            key={item?._id}
                            className="w-60 flex-shrink-0 cursor-pointer"
                            onClick={() => router.push(`/detailspage/${item?._id}`)}
                        >
                            <Image
                                src={item?.image?.[0] || "https://via.placeholder.com/295x298.png?text=No+Image"}
                                alt={item?.title}
                                width={295}
                                height={298}
                                className="w-60 h-60 rounded-2xl object-cover aspect-square"
                            />
                            <p className="text-sm mt-2 truncate">{item?.title}</p>
                            <Rating value={item?.averageRating || 0} precision={0.5} readOnly />
                            <p className="text-base font-medium">${item?.price}</p>
                        </div>
                    ))
                )}
            </div>

            <Button
                variant="outline"
                className="text-[15px] font-light rounded-3xl md:w-40 w-full h-10"
                onClick={() => router.push('/newarrivals')}
            >
                View All
            </Button>
        </div>
    )
}

export default NewArrivals
