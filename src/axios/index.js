import axios from "axios";
import { getUserFromLocalStorage } from "../utils/authUtil";
import { saveUserToLocalStorage } from "../utils/authUtil";
import { clearUserFromLocalStorage } from "../utils/authUtil";

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  // withCredentials: true,
  headers: {
    Authorization: 'Bearer ' + getUserFromLocalStorage()?.admin?.token
  }
})

instance.interceptors.response.use((response) => {
  return response
},
  async (error) => {
    const originalConfig = error.config
    if (error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        await axios.post(import.meta.env.VITE_APP_BASE_URL + '/auth/admin/refresh', { token: getUserFromLocalStorage()?.admin?.refresh }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          var data = getUserFromLocalStorage()
          data.admin = JSON.stringify(response.data.data)
          saveUserToLocalStorage(data)
        }).catch((error) => {
          clearUserFromLocalStorage()
          window.location.href = '/login'
          return Promise.reject(error);
        })

        originalConfig.headers['Authorization'] = 'Bearer ' + getUserFromLocalStorage()?.admin?.token
        return instance(originalConfig);
      }

      if (error.response.status === 400) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
)

export default instance