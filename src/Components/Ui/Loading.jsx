import React from 'react'

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-[70vh]">
            <div className="animate-spin rounded-full md:h-20 h-10 md:w-20 w-10 border-4 border-t-orange-300 border-gray-200"></div>
        </div>
    )
}

export default Loading