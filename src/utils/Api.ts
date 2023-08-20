import config from '@/config'
import axios from 'axios'

const MAX_RETRY = 3
let retry = 0

interface Options {
  token?: string
  isServer: boolean
}

export default function Api(options?: Options) {
  const instance = axios.create({
    baseURL:
      options?.isServer && process.env.APP_ENV === 'prod'
        ? config.server_prod_url
        : config.server_url,
    withCredentials: true,
    headers: {
      Authorization: options?.token ? `Bearer ${options.token}` : undefined,
    },
  })

  const refreshAccessToken = () => instance.get('/users/refresh-token')

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      let a: any
      try {
        a = document.createElement('a')
        a.href = '/auth'
        a.hidden = true
      } catch (err) {
        console.error(err)
      }
      const originalRequest = error.config

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        retry < MAX_RETRY
      ) {
        originalRequest._retry = true
        retry += 1
        return refreshAccessToken().then(() => {
          return axios(originalRequest)
        })
      }

      if (retry === 3) {
        retry = 0
        try {
          if (!window.location.pathname.startsWith('/auth')) a.click()
        } catch (err) {
          console.error(err)
        }
      }

      return Promise.reject(error)
    },
  )

  return instance
}
