import { useQuery } from '@tanstack/react-query'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { getCategories } from '../api/products'

type Props = {
  defaultValue: string
  invalid: boolean
  registration: UseFormRegisterReturn
}

export default function WorkplaceSelect({ defaultValue, invalid, registration }: Props) {
  const query = useQuery({ queryKey: ['categories'], queryFn: getCategories })
  const className = `form-select ${invalid ? 'is-invalid' : ''}`

  if (query.status === 'pending') {
    return (
      <select id="workplace" className={className} disabled defaultValue="">
        <option value="">Загрузка…</option>
      </select>
    )
  }

  if (query.status === 'error') {
    return (
      <select id="workplace" className={className} disabled defaultValue="">
        <option value="">Ошибка загрузки: {query.error.message}</option>
      </select>
    )
  }

  return (
    <select id="workplace" className={className} defaultValue={defaultValue} {...registration}>
      <option value="">— выберите —</option>
      {query.data.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  )
}
