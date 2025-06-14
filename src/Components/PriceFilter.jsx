"use client"; // Add this if using React hooks in a client-side component

import { setPrice_max, setPrice_min } from "@/Feature/filtersSlice";
import React from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

function PriceFilter({ priceOpen, setPriceOpen }) {
    const dispatch = useDispatch();
    const { price_min, price_max } = useSelector(state => state?.filter || {});

    const handleMinChange = (e) => {
        const value = Number(e.target.value);
        if (!isNaN(value)) dispatch(setPrice_min(value));
    };

    const handleMaxChange = (e) => {
        const value = Number(e.target.value);
        if (!isNaN(value)) dispatch(setPrice_max(value));
    };

    return (
        <div className="rounded-lg flex flex-col gap-2">
            <div
                className="flex justify-between items-center text-black cursor-pointer"
                onClick={() => setPriceOpen(!priceOpen)}
            >
                <p className="text-[20px] font-semibold">Price</p>
                {priceOpen ? (
                    <MdKeyboardArrowUp size={22} />
                ) : (
                    <MdKeyboardArrowDown size={22} />
                )}
            </div>

            <div className={`flex items-center gap-4 mt-2 ${priceOpen ? "flex" : "hidden"}`}>
                <div className="flex items-center gap-1">
                    $<input
                        type="text"
                        value={price_min}
                        onChange={handleMinChange}
                        className="bg-gray-300 w-20 outline-0 border border-gray-400 rounded-2xl px-2 py-1"
                    />
                </div>
                <div className="flex items-center gap-1">
                    $<input
                        type="text"
                        value={price_max}
                        onChange={handleMaxChange}
                        className="bg-gray-300 w-20 outline-0 border border-gray-400 rounded-2xl px-2 py-1"
                    />
                </div>
            </div>
        </div>
    );
}

export default PriceFilter;