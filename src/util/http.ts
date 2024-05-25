import axios, { type AxiosRequestConfig } from 'axios'

export async function GET(uri: string, config?: AxiosRequestConfig) {
  const response = await axios.get(uri, config)
  return response.data
}
