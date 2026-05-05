import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormState } from '../context/FormContext'
import { step2Schema, type Step2Form } from '../schemas/step2'
import { getCategories } from '../api/products'

export default function Step2Address() {
  const navigate = useNavigate()
  const { state, setStep2 } = useFormState()

  const [categories, setCategories] = useState<string[] | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2Form>({
    resolver: zodResolver(step2Schema),
    defaultValues: state.step2,
    mode: 'onTouched',
  })

  useEffect(() => {
    let cancelled = false
    getCategories()
      .then((list) => {
        if (!cancelled) setCategories(list)
      })
      .catch((err: Error) => {
        if (!cancelled) setLoadError(err.message)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const onSubmit = handleSubmit((data) => {
    setStep2(data)
    navigate('/step3')
  })

  return (
    <form onSubmit={onSubmit} noValidate>
      <h1 className="h4 mb-4">Адрес и место работы</h1>

      <div className="mb-3">
        <label htmlFor="workplace" className="form-label">Место работы</label>
        <select
          id="workplace"
          className={`form-select ${errors.workplace ? 'is-invalid' : ''}`}
          defaultValue={state.step2.workplace}
          disabled={!categories}
          {...register('workplace')}
        >
          <option value="">
            {loadError ? `Ошибка загрузки: ${loadError}` : !categories ? 'Загрузка…' : '— выберите —'}
          </option>
          {categories?.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.workplace && <div className="invalid-feedback">{errors.workplace.message}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="address" className="form-label">Адрес проживания</label>
        <input
          id="address"
          type="text"
          className={`form-control ${errors.address ? 'is-invalid' : ''}`}
          {...register('address')}
        />
        {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
      </div>

      <div className="d-flex gap-2">
        <button type="button" className="btn btn-outline-secondary w-50" onClick={() => navigate('/')}>
          Назад
        </button>
        <button type="submit" className="btn btn-primary w-50">Далее</button>
      </div>
    </form>
  )
}
