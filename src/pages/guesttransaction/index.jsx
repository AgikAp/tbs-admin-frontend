import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/pageheader'
import Section from '../../components/sections'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDownLong, faArrowUpRightFromSquare, faSearch } from '@fortawesome/free-solid-svg-icons'
import { GET_ListTransaction } from '../../fetchs/transaction'
import { errorWriter } from '../../utils/errorwriter'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroll-component'
import Transaction from './transaction'
import { useDebounce } from '@uidotdev/usehooks'

export default function GuestTransactionPage() {
  const [needRefund, setNeedRefund] = useState(false)
  const [limit, setLimit] = useState(25)
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [liveSync, setLiveSync] = useState(true)
  const keywordDebouce = useDebounce(keyword, 300)

  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)

  const [transactions, setTransactions] = useState([])


  const additionalList = (
    <>
      <div className="form-control gap">
        <label className="cursor-pointer gap-3 label">
          <span className="label-text">Live sync</span>
          <input type="checkbox" className="toggle toggle-primary" checked={liveSync} onChange={(e) => setLiveSync(e.target.checked)} />
        </label>
      </div>

    </>
  )

  const fetchTransaction = async (action, pageAction) => {
    try {
      const response = await GET_ListTransaction({ isGuest: true, needRefund, limit, keyword, page }, setLoading)
      if (action) {
        const tempTransaction = [...response.data.data.data]
        setTransactions(tempTransaction)
      } else {
        const tempTransaction = [...transactions]
        tempTransaction.push(...response.data.data.data)
        setTransactions(tempTransaction)
      }
      setLoading(false)
      setHasMore(response.data.data.page !== response.data.data.total_page)
    } catch (e) {
      errorWriter(e, setErr)
    }
  }

  useEffect(() => {
    fetchTransaction()
  }, [page])

  useEffect(() => {
    setPage(1)
    fetchTransaction(true, 1)
  }, [needRefund, liveSync, keywordDebouce])

  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  return (
    <>
      {err &&
        <div role="alert" className="alert alert-error mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{err}</span>
        </div>}

      <PageHeader page={"Guest Transaction Page"} />
      <div className='my-5'>
        <Section title={'Transaction List'} additional={additionalList}>
          <div className='block lg:flex items-center gap-5 justify-end bg-dark-0 px-5 py-5 rounded-md'>
            <div className="form-control">
              <label className="label cursor-pointer gap-3">
                <input type="checkbox" className="checkbox checkbox-primary" checked={needRefund} onChange={(e) => setNeedRefund(e.target.checked)} />
                <span className="label-text">Need Refund Manually</span>
              </label>
            </div>
            <div className='form-control'>
              <label className="input input-md input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
              </label>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Code</th>
                  <th>Item</th>
                  <th>Time</th>
                  <th>Order</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((val, i) =>
                  <Transaction key={val.id + i} value={val} index={i} transactions={transactions} setTransactions={setTransactions} liveSync={liveSync} />
                )}
              </tbody>
            </table>
            {
              hasMore &&
              <button className='btn bg-primary-2 text-white mt-10 float-end' onClick={loadMore}>Load More <FontAwesomeIcon icon={faArrowDownLong} /></button>
            }
          </div>
        </Section>
      </div >
    </>
  )
}
