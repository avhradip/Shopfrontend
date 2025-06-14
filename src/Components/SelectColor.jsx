import { colors } from '@/constants'
import { setColor } from '@/Feature/filtersSlice'
import React from 'react'
import { useDispatch } from 'react-redux'

function SelectColor() {

    const dispatch = useDispatch()
    

    return (
        <>
            {
                colors.map((item) => (
                    <div
                        key={item.color}
                        onClick={() => dispatch(setColor(item?.text))}
                        style={{ backgroundColor: `#${item?.color}` }}
                        className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer"
                        title={item.text}
                    ></div>
                ))
            }
        </>


    )
}

export default SelectColor