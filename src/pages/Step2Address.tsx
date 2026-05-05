import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useFormStore } from '../store/formStore'
import { step2Schema, type Step2Form } from '../schemas/step2'
import { getCategories } from '../api/products'
import { useAutoSave } from '../hooks/useAutoSave'

export default function Step2Address() {
  const navigate = useNavigate()
  const step2 = useFormStore((s) => s.step2)
  const setStep2 = useFormStore((s) => s.setStep2)

  const { data: categories, error: loadError } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step2Form>({
    resolver: zodResolver(step2Schema),
    defaultValues: step2,
    mode: 'onTouched',
  })

  useAutoSave(watch, (v) => setStep2(v))

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
          defaultValue={step2.workplace}
          disabled={!categories}
          {...register('workplace')}
        >
          <option value="">
            {loadError
              ? `Ошибка загрузки: ${loadError.message}`
              : !categories
                ? 'Загрузка…'
                : '— выберите —'}
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
