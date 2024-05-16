import React from 'react'
import PageHeader from '../../components/pageheader'
import Section from '../../components/sections'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

export default function GamePage() {
  const navigate = useNavigate()

  const additionalGameList = (
    <>
      <button className='btn bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 xl:px-7 text-[14px]' onClick={() => navigate('/game/create')}>
        <FontAwesomeIcon icon={faPlus} />
        Add New
      </button>
    </>
  )
  
  return (
    <>
      <div>
        <PageHeader page={'Games Page'} />
        <div className='py-10'>
          <Section title={'GAME LIST'} additional={additionalGameList}>
            <div>Hello worlds</div>
          </Section>
        </div>
      </div>
    </>
  )
}
