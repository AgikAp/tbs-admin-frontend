import React from 'react'
import { idrFormat } from '../../utils/currencyFormat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default function TransactionDetailContent({ content }) {
  return (
    <div className='py-5'>
      <div>
        <span className='block text-[24px] font-semibold'>Information</span>
        <div className='flex'>
          {
            content?.admin_transaction &&
            <div className='badge badge-primary'>
              Admin
            </div>
          }
          {
            content?.guest_transaction &&
            <div className='badge badge-success'>
              Guest
            </div>
          }
        </div>
        <div className='lg:flex pt-3 gap-5'>
          <div className='border-l-2 border-l-blue-500 px-5 py-3'>
            <span className='block text-[14px] font-light'>Order Status</span>
            <span className='block text-[16px] font-bold'>{content?.status}</span>
          </div>
          <div className='border-l-2 border-l-blue-500 px-5 py-3'>
            <span className='block text-[14px] font-light'>Payment Status</span>
            <span className='block text-[16px] font-bold'>{content?.payment_status}</span>
          </div>
        </div>
        <div className='border-l-2 border-l-blue-500 px-5 py-3 my-5 bg-dark-3'>
          {content?.eks_transaction_id ?
            <div className='py-2'>
              <span className='block text-[10px] font-light'>Eks Code</span>
              <span className='block text-[14px] font-bold'>{content?.eks_transaction_id}</span>
            </div> : ''
          }
          <div className='py-2'>
            <span className='block text-[10px] font-light'>Item</span>
            <span className='block text-[14px] font-bold'>{content?.item?.code + ' | ' + content?.item?.name}</span>
          </div>
          <div className='lg:flex gap-4'>
            {content?.saldo ?
              <div className='py-2'>
                <span className='block text-[10px] font-light'>Remainning Saldo</span>
                <span className='block text-[14px] font-bold'>{idrFormat(content?.saldo)}</span>
              </div> : ''
            }
            <div className='py-2'>
              <span className='block text-[10px] font-light'>Sell Price</span>
              <span className='block text-[14px] font-bold'>{idrFormat(content?.sell_price)}</span>
            </div>
            <div className='py-2'>
              <span className='block text-[10px] font-light'>Buy Price</span>
              <span className='block text-[14px] font-bold'>{idrFormat(content?.buy_price)}</span>
            </div>
          </div>
          <div className='py-2'>
            <span className='block text-[10px] font-light'>User Information</span>
            <span className='block text-[14px] font-bold'>{content?.info}</span>
          </div>
          <hr className={`${content?.options?.length === 0 && 'hidden'}`} />
          <div className='lg:flex gap-4'>
            {content?.options?.map(val =>
              <div className='py-2'>
                <span className='block text-[10px] font-light'>{val.name}</span>
                <span className='block text-[14px] font-bold'>{val.value}</span>
              </div>
            )}
          </div>
        </div>
        <div className='border-l-2 border-l-blue-500 px-5 py-3 my-5 bg-dark-3'>
          {content?.payment?.name ?
            <div className='py-2'>
              <span className='block text-[10px] font-light'>Payment</span>
              <span className='block text-[14px] font-bold'>{content?.payment?.name}</span>
            </div> : ''
          }
          {content?.transaction_payment?.payment_external_id ?
            <div className='py-2'>
              <span className='block text-[10px] font-light'>External ID</span>
              <span className='block text-[14px] font-bold'>{content?.transaction_payment?.payment_external_id}</span>
            </div> : ''
          }
          <div className='lg:flex gap-5'>
            <div className='py-2'>
              <span className='block text-[10px] font-light'>Is Done</span>
              <span className='block text-[14px] font-bold'>{content?.transaction_payment?.is_done ? 'Done' : 'Not Done Yet'}</span>
            </div>
            <div className='py-2'>
              <span className='block text-[10px] font-light'>Is Expired</span>
              <span className='block text-[14px] font-bold'>{content?.transaction_payment?.is_expired ? 'Done' : 'Not Expired Yet'}</span>
            </div>
            <div className='py-2'>
              <span className='block text-[10px] font-light'>Is Refunded</span>
              <span className='block text-[14px] font-bold'>{content?.transaction_payment?.is_refunded ? 'Done' : 'Not Refunded Yet'}</span>
            </div>
          </div>
          <hr className={`${content?.transaction_payment_options?.length === 0 && 'hidden'}`} />
          {content?.transaction_payment_options?.map(val =>
            <div className='py-2'>
              <span className='block text-[10px] font-light'>{val.name}</span>
              <span className='block text-[14px] font-bold'>{val.value}</span>
            </div>
          )}
        </div>
        <details className="collapse bg-dark-3 rounded-none border-l-2 border-l-blue-500 ">
          <summary className="collapse-title text-md font-medium">
            <span className='text-[10px] font-thin block'>Click here to expand</span>
            History Transaction
            <FontAwesomeIcon icon={faChevronDown} className='float-end' />
          </summary>
          <div className="collapse-content">
            {content?.histories?.map(val =>
            <div key={val.id} className='my-5'>
              <span className='px-3'>{val.reason}</span>
              <div className="mockup-code">
                <pre className='px-5'><code>{JSON.stringify(JSON.parse(val.description), null, '\t')}</code></pre>
              </div>
            </div>
            )}
          </div>
        </details>
      </div>
      {/* <pre>
        {JSON.stringify(content)}
      </pre> */}
    </div>
  )
}
