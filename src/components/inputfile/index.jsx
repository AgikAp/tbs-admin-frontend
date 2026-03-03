import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef } from 'react'

export default function InputFile({className, name, image, handleChangeImage, editMode}) {
  const fileInputReff = useRef(null)

  const handleFileChange = (e) => {
    handleChangeImage(e);

    // Reset the file input
    if (fileInputReff.current) {
      fileInputReff.current.value = '';
    }
  };

  return (
    <>
      <label htmlFor={name} className={`flex border-dashed border-2 border-dark-6 rounded-md cursor-pointer ${className}`}>
        <div className='relative h-full w-full'>
          <div className={`overflow-hidden ${className}`}>
            {image &&
              <img src={image} alt="" className='' />
            }
          </div>
          <div className={`absolute bg-gradient-to-t from-dark-0 to-transparent py-5 lg:py-7 z-10 w-full text-center bottom-0 ${!editMode && 'hidden'}`}>
            <FontAwesomeIcon icon={faCloudArrowUp} />
            <span className='block text-[14px]'>Click to upload</span>
          </div>
        </div>
        <input type="file" name={name} id={name} ref={fileInputReff} className='hidden' onChange={handleFileChange} disabled={!editMode} />
      </label>
    </>
  )
}
