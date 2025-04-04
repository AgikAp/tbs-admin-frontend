import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function GameCard({ image, name, status, id }) {
  const state = useSelector((state) => state?.authLogin)
  const { admin } = state.admin

  const navigate = useNavigate()
  return (
    <>
      <div className='w-full px-2 py-2 bg-dark-3 rounded-md cursor-pointer' onClick={() => admin?.accesses?.includes('GAME_DETAIL') ? navigate('/game/' + id) : ''}>
        <div className='relative'>
          {status === 'active' ?
              <div className='absolute top-0 right-0 p-2 bg-green-400 rounded-full -mr-1 -mt-1' /> :
              <div className='absolute top-0 right-0 p-2 bg-red-400 rounded-full -mr-1 -mt-1' />
            }
          <img src={image} alt={image} />
          <div className='absolute bottom-0 h-16 lg:h-32 bg-gradient-to-t from-dark-1 to-transparent w-full'>
            <span className='text-[14px] py-5 lg:py-16 lg:text-[18px] font-semibold text-center block'>{name}</span>
          </div>
        </div>
      </div>
    </>
  )
}
