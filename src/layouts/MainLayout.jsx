import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faAlignRight, faGamepad, faHome, faUserGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidenav from '../components/sidenav'
import { useSelector } from 'react-redux'

export default function MainLayout() {
  const navigate = useNavigate()
  const [page, setPage] = useState()
  const game = useSelector((state) => state?.authLogin)
  const { admin } = game

  const defaultPage = (
    <div className='fixed min-w-full min-h-full text-light-1'>
      <div className='grid grid-cols-12'>
        <Sidenav />
        <div className='col-span-12 lg:col-span-10 px-5 py-10 h-lvh overflow-y-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  )

  useEffect(() => {
    if (!admin.token) {
      navigate('/login')
    } else {
      setPage(defaultPage)
    }
  }, [admin])

  return (
    <>
      {page}
    </>
  )
}
