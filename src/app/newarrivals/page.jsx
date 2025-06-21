"use client";

import React, { useEffect, useState } from 'react';
import Loading from '../../Components/Ui/Loading';
import { getAllCatagoris, getAllProduct, getProductByCatagori } from '../../Feature/prodectSlice';
import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { MdArrowBackIosNew, MdKeyboardArrowDown } from 'react-icons/md';
import { GiSettingsKnobs } from 'react-icons/gi';
import { RxCross1 } from 'react-icons/rx';
import { IoIosArrowForward } from 'react-icons/io';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { Button } from '../../Components/Ui/button';
import PriceFilter from '../../Components/PriceFilter';
import { Loader2 } from 'lucide-react';

function Page() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [priceOpen, setPriceOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [dressStyle, setDressStyle] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { price_min, price_max, color2 } = useSelector(state => state?.filter);
  const { data, loading, error, catagoris, productByCatagoris } = useSelector((state) => state?.product);


  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const availableSizesForFootwere = ['6', '7', '8', '9', '10', '11'];
  const genderCategories = ["Men", "Women", "Boy", "Girl"];

  const [isOpen, setIsOpen] = useState(false)



  const [filteredData, setFilteredData] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);


  const baseData = productByCatagoris?.length > 0 ? productByCatagoris : data?.products || [];
  useEffect(() => {
    if (baseData.length > 0) {
      setFilteredData(baseData);
    }
  }, [productByCatagoris, data]);

  const applyFilters = () => {
    const baseData = productByCatagoris?.length > 0 ? productByCatagoris : data?.products || [];

    if (!baseData || baseData.length === 0) {
      setFilteredData([]);
      return;
    }

    const min = Number(price_min) || 0;
    const max = Number(price_max) || Number.MAX_SAFE_INTEGER;
    const color = selectedColor?.toString() || '';


    let priceFiltered = baseData.filter(
      (item) => item.price >= min && item.price <= max
    );

    let colorFiltered;
    if (color) {
      colorFiltered = priceFiltered.filter(
        (item) => item.color === color
      );
    } else {
      colorFiltered = priceFiltered;
    }

    setFilteredData(priceFiltered);
  };




  const categoryParts = selectedCategory ? selectedCategory.split("_") : [];
  const showSizeByProduct = categoryParts.includes("Footwear");



  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSize(null);
    setFilteredData(data?.products || []);
    setDressStyle(false)
    setSizeOpen(false)
    setPriceOpen(false)
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }, [isOpen])

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllCatagoris())
  }, []);


  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div>

      <div className='w-full flex justify-between items-center'>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded hover:bg-gray-100"
        >
          <MdArrowBackIosNew />
        </button>
        <p onClick={() => setIsOpen(true)} className="md:hidden mr-4"><GiSettingsKnobs /></p>
      </div>

      <div className='flex flex-row ml-4'>
        {/* Filter Sidebar */}
        <div className="sticky top-5 md:flex flex-col gap-5 border-2 rounded-2xl max-w-64 min-w-64 hidden text-[12px] p-4 text-[#807676]">
          <div className="flex justify-between items-center text-black">
            <p className="text-[20px] font-semibold">Filters</p>
            <div className="flex gap-2 items-center">
              <GiSettingsKnobs className="text-[#807676] cursor-pointer" />

              {(selectedCategory !== null || selectedSize !== null) && (
                <RxCross1
                  className="text-[#807676] cursor-pointer"
                  onClick={() => clearFilters()}
                  title="Clear Filters"
                />
              )}
            </div>

          </div>

          <hr />

          {/* Category Filter */}
          <div className="flex flex-col gap-3">
            {catagoris.map((cat, index) => (
              <div
                key={index}
                className={`flex justify-between items-center cursor-pointer ${selectedCategory === cat ? 'text-black font-semibold' : ''
                  }`}
                onClick={() => {
                  clearFilters()
                  setSelectedCategory(cat)
                  dispatch(getProductByCatagori(cat))
                }}
              >
                <p>{cat.split("_").join(" ")}</p>
                <IoIosArrowForward />
              </div>
            ))}

          </div>

          <hr />

          <PriceFilter priceOpen={priceOpen} setPriceOpen={setPriceOpen} />

          <hr />

          {showSizeByProduct ? (
            <div className="mb-3">
              <div className="flex justify-between items-center text-black">
                <p className="text-[20px] font-semibold">Size</p>
                {sizeOpen ? <MdKeyboardArrowUp size={20} onClick={() => setSizeOpen(!sizeOpen)} /> : <MdKeyboardArrowDown size={20} onClick={() => setSizeOpen(!sizeOpen)} />}
              </div>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${sizeOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"} flex flex-wrap gap-4`}>
                {availableSizesForFootwere.map((size) => (
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
          ) : (
            // For Clothing
            <div className="mb-3">
              <div className="flex justify-between items-center text-black">
                <p className="text-[20px] font-semibold">Size</p>
                {sizeOpen ? <MdKeyboardArrowUp size={20} onClick={() => setSizeOpen(!sizeOpen)} /> : <MdKeyboardArrowDown size={20} onClick={() => setSizeOpen(!sizeOpen)} />}
              </div>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${sizeOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"} flex flex-row gap-4`}>
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
          )}
          <hr />
          {/* Dress Style Filter */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-black">
              <p className="text-[20px] font-semibold">Dress Style</p>
              {dressStyle ? <MdKeyboardArrowUp size={20} onClick={() => setDressStyle(!dressStyle)} /> : <MdKeyboardArrowDown size={20} onClick={() => setDressStyle(!dressStyle)} />}
            </div>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${dressStyle ? "max-h-40 opacity-100" : "max-h-0 opacity-0"} flex flex-col gap-4`}>
              {genderCategories.map((style) => (
                <div
                  key={style}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <p>{style}</p>
                  <IoIosArrowForward />
                </div>
              ))}
            </div>
          </div>
          <Button className="rounded-3xl"
            onClick={() => {
              applyFilters()
              setIsOpen(false)
            }}
          >
            Apply Filter
          </Button>

        </div>

        {/* Product Display */}
        <div className="flex flex-col items-center w-full px-4 sm:px-6 lg:px-8">
          <p className="text-2xl md:text-3xl font-bold text-center mb-2">NEW ARRIVALS</p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 py-8 w-full overflow-y-auto max-h-[800px] example">
            {loading ? (
              <Loading />
            ) : filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div
                  key={item?._id}
                  className="w-48 sm:w-48 md:w-52 lg:w-56 cursor-pointer rounded-xl hover:shadow-lg transition duration-200 bg-white p-3 shadow-xs"
                  onClick={() => router.push(`/detailspage/${item?._id}`)}
                >
                  <img
                    src={item?.image?.[0]}
                    alt={item?.title}
                    className="w-full h-48 md:h-52 lg:h-56 object-cover rounded-lg"
                  />
                  <div className="mt-2">
                    <p className="text-sm sm:text-base truncate font-medium">{item?.title}</p>
                    <Rating value={item?.averageRating || 0} size="small" readOnly />
                    <p className="text-sm sm:text-base font-semibold text-gray-700">${item?.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center w-full">No products available.</p>
            )}
          </div>
        </div>




        <div >
          {/* Overlay */}
          <div
            onClick={() => setIsOpen(false)}
            className={`fixed inset-0 z-0 flex items-end justify-center bg-gray-100 bg-opacity-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
          >
            {/* Drawer */}
            <div
              onClick={(e) => e.stopPropagation()}
              className={`bg-white w-full md:max-w-xl md:rounded-2xl p-4 h-[90%] md:h-auto overflow-y-auto transform transition-all duration-500 ease-in-out rounded-t-2xl
            ${isOpen ? 'translate-y-10 opacity-100' : 'translate-y-full opacity-0'}`}
            >
              {/* Header */}
              <div className="flex justify-between items-center text-black mb-3 sticky">
                <p className="text-[20px] font-semibold">Filters</p>
                <RxCross1
                  className="text-[#807676] cursor-pointer"
                  onClick={() => {
                    setIsOpen(false)
                    clearFilters()
                  }}
                />
              </div>

              <hr className="mb-3" />

              {/* Category Filter Options */}
              <div className="flex flex-col gap-3">
                {catagoris.map((cat, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center cursor-pointer ${selectedCategory === cat ? 'font-semibold text-black' : ''
                      }`}
                    onClick={() => {
                      setIsOpen(false)
                      setSelectedCategory(cat)
                      dispatch(getProductByCatagori(cat))
                    }}
                  >
                    <p>{cat.split("_").join(" ")}</p>
                    <IoIosArrowForward />
                  </div>
                ))}
              </div>

              <hr className="mb-3" />

              {/* Price Filter */}
              <PriceFilter priceOpen={priceOpen} setPriceOpen={setPriceOpen} />

              <hr className="my-3" />

              {/* Size Filter */}
              {showSizeByProduct ? (
                <div className="mb-3">
                  <div className="flex justify-between items-center text-black">
                    <p className="text-[20px] font-semibold">Size</p>
                    {sizeOpen ? <MdKeyboardArrowUp size={20} onClick={() => setSizeOpen(!sizeOpen)} /> : <MdKeyboardArrowDown size={20} onClick={() => setSizeOpen(!sizeOpen)} />}
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${sizeOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"} flex flex-wrap gap-4`}>
                    {availableSizesForFootwere.map((size) => (
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
              ) : (
                // For Clothing
                <div className="mb-3">
                  <div className="flex justify-between items-center text-black">
                    <p className="text-[20px] font-semibold">Size</p>
                    {sizeOpen ? <MdKeyboardArrowUp size={20} onClick={() => setSizeOpen(!sizeOpen)} /> : <MdKeyboardArrowDown size={20} onClick={() => setSizeOpen(!sizeOpen)} />}
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${sizeOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"} flex flex-row gap-4`}>
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
              )}

              <hr className="mb-3" />
              {/* Dress Style */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-black">
                  <p className="text-[20px] font-semibold">Dress Style</p>
                  {dressStyle ? <MdKeyboardArrowUp size={20} onClick={() => setDressStyle(!dressStyle)} /> : <MdKeyboardArrowDown size={20} onClick={() => setDressStyle(!dressStyle)} />}
                </div>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${dressStyle ? "max-h-40 opacity-100" : "max-h-0 opacity-0"} flex flex-col gap-4`}>
                  {genderCategories.map((style) => (
                    <div
                      key={style}
                      className="flex justify-between items-center cursor-pointer"
                    >
                      <p>{style}</p>
                      <IoIosArrowForward />
                    </div>
                  ))}
                </div>
              </div>
              <hr className="mb-3" />
              {/* Apply Filter Button */}
              <Button className="rounded-3xl w-full mb-20" onClick={() => {
                applyFilters()
                setIsOpen(false)
              }}>Apply Filter</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
