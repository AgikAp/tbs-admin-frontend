import instance from "../../axios"

export const GET_AdminList = async (setLoading) => {
  setLoading(true)
  try {
    const response = await instance.get('/admin')
    setLoading(false)
    return response
  } catch (e) {
    setLoading(false)
    throw e
  }

}

export const POST_AdminCreate = async (paylaod, setLoading) => {
  setLoading(true)
  try {
    const response = await instance.post('/admin', paylaod)
    setLoading(false)
    return response?.data?.data
  } catch (e) {
    setLoading(false)
    throw e
  }
    
}