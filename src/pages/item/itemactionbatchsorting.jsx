import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { sortArrayByName, sortArrayByPrice } from '../../utils/sort'

export default function ItemActionBatchSorting({ loading, items, setItems, specialItems, setSpecialItems, sortBy, setSortBy }) {
  const [sortSelected, setSortSelected] = useState(sortBy)

  const handleOnChange = (e) => {
    setSortSelected(e.target.value)
  }

  const handleAction = () => {
    let tempItems = [...items]
    let tempSpecialItems = [...specialItems]

    if (sortSelected === 'name') {
      tempItems = sortArrayByName(tempItems)
      tempSpecialItems = sortArrayByName(tempSpecialItems)
    } else {
      tempItems = sortArrayByPrice(tempItems)
      tempSpecialItems = sortArrayByPrice(tempSpecialItems)
    }

    setItems(tempItems)
    setSpecialItems(tempSpecialItems)
    setSortBy(sortSelected)
  }

  return (
    <div className='border-dashed border-[1px] border-dark-3 rounded-md px-5 py-3 h-fit'>
      <span>Sorting By</span>
      <div className='grid grid-cols-2 gap-x-3 my-3'>
        <div className="form-control">
          <label className="label cursor-pointer justify-normal gap-4">
            <input type="radio" name="sorting" className="radio checked:bg-primary-2" value={'name'} checked={sortSelected && sortSelected === 'name'} onChange={(e) => handleOnChange(e)} />
            <span className="label-text">By Name</span>
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer justify-normal gap-4">
            <input type="radio" name="sorting" className="radio checked:bg-primary-2" value={'price'} checked={sortSelected && sortSelected === 'price'} onChange={(e) => handleOnChange(e)}/>
            <span className="label-text">By Price</span>
          </label>
        </div>
      </div>
      <div className='border-t-[1px] border-dark-3 mt-5 py-5'>
        <button className={`btn btn-sm float-end bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 lg:px-7 text-[14px]`} onClick={() => handleAction()} disabled={loading} >
          <FontAwesomeIcon icon={faWandMagicSparkles} />
          Execute
        </button>
      </div>
    </div>
  )
}
