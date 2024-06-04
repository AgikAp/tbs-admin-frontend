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