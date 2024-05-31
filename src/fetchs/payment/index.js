import instance from "../../axios"

export const GET_ListPayment = async (setLoading) => {
  setLoading(true)
  try {
    const response = await instance.get('/payment')
    setLoading(false)
    return response
  } catch (e) {
    setLoading(false)
    throw e
  }

}

export const POST_CreateOrUpdatePayment = async (payload, setLoading) => {
  setLoading(true)
  try {
    const response = await instance.post('/payment', payload)
    setLoading(false)
    return response
  } catch (e) {
    setLoading(false)
    throw e
  }

}
