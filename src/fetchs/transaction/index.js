import instance from "../../axios"

export const GET_ListTransaction = async ({ isGuest, needRefund, limit, page, keyword }, setLoading) => {
  setLoading(true)
  try {
    const response = await instance.get(`/transaction?is_guest=${isGuest}&need_refund=${needRefund}&limit=${limit}&page=${page}&keyword=${keyword}`)
    setLoading(false)
    return response
  } catch (e) {
    setLoading(false)
    throw e
  }

}

export const GET_DetailTransaction = async (id, setLoading) => {
  setLoading(true)
  try {
    const response = await instance.get(`/transaction/`+id)
    setLoading(false)
    return response
  } catch (e) {
    setLoading(false)
    throw e
  }

}

export const PUT_RefundTransaction = async (id, setLoading) => {
  setLoading(true)
  try {
    const response = await instance.put(`/transaction/refund/`+id)
    setLoading(false)
    return response
  } catch (e) {
    setLoading(false)
    throw e
  }

}