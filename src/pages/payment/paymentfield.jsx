import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import InputFile from '../../components/inputfile'


export default function PaymentField({ editMode, loading, createMode, payment, setPaymentSelected }) {
  const [paymentType, setPaymentType] = useState({})
  const addRequirementRef = useRef(null)

  useEffect(() => {
    setPaymentType(payment?.payment_type)
  }, [payment])

  const handleChangePayment = (e, isNumber, parent) => {
    let value = e.target.value
    if (isNumber) {
      value = parseFloat(value)
    }
    const tempPayment = {...payment}
    parent ? tempPayment[parent][e.target.name] = value : tempPayment[e.target.name] = value
    setPaymentSelected(tempPayment)
  }

  const handleChangeChackboxPayment = (e, parent) => {
    const tempPayment = {...payment}
    parent ? tempPayment[parent][e.target.name] = e.target.checked : tempPayment[e.target.name] = e.target.checked
    setPaymentSelected(tempPayment)
  }

  const handleAddRequirement = () => {
    const tempPayment = {...payment}
    const paymentRequirement = tempPayment.payment_requirements
    paymentRequirement.push({
      required: addRequirementRef.current.value
    })

    tempPayment.payment_requirements = paymentRequirement
    setPaymentSelected(tempPayment)
    addRequirementRef.current.value = ''
  }

  const handleRemoveRequirement = (i) => {
    const tempPayment = {...payment}
    const paymentRequirement = tempPayment.payment_requirements
    paymentRequirement.splice(i, 1)
    tempPayment.payment_requirements = paymentRequirement
    setPaymentSelected(tempPayment)
  }

  const handleChangeImage = (e) => {
    const selectedFile = e.target.files[0]
    const tempPayment = {...payment}
    tempPayment.image = URL.createObjectURL(selectedFile)
    tempPayment.image_file = selectedFile
    setPaymentSelected(tempPayment)
  }

  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-4'>
        <div className='my-10'>
          <InputFile editMode={editMode} handleChangeImage={handleChangeImage} image={payment?.image ?? ''} name={'image'} className={'mx-auto max-w-[123.5px] min-h-[60px] lg:max-w-[190px] lg:min-h-[100px]'} />
        </div>
        <div className='col-span-3 my-5'>
          <div className='mb-20 grid grid-cols-1 gap-4'>
            <span>Information</span>
            <div className='grid grid-cols-2 gap-5'>
              <div className='form-control'>
                <div className="label">
                  <span className="label-text">Name</span>
                </div>
                <input type="text" className="input input-md input-bordered min-w-full" name='name' value={payment?.name ?? ''} disabled={!editMode || loading} onChange={handleChangePayment} />
              </div>
              <div className='form-control'>
                <div className="label">
                  <span className="label-text">Status</span>
                </div>
                <select className="select select-bordered w-full" name='status' value={payment?.status ?? ''} disabled={!editMode || loading} onChange={handleChangePayment} >
                  <option value={''} disabled>-- Payment Status --</option>
                  <option value={'inactive'}>Inactive</option>
                  <option value={'idle'}>Idle</option>
                </select>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-5'>
              <div className='form-control'>
                <div className="label">
                  <span className="label-text">Fee</span>
                </div>
                <input type="number" className="input input-md input-bordered min-w-full" name='fee' value={payment?.fee ?? 0} disabled={!editMode || loading} onChange={(e) => handleChangePayment(e, true)} />
              </div>
              <div className='form-control'>
                <div className="label">
                  <span className="label-text">Fee Type</span>
                </div>
                <select className="select select-bordered w-full" name='fee_type' value={payment?.fee_type ?? ''} disabled={!editMode || loading} onChange={handleChangePayment} >
                  <option value={''} disabled>-- Fee Type --</option>
                  <option value={'percent'}>Percent</option>
                  <option value={'amount'}>Amount</option>
                </select>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-5'>
              <div className='form-control'>
                <div className="label">
                  <span className="label-text">Min Amount</span>
                </div>
                <input type="number" className="input input-md input-bordered min-w-full" name='min_amount' value={payment?.min_amount ?? 0} disabled={!editMode || loading} onChange={(e) => handleChangePayment(e, true)} />
              </div>
              <div className='form-control'>
                <div className="label">
                  <span className="label-text">Max Amount</span>
                </div>
                <input type="number" className="input input-md input-bordered min-w-full" name='max_amount' value={payment?.max_amount ?? 0} disabled={!editMode || loading} onChange={(e) => handleChangePayment(e, true)} />
              </div>
            </div>
            <div className='grid grid-cols-1 gap-5'>
              <div className='form-control'>
                <div className="label">
                  <span className="label-text">Description</span>
                </div>
                <textarea className="textarea textarea-bordered" placeholder="Description..." name='description' value={payment?.description ?? ''} disabled={!editMode || loading} onChange={handleChangePayment}></textarea>
              </div>
              <div className='form-control'>
                <div className="label">
                  <span className="label-text">Instruction</span>
                </div>
                <textarea className="textarea textarea-bordered" placeholder="Instruction..." name='instruction' value={payment?.instruction ?? ''} disabled={!editMode || loading} onChange={handleChangePayment}></textarea>
              </div>
            </div>
          </div>
          <div className='mb-20 grid grid-cols-1 gap-4'>
            <span>Payment Type</span>
            <div className='grid grid-cols-2 gap-5'>
              <div className='form-control'>
                <div className="label">
                  <span className="label-text">Code</span>
                </div>
                <input type="text" className="input input-md input-bordered min-w-full" name='payment_code' value={paymentType?.payment_code ?? ''} disabled={!editMode || loading} onChange={(e) => handleChangePayment(e, false, 'payment_type')} />
              </div>
              <div className='form-control'>
                <div className="label">
                  <span className="label-text">Payment Method</span>
                </div>
                <select className="select select-bordered w-full" disabled={!editMode || loading} onChange={(e) => handleChangePayment(e, false, 'payment_type')} name='method' value={paymentType?.method ?? ''}>
                  <option value={''} disabled>-- Payment Method --</option>
                  <option value={'DYNAMIC'}>DYNAMIC</option>
                  <option value={'VIRTUAL_ACCOUNT'}>VIRTUAL ACCOUNT</option>
                  <option value={'ONE_TIME_PAYMENT'}>ONE TIME PAYMENT</option>
                </select>
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-3 col-span-2'>
                <label className="label cursor-pointer justify-normal gap-5">
                  <input type="checkbox" className="checkbox" disabled={!editMode || loading} onChange={(e) => handleChangeChackboxPayment(e, 'payment_type')} name='is_can_refund' checked={paymentType?.is_can_refund ?? false} />
                  <span className="label-text">Can Refund</span>
                </label>
                <label className="label cursor-pointer justify-normal gap-5">
                  <input type="checkbox" className="checkbox" disabled={!editMode || loading} onChange={(e) => handleChangeChackboxPayment(e, 'payment_type')} name='is_can_void' checked={paymentType?.is_can_void  ?? false} />
                  <span className="label-text">Can Void</span>
                </label>
                <label className="label cursor-pointer justify-normal gap-5">
                  <input type="checkbox" className="checkbox" disabled={!editMode || loading} onChange={(e) => handleChangeChackboxPayment(e, 'payment_type')} name='is_tokenized' checked={paymentType?.is_tokenized  ?? false} />
                  <span className="label-text">Is Tokenized</span>
                </label>
              </div>
            </div>
          </div>
          <div className='mb-20 grid grid-cols-1 gap-4'>
            <div className='flex justify-between items-center'>
              <span>Need Requirement</span>
              <label className="label cursor-pointer justify-normal gap-5">
                <input type="checkbox" className="checkbox" disabled={!editMode || loading} onChange={(e) => handleChangeChackboxPayment(e)} name='need_requirement' checked={payment?.need_requirement ?? false} />
                <span className="label-text">Need Requirement</span>
              </label>
            </div>
            {payment?.need_requirement &&
              <>
                <div className='grid grid-cols-2 gap-5 items-end'>
                  <div className='form-control'>
                    <div className="label">
                      <span className="label-text">Requirement</span>
                    </div>
                    <input type="text" className="input input-md input-bordered min-w-full" ref={addRequirementRef} name='name' disabled={!editMode || loading} />
                  </div>
                  <button className='btn bg-blue-500 text-white' disabled={!editMode || loading} onClick={handleAddRequirement}  >
                    <FontAwesomeIcon icon={faPlus} />
                    Add
                  </button>
                </div>
                <div className='flex flex-wrap gap-3'>
                  {payment?.payment_requirements?.map((val, i) => 
                    <div className='px-5 py-2 bg-blue-500 rounded-full gap-3 flex items-center' key={val.required + i}>
                      <div>{val.required}</div>
                      <FontAwesomeIcon icon={faTimes} onClick={() => handleRemoveRequirement(i)} className={editMode ? '' : 'hidden'} />
                    </div>
                  )}
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </>
  )
}
