import { BASE_URL } from '../constants'
import fetch from 'isomorphic-fetch'

type ConfigType = {
  method?: string,
  token?: string,
  data?: any
}

type ConfigFormType = {
  method?: string,
  token?: string,
  data?: FormData
}

const api = {
  callJson: async (url: string, { data, method = 'GET', token }: ConfigType = {}) => {
    const URL = `${BASE_URL}${url}`
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return fetch(URL, config).then(res => res.json())
  },
  callFormData: async (url: string, { data, method = 'POST', token }: ConfigFormType = {}) => {
    const URL = `${BASE_URL}${url}`
    const config = {
      method,
      headers: {

      },
      body: data
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return fetch(URL, config).then(res => res.json())
  }
}

export default api