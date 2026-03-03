import React from 'react'

export default function Section({ children, title, additional }) {
  return (
    <>
      <div className='bg-dark-1 py-3 lg:py-5 px-5 lg:px-10 rounded-md w-full shadow-xl'>
        <div className='flex justify-between items-center'>
          <span className='font-bold text-[18px]'>{title}</span>
          <div>
            {additional}
          </div>
        </div>
        <div className='pt-3'>
          {children}
        </div>
      </div>
    </>
  )
}
