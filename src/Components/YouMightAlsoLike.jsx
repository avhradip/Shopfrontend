import { fetchData, getAllProduct } from '@/Feature/prodectSlice';
import { Rating } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Ui/Loading';
import { cart, getwishlistFun, orders } from '@/Feature/userSlice';

function YouMightAlsoLike() {
    const router = useRouter()
    const { wishlistItems } = useSelector((state) => state.user);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getwishlistFun());
    }, []);

   
    
    

   

    return (
        <>
            {
                wishlistItems?.wishlistedItems?.length > 0 && (
                    <div>
                        <p className='text-center text-2xl md:text-4xl font-extrabold'>YOU MIGHT ALSO LIKE</p>

                        <div className="w-full max-w-7xl mx-auto p-4 py-10 flex gap-4 overflow-x-scroll example ">

                            {wishlistItems?.wishlistedItems?.map((item) => (
                                <div item={item} key={item?._id} className="w-60 flex-shrink-0" onClick={() => { router.push(`/detailspage/${item?.product?._id}`); scrollTo(0, 0) }}>
                                    <Image
                                        src={item?.product?.image[0]}
                                        alt={item?.product?.title}
                                        width={295}
                                        height={298}
                                        className="w-60 h-60 rounded-2xl"
                                    />
                                    <p className="text-sm mt-2 truncate whitespace-nowrap overflow-hidden">{item?.product?.title}</p>
                                    <Rating value={item?.product?.averageRating} readOnly />
                                    <p>${item?.product?.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )
                
        }
        </>
    )
}
export default YouMightAlsoLike