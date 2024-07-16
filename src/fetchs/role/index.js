import instance from "../../axios"

export const GET_RoleList = async (setLoading, withAccess) => {
  setLoading(true)
  try {
    var url = withAccess ? '/role?access='.concat(withAccess) : '/role'
    const response = await instance.get(url)
    setLoading(false)
    return response
  } catch (e) {
    setLoading(false)
    throw e
  }

}

export const POST_RoleCreateOrUpdate = async (setLoading, payload, update) => {
  setLoading(true)
  try {
    var url = update ? '/role?update' : '/role'
    const response = await instance.post(url, payload)
    setLoading(false)
    return response
  } catch (e) {
    setLoading(false)
    throw e
  }

}
