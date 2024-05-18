import instance from "../../axios"

export const POST_CreateGame = async (paylaod, setLoading) => {
  setLoading(true)
  try {
    const response = await instance.post('/game', paylaod)
    setLoading(false)
    return response?.data?.data
  } catch (e) {
    setLoading(false)
    throw e
  }
    
}

export const GET_GetGameByID = async (id, setLoading) => {
  setLoading(true)
  try {
    const response = await instance.get('/game/' + id)
    setLoading(false)
    return response?.data?.data
  } catch (e) {
    setLoading(false)
    throw e
  }
    
}

export const GET_GetGameList = async (setLoading) => {
  setLoading(true)
  try {
    const response = await instance.get('/game')
    setLoading(false)
    return response?.data?.data
  } catch (e) {
    setLoading(false)
    throw e
  }
}