import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios"

export const fetchListAuthLogin = createAsyncThunk(
  "fetch/authLogin",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post('/auth/admin/login', payload)
      return response?.data
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)