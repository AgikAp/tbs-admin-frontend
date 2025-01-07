import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/pageheader'
import Section from '../../components/sections'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPlus, faSpinner, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import BannerCard from './bannercard'
import InputFile from '../../components/inputfile'
import { DELETE_RemoveBanner, GET_ListBanner, POST_CreateOrUpdate } from '../../fetchs/banner'
import { errorWriter } from '../../utils/errorwriter'
import { POST_UploadImage } from '../../fetchs/image'
import { useSelector } from 'react-redux'

export default function BannerPage() {
  const state = useSelector((state) => state?.authLogin)
  const { admin } = state.admin

  const [err, setErr] = useState(null)
  const [image, setImage] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [banners, setBanners] = useState([])

  const [imagePreview, setImagePreview] = useState('')

  const fetchListBanner = async () => {
    try {
      const response = await GET_ListBanner(setLoading)
      console.log(response);
      setBanners(response.data.data)
    } catch (e) {
      errorWriter(e, setErr)
      return
    }
  }

  useEffect(() => {
    fetchListBanner()
  }, [])

  const additionalBannerList = (
    <>
      <button className={admin?.accesses?.includes('BANNER_UPDATE') ? 'btn bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 lg:px-7 text-[14px]' : 'hidden'} onClick={() => openModal('modal_add_banner')}>
        <FontAwesomeIcon icon={faPlus} />
        Add New
      </button>
    </>
  )

  const openModal = (id) => {
    setImage('')
    setImageFile(null)
    document.getElementById(id).showModal()
  }

  const closeModal = (id) => {
    document.getElementById(id).close()
  }

  const changeImage = (e) => {
    const selectedFile = e.target.files[0]
    setImage(URL.createObjectURL(selectedFile))
    setImageFile(selectedFile)
  }

  const previewBanner = (img) => {
    openModal('modal_preview')
    setImagePreview(img)
  }

  const handleCreateBanner = async () => {
    let urlImage = ""
    if (imageFile) {
      try {
        urlImage = await POST_UploadImage(imageFile, setLoading)
        setImage(urlImage)
      } catch (e) {
        closeModal('modal_add_banner')
        errorWriter(e, setErr)
        return
      }
    }

    let payload = {
      image: urlImage,
      show: true
    }

    let response = {}
    try {
      response = await POST_CreateOrUpdate(payload, setLoading)
      setBanners([response.data.data, ...banners])
      closeModal('modal_add_banner')
    } catch (e) {
      errorWriter(e, setErr)
      closeModal('modal_add_banner')
      return
    }
  }

  const handleRemoveBanner = async (id, index) => {
    try {
      const response = await DELETE_RemoveBanner(id, setLoading)
      const tempBanner = [...banners]
      tempBanner.splice(index, 1)
      response.status === 200 ? setBanners(tempBanner) : setErr('failed deleting banner')
    } catch (e) {
      errorWriter(e, setErr)
    }
  }

  const handleChangeShowing = async (show, index) => {
    let banner = banners[index]
    banner.show = show
    try {
      const response = await POST_CreateOrUpdate(banner, setLoading)
      const tempBanner = [...banners]
      tempBanner[index] = response.data.data
      setBanners(tempBanner)
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

      <div></div>

      <dialog id="modal_add_banner" className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => closeModal('modal_add_banner')}>✕</button>
          </form>
          <div className='py-5 px-3'>
            <InputFile editMode={true} name={'item_image'} className={'max-w-full min-h-[100px]'} image={image} handleChangeImage={changeImage} />
            <div className='form-control float-end mt-5'>
              <button className='btn bg-blue-500 w-fit px-10 text-white' disabled={loading} onClick={handleCreateBanner}>
                {loading ?
                  <FontAwesomeIcon icon={faSpinner} spin /> :
                  <FontAwesomeIcon icon={faUpload} />
                }
                Uplaod
              </button>
            </div>
          </div>
        </div>
      </dialog>

      <dialog id="modal_preview" className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => closeModal('modal_preview')}>✕</button>
          </form>
          <div className='py-5 px-3'>
            <img src={imagePreview} alt={imagePreview} />
          </div>
        </div>
      </dialog>

      <PageHeader page={'Banners Page'} />
      <div className='my-5'>
        <Section title={"Banner List"} additional={additionalBannerList}>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
            {banners.map((val, i) => 
              <BannerCard key={val.id} preview={previewBanner} index={i} banner={val} removeBanner={handleRemoveBanner} changeShowing={handleChangeShowing} />
            )}
          </div>
        </Section>
      </div>
    </>
  )
}
