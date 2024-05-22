import instance from "../../axios"

export const GET_SyncItem = async (param, available, setLoading) => {
  setLoading(true)
  try {
    const response = await instance.get('/item/sync?isAvailable=' + available + '&keyword=' + param)
    setLoading(false)
    return response?.data?.data
  } catch (e) {
    setLoading(false)
    throw e
  }

}

export const GET_Items = async (gameId, setLoading) => {
  setLoading(true)
  try {
    const response = await instance.get('/item/' + gameId)
    setLoading(false)
    return response?.data?.data
  } catch (e) {
    setLoading(false)
    throw e
  }

}

export const POST_AssignItem = async (paylaod, gameId, setLoading) => {
  setLoading(true)
  try {
    const response = await instance.post('/item/assign/' + gameId, paylaod)
    setLoading(false)
    return response?.data?.data
  } catch (e) {
    setLoading(false)
    throw e
  }

}