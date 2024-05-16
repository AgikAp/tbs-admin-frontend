import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function InputFile({className}) {
  return (
    <>
      <label htmlFor="input-file" className={`flex border-dashed border-2 border-dark-6 rounded-md cursor-pointer ${className}`}>
        <div className='relative h-full w-full'>
          <div className={`overflow-hidden ${className}`}>
            {/* <img src="https://res.cloudinary.com/drdfptzfg/image/upload/v1714141555/ab599461-3bf6-499b-84b3-285ddcf4a051.png" alt="" /> */}
          </div>
          <div className='absolute bg-gradient-to-t from-dark-0 to-transparent py-5 xl:py-7 z-10 w-full text-center bottom-0'>
            <FontAwesomeIcon icon={faCloudArrowUp} />
            <span className='block text-[14px]'>Click to upload</span>
          </div>
        </div>
        <input type="file" name="" id="input-file" className='hidden' />
      </label>
    </>
  )
}
