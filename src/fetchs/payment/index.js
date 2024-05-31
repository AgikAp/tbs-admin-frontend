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

export const DELETE_DeletePaymentByID = async (id, setLoading) => {
  setLoading(true)
  try {
    await instance.delete('/payment/'.concat(id))
    setLoading(false)
  } catch (e) {
    setLoading(false)
    throw e
  }

}
