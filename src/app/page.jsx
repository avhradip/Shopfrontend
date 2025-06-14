"use client";

import Brands from "../Components/Brands";
import Browse from "../Components/Browse";
import Hero from "../Components/Hero";
import NewArrivals from "../Components/NewArrivals";
import Review from "../Components/Review";
import TopSelling from "../Components/TopSelling";
import Loading from "../Components/Ui/Loading";
import { useEffect, useState } from "react";


export default function Home() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <div className=''>
      {loading ?
        (
          <div className="h-screen w-full">
            <Loading/>
          </div>
        )
        :
        (
          <div>
            <Hero />
            <Brands />
            <NewArrivals />
            <hr />
            <TopSelling />
            <Browse />
            <Review/>
          </div>
        )
      }

    </div>
  );
}
