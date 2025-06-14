'use client'
import { getProductByCatagori } from '../../../Feature/prodectSlice'
import { Rating } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

function CategoryPage() {
    const router = useRouter()
    const { slug } = useParams()
    const dispatch = useDispatch()
    const [products, setProducts] = useState([])
    const { productByCatagoris } = useSelector((state) => state.product)

    useEffect(() => {
        dispatch(getProductByCatagori(slug))
    }, [slug])

    return (
        <div className="p-4">
            <button
                onClick={() => router.back()}
                className="px-4 py-2 rounded hover:bg-gray-100"
            >
                <MdArrowBackIosNew />
            </button>
            <h1 className="text-[14px] font-semibold mb-4">Category: <span className='font-light text-[12px]'>{slug.split("_").join(" ")}</span></h1>
            <div className="flex flex-wrap gap-10 items-center justify-center md:mx-8">
                {productByCatagoris?.length > 0 ? (
                    productByCatagoris.map(item => (
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
                                className='rounded-2xl object-cover w-full h-40'
                            />
                            <p className='text-[10px] truncate'>{item?.title}</p>
                            <Rating value={item.averageRating} size='small' readOnly />
                            <p className='text-[10px]'>${item?.price}</p>
                        </div>
                    ))
                ) : (
                    <p className='text-gray-500 text-sm'>No products available.</p>
                )}
            </div>
        </div>
    )
}

export default CategoryPage
