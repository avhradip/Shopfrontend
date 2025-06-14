"use client";

import { Rating } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { FiMinus } from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ProductDetails from '../../../Components/ProductDetails';
import RatingReviews from '../../../Components/RatingReviews';
import Faqs from '../../../Components/Faqs';
import { setProduct, setReviews, setFAQs } from '../../../Feature/stateSlice';
import YouMightAlsoLike from '../../../Components/YouMightAlsoLike';
import Loading from '../../../Components/Ui/Loading';
import { getProductById } from '../../../Feature/prodectSlice';
import { addToCart, cart, getReviewByProductId, getwishlistFun, orders, wishlistFun } from '../../../Feature/userSlice';
import toast from 'react-hot-toast';
import { MdArrowBackIosNew } from 'react-icons/md';

function ProductPage() {
    const router = useRouter()
    const { id } = useParams();
    const [size, setSize] = useState("")
    const [color, setColor] = useState("")
    const [img, setImg] = useState(0)

    const dispatch = useDispatch()

    const { reviews, FAQs, products } = useSelector(state => state.state)
    const { product, loading } = useSelector(state => state.product)
    const { wishlistItems, user, cartData, review } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getProductById(id))
        dispatch(orders())
        dispatch(getwishlistFun())
        dispatch(getReviewByProductId(id))
    }, [id])


    const itsIusersCart = cartData?.find(
        item => item?.userId?._id === user._id && item?.product?._id === id
    )
    const [qty, setQty] = useState(itsIusersCart ? itsIusersCart.quantity : 1)




    const userWishlisted = wishlistItems.wishlistedItems?.some((item) =>
        item.userId._id === user._id && item.product._id === id
    )




    const handleAddToCart = async ({ id, quantity, size, color }) => {
        if (!size) return toast.error('Please select a size');
        if (!color) return toast.error('Please select a color');

        toast.promise(
            dispatch(addToCart({ id, quantity, size, color }))
                .unwrap()
                .then((res) => {
                    if (res?.success) {
                        setSize('');
                        setColor('');
                        setQty(1);
                        dispatch(cart());
                    } else {
                        throw new Error(res?.message || 'Add to cart failed');
                    }
                }),
            {
                loading: 'Adding to cart...',
                success: <b>Added to cart</b>,
                error: <b>Failed to add to cart.</b>,
            }
        );
    };

    const wishlist = (id) => {
        
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




    if (!product) return <Loading />

    return (
        <div>
            <button
                onClick={() => router.back()}
                className="px-4 py-2 rounded hover:bg-gray-100"
            >
                <MdArrowBackIosNew />
            </button>
            {loading ? <Loading /> :
                <div className="md:mx-20 py-5 px-3">
                    <div className='md:p-6 flex flex-wrap items-center justify-center gap-10'>
                        <div className='flex flex-col md:flex-row md:gap-5 gap-0'>

                            <div className='hidden md:flex flex-col gap-5'>
                                {product?.product?.image && product?.product?.image?.map((i, index) => (
                                    <img
                                        key={index}
                                        src={i || 'https://miro.medium.com/v2/resize:fit:882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif'}
                                        alt='img'
                                        width={70}
                                        height={70}
                                        className={`rounded-xl cursor-pointer border object-cover aspect-square ${img === index ? 'border-black' : 'border-transparent'}`}
                                        onClick={() => setImg(index)}
                                    />
                                ))}
                            </div>

                            <div className='flex justify-center'>
                                {
                                    product?.product?.image &&

                                    <img
                                        src={product?.product?.image[img] || 'https://miro.medium.com/v2/resize:fit:882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif'}
                                        alt='img'

                                        className='rounded-2xl h-[350px] w-[350px] object-cover shadow aspect-square'
                                    />
                                }
                            </div>

                            <div className='flex flex-wrap md:hidden justify-center md:gap-5 gap-0 mt-4'>
                                {product?.product?.image && product?.product?.image.map((i, index) => (
                                    <img
                                        key={index}
                                        src={i || 'https://miro.medium.com/v2/resize:fit:882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif'}
                                        alt='img'
                                        width={80}
                                        height={80}
                                        className={`rounded-xl cursor-pointer object-cover aspect-square border-2 ${img === index ? 'border-black' : 'border-transparent'}`}
                                        onClick={() => setImg(index)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className=''>
                            <h1 className="md:text-2xl text-[15px] font-bold mb-4">{product?.product?.title}</h1>
                            <div className='flex items-center text-xs text-[15px]'>
                                <Rating value={product?.product?.averageRating ?? 0} readOnly />
                                <p>{product?.averageRating}/{review?.reviews?.length}</p>
                            </div>

                            <div className='flex gap-3'>
                                <p className="font-semibold md:text-lg text-[15px]">${product?.product?.price}</p>
                                <p className="font-semibold md:text-lg text-[15px] text-gray-400 line-through">${product?.product?.price * 1.5}</p>
                            </div>

                            <p className="mb-2 text-gray-700 text-[10px]">{product?.product?.description}</p>
                            <hr />
                            <div className="mb-6">
                                <p className="font-semibold mb-2 mt-4">Select Color</p>
                                <div className="flex gap-3">
                                    {product?.product?.color?.map((c) => (
                                        <button
                                            key={c}
                                            onClick={() => setColor(c)}
                                            className={`px-4 py-3 rounded-full text-[10px] border bg-gray-100 ${c === color ? 'border-black' : ' border-white'}`}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <hr />
                            <div className="mb-6">
                                <p className="font-semibold mb-2 mt-4">Select Size</p>
                                <div className="flex flex-wrap  gap-3">
                                    {product?.product?.size?.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setSize(s)}
                                            className={`w-fit h-fit py-2 px-3 rounded-full text-[10px] border bg-gray-100 ${s === size ? 'border-black' : ' border-white'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <hr />
                            <div className='flex flex-wrap gap-3 items-center  mt-4'>
                                <div className='flex justify-between items-center px-2 rounded-3xl bg-gray-100 w-28 md:w-32 h-10 text-xs md:text-xl'>
                                    <button className='text-[20px]' onClick={() => setQty(prev => prev - 1)} disabled={qty <= 1}><FiMinus /></button>
                                    <p className='text-[15px]'>
                                        {qty}
                                    </p>
                                    <button className='text-[20px]' onClick={() => setQty(prev => prev + 1)}><HiOutlinePlusSmall /></button>
                                </div>
                                <button
                                    className="bg-black text-white px-12 md:px-32 py-3 rounded-3xl hover:bg-gray-800 transition text-xs md:text-[15px] disabled:bg-gray-500"
                                    onClick={() => handleAddToCart({ id: product?.product?._id, quantity: qty, size, color })}
                                    disabled={!size || !color}
                                >
                                    Add to Cart
                                </button>

                                <button
                                    onClick={() => wishlist(id)}
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
                    <div>
                        <div className='flex justify-evenly md:p-3 p-1 mt-4'>
                            <p className={`cursor-pointer md:text-[15px] text-[10px] ${products ? 'border-b-2 border-black' : 'text-gray-500'}`} onClick={() => dispatch(setProduct())}>Product Details</p>
                            <p className={`cursor-pointer md:text-[15px] text-[10px] ${reviews ? 'border-b-2 border-black' : 'text-gray-500'}`} onClick={() => dispatch(setReviews())}>Rating & Reviews</p>
                            <p className={`cursor-pointer md:text-[15px] text-[10px] ${FAQs ? 'border-b-2 border-black' : 'text-gray-500'}`} onClick={() => dispatch(setFAQs())}>FAQs</p>
                        </div>
                        <hr />
                        <div>
                            {products && (
                                <ProductDetails item={product?.product} />
                            )}
                            {reviews && (
                                <RatingReviews id={id} />
                            )}
                            {FAQs && (
                                <Faqs />
                            )}
                        </div>

                    </div>
                    <div className='mx-auto mt-10'>
                        <YouMightAlsoLike />
                    </div>
                </div>
            }
        </div>
    );
}

export default ProductPage;
