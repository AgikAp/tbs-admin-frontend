import React from 'react'

export default function PaymentListCard({ name, payment, paymentSelected, onChange }) {
  return (
    <>
      <div className={`collapse bg-base-200 ${paymentSelected.id === payment.id && 'bg-slate-800'}`}>
        < input type="radio" name={name} onChange={onChange} value={payment.id} checked={paymentSelected.id === payment.id} />
      <div className="collapse-title text-lg font-medium">
        {payment.name} <span className='capitalize text-[12px] font-light align-top'>({payment.status})</span>
      </div>
      <div className="collapse-content text-[14px] text-dark-4">
        <p>{payment.description}</p>
      </div>
    </div >
    </>
  )
}
