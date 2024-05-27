import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function BannerCard({preview, banner}) {
  return (
    <>
      <div className='rounded-lg relative overflow-hidden banner-card'>
        <img src={banner.image} alt={banner.image} />
        <div className='bg-gradient-to-t from-dark-0 to-transparent h-full w-full absolute text-white bottom-0 flex items-end justify-center banner-card-action'>
          <div className='py-5 flex items-center'>
            <button className='btn btn-ghost btn-md hover:text-blue-300' onClick={() => preview('https://i.ibb.co.com/3RQkq8z/Tabs-Saldo.webp')}>
              <FontAwesomeIcon icon={faEye} />
              Preview
            </button>
            <button className='btn btn-ghost btn-md hover:text-red-400'>
              <FontAwesomeIcon icon={faTrash} />
              Trash
            </button>
            <div className="form-control inline-block">
              <label className="label cursor-pointer justify-normal gap-3">
                <input type="checkbox" className="toggle" />
                <span className='font-semibold text-[0.8rem] label-text'>Active</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
