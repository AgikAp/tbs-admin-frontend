import instance from "../../axios"

export const GET_RoleList = async (setLoading) => {
  setLoading(true)
  try {
    const response = await instance.get('/role')
    setLoading(false)
    return response
  } catch (e) {
    setLoading(false)
    throw e
  }

}
