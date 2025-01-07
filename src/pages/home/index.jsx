import React from 'react'
import PageHeader from '../../components/pageheader'
import { useSelector } from 'react-redux'

export default function HomePage() {
  const state = useSelector((state) => state?.authLogin)
  const { admin } = state.admin
  console.log(admin.accesses);
  
  return (
    <>
      <div>
        <PageHeader page={'Home Page'} />
        <div>
          {/* Welcome back {admin} */}
        </div>
      </div>
    </>
  )
}
