import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

function Browse() {
    const router=useRouter()
    const categories = [
        { title: "Casual", src: "/image4.png", width: 407 },
        { title: "Formal", src: "/image3.png", width: 684 },
        { title: "Boy", src: "/image2.png", width: 684 },
        { title: "Girl", src: "/image1.png", width: 407 },
    ];

    const handleNavigate = (title) => {
        const path = `/${title.toLowerCase()}`;
        router.push(path);
    };

    return (
        <div className='p-[5%]'>
            <div className="bg-gray-100 py-16 px-4 md:px-24 rounded-3xl">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
                    BROWSE BY DRESS STYLE
                </h2>

                <div className="flex flex-wrap justify-center gap-8">
                    {categories.map((cat, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleNavigate(cat.title)}
                            className="relative md:h-[300px] h-[200px] overflow-hidden rounded-2xl shadow-md group hover:scale-[1.02] transition-transform duration-300"
                            style={{ width: `${cat.width}px` }}
                        >
                            <Image
                                src={cat.src}
                                alt={cat.title}
                                layout="fill"
                                objectFit="cover"
                                className={`rounded-xl content-center`}
                            />
                            <p className={`absolute top-2 left-3 px-3 py-1 rounded-md font-semibold ${cat.title === "Formal" ? "text-white" : "text-black"} md:text-[20px] text-[15px] z-10`}>
                                {cat.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Browse;
