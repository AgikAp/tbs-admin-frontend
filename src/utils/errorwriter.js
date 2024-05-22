import { prototype } from "postcss/lib/previous-map";

export const errorWriter = (e, setErr) => {
  if (e?.response?.data) {
    if (e?.response?.data?.errors) {
      setErr(e?.response?.data?.message + ', ' + e?.response?.data?.errors)
    }
  } else {
    setErr(e?.message)
  }
}