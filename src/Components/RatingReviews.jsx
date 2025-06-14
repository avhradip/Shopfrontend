"use client"
import { Rating, ratingClasses, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { VscSettings } from "react-icons/vsc";
import { Button } from './Ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { setInput, setShowAll } from '../Feature/stateSlice';
import { review } from '@/constants';
import { formatDistanceToNow } from 'date-fns'
import { addReview, deletereview, getReviewByProductId, orders } from '../Feature/userSlice';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from "../Components/Ui/dialog";
import toast from 'react-hot-toast';
import { IoMdContact } from 'react-icons/io';
import { Avatar, AvatarFallback, AvatarImage } from './Ui/avatar';

function RatingReviews({ id }) {

    const { user, ordersList, review } = useSelector((state) => state.user)
    const { showAll, inp } = useSelector(state => state.state)
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)



    const isMatch = Array.isArray(ordersList?.orders) &&
        ordersList.orders.some(order =>
            order.userId?.toString() === user?._id?.toString() &&
            order.products?.some(p => p.product?._id?.toString() === id?.toString())
        )


    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    useEffect(() => {
        dispatch(orders())
        dispatch(getReviewByProductId(id))
    }, [dispatch, id])

    const deleteReviewFun = async (reviewId, productId) => {
        toast.promise(
            dispatch(deletereview(reviewId))
                .unwrap()
                .then(() => dispatch(getReviewByProductId(productId))),
            {
                loading: 'Deleting review...',
                success: <b>Review deleted</b>,
                error: <b>Failed to delete review!</b>,
            }
        );
    };


    const addReviewFun = ({ comment, id, rating }) => {
        toast.promise(
            dispatch(addReview({ comment, id, rating: rating }))
                .unwrap()
                .then(() => dispatch(getReviewByProductId(id))),
            {
                loading: 'Adding...',
                success: <b>Review added</b>,
                error: <b>Failed to add review!</b>,
            }
        );
    };


    return (
        <div className='flex flex-col'>
            <div className='flex items-center justify-between py-2'>
                <div>
                    All Reviews {`(${review?.reviews?.length || 0})`}
                </div>
                {isMatch &&
                    <div className='flex items-center gap-1 md:gap-3'>
                        <VscSettings />
                        <Button className='rounded-3xl' onClick={() => dispatch(setInput(true))}>Write a Review</Button>
                    </div>
                }
            </div>
            {inp && (
                <div className='flex flex-col gap-3'>
                    <div className='flex gap-3'>
                        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} className='bg-gray-200 border-2 rounded-2xl outline-0 w-2xl px-2 py-1 ' spellCheck='false' />
                        <Button onClick={() => addReviewFun({ comment, id, rating })}>
                            Post
                        </Button>
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">Rate this product:</h3>
                        <Rating
                            name="product-rating"
                            value={rating}
                            onChange={handleRatingChange}
                        />
                        <p className="mt-2 text-gray-700">You rated: {rating}</p>
                    </div>
                </div>
            )}
            
            <div className="flex flex-row gap-10 flex-wrap py-2 items-center justify-center">
                {review?.reviews?.length === 0 ? (
                    <p className="text-gray-500">No reviews yet.</p>
                ) : (
                    review?.reviews?.map(item => (
                        <div
                            key={item?._id}
                            className="max-w-[500px] min-w-[280px] min-h-[200px] max-h-[400px] p-4 border-2 rounded-2xl"
                        >

                            <div className="flex items-center justify-between">
                                <Avatar>
                                    <AvatarImage src={item?.user?.profilePicture} alt="User profile" />
                                    <AvatarFallback>
                                        <IoMdContact className="text-2xl" />
                                    </AvatarFallback>
                                </Avatar>

                                {item?.user?._id === user?._id &&
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button>
                                                <BsThreeDots size={20} className="text-gray-500" />
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>Delete this review?</DialogTitle>
                                                <DialogDescription>
                                                    Are you sure you want to delete this review? This action is permanent and cannot be undone.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter className="sm:justify-end">
                                                <DialogClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DialogClose>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => deleteReviewFun(item._id, item.product)}
                                                >
                                                    Delete
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                }
                            </div>

                            <p className="font-semibold">{item?.user?.name || "rayan"}</p>
                            <Rating value={item?.rating} readOnly size="small" />
                            <p className="italic">"{item?.comment}"</p>
                            <p className="text-xs text-gray-500">Posted {formatDistanceToNow(new Date(item?.createdAt ?? 122), { addSuffix: true })}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default RatingReviews