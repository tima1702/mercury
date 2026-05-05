import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
})

export async function getCategories(): Promise<string[]> {
  const { data } = await api.get<string[]>('/products/category-list')
  return data
}

export type AddProductResponse = { id: number; title: string }

export async function addProduct(title: string): Promise<AddProductResponse> {
  const { data } = await api.post<AddProductResponse>('/products/add', { title })
  return data
}
