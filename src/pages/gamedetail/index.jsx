import React from 'react'
import PageHeader from '../../components/pageheader'
import Section from '../../components/sections'
import InputFile from '../../components/inputfile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

export default function GameDetailPage() {

  const additionalGameList = (
    <>
      <button className='btn bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 xl:px-7 text-[14px]' onClick={() => ''}>
        <FontAwesomeIcon icon={faPlus} />
        Add Field
      </button>
    </>
  )

  return (
    <div>
      <PageHeader page={'Games Detail Page'} />
      <div className='py-10'>
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-4'>
          <Section title={'GAME IMAGE'}>
            <div className='grid grid-cols-4'>
              <div className='col-span-2'>
                <span className="label-text">Game Image</span>
                <InputFile className={'max-w-[123.5px] min-h-[162.5px] xl:max-w-[190px] xl:min-h-[250px]'} />
              </div>
              <div className='col-span-2'>
                <span className="label-text">Item Image</span>
                <InputFile className={'max-w-[100px] min-h-[100px]'} />
              </div>
            </div>
          </Section>
          <div className='xl:col-span-2'>
            <Section title={'GAME INFORMATION'}>
              <div className='grid grid-cols-1 gap-8'>
                <div>
                  <label className="form-control min-w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Name</span>
                    </div>
                    <input type="text" className="input input-bordered min-w-full max-w-xs" />
                  </label>
                  <label className="form-control min-w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Developer</span>
                    </div>
                    <input type="text" className="input input-bordered min-w-full max-w-xs" />
                  </label>
                  <label className="form-control min-w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Description</span>
                    </div>
                    <textarea type="text" className="textarea textarea-bordered min-w-full max-w-xs" />
                  </label>
                  <div className="form-control w-fit my-4">
                    <label className="label cursor-pointer">
                      <input type="checkbox" defaultChecked className="checkbox" />
                      <span className="label-text pl-5">Game Active</span>
                    </label>
                  </div>
                </div>
              </div>
            </Section>
          </div>
        </div>
        <div className='my-5'>
          <Section title={'FIELDS'} additional={additionalGameList}>
            <div className='flex w-full'>
              <span className='text-[34px] mr-10 mt-7'>1</span>
              <div className='grid grid-cols-5 gap-5 w-full'>
                <label className="form-control min-w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Name</span>
                  </div>
                  <input type="text" className="input input-bordered min-w-full max-w-xs" />
                </label>
                <label className="form-control min-w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Developer</span>
                  </div>
                  <input type="text" className="input input-bordered min-w-full max-w-xs" />
                </label>
                <label className="form-control min-w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Type</span>
                  </div>
                  <select className="select select-bordered min-w-full max-w-xs">
                    <option disabled selected>Who shot first?</option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                  </select>
                </label>
                <div className='col-span-2 '>
                  <div className='grid grid-cols-3 gap-3 items-end'>
                    <label className="form-control min-w-full max-w-xs">
                      <div className="label">
                        <span className="label-text">Enter display</span>
                      </div>
                      <input type="text" className="input input-bordered min-w-full max-w-xs" />
                    </label>
                    <label className="form-control min-w-full max-w-xs">
                      <div className="label">
                        <span className="label-text">Enter value</span>
                      </div>
                      <input type="text" className="input input-bordered min-w-full max-w-xs" />
                    </label>
                    <label className="form-control min-w-full max-w-xs">
                      <button className='btn bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 xl:px-7 text-[14px]' onClick={() => ''}>
                        <FontAwesomeIcon icon={faPlus} />
                        Add Options
                      </button>
                    </label>
                  </div>
                  <div className='py-5 flex flex-wrap gap-2'>
                    <div className="badge badge-primary badge-outline flex items-center gap-2 py-3 px-3">
                      primary
                      <FontAwesomeIcon icon={faTimes} className='cursor-pointer' />
                    </div>
                    <div className="badge badge-primary badge-outline flex items-center gap-2 py-3 px-3">
                      primary
                      <FontAwesomeIcon icon={faTimes} className='cursor-pointer' />
                    </div>
                    <div className="badge badge-primary badge-outline flex items-center gap-2 py-3 px-3">
                      primary
                      <FontAwesomeIcon icon={faTimes} className='cursor-pointer' />
                    </div>
                    <div className="badge badge-primary badge-outline flex items-center gap-2 py-3 px-3">
                      primary
                      <FontAwesomeIcon icon={faTimes} className='cursor-pointer' />
                    </div>
                    <div className="badge badge-primary badge-outline flex items-center gap-2 py-3 px-3">
                      primary
                      <FontAwesomeIcon icon={faTimes} className='cursor-pointer' />
                    </div>
                    <div className="badge badge-primary badge-outline flex items-center gap-2 py-3 px-3">
                      primary
                      <FontAwesomeIcon icon={faTimes} className='cursor-pointer' />
                    </div>
                    <div className="badge badge-primary badge-outline flex items-center gap-2 py-3 px-3">
                      primary
                      <FontAwesomeIcon icon={faTimes} className='cursor-pointer' />
                    </div>
                    <div className="badge badge-primary badge-outline flex items-center gap-2 py-3 px-3">
                      primary
                      <FontAwesomeIcon icon={faTimes} className='cursor-pointer' />
                    </div>
                    <div className="badge badge-primary badge-outline flex items-center gap-2 py-3 px-3">
                      primary
                      <FontAwesomeIcon icon={faTimes} className='cursor-pointer' />
                    </div>
                    <div className="badge badge-primary badge-outline flex items-center gap-2 py-3 px-3">
                      primary
                      <FontAwesomeIcon icon={faTimes} className='cursor-pointer' />
                    </div>
                    <div className="badge badge-primary badge-outline flex items-center gap-2 py-3 px-3">
                      primary
                      <FontAwesomeIcon icon={faTimes} className='cursor-pointer' />
                    </div>
                    <div className="badge badge-primary badge-outline flex items-center gap-2 py-3 px-3">
                      primary
                      <FontAwesomeIcon icon={faTimes} className='cursor-pointer' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}
