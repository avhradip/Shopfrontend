"use client"

import Loading from '@/Components/Ui/Loading';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdArrowBackIosNew } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '@/Feature/prodectSlice';
import { RxCross2 } from 'react-icons/rx';
import { Loader2 } from 'lucide-react';
import InstagramLoader from '../../Components/InstagramLoader';

function page() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isClient, setIsClient] = useState(false);
  const [querie, setQuerie] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data } = useSelector(state => state?.product)
  useEffect(() => {
    if (querie.trim().length > 0) {
      setLoading(true);
      const timeout = setTimeout(() => {
        const filtered = data?.products.filter(user =>
          user?.title?.toLowerCase().includes(querie.toLowerCase())
        );
        setResults(filtered);
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timeout);
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [querie]);

  useEffect(() => {
    setIsClient(true);
    dispatch(getAllProduct())
  }, []);

  console.log(results)


  if (!isClient) return <Loading />

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="px-4 py-2 rounded hover:bg-gray-100"
      >
        <MdArrowBackIosNew />
      </button>
      <div className="md:mx-20 mx-3 h-screen">
        <div className="bg-gray-200 flex gap-2 w-full items-center justify-start mt-5 h-10 px-4 rounded-3xl shadow-md">
          <FaMagnifyingGlass className="text-gray-600" />
          <input
            type="text"
            value={querie}
            onChange={(e) => setQuerie(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
            placeholder="Search..."
          />
          {querie.length > 0 && (
            loading
              ? <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              : <RxCross2 className="cursor-pointer bg-gray-300 text-white w-4.5 h-4 rounded-full" onClick={() => setQuerie("")} />
          )}
        </div>
        {!loading && querie && results?.length === 0 ? (
          <p className="text-gray-500 text-center w-full h-full py-4 mt-20">No results found.</p>
        ) : (
          loading ? (
            <InstagramLoader />
          ) : (
            <div className="flex flex-col items-start justify-start w-full md:h-[400px] h-screen px-4 py-2 overflow-y-auto mt-6 scroll-smooth example">
              {results?.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center w-full gap-4 p-3 mb-2 bg-white rounded-xl shadow-sm hover:shadow-md cursor-pointer transition-all"
                  onClick={() => router.push(`/detailspage/${item?._id}`)}
                >
                  <img
                    src={item?.image?.[0]}
                    alt={item?.title}
                    className="w-14 h-14 object-cover rounded-md border border-gray-300"
                  />
                  <p className="text-base font-medium text-gray-800 truncate">{item?.title}</p>
                </div>
              ))}
                  {!querie && <p className='text-gray-500 text-center w-full h-full py-4 mt-20'>Search for products, brands and more</p>}
            </div>
          ))}

      </div>

    </div>

  )
}
export default page;