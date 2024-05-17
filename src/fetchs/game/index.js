import instance from "../../axios"

export const POST_CreateGame = async (paylaod, setLoading, setErr) => {
  setLoading(true)
  try {
    const response = await instance.post('/game', paylaod)
    return response?.data?.data
  } catch (e) {
    throw e
  }
    
  setLoading(false)
}