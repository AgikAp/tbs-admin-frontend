import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/pageheader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignRight, faCancel, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import Section from '../../components/sections'
import { GET_ListPayment } from '../../fetchs/payment'
import { errorWriter } from '../../utils/errorwriter'
import PaymentListCard from './paymentlistcard'
import PaymentField from './paymentfield'
import { faEdit, faSave } from '@fortawesome/free-regular-svg-icons'

export default function PaymentPage() {
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [createMode, setCreateMode] = useState(false)

  const [mobileList, setMobileList] = useState(true)
  const [paymentSelected, setPaymentSelected] = useState({})

  const [paymentList, setPaymentList] = useState([])

  const loadPaymentList = async () => {
    try {
      const response = await GET_ListPayment(setLoading)
      setPaymentList(response.data.data)
      setPaymentSelected(response.data.data.length > 0 ? response.data.data[0] : {})
    } catch (e) {
      errorWriter(e, setErr)
    }
  }

  useEffect(() => {
    loadPaymentList()
  }, [])

  const handleChangePayment = (val) => {
    setPaymentSelected(val)
    setEditMode(false)
  }

  const handleAddNew = () => {
    setPaymentSelected({})
    setCreateMode(!createMode)
    setEditMode(!editMode)
    setMobileList(false)
  }

  const handleCancelAdd = () => {
    setPaymentSelected(paymentList.length > 0 ? paymentList[0] : {})
    setCreateMode(!createMode)
    setEditMode(!editMode)
    setMobileList(true)
  }

  const handleEdit = () => {
    setEditMode(!editMode)
    setMobileList(false)
  }

  const handleCancelEdit = () => {
    setPaymentSelected(paymentList.length > 0 ? paymentList[0] : {})
    setEditMode(!editMode)
    setMobileList(true)
  }

  const additionalPaymentList = (
    <>
      {createMode ?
        <>
          <div className='flex gap-3'>
            <button className='btn bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 lg:px-7 text-[14px]' onClick={handleCancelAdd}>
              <FontAwesomeIcon icon={faCancel} />
              Cancel
            </button>
            <button className='btn bg-red-500 hover:bg-red-500 text-light-0 font-semibold px-5 lg:px-7 text-[14px]' onClick={handleAddNew}>
              <FontAwesomeIcon icon={faSave} />
              Save
            </button>
          </div>
        </> :
        <>
          {editMode ?
            <button className='btn bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 lg:px-7 text-[14px]' onClick={handleCancelEdit}>
              <FontAwesomeIcon icon={faCancel} />
              Cancel
            </button> :
            <div className='flex gap-3'>
              <button className='btn bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 lg:px-7 text-[14px]' onClick={handleAddNew}>
                <FontAwesomeIcon icon={faPlus} />
                Add New
              </button>
              <button className='btn bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 lg:px-7 text-[14px]' onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit} />
                Edit
              </button>
            </div>
          }
        </>
      }
    </>
  )

  return (
    <>
      {err &&
        <div role="alert" className="alert alert-error mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{err}</span>
        </div>}

      <PageHeader page={'Payments Page'} />
      <div className='my-5'>
        <Section title={"Payment List"} additional={additionalPaymentList}>
          <div className={`${createMode ? 'hidden' : 'flex justify-between items-center mb-5'}`}>
            <div>
              <span className='btn lg:hidden' onClick={() => setMobileList(!mobileList)}>
                {mobileList ? 'View Detail' : 'View List'} <FontAwesomeIcon icon={faAlignRight} />
              </span>
            </div>
            <span>
              {paymentSelected?.name}
            </span>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-5 gap-5'>
            <div className={`col-span-1 ${mobileList ? '' : 'hidden lg:block'}`}>
              {paymentList.map(val =>
                <PaymentListCard key={val.id} name={'payment-accordion'} onChange={() => handleChangePayment(val)} payment={val} paymentSelected={paymentSelected} />
              )}

            </div>
            <div className='col-span-1 lg:col-span-4'>
              <div className={`bg-base-200 px-5 py-3 rounded-lg ${!mobileList ? '' : 'hidden lg:block'}`}>
                <div className="form-control min-w-full max-w-xs">
                  <PaymentField editMode={editMode} loading={loading} payment={paymentSelected} />
                </div>
              </div>
            </div>
          </div >
        </Section >
      </div >
    </>
  )
}
