import React from 'react'
import { RxCross2 } from "react-icons/rx";

function Header() {
  return (
    <div className='bg-black text-white flex justify-center gap-4 md:gap-60 md:py-2 py-1 sticky top-0 z-50'>
      <p className='text-[10px]'>
        Sign up and get 20% off to your first order. <span className='font-semibold underline'>Sign Up Now</span>
      </p>
      <RxCross2 />
    </div>
  )
}

export default Header