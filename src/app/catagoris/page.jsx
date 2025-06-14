"use client"

import { getAllCatagoris } from '@/Feature/prodectSlice'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

function page() {
    const router=useRouter()
    const dispatch = useDispatch()
    const { catagoris } = useSelector(state => state.product)
    useEffect(() => {
        dispatch(getAllCatagoris())
    }, [])
    return (
        <div>
            <button
                onClick={() => router.back()}
                className="px-4 py-2 rounded hover:bg-gray-100"
            >
                <MdArrowBackIosNew />
            </button>

            <div className=''>
                {catagoris.map(item => <p key={item} onClick={() => router.push(`/productbycategory/${(item)}`)} className='border-b-1 py-2'>{item.split("_").join(" ")}</p>)}
            </div>
        </div>
    )
}

export default page