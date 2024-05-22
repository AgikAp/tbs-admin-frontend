import { faCancel, faEdit, faSave, faSpinner, faCircleUp, faCircleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import ItemActionBatchPricing from './itemactionbatchpricing'
import ItemActionBatchSorting from './itemactionbatchsorting'
import ItemActionSearchItem from './itemactionsearchitem'
import { sortArrayByName, sortArrayByPrice } from '../../utils/sort'
export default function ItemActions({gameSelected, editMode, setEditMode, loading, openModalAndActionSearch, items, setItems, specialItems, setSpecialItems, sortBy, setSortBy, selectedAll, setSelectedAll, handleOnSubmit}) {
  const actionAddToSpecialItems = () => {
    const itemSelected = items.filter(val => val?.selected === true)

    let tempSpecialItems = [...specialItems]
    let tempItems = [...items]
    itemSelected.forEach(val => {
      val.is_special = true
      tempSpecialItems.push(val)
      let itemIndex = tempItems.findIndex(value => value.eks_code === val.eks_code)
      tempItems.splice(itemIndex, 1)
    })

    if (sortBy === 'name') {
      tempSpecialItems = sortArrayByName(tempSpecialItems)
    } else {
      tempSpecialItems = sortArrayByPrice(tempSpecialItems)
    }
    
    setSpecialItems(tempSpecialItems)
    setItems(tempItems)
  }

  const actionToRemoveItem = () => {
    const itemSelected = items.filter(val => val?.selected === true)
    const tempItems = [...items]
    itemSelected.forEach(val => {
      let itemIndex = tempItems.findIndex(value => value.eks_code === val.eks_code)
      tempItems.splice(itemIndex, 1)
    })
    setItems(tempItems)
  }

  const handleSelectAll = () => {
    let tempItems = [...items]
    let lengthItems = tempItems.length
    let selected = tempItems.filter(val => val?.selected === true)

    let selectedAll = selected.length !== lengthItems

    tempItems.forEach((val, i) => {
      tempItems[i].selected = selectedAll
    })

    setSelectedAll(selectedAll)
    setItems(tempItems)
  }

  return (
    <>
      <div className='bg-dark-1 py-3 lg:py-5 px-5 lg:px-10 rounded-b-md w-full shadow-xl'>
        {gameSelected ?
          <>
            <div className='flex justify-between items-center'>
              <span className='font-bold text-[18px]'>Action Box {gameSelected.name}</span>
              <div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                  <button className={`btn bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 lg:px-7 text-[14px] ${editMode ? 'hidden' : 'col-start-2'}`} onClick={() => setEditMode(!editMode)}>
                    <FontAwesomeIcon icon={faEdit} />
                    Edit
                  </button>
                  <button className={`btn btn-sm lg:btn-md bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 lg:px-7 text-[14px] ${!editMode && 'hidden'}`} onClick={() => setEditMode(!editMode)} disabled={loading} >
                    <FontAwesomeIcon icon={faCancel} />
                    Cancel
                  </button>
                  <button className={`btn btn-sm lg:btn-md bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 lg:px-7 text-[14px] ${!editMode && 'hidden'}`} onClick={() => handleOnSubmit()} disabled={loading}>
                    {
                      loading ?
                        <FontAwesomeIcon icon={faSpinner} spin />
                        :
                        <FontAwesomeIcon icon={faSave} />
                    }
                    Save
                  </button>
                </div>
              </div>
            </div>
            {editMode &&
              <>
                <div className='py-5 text-dark-4'>
                  <span>Actions</span>
                  <div className='flex gap-5 items-center flex-wrap'>
                    <label className="label cursor-pointer justify-normal gap-4">
                      <input type="checkbox" className="checkbox" checked={selectedAll} name='checking_nickname' disabled={!editMode} onChange={handleSelectAll} />
                      <span className="label-text">Select All</span>
                    </label>
                    <button className={`btn btn-sm float-end bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 lg:px-7 text-[14px]`} onClick={actionAddToSpecialItems} disabled={loading} >
                      <FontAwesomeIcon icon={faCircleUp} />
                      Add to special Items
                    </button>
                    <button className={`btn btn-sm float-end bg-red-600 hover:bg-red-800 text-light-0 font-semibold px-5 lg:px-7 text-[14px]`} onClick={actionToRemoveItem} disabled={loading} >
                      <FontAwesomeIcon icon={faCircleDown} />
                      Remove Item
                    </button>
                  </div>
                  <div className='grid grid-cols-1 lg:grid-cols-3 my-5 text-dark-5 gap-5'>
                    <ItemActionBatchPricing loading={loading} items={items} setItems={setItems} sortBy={sortBy} />
                    <ItemActionBatchSorting loading={loading} items={items} setItems={setItems} specialItems={specialItems} setSpecialItems={setSpecialItems} sortBy={sortBy} setSortBy={setSortBy} />
                    <ItemActionSearchItem editMode={editMode} setEditMode={setEditMode} loading={loading} openModalAndActionSearch={openModalAndActionSearch} />
                  </div>
                </div>
              </>
            }
          </>
          : ''
        }
      </div>
    </>
  )
}
