"use client"

import { GiSettingsKnobs } from "react-icons/gi";
import { IoIosArrowForward } from "react-icons/io";
import { MdKeyboardArrowUp } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

import { availableSizes, catagoris } from "../../constants";
import { Button } from "../../Components/Ui/button";
import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from "next/dynamic";
import { setFilter } from "../../Feature/stateSlice";
import { setCategoryId, setPrice_max, setPrice_min, setSize } from "../../Feature/filtersSlice"
import SelectColor from "../../Components/SelectColor";
import Loading from "../../Components/Ui/Loading";

const PriceFilter = dynamic(() => import("../../Components/PriceFilter"), {
    ssr: false,
})

function Page() {

    const router = useRouter();
    const dispatch = useDispatch();

    const { filter } = useSelector(state => state?.state);

    const { data, loading, error } = useSelector(state => state?.product);
    const { size2, categoryId, price_min, price_max } = useSelector(state => state?.filter);

    const filteredData = data?.filter((item) => {
        const categoryMatch = categoryId ? item?.category?.id === categoryId : true;
        const price = parseFloat(item?.price);
        const inPriceRange = (!isNaN(price) && price_min !== undefined && price_max !== undefined) ? price >= price_min && price <= price_max : true;
        return categoryMatch && inPriceRange;
    });
    const clearFilters = () => {
        dispatch(setPrice_min(0))
        dispatch(setPrice_max(300000))
        dispatch(setCategoryId(null))
    }

    const finalData = filteredData ?? data;




    useEffect(() => {
        dispatch(fetchData());
    }, []);

    if (loading) return <Loading />;
    if (error) return <p>Error: {error}</p>;

    return (
        
            <div className='flex flex-row gap-5 h-fit py-10 md:mx-20'>
                {/* Web */}
                <div className='sticky top-5 md:flex flex-col gap-5 border-2 rounded-2xl p-4 bg-white hidden text-[#807676]'>
                    <div className="flex justify-between items-center text-black">
                        <p className="text-[20px] font-semibold">Filters</p>
                        <div className="flex gap-2">
                            <GiSettingsKnobs className="text-[#807676] cursor-pointer" />
                            {filteredData.length > 0 && <RxCross1 className="text-[#807676] cursor-pointer" onClick={() => clearFilters()} />}
                        </div>
                    </div>
                    <hr />
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => {
                            dispatch(setCategoryId(1))
                        }}>
                            <p>T-Shirt</p>
                            <IoIosArrowForward />
                        </div>
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => {
                            dispatch(setCategoryId(1))
                        }}>
                            <p>Shorts</p>
                            <IoIosArrowForward />
                        </div>
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => {
                            dispatch(setCategoryId(1))
                        }}>
                            <p>Shirts</p>
                            <IoIosArrowForward />
                        </div>
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => {
                            dispatch(setCategoryId(1))
                        }}>
                            <p>Hoodie</p>
                            <IoIosArrowForward />
                        </div>
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => {
                            dispatch(setCategoryId(4))
                        }}>
                            <p>Shoes</p>
                            <IoIosArrowForward />
                        </div>
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => {
                            dispatch(setCategoryId(2))
                        }}>
                            <p>Electronics</p>
                            <IoIosArrowForward />
                        </div>
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => {
                            dispatch(setCategoryId(3))
                        }}>
                            <p>Furniture</p>
                            <IoIosArrowForward />
                        </div>
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => {
                            dispatch(setCategoryId(5))
                        }}>
                            <p>Miscellaneous</p>
                            <IoIosArrowForward />
                        </div>
                    </div>
                    <hr />
                    <PriceFilter />
                    <hr />
                    <div className=" rounded-lg flex flex-col gap-2">
                        <div className="flex justify-between items-center text-black">
                            <p className="text-[20px] font-semibold">Colors</p>
                            <MdKeyboardArrowUp />
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <SelectColor />
                        </div>
                    </div>
                    <hr />
                    <div>
                        <div className="flex justify-between items-center text-black">
                            <p className="text-[20px] font-semibold">Size</p>
                            <MdKeyboardArrowUp />
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {availableSizes.map((size) => (
                                <button
                                    onClick={() => dispatch(setSize(size))}
                                    key={size}
                                    className={`px-4 py-2 rounded-full text-[10px] border ${size === size2 ? 'bg-black text-white' : 'border-2'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center text-black">
                            <p className="text-[20px] font-semibold">Dress Style</p>
                            <MdKeyboardArrowUp />
                        </div>
                        <div>
                            <div className="flex justify-between items-center cursor-pointer">
                                <p>Casual</p>
                                <IoIosArrowForward />
                            </div>
                            <div className="flex justify-between items-center cursor-pointer">
                                <p>Formal</p>
                                <IoIosArrowForward />
                            </div>
                            <div className="flex justify-between items-center cursor-pointer">
                                <p>Party</p>
                                <IoIosArrowForward />
                            </div>
                            <div className="flex justify-between items-center cursor-pointer">
                                <p>Gym</p>
                                <IoIosArrowForward />
                            </div>
                        </div>
                    </div>
                    <Button className={`rounded-3xl`}>Apply Filter</Button>
                </div>
                {/* Product */}
                <div>
                    <div className="md:hidden flex justify-between items-center py-3 px-1 md:px-0 w-screen">
                        <p className="text-xl font-bold">Shop</p>
                        <GiSettingsKnobs className="text-[#807676] cursor-pointer my-2" onClick={() => dispatch(setFilter())} />
                    </div>
                    <div className='flex flex-wrap justify-evenly overflow-y-auto mx-3 example' style={{ maxHeight: 'calc(100vh - 40px)' }}>

                        {finalData?.slice(0, 36)?.map(item => (
                            <div key={item?.id} className='w-40 h-55 cursor-pointer' onClick={() => router.push(`/detailspage/${item?.id}`)}>
                                <img src={item?.images[0]} alt={item.title} width={200} height={200} className='rounded-2xl' />
                                <p className='text-[10px]'>{item?.title}</p>
                                <Rating value={Math.random() * 2 + 2} size='small' readOnly />
                                <p className='text-[10px]'>${item?.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Mobile */}
                <div
                    className={`fixed inset-0 z-40 flex items-end justify-center bg-black bg-opacity-40 transition-opacity duration-300 ${filter ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    <div
                        className={`bg-white w-full md:max-w-xl md:rounded-2xl p-4 h-[90%] md:h-auto overflow-y-auto transform transition-all duration-500 ease-in-out rounded-t-2xl
                                     ${filter ? 'translate-y-10 opacity-100' : 'translate-y-full opacity-0'}`}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center text-black mb-3">
                            <p className="text-[20px] font-semibold">Filters</p>
                            <RxCross1
                                className="text-[#807676] cursor-pointer"
                                onClick={() => dispatch(setFilter())}
                            />
                        </div>

                        <hr className="mb-3" />

                        {/* Category Filter Options */}
                        <div className="flex flex-col gap-3">
                            {catagoris.map(({ label, id }) => (
                                <div
                                    key={label}
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() => dispatch(setCategoryId(id))}
                                >
                                    <p>{label}</p>
                                    <IoIosArrowForward />
                                </div>
                            ))}
                        </div>

                        <hr className="mb-3" />

                        <PriceFilter />

                        <hr className="my-3" />

                        {/* Color Filter */}
                        <div className="rounded-lg flex flex-col gap-2 mb-3">
                            <div className="flex justify-between items-center text-black">
                                <p className="text-[20px] font-semibold">Colors</p>
                                <MdKeyboardArrowUp />
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <SelectColor />
                            </div>
                        </div>

                        <hr className="my-3" />

                        {/* Size Filter */}
                        <div className="mb-3">
                            <div className="flex justify-between items-center text-black">
                                <p className="text-[20px] font-semibold">Size</p>
                                <MdKeyboardArrowUp />
                            </div>
                            <div className="flex flex-wrap gap-3 mt-2">
                                {availableSizes.map((size) => (
                                    <button key={size} className="px-4 py-2 rounded-full text-[10px] border">
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Dress Style */}
                        <div className="flex flex-col gap-3 mb-4">
                            <div className="flex justify-between items-center text-black">
                                <p className="text-[20px] font-semibold">Dress Style</p>
                                <MdKeyboardArrowUp />
                            </div>
                            {["Casual", "Formal", "Party", "Gym"].map((style) => (
                                <div key={style} className="flex justify-between items-center cursor-pointer">
                                    <p>{style}</p>
                                    <IoIosArrowForward />
                                </div>
                            ))}
                        </div>

                        <Button className="rounded-3xl w-full">Apply Filter</Button>
                    </div>
                </div>



            </div>
    );
}

export default Page;
