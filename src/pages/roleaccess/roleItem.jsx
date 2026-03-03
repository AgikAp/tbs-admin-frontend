import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

export default function RoleItem({ val, action, deleteAction, setActive, activeRole }) {
  const [show, setShow] = useState(false)
  return (
    <div className={`pl-5 pt-5 border-l-2 border-l-white/20 cursor-pointer transition-all duration-200 ease-in-out`}>
      <div className={`flex relative items-center gap-5 ${activeRole?.id === val?.id ? 'bg-primary-1 rounded ' : ''}  ${val?.roles?.length > 0 ? 'mb-5' : 'mb-0'}`} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} onClick={() => setActive(val)}>
        <div className='absolute -ml-6 flex items-center h-full'>
          <div className='bg-white py-1 px-1 rounded-full' />
        </div>
        <span className='block px-2'>{val?.name}</span>
        <div className='inline-block w-full py-2 px-3'>
          <div className={`flex float-end gap-1 my-3 ${show ? 'visible' : 'invisible'}`}>
            {
              !val?.id?.includes('SUPERADMIN') &&
              <button className='btn hover:bg-orange-600 text-light-0 font-semibold text-[14px] btn-circle btn-sm' onClick={() => action(val, true)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
            }
            <button className='btn hover:bg-primary-1 text-light-0 font-semibold text-[14px] btn-circle btn-sm' onClick={() => action(val)}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
            {
              !val?.id?.includes('SUPERADMIN') &&
              <button className='btn hover:bg-red-900 text-light-0 font-semibold text-[14px] btn-circle btn-sm' onClick={() => deleteAction(val)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            }
          </div>
        </div>
      </div>
      {val?.roles?.map((child, i) => <RoleItem val={child} key={child + i} action={action} setActive={setActive} activeRole={activeRole} deleteAction={deleteAction} />)}
    </div>
  )
}
