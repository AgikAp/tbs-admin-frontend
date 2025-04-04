import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authLoginSlice } from "./slice/auth";


const persistConfig = {
  key: 'root',
  storage,
}

const authLoginPersist = persistReducer(persistConfig, authLoginSlice.reducer)
const store = configureStore({
  reducer: {
    authLogin: authLoginPersist,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true
})

const persistor = persistStore(store)

export { store, persistor }