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
