import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/pageheader'
import Section from '../../components/sections'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { errorWriter } from '../../utils/errorwriter'
import { GET_AdminList } from '../../fetchs/admin'

export default function AdminPage() {
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)

  const [admins, setAdmins] = useState([])

  useEffect(() => {
    fetchAdminList()
  }, [])

  const fetchAdminList = async () => {
    try {
      const response = await GET_AdminList(setLoading)
      setAdmins(response.data.data)
    } catch (e) {
      errorWriter(e, setErr)
    }
  }

  const showModal = () => {
    document.getElementById('modal_detail').showModal();
  };

  const additionalAdminList = (
    <>
      <button className='btn bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 lg:px-7 text-[14px]' onClick={() => ''}>
        <FontAwesomeIcon icon={faUserPlus} />
        Add New
      </button>
    </>
  )

  return (
    <>
      {err &&
        <div role="alert" className="alert alert-error mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{err}</span>
        </div>}

      <dialog id="modal_detail" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Detail</h3>
          <p className="py-4">Are you sure to refund </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>


      <PageHeader page={"Admin List Page"} />
      <div className='my-5'>
        <Section title={'Admin List'} additional={additionalAdminList}>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Username</th>
                <th>Fullname</th>
                <th>Status</th>
                <th>Roles</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                admins.map((val, i) =>
                  <tr className={''}>
                    <th>{i+1}</th>
                    <td>{val.username}</td>
                    <td>{val.fullname}</td>
                    <td>{val.status ? 'Active' : 'Inactive'}</td>
                    <td>{val.roles.map(val => val.name).join(', ')}</td>
                    <td><FontAwesomeIcon icon={faArrowUpRightFromSquare} className='hover:cursor-pointer' onClick={showModal} /></td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </Section>
      </div>
    </>
  )
}
