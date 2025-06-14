import React from 'react'
import { Button } from "../Components/Ui/button"
import i1 from "../../public/Rectangle.png"
import Image from "next/image";

function Hero() {
  return (
      <div className="md:mx-[5%] mx-1 p-2 flex md:flex-row flex-col gap-5 items-center  md:justify-between">
          <div className="md:w-[45%] flex flex-col gap-4 md:items-start items-center justify-center ">
              <p className="md:text-5xl text-3xl font-extrabold" variant='default'>FIND CLOTHES THAT MATCHES YOUR STYLE</p>
              <p className="text-[10px] text-gray-600">
                  Browse through our diverse range of meticulously crafted garments,
                  designed to bring out your individuality and cater to your sense of
                  style.
              </p>
              <Button className='text-[15px] font-light rounded-4xl md:w-40 w-72 h-10'>Shop Now</Button>
              <div className="flex flex-wrap items-center md:justify-start justify-center gap-10 font-semibold">
                  <div>
                      <p className="text-2xl md:text-3xl">200+</p>
                      <p className="text-[10px] font-light text-gray-600">International Brands</p>
                  </div>
                  <div>
                      <p className="text-2xl md:text-3xl">2,000+</p>
                      <p className="text-[10px] font-light text-gray-600">High-Quality Products+</p>
                  </div>
                  <div>
                      <p className="text-2xl md:text-3xl">30,000+</p>
                      <p className="text-[10px] font-light text-gray-600">Happy Customers</p>
                  </div>
              </div>
          </div>
          <div className="md:w-[45%] flex flex-col gap-4 md:items-start items-center justify-center ">
              <Image src={i1} alt="Bamar Image" width={500} height={600} />
          </div>
      </div>
  )
}

export default Hero