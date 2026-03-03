import React, { useEffect, useState } from 'react'
import { idrFormat } from '../../utils/currencyFormat'

export default function ItemCardSpecial({ index, specialItem, specialItems, setSpecialItems, editMode, onClick }) {
  return (
    <>
      <div className='relative'>
        <label htmlFor='' className={`border-dashed border-[1px] border-dark-5 px-5 py-5 rounded-md block cursor-pointer bg-slate-800`} onClick={onClick}>
          <img className='absolute top-0 right-0 h-16' src={specialItem?.item_image ?? ''} alt={specialItem?.item_image ?? ''} />
          <span className='font-light text-[14px] capitalize'>({specialItem.status})</span>
          <div className='font-semibold'>
            <span>{specialItem.name}</span>
          </div>
          <div className='pt-3 text-dark-6'>
            <span className='text-[14px]'>Pricing Detail</span>
            <div className='flex gap-5 text-[12px]'>
              {specialItem.prices.map((val, i) =>
                <span key={'special_item' + val.eks_code + i} >{idrFormat(val.price)} <br /> + {val.type === 'percent' ? val.margin + '%' : val.margin} ({val.level})</span>
              )}
            </div>
          </div>
          <div className='pt-5'>
            <div className="form-control">
              <label className="label cursor-pointer justify-normal" htmlFor=''>
                <input type="checkbox" className="checkbox checkbox-xs" checked={specialItem.use_instruction} readOnly />
                <span className="label-text pl-3">Use instruction</span>
              </label>
            </div>
            {specialItem.use_instruction &&
              <span className='text-[12px] text-dark-5'>
                {specialItem.instruction}
              </span>
            }
          </div>
        </label>
      </div>
      {/* <div className='relative'>
        <label htmlFor='' className={`border-dashed border-[1px] border-dark-5 px-5 py-5 rounded-md block cursor-pointer bg-slate-800`} onClick={onClick}>
          <img className='absolute top-0 right-0 h-16' src={icon} alt="" />
          <div className='font-semibold'>
            <span>Mobile Legends ABDK</span>
          </div>
          <div className='pt-3 text-dark-6'>
            <span className='text-[14px]'>Pricing Detail</span>
            <div className='flex gap-5'>
              <div className='text-[12px] flex gap-5'>
                <span>Rp. 100.000 <br /> + 1000 (Guest)</span>
              </div>
              <div className='text-[12px] flex gap-5'>
                <span>Rp. 100.000 <br /> + 1000 (Guest)</span>
              </div>
              <div className='text-[12px] flex gap-5'>
                <span>Rp. 100.000 <br /> + 1000 (Guest)</span>
              </div>
            </div>
          </div>
          <div className='pt-5'>
            <div className="form-control">
              <label className="label cursor-pointer justify-normal" htmlFor=''>
                <input type="checkbox" defaultChecked className="checkbox checkbox-xs" readOnly />
                <span className="label-text pl-3">Use instruction</span>
              </label>
            </div>
            <span className='text-[12px] text-dark-5'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio similique libero distinctio error odit porro voluptatum eveniet fugiat modi? Qui tenetur suscipit, reiciendis magnam sint maxime iusto at perspiciatis itaque.
            </span>
          </div>
        </label>
      </div> */}
    </>
  )
}
