import { describe, it, expect, beforeEach } from 'vitest'
import { useFormStore } from '../formStore'

describe('useFormStore', () => {
  beforeEach(() => {
    useFormStore.getState().reset()
  })

  it('начинает с пустых полей и дефолтных значений ползунков', () => {
    const s = useFormStore.getState()
    expect(s.step1.firstName).toBe('')
    expect(s.step3.amount).toBe(200)
    expect(s.step3.term).toBe(10)
  })

  it('setStep1/2/3 обновляют только свои секции', () => {
    const { setStep1, setStep2, setStep3 } = useFormStore.getState()
    setStep1({ phone: '+380501234567', firstName: 'Иван', lastName: 'Петров', gender: 'male' })
    setStep2({ workplace: 'beauty', address: 'Киев' })
    setStep3({ amount: 700, term: 25 })

    const s = useFormStore.getState()
    expect(s.step1.firstName).toBe('Иван')
    expect(s.step2.workplace).toBe('beauty')
    expect(s.step3.amount).toBe(700)
  })

  it('reset возвращает к начальному состоянию', () => {
    const { setStep3, reset } = useFormStore.getState()
    setStep3({ amount: 1000, term: 30 })
    reset()
    expect(useFormStore.getState().step3).toEqual({ amount: 200, term: 10 })
  })
})
