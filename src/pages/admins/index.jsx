import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/pageheader'
import Section from '../../components/sections'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faCancel, faEdit, faSave, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { errorWriter } from '../../utils/errorwriter'
import { GET_AdminList, POST_AdminCreate } from '../../fetchs/admin'
import CustomSelectOptions from '../../components/customselectoptions'
import { GET_RoleList } from '../../fetchs/role'
import InputLabel from '../../components/inputlabel'

export default function AdminPage() {
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)

  const [admins, setAdmins] = useState([])

  const [adminPayload, setAdminPayload] = useState({})
  const [editMode, setEditMode] = useState(false)
  const [createMode, setCreateMode] = useState(false)
  const [listRole, setListRole] = useState([])

  useEffect(() => {
    fetchAdminList()
    fetchRoleList()
  }, [])

  const fetchAdminList = async () => {
    try {
      const response = await GET_AdminList(setLoading)
      setAdmins(response.data.data)
    } catch (e) {
      errorWriter(e, setErr)
    }
  }

  const fetchRoleList = async () => {
    try {
      const response = await GET_RoleList(setLoading)
      setListRole(response.data.data)
    } catch (e) {
      errorWriter(e, setErr)
    }
  }

  const showModal = (val, isEdit, isCreate) => {
    setEditMode(isEdit)
    setCreateMode(isCreate)
    !isCreate ? setAdminPayload(val) : setAdminPayload({})
    document.getElementById('modal_detail').showModal();
  };

  const closeModal = (id) => {
    document.getElementById('modal_detail').close()
  }

  const handleChangeRoles = (list) => {
    const tempPayload = { ...adminPayload }
    tempPayload.roles = [...list]
    setAdminPayload(tempPayload)
  }

  const handleChange = (e) => {
    const tempPayload = {...adminPayload}
    tempPayload[e.target.name] = e.target.value
    setAdminPayload(tempPayload)
  }

  const handleChangeCheckBox = (e) => {
    const tempPayload = {...adminPayload}
    tempPayload[e.target.name] = e.target.checked
    setAdminPayload(tempPayload)
  }
 
  const additionalAdminList = (
    <>
      <button className='btn bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 lg:px-7 text-[14px]' onClick={() => showModal('', true, true)}>
        <FontAwesomeIcon icon={faUserPlus} />
        Add New
      </button>
    </>
  )

  const handleOnSubmit =  async () => {
    try {
      var response = await POST_AdminCreate(adminPayload, setLoading)
      setAdminPayload(response)
      fetchAdminList()
      closeModal()
    } catch (e) {
      errorWriter(e, setErr)
      return
    }
  }

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
          <div className=''>
            <InputLabel label={'Username'} name={'username'} value={adminPayload?.username ?? ''} onChange={handleChange} disabled={!editMode} />
            <InputLabel label={'Fullname'} name={'fullname'} value={adminPayload?.fullname ?? ''} onChange={handleChange} disabled={!editMode} />
            {editMode &&
              <InputLabel label={'Password'} name={'password'} type={'password'} value={adminPayload?.password ?? ''} onChange={handleChange} disabled={!editMode} />
            }
            <CustomSelectOptions list={listRole} listData={adminPayload?.roles ?? []} setListData={handleChangeRoles} onChange={handleChange} disabled={!editMode} />
            <label className="label cursor-pointer mt-5 justify-normal">
              <input type="checkbox" className="checkbox" checked={adminPayload?.status ?? true} name='status' onChange={handleChangeCheckBox} disabled={!editMode} />
              <span className="label-text pl-5">Active</span>
            </label>
          </div>
          <div className="modal-action">
            {
              editMode && !createMode &&
              <button className='btn bg-red-500 text-white' onClick={() => setEditMode(false)}><FontAwesomeIcon icon={faCancel} /> Cancel</button>
            }
            {
              !editMode && !createMode && adminPayload?.username?.toLowerCase() !== 'superadmin' && 
              <button className='btn bg-primary-2 text-white' onClick={() => setEditMode(true)}><FontAwesomeIcon icon={faEdit} /> Edit</button>
            }
            {
              editMode &&
              <button className='btn bg-primary-2 text-white' onClick={handleOnSubmit}><FontAwesomeIcon icon={faSave} /> Save</button>
            }
            {
              (!editMode || (editMode && createMode)) &&
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
            }
          </div>
        </div>
      </dialog>


      <PageHeader page={"Admin List Page"} />
      <div className='my-5'>
        <Section title={'Admin List'} additional={additionalAdminList}>
          <div className="overflow-x-auto">
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
                    <tr className={''} key={val.id + i}>
                      <th>{i + 1}</th>
                      <td>{val.username}</td>
                      <td>{val.fullname}</td>
                      <td>{val.status ? 'Active' : 'Inactive'}</td>
                      <td>{val.roles.map(val => val.name).join(', ')}</td>
                      <td><FontAwesomeIcon icon={faArrowUpRightFromSquare} className='hover:cursor-pointer' onClick={() => showModal(val, false, false)} /></td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </>
  )
}
