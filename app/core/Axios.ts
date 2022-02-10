import axios from 'axios'
export type { AxiosError } from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL
console.log('Service URL: ', apiUrl)

const defaultOptions = {
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
}

const instance = axios.create(defaultOptions)

export const axiosSetTokenInterceptor = (token: string) => {
  instance.interceptors.request.use((config) => {
    if (!config?.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`,
      )
    }
    console.log('trigger axiosSetTokenInterceptor()')
    config.headers['Authorization'] = token ? `Bearer ${token}` : ''
    return config
  })
}

export const axiosRemoveTokenInterceptor = () => {
  instance.interceptors.request.use((config) => {
    if (!config?.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`,
      )
    }
    delete config.headers['Authorization']
    return config
  })
}

export default instance
