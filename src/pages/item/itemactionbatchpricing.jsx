import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { sortArrayByPrice } from '../../utils/sort'

export default function ItemActionBatchPricing({ loading, items, setItems, sortBy }) {
  const [type, setType] = useState('percent')
  const [value, setValue] = useState(0)
  const [guest, setGuest] = useState(false)
  const [reseller, setReseller] = useState(false)
  const [special, setSpecial] = useState(false)

  const handleAction = () => {
    let tempItems = [...items]
    let itemSelected = tempItems.filter(val => val?.selected === true)
    itemSelected.forEach(val => {
      const findIndex = tempItems.findIndex(item => item.eks_code === val.eks_code)
      if (findIndex !== -1) {
        const priceTemp = tempItems[findIndex].prices
        priceTemp.forEach((price, i) => {
          if ((price.level === 'guest' && guest) || (price.level === 'reseller' && reseller) || (price.level === 'special' && special)) {
            price.type = type
            price.margin = parseFloat(value)
            priceTemp[i] = price
          }
        })
        tempItems[findIndex].prices = priceTemp
        tempItems[findIndex].selected = true
      }
    })

    if (sortBy === 'price') {
      tempItems = sortArrayByPrice(tempItems)
    }

    setItems(tempItems)
  }
  
  return (
    <div className='border-dashed border-[1px] border-dark-3 rounded-md px-5 py-3 h-fit'>
      <span>Batch Pricing</span>
      <div className='grid grid-cols-2 gap-3'>
        <label className="form-control">
          <div className="label">
            <span className="label-text text-dark-4">Type</span>
          </div>
          <select className="select select-bordered select-sm rounded-md" name='type' value={type} onChange={() => setType(!type)}>
            <option value={''} disabled>-- Select Type --</option>
            <option value={'percent'}>Percent</option>
            <option value={'amount'}>Amount</option>
          </select>
        </label>
        <label className="form-control min-w-full max-w-xs">
          <div className="label">
            <span className="label-text text-dark-4">Value</span>
          </div>
          <input type="number" className="input input-bordered min-w-full max-w-xs input-sm" name='margin' value={value} onChange={(e) => setValue(e.target.value)} />
        </label>
      </div>
      <div className='grid grid-cols-2 lg:grid-cols-3 pt-3'>
        <label className="label cursor-pointer justify-normal">
          <input type="checkbox" className="checkbox" name='is_available_item' checked={guest} onChange={() => setGuest(!guest)} />
          <span className="label-text pl-5">Guest</span>
        </label>
        <label className="label cursor-pointer justify-normal">
          <input type="checkbox" className="checkbox" name='is_available_item' checked={reseller} onChange={() => setReseller(!reseller)} />
          <span className="label-text pl-5">Reseller</span>
        </label>
        <label className="label cursor-pointer justify-normal">
          <input type="checkbox" className="checkbox" name='is_available_item' checked={special} onChange={() => setSpecial(!special)} />
          <span className="label-text pl-5">Special</span>
        </label>
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
