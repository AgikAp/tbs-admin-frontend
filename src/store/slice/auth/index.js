import { createSlice } from "@reduxjs/toolkit";
import { fetchListAuthLogin } from "../../../fetchs/auth";

const initialState = {
  loading: false,
  admin: {},
  error: null
}


export const authLoginSlice = createSlice({
  name: 'authLogin',
  initialState,
  reducers: {
    acClearState(state) {
      state.loading = false;
      state.admin = {};
      state.error = null; 

      localStorage.removeItem('persist:root');
      console.log('Success logout');
      
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListAuthLogin.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchListAuthLogin.fulfilled, (state, action) => {
      var data = action.payload.data      
      state.admin = data
      state.loading = false
    })
    builder.addCase(fetchListAuthLogin.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload.errors
    })
  }
});

export const { acClearState } = authLoginSlice.actions

