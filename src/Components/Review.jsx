import React from 'react'
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import Rating from '@mui/material/Rating';
import Image from 'next/image';

function Review() {

    const reviews = [
        {
            id: Date.now() + 1,
            name: "John Doe",
            comment:
                "The casual wear collection is absolutely top-notch. I was impressed with the quality of the fabric—it's soft, breathable, and perfect for everyday use. The sizing was accurate, and the fit felt tailored. I’ve already ordered two more colors!",
            rating: 5,
            date: "2025-03-10",
        },
        {
            id: Date.now() + 2,
            name: "Emily Smith",
            comment:
                "I bought a couple of formal outfits for my upcoming work events and I must say, I was pleasantly surprised. The design is classy yet modern, and the materials feel premium. Shipping was quick too. Only wish there were more color options.",
            rating: 4,
            date: "2025-03-22",
        },
        {
            id: Date.now() + 3,
            name: "David Lee",
            comment:
                "The party wear section blew me away. The outfit I picked turned out to be a showstopper at my friend’s birthday bash. Loved the vibrant colors, the shimmer detailing, and the way it hugged my body without being uncomfortable. Highly recommend this line!",
            rating: 5,
            date: "2025-04-01",
        },
        {
            id: Date.now() + 4,
            name: "Sophia Patel",
            comment:
                "I got some gym wear and while the fit and comfort were on point, I felt like the design could use a bit more flair. That said, it’s durable, stretchy, and doesn’t feel cheap at all. Worth it for everyday workouts.",
            rating: 3,
            date: "2025-03-27",
        },
        {
            id: Date.now() + 5,
            name: "Ankit Mehra",
            comment:
                "First time ordering from this site and I’m impressed! The clothes arrived earlier than expected and were packaged beautifully. I tried on the items and they fit like a glove. Fabric feels expensive and breathable. Will definitely be shopping again soon.",
            rating: 4,
            date: "2025-04-05",
        },
    ];

    function move(direction) {
        console.log(direction);
        const container = document.querySelector('#review-scroll-container');
        if (container) {
            container.scrollBy({
                left: direction === 'left' ? -400 : 400,
                behavior: 'smooth',
            });
        }
    }


    return (
        <div className='md:mx-20 mx-3 py-4'>
            <div className='flex justify-between items-center'>
                <div>
                    <p className='text-2xl md:text-3xl font-bold'>OUR HAPPY CUSTOMERS</p>
                </div>
                <div className='flex items-center gap-5'>
                    <LuArrowLeft onClick={() => move('left')} />
                    <LuArrowRight onClick={() => move('right')} />
                </div>
            </div>
            <div id="review-scroll-container" className='flex gap-10 overflow-x-scroll example'>
                {reviews.map((item) => (
                    <div
                        key={item?.id}
                        className=" w-[330px] md:w-[400px] h-[230px] bg-white p-8 rounded-lg border-1 shrink-0 mt-5"
                    >
                        <Rating name="read-only" value={item?.rating} precision={0.5} readOnly size='size-small' />
                        <div className="flex items-center gap-2 mt-2">
                            <p className="font-semibold">{item?.name}.</p>
                            <Image src="/Frame.png" alt="Frame" width={20} height={20} />
                        </div>
                        <p className="md:text-[20px] text-10px mt-2 text-gray-600 line-clamp-4">{item?.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Review