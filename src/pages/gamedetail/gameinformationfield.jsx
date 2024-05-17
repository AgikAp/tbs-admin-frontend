import React, { useEffect, useState } from 'react'
import Section from '../../components/sections'

export default function GameInformationField({payload, setPayload, editMode}) {
  const handleChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value })
  }

  const handleChangeCheckbox = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.checked })
  }

  return (
    <>
      <Section title={'GAME INFORMATION'}>
        <div className='grid grid-cols-1 gap-8'>
          <div>
            <label className="form-control min-w-full max-w-xs">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input type="text" className="input input-bordered min-w-full max-w-xs" name='name' value={payload?.name ?? ''} onChange={handleChange} disabled={!editMode} />

            </label>
            <label className="form-control min-w-full max-w-xs">
              <div className="label">
                <span className="label-text">Developer</span>
              </div>
              <input type="text" className="input input-bordered min-w-full max-w-xs" name='developer' value={payload?.developer ?? ''} onChange={handleChange} disabled={!editMode} />
            </label>
            <label className="form-control min-w-full max-w-xs">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <textarea type="text" className="textarea textarea-bordered min-w-full max-w-xs" name='description' value={payload?.description ?? ''} onChange={handleChange} disabled={!editMode} />
            </label>
            <div className="form-control w-fit my-4">
              <div>
                <label className="label cursor-pointer">
                  <input type="checkbox" className="checkbox" value={payload?.status ?? ''} name='status' onChange={(e) => {
                    e.target.checked ? e.target.value = 'active' : e.target.value = 'inactive'
                    handleChange(e)
                  }} disabled={!editMode} />
                  <span className="label-text pl-5 mr-auto">Game Active</span>
                </label>
              </div>
              <div>
                <label className="label cursor-pointer">
                  <input type="checkbox" className="checkbox" value={payload?.checking_nickname ?? ''} name='checking_nickname' onChange={handleChangeCheckbox} disabled={!editMode} />
                  <span className="label-text pl-5">Check Nickname</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
