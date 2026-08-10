import React from 'react'

const TableSkeleton = () => {
    return (
        <div className='overflow-x-auto hide-scrollbar'>
            <div className='w-full animate-pulse flex justify-between h-40 px-10 min-w-240'>
                <div className='flex flex-col w-14/100 justify-between'>
                    <div className='w-full h-8 bg-gray-200 rounded-lg' />
                    <div className='w-full h-3 bg-gray-200 rounded-3xl' />
                    <div className='w-full h-3 bg-gray-200 rounded-3xl' />
                    <div className='w-full h-3 bg-gray-200 rounded-3xl' />
                    <div className='w-full h-3 bg-gray-200 rounded-3xl' />
                </div>
                <div className='flex flex-col w-16/100 justify-between'>
                    <div className='w-full h-8 bg-gray-200 rounded-lg' />
                    <div className='w-full h-3 bg-gray-200 rounded-3xl' />
                    <div className='w-full h-3 bg-gray-200 rounded-3xl' />
                    <div className='w-full h-3 bg-gray-200 rounded-3xl' />
                    <div className='w-full h-3 bg-gray-200 rounded-3xl' />
                </div>
                <div className='flex flex-col w-16/100 justify-between'>
                    <div className='w-full h-8 bg-gray-200 rounded-lg' />
                    <div className='w-full h-3 bg-gray-200 rounded-3xl' />
                    <div className='w-full h-3 bg-gray-200 rounded-3xl' />
                    <div className='w-full h-3 bg-gray-200 rounded-3xl' />
                    <div className='w-full h-3 bg-gray-200 rounded-3xl' />
                </div>
                <div className='flex flex-col w-12/100 justify-between'>
                    <div className='w-full h-8 bg-gray-200 rounded-lg' />
                    <div className='w-full h-3 bg-gray-200 rounded-3xl' />
                    <div className='w-full h-3 bg-gray-200 rounded-3xl' />
                    <div className='w-full h-3 bg-gray-200 rounded-3xl' />
                    <div className='w-full h-3 bg-gray-200 rounded-3xl' />
                </div>
                <div className='flex flex-col w-12/100 justify-between'>
                    <div className='w-full h-8 bg-gray-200 rounded-lg' />
                    <div className='w-full h-3 bg-gray-200 rounded-3xl' />
                    <div className='w-full h-3 bg-gray-200 rounded-3xl' />
                    <div className='w-full h-3 bg-gray-200 rounded-3xl' />
                    <div className='w-full h-3 bg-gray-200 rounded-3xl' />
                </div>
                <div className='flex flex-col w-16/100 justify-between'>
                    <div className='w-full h-8 bg-gray-200 rounded-lg' />
                    <div className='w-full h-3 bg-gray-200 rounded-3xl' />
                    <div className='w-full h-3 bg-gray-200 rounded-3xl' />
                    <div className='w-full h-3 bg-gray-200 rounded-3xl' />
                    <div className='w-full h-3 bg-gray-200 rounded-3xl' />
                </div>
            </div>
        </div>
    )
}

export default TableSkeleton