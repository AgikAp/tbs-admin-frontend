import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/pageheader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSave, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import Section from '../../components/sections'
import { GET_AccessList } from '../../fetchs/access'
import { DELETE_RoleDelete, GET_RoleList, POST_RoleCreateOrUpdate } from '../../fetchs/role'
import InputLabel from '../../components/inputlabel'
import RoleItem from './roleItem'
import { errorWriter } from '../../utils/errorwriter'

export default function RoleAccessPage() {
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)

  const [activeRole, setActiveRole] = useState({})
  const [detailRole, setDetailRole] = useState({})
  const [accessActive, setAccessActive] = useState([])
  const [comparisonAccessActive, setComparisonAccessActive] = useState([])

  const [accessList, setAccessList] = useState([])
  const [listRole, setListRole] = useState([])

  const fetchAccessList = async () => {
    try {
      const response = await GET_AccessList(setLoading)
      setAccessList(response)
    } catch (e) {
      errorWriter(e, setErr)
    }
  }

  const fetchRoleList = async () => {
    try {
      const response = await GET_RoleList(setLoading, 'structural')
      setListRole(response.data.data)
    } catch (e) {
      errorWriter(e, setErr)
    }
  }

  const postRoleUpdateOrCreate = async (payload) => {
    try {
      const response = await POST_RoleCreateOrUpdate(setLoading, payload, isEdit)
      setDetailRole(response.data)
    } catch (e) {
      errorWriter(e, setErr)
    }
  }

  const deleteRole = async () => {
    try {
      const response = await DELETE_RoleDelete(setLoading, activeRole?.id)
      setDetailRole(response.data)
    } catch (e) {
      errorWriter(e, setErr)
    }
  }

  useEffect(() => {
    fetchAccessList()
    fetchRoleList()
  }, [])

  const recursiveSetRole = (access) => {
    var accesses = [access]
    for (var i = 0; i < access?.accesses?.length; i++) {
      var insideAccess = access?.accesses[i]
      accesses.push(insideAccess)
      if (insideAccess?.accesses > 0) {
        var additionalAccess = recursiveSetRole(insideAccess)
        accesses.push(...additionalAccess)
      }
    }

    return accesses
  }

  useEffect(() => {
    var accesses = []
    activeRole?.role_accesses?.forEach(val => {
      var additionalAccess = recursiveSetRole(val)
      accesses.push(...additionalAccess)
    })

    setAccessActive(accesses)
    setComparisonAccessActive(accesses)
  }, [activeRole])

  const additionalRoleList = (
    <>
      {
        accessActive.length > 0 && accessActive !== comparisonAccessActive &&
        <button className='btn bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 lg:px-7 text-[14px]' onClick={() => onSubmitChangeAccess()} disabled={loading}>
          {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <><FontAwesomeIcon icon={faSave} /> Save</>}
        </button>
      }
    </>
  )

  const showModal = (val, edit) => {
    var newVal = { ...val }
    if (!edit) {
      newVal.parent_id = newVal?.id
      newVal.id = ''
      newVal.name = ''
    } else {
      newVal.before_id = newVal?.id
    }

    setIsEdit(edit)
    setDetailRole(newVal)
    document.getElementById('modal_detail').showModal();
  };

  const closeModal = (id) => {
    document.getElementById(id).close()
  }

  const deleteAction = (val) => {
    setDetailRole(val)
    document.getElementById('modal_delete').showModal();
  }

  const forceUpperSlug = (value) => {
    return value.toUpperCase().replaceAll(' ', '_')
  }

  const onSubmit = async () => {
    await postRoleUpdateOrCreate(detailRole)
    closeModal('modal_detail')
    fetchRoleList()
    setActiveRole({})
    setDetailRole({})
  }

  const onDelete = async () => {
    await deleteRole()
    closeModal('modal_delete')
    fetchRoleList()
    setActiveRole({})
    setDetailRole({})
  }

  const changeAccess = async (index, opt, checked) => {
    var tempAccess = [...accessActive]
    checked ? tempAccess.push(opt) : tempAccess.splice(index, 1)
    setAccessActive(tempAccess)
  }

  const onSubmitChangeAccess = async () => {

    var tempActiveRole = {...activeRole}
    tempActiveRole.before_id = tempActiveRole?.id
    await postRoleUpdateOrCreate({ ...tempActiveRole, role_accesses: accessActive })
    fetchRoleList()
    setActiveRole({})
    setDetailRole({})
  }

  return (
    <>
      {err &&
        <div role="alert" className="alert alert-error mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{err}</span>
        </div>}

      <dialog id="modal_delete" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Confirmation</h3>
          <br />
          <p className='font-thin'>Are you sure to delete role <span className='font-bold'>{detailRole?.name}</span>!</p>
          <div className="modal-action">
            <button className='btn bg-red-800 text-white' onClick={onDelete} disabled={loading}>{loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <><FontAwesomeIcon icon={faTrash} /> Delete</>}</button>
            <form method="dialog">
              <button className="btn" disabled={loading}>Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="modal_detail" className="modal">
        <div className="modal-box">
          {
            isEdit ?
              <h3 className="font-bold text-lg">Edit {detailRole?.id}</h3> :
              <h3 className="font-bold text-lg">Add New</h3>
          }
          <div className=''>
            <InputLabel label={'Parent'} name={'parent'} value={detailRole?.parent_id ?? '-'} readOnly={true} />
            <InputLabel label={'ID'} name={'id'} value={detailRole?.id ?? ''} readOnly={true} />
            <InputLabel label={'Name'} name={'name'} value={detailRole?.name ?? ''} onChange={(e) => {
              setDetailRole({ ...detailRole, id: "ROLE_".concat(forceUpperSlug(e.target.value)), name: e.target.value })
            }} />
          </div>
          <div className="modal-action">
            <button className='btn bg-primary-2 text-white' onClick={onSubmit} disabled={loading}>{loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <><FontAwesomeIcon icon={faSave} /> Save</>}</button>
            <form method="dialog">
              <button className="btn" disabled={loading}>Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <PageHeader page={"Role Access Page"} />
      <div className='my-5'>
        <Section title={'Role Access'} additional={additionalRoleList} >
          <div className='flex-wrap overflow-x-auto min-w-[300px] py-5'>
            <div className='grid grid-cols-8 min-w-[1200px]'>
              <div className='col-span-2 px-2'>
                <div className='overflow-y-auto w-full' style={{ maxHeight: '80vh' }}>
                  {listRole?.map((val, i) =>
                    <RoleItem val={val} key={val + i} action={showModal} setActive={setActiveRole} activeRole={activeRole} deleteAction={deleteAction} />
                  )}
                </div>
              </div>
              <div className='col-span-6 border-l-2 border-l-white/20 px-5'>
                <div className='overflow-y-auto w-full' style={{ maxHeight: '80vh' }}>
                  {
                    accessList.map((val, i) =>
                      <div className='border-b-2 border-b-white/20 last:border-b-0 my-5 px-5' key={val.id + i}>
                        <span className='block'>
                          {val?.id}
                        </span>
                        <div className='flex flex-wrap gap-x-10 gap-y-5 my-7'>
                          {val?.accesses?.map((opt, j) => {
                            var findIndex = accessActive.findIndex(val => val?.id === opt?.id);
                            return (
                              <label className="label cursor-pointer justify-normal" key={opt.id + j}>
                                <input type="checkbox" className="checkbox" checked={findIndex !== -1} name='status' onChange={(e) => changeAccess(findIndex, opt, e.target.checked)} disabled={false} />
                                <span className="label-text pl-5">{opt?.id}</span>
                              </label>
                            )
                          })}
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </>
  )
}
