import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/pageheader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Section from '../../components/sections'
import { GET_AccessList } from '../../fetchs/access'

export default function RoleAccessPage() {
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)

  const [accessList, setAccessList] = useState([])

  const additionalRoleAccess = (
    <>
      <button className='btn bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 lg:px-7 text-[14px]' onClick={() => ''}>
        <FontAwesomeIcon icon={faPlus} />
        Add New
      </button>
    </>
  )

  const fetchAccessList = async () => {
    try {
      const response = await GET_AccessList(setLoading)
      setAccessList(response)
    } catch (e) {
      errorWriter(e, setErr)
    }
  }

  useEffect(() => {
    fetchAccessList()
  }, [])

  return (
    <>
      {err &&
        <div role="alert" className="alert alert-error mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{err}</span>
        </div>}

      <PageHeader page={"Role Access Page"} />
      <div className='my-5'>
        <Section title={'Role Access'} additional={additionalRoleAccess}>
          <div className='flex-wrap overflow-x-auto min-w-[300px]'>
            <div className='grid grid-cols-8 min-w-[1200px]'>
              <div className='col-span-2 px-2'>
                <div className='px-5 py-5 border-l-2 border-l-white/20 cursor-pointer transition-all duration-200 ease-in-out'>
                  <div className='relative'>
                    <div className='absolute -ml-6 flex items-center h-full'>
                      <div className='bg-white py-1 px-1 rounded-full' />
                    </div>
                    <span className='mb-5 block'>SUPERADMIN</span>
                  </div>
                  <div className='px-5 py-5 border-l-2 border-l-white/20 cursor-pointer transition-all duration-200 ease-in-out'>
                    <div className='relative'>
                      <div className='absolute -ml-6 flex items-center h-full'>
                        <div className='bg-white py-1 px-1 rounded-full' />
                      </div>
                      <span className='mb-5 block'>SELLER</span>
                    </div>
                  </div>
                  <div className='px-5 py-5 border-l-2 border-l-white/20 cursor-pointer transition-all duration-200 ease-in-out'>
                    <div className='relative'>
                      <div className='absolute -ml-6 flex items-center h-full'>
                        <div className='bg-white py-1 px-1 rounded-full' />
                      </div>
                      <span className='mb-5 block'>CUSTOMER SERVICE</span>
                    </div>
                  </div>
                  <div className='px-5 py-5 border-l-2 border-l-white/20 cursor-pointer transition-all duration-200 ease-in-out'>
                    <div className='relative'>
                      <div className='absolute -ml-6 flex items-center h-full'>
                        <div className='bg-white py-1 px-1 rounded-full' />
                      </div>
                      <span className='mb-5 block'>ADMINISTRATOR</span>
                    </div>
                  </div>
                  <div className='px-5 py-5 border-l-2 border-l-white/20 cursor-pointer transition-all duration-200 ease-in-out'>
                    <div className='relative'>
                      <div className='absolute -ml-6 flex items-center h-full'>
                        <div className='bg-white py-1 px-1 rounded-full' />
                      </div>
                      <span className='mb-5 block'>REFUNDER</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-span-6 border-l-2 border-l-white/20 px-5'>
                {
                  accessList.map((val, i) => 
                    <div className='border-b-2 border-b-white/20 last:border-b-0 my-5 px-5' key={val.id + i}>
                      <span className='block'>
                        {val?.id}
                      </span>
                      <div className='flex flex-wrap gap-x-10 gap-y-5 my-7'>
                        {val?.accesses?.map((opt, j) => 
                          <label className="label cursor-pointer justify-normal" key={opt.id + j}>
                            <input type="checkbox" className="checkbox" checked={true} name='status' onChange={() => ''} disabled={false} />
                            <span className="label-text pl-5">{opt?.id}</span>
                          </label>
                        )}
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </Section>
      </div>
    </>
  )
}
