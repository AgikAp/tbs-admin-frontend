import React, { useEffect, useState } from 'react'
import FloatingLabelInput from '../../components/floatinginputlabel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faL, faSignIn } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchListAuthLogin } from '../../fetchs/auth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const game = useSelector((state) => state?.authLogin)
  const { admin, loading, error } = game

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [first, setFirst] = useState(true)
  const [hideFirstPage, setHideFirstPage] = useState(false)

  const changeToSecondPage = async () => {
    setFirst(false)
    setTimeout(() => {
      setHideFirstPage(true)
    }, 300);
  }

  const submitLogin = async () => {
    dispatch(fetchListAuthLogin({ username, password }))
  }

  useEffect(() => {
    if (admin.token) {
      navigate('/')
    }
  }, [admin])

  return (
    <>
      <div className='bg-cover h-screen bg-bottom bg-transparent' style={{ backgroundImage: `url('https://res.cloudinary.com/drdfptzfg/image/upload/v1721360088/pages/ppljg9bvw4h3w3coiqxq.jpg')` }}>
        <div className='w-full h-screen bg-black/30'>
          <div className='flex justify-center items-center h-screen'>
            <div className='w-full lg:w-1/4 bg-primary-0 rounded-lg p-10 pt-7 shadow-xl relative overflow-hidden'>
              <h1 className='text-2xl font-bold'>Login Page</h1>
              <div className={first ? 'slide-in' : `slide-out ${hideFirstPage && 'hidden'}`}>
                {
                  <>
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      changeToSecondPage()
                    }} className='right-2'>
                      <FloatingLabelInput label="Username" type="text" value={username} onChange={(val) => setUsername(val)} disabled={loading} autoFocus={true} />
                      <div className='mt-3 float-end'>
                        <button className='btn bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 lg:px-7 text-[14px]' type='submit' disabled={!first || loading}>
                          Next
                          <FontAwesomeIcon icon={faAnglesRight} className='ml-2' />
                        </button>
                      </div>
                    </form>
                  </>
                }
              </div>
              <div className={`slide-in ${!hideFirstPage && 'hidden'}`}>
                {
                  <>
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      submitLogin()
                    }} className='right-2'>
                      <FloatingLabelInput label="Password" type="password" value={password} onChange={(val) => setPassword(val)} disabled={loading} autoFocus={true} />
                      <div className='mt-3 float-end'>
                        <button className='btn bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 lg:px-7 text-[14px]' type='submit' disabled={loading}>
                          Sign In
                          <FontAwesomeIcon icon={faSignIn} className='ml-2' />
                        </button>
                      </div>
                    </form>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
