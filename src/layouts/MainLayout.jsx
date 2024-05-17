import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faAlignRight, faGamepad, faHome, faUserGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidenav from '../components/sidenav'

export default function MainLayout() {
  return (
    <>
      <div className='fixed min-w-full min-h-full text-light-1'>
        <div className='grid grid-cols-12'>
          <Sidenav />
          <div className='col-span-12 lg:col-span-10 px-5 py-10 h-lvh overflow-y-auto'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
