// Кешируем сам Promise, чтобы повторные обращения к списку категорий
// не создавали новых сетевых запросов и не зависели от порядка вызовов.

const BASE = 'https://dummyjson.com'

let categoriesPromise: Promise<string[]> | null = null

export function getCategories(): Promise<string[]> {
  if (!categoriesPromise) {
    categoriesPromise = fetch(`${BASE}/products/category-list`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json() as Promise<string[]>
      })
      .catch((err) => {
        // сбрасываем кеш, чтобы можно было повторить попытку
        categoriesPromise = null
        throw err
      })
  }
  return categoriesPromise
}

export type AddProductResponse = { id: number; title: string }

export function addProduct(title: string): Promise<AddProductResponse> {
  return fetch(`${BASE}/products/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  }).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    return r.json() as Promise<AddProductResponse>
  })
}
