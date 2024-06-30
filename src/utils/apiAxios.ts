import axios from "axios"
import type { TProduct } from "@/stores/storeProduct"


let baseURL = 'https://api.vue3fi.karasev.ru'
if (/localhost/.test(window.location.host)) {
  baseURL = 'http://vue3-fi.backend'
}


const axiosInstance = axios.create({
  baseURL,
  // withCredentials: true,
  headers: {
    // Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Auth': 'superAuth',
  }
})


function tryCatch<T>(tryFn: () => {}, errFn?: () => {}): T | undefined {
  try {
    return tryFn() as T
  }
  catch (error) {
    if (errFn) return errFn() as any
    else if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data.message
      console.error(message)
    }
  }
}

export async function apiProductAll() {

  try {
    const res = await axiosInstance.post('/product/getAll')
    console.log(res);
    return res.data;
  } catch (error) {
    console.error(error);
  }
  
}




export function userSignIn(payload: { name: string, pass: string }) {
  return axiosInstance.post('/signIn', payload)
}