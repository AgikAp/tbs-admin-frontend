import instance from "../../axios"

export const GET_AccessList = async (setLoading) => {
  setLoading(true)
  try {
    const response = await instance.get('/access')
    setLoading(false)
    return response?.data?.data
  } catch (e) {
    setLoading(false)
    throw e
  }

}
