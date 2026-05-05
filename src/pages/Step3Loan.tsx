import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormState } from '../context/FormContext'
import { step3Schema, type Step3Form } from '../schemas/step3'
import { addProduct } from '../api/products'
import SuccessModal from '../components/SuccessModal'

export default function Step3Loan() {
  const navigate = useNavigate()
  const { state, setStep3, reset } = useFormState()

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [done, setDone] = useState<{ amount: number; term: number } | null>(null)

  const { register, handleSubmit, watch } = useForm<Step3Form>({
    resolver: zodResolver(step3Schema),
    defaultValues: state.step3,
  })

  const amount = watch('amount')
  const term = watch('term')

  const onSubmit = handleSubmit(async (data) => {
    setStep3(data)
    setSubmitting(true)
    setSubmitError(null)
    try {
      const { firstName, lastName } = state.step1
      await addProduct(`${firstName} ${lastName}`)
      setDone({ amount: data.amount, term: data.term })
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Не удалось отправить заявку')
    } finally {
      setSubmitting(false)
    }
  })

  const closeModal = () => {
    setDone(null)
    reset()
    navigate('/', { replace: true })
  }

  return (
    <>
      <form onSubmit={onSubmit} noValidate>
        <h1 className="h4 mb-4">Параметры займа</h1>

        <div className="mb-4">
          <label htmlFor="amount" className="form-label d-flex justify-content-between">
            <span>Сумма займа</span>
            <span className="range-value">${amount}</span>
          </label>
          <input
            id="amount"
            type="range"
            className="form-range"
            min={200}
            max={1000}
            step={100}
            {...register('amount', { valueAsNumber: true })}
          />
          <div className="d-flex justify-content-between text-muted small">
            <span>$200</span>
            <span>$1000</span>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="term" className="form-label d-flex justify-content-between">
            <span>Срок займа</span>
            <span className="range-value">{term} дн.</span>
          </label>
          <input
            id="term"
            type="range"
            className="form-range"
            min={10}
            max={30}
            step={1}
            {...register('term', { valueAsNumber: true })}
          />
          <div className="d-flex justify-content-between text-muted small">
            <span>10 дн.</span>
            <span>30 дн.</span>
          </div>
        </div>

        {submitError && <div className="alert alert-danger">{submitError}</div>}

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary w-50"
            onClick={() => navigate('/step2')}
            disabled={submitting}
          >
            Назад
          </button>
          <button type="submit" className="btn btn-primary w-50" disabled={submitting}>
            {submitting ? 'Отправка…' : 'Подать заявку'}
          </button>
        </div>
      </form>

      {done && (
        <SuccessModal
          firstName={state.step1.firstName}
          lastName={state.step1.lastName}
          amount={done.amount}
          term={done.term}
          onClose={closeModal}
        />
      )}
    </>
  )
}
