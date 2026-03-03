import React, { useRef, useState } from 'react'

export default function CustomSelectOptions({ list, listData, setListData, disabled }) {
  const [isOpen, setIsOpen] = useState(false)

  const onMouse = () => {
    setIsOpen(!isOpen)
  }

  const handleChange = (e, value) => {
    if (e.target.checked) {
      setListData([...listData, {id: value.id, name: value.name}])
    } else {
      const tempListData = [...listData]
      var index = tempListData.findIndex(val => val.name === value.name)
      if (index > -1) {
        tempListData.splice(index, 1)
        setListData(tempListData)
      }
    }
  }

  return (
    <label className="form-control min-w-full max-w-xs" onMouseEnter={onMouse} onMouseLeave={onMouse}>
      <div className="label">
        <span className="label-text">Role </span>
      </div>
      <div className='input input-bordered cursor-text pt-3'>
        <span>{listData?.map(val => val.name).join(', ')}</span>
      </div>
      {
        isOpen && (
          <div className='relative'>
            <div className='bg-dark-0 rounded-md px-5 py-3 absolute w-full'>
              {
                list.map((val, i) =>
                  <label className="label cursor-pointer justify-normal" key={val.name + i}>
                    <input type="checkbox" className="checkbox" checked={listData?.findIndex((value) => value?.name === val.name) > -1} name='status' onChange={(e) => handleChange(e, val)} disabled={disabled} />
                    <span className="label-text pl-5">{val.name}</span>
                  </label>
                )
              }
            </div>
          </div>
        )
      }
    </label>
  )
}
