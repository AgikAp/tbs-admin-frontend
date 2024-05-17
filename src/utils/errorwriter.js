export const errorWriter = (e, setErr) => {
  if (e?.response?.data) {
    setErr(e?.response?.data?.message + ', ' + e?.response?.data?.errors)
  } else {
    setErr(e?.message)
  }
}