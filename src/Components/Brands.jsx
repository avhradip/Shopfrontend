import React from 'react'
import versace from '../../public/versace.png'
import zara from '../../public/zara.png'
import gucci from '../../public/gucci.png'
import prada from '../../public/prada.png'
import calvinklein from '../../public/calvinklein.png'
import Image from 'next/image'

function Brands() {
    return (
        <div className='bg-black flex flex-wrap gap-5 items-center justify-center py-3'>
            <Image src={versace} width={100} height={150} className='md:h-6 h-3 md:w-28 w-14' alt='versace'/>
            <Image src={zara} width={100} height={150} className='md:h-6 h-3 md:w-28 w-14' alt='zara'/>
            <Image src={gucci} width={100} height={150} className='md:h-6 h-3 md:w-28 w-14' alt='gucci'/>
            <Image src={prada} width={100} height={150} className='md:h-6 h-3 md:w-28 w-14' alt='prada'/>
            <Image src={calvinklein} width={100} height={150} className='md:h-6 h-3 md:w-28 w-14' alt='calvinklein'/>
        </div>
    )
}

export default Brands