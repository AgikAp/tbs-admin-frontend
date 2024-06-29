import React from 'react'

export default function InputLabel({label, ...props}) {
  return (
    <>
      <label className="form-control min-w-full max-w-xs">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <input type="text" className="input input-bordered min-w-full max-w-xs" {...props} />
      </label>
    </>
  )
}
