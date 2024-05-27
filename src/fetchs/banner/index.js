import instance from "../../axios"

export const POST_CreateOrUpdate = async (paylaod, setLoading) => {
  setLoading(true)
  try {
    const response = await instance.post('/banner', paylaod)
    setLoading(false)
    return response
  } catch (e) {
    setLoading(false)
    throw e
  }

}

export const GET_ListBanner = async (setLoading) => {
  setLoading(true)
  try {
    const response = await instance.get('/banner')
    setLoading(false)
    return response
  } catch (e) {
    setLoading(false)
    throw e
  }

}

export const DELETE_RemoveBanner = async (id, setLoading) => {
  setLoading(true)
  try {
    const response = await instance.delete('/banner/' + id)
    setLoading(false)
    return response
  } catch (e) {
    setLoading(false)
    throw e
  }
}