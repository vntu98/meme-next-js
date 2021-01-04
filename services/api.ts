import { BASE_URL } from '../constants'
import fetch from 'isomorphic-fetch'

type ConfigType = {
  method?: string,
  data?: any
}

const api = {
  callJson: async (url: string, { data, method = 'GET' }: ConfigType = {}) => {
    const URL = `${BASE_URL}${url}`
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    return fetch(URL, config).then(res => res.json())
  }
}

export default api