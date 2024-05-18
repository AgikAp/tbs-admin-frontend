import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/pageheader'
import Section from '../../components/sections'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { GET_GetGameList } from '../../fetchs/game'
import { errorWriter } from '../../utils/errorwriter'
import GameCard from './gamecard'

export default function GamePage() {
  const navigate = useNavigate()
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const resp = await GET_GetGameList(setLoading)
        setGames(resp)
      } catch (e) {
        errorWriter(e, setErr)
      }
    }

    fetch()
  }, [])

  const additionalGameList = (
    <>
      <button className='btn bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 lg:px-7 text-[14px]' onClick={() => navigate('/game/create')}>
        <FontAwesomeIcon icon={faPlus} />
        Add New
      </button>
    </>
  )

  return (
    <>
      <div>
        {err &&
          <div role="alert" className="alert alert-error mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{err}</span>
          </div>}
        <PageHeader page={'Games Page'} />
        <div className='py-10'>
          <Section title={'GAME LIST'} additional={additionalGameList}>
            <div className='grid grid-cols-2 lg:grid-cols-6 gap-4 my-5'>
              {games?.map(val => 
                <GameCard image={val.image} name={val.name} status={val.status} id={val.id} key={val.id} />
              )}
            </div>
          </Section>
        </div>
      </div>
    </>
  )
}
