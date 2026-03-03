import React from 'react'

export default function PageHeader({ page }) {
  return (
    <>
      <div>
        <span className='text-[10px] block'>Page active</span>
        <span className='text-[22px] font-semibold'>{page}</span>
      </div>
    </>
  )
}
