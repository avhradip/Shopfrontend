"use client"

import { getAllProduct } from '../../Feature/prodectSlice'
import { Rating } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

function Page() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state?.product);

    useEffect(() => {
        dispatch(getAllProduct());
    }, []);

    let filtered = data?.products.filter((item) => item?.category?.toLowerCase().includes("formal"))

    return (
        <div>
            <button
                onClick={() => router.back()}
                className="px-4 py-2 rounded hover:bg-gray-100"
            >
                <MdArrowBackIosNew />
            </button>

            <div className='md:mx-20 py-5 flex flex-col items-center justify-center'>
                <p className='text-2xl md:text-3xl font-bold text-center'>FORMAL OUTFITS</p>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 py-5'>
                    {filtered?.length > 0 ? (
                        filtered.map(item => (
                            <div
                                key={item?._id}
                                className='w-40 h-[220px] cursor-pointer'
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
                        <p className='text-gray-500 text-sm col-span-full text-center'>No products available.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Page;
