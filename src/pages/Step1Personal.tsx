import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormState } from '../context/FormContext'
import { step1Schema, type Step1Form } from '../schemas/step1'
import PhoneInput from '../components/PhoneInput'

export default function Step1Personal() {
  const navigate = useNavigate()
  const { state, setStep1 } = useFormState()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Form>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      phone: state.step1.phone,
      firstName: state.step1.firstName,
      lastName: state.step1.lastName,
      gender: state.step1.gender || undefined,
    },
    mode: 'onTouched',
  })

  const onSubmit = handleSubmit((data) => {
    setStep1(data)
    navigate('/step2')
  })

  return (
    <form onSubmit={onSubmit} noValidate>
      <h1 className="h4 mb-4">Личные данные</h1>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Телефон</label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              id="phone"
              value={field.value}
              onChange={field.onChange}
              invalid={!!errors.phone}
            />
          )}
        />
        {errors.phone && <div className="invalid-feedback d-block">{errors.phone.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">Имя</label>
        <input
          id="firstName"
          type="text"
          className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
          {...register('firstName')}
        />
        {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">Фамилия</label>
        <input
          id="lastName"
          type="text"
          className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
          {...register('lastName')}
        />
        {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="gender" className="form-label">Пол</label>
        <select
          id="gender"
          className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
          defaultValue={state.step1.gender}
          {...register('gender')}
        >
          <option value="">— выберите —</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>
        {errors.gender && <div className="invalid-feedback">{errors.gender.message}</div>}
      </div>

      <button type="submit" className="btn btn-primary w-100">Далее</button>
    </form>
  )
}
