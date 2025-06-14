'use client'

import { useEffect, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { MdKeyboardArrowUp } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'
import PriceFilter from './PriceFilter'
import SelectColor from './SelectColor'
import { Button } from '@/components/ui/button'
import { GiSettingsKnobs } from 'react-icons/gi'

const catagoris = [
    { label: 'T-Shirt', id: 1 },
    { label: 'Shorts', id: 1 },
    { label: 'Shirts', id: 1 },
    { label: 'Hoodie', id: 1 },
    { label: 'Shoes', id: 4 },
    { label: 'Electronics', id: 2 },
    { label: 'Furniture', id: 3 },
    { label: 'Miscellaneous', id: 5 },
]

const availableSizes = ['XS', 'S', 'M', 'L', 'XL']

export default function MobileFilterDrawer() {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedCategoryId, setSelectedCategoryId] = useState(null)
    const [selectedSize, setSelectedSize] = useState(null)

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : ''
    }, [isOpen])

    return (
        <div >
            {/* Trigger Button (You can place this elsewhere as needed) */}
            <p onClick={() => setIsOpen(true)} className="md:hidden"><GiSettingsKnobs /></p>

            {/* Overlay */}
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 z-40 flex items-end justify-center bg-black bg-opacity-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                {/* Drawer */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`bg-white w-full md:max-w-xl md:rounded-2xl p-4 h-[90%] md:h-auto overflow-y-auto transform transition-all duration-500 ease-in-out rounded-t-2xl
            ${isOpen ? 'translate-y-10 opacity-100' : 'translate-y-full opacity-0'}`}
                >
                    {/* Header */}
                    <div className="flex justify-between items-center text-black mb-3">
                        <p className="text-[20px] font-semibold">Filters</p>
                        <RxCross1
                            className="text-[#807676] cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        />
                    </div>

                    <hr className="mb-3" />

                    {/* Category Filter Options */}
                    <div className="flex flex-col gap-3">
                        {catagoris.map(({ label, id }) => (
                            <div
                                key={label}
                                className={`flex justify-between items-center cursor-pointer ${selectedCategoryId === id ? 'font-semibold text-black' : ''
                                    }`}
                                onClick={() => setSelectedCategoryId(id)}
                            >
                                <p>{label}</p>
                                <IoIosArrowForward />
                            </div>
                        ))}
                    </div>

                    <hr className="my-3" />

                    {/* Price Filter */}
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
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 rounded-full text-[10px] border ${selectedSize === size ? 'bg-black text-white' : ''
                                        }`}
                                >
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
                        {['Casual', 'Formal', 'Party', 'Gym'].map((style) => (
                            <div
                                key={style}
                                className="flex justify-between items-center cursor-pointer"
                            >
                                <p>{style}</p>
                                <IoIosArrowForward />
                            </div>
                        ))}
                    </div>

                    {/* Apply Filter Button */}
                    <Button className="rounded-3xl w-full mb-20" onClick={() => setIsOpen(false)}>Apply Filter</Button>
                </div>
            </div>
        </div>
    )
}
