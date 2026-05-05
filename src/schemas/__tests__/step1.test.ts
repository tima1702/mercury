import { describe, it, expect } from 'vitest'
import { step1Schema } from '../step1'

describe('step1Schema', () => {
  it('принимает валидные данные', () => {
    const result = step1Schema.safeParse({
      phone: '+380501234567',
      firstName: 'Иван',
      lastName: 'Петров',
      gender: 'male',
    })
    expect(result.success).toBe(true)
  })

  it('режектит телефон без плюса', () => {
    const result = step1Schema.safeParse({
      phone: '380501234567',
      firstName: 'Иван',
      lastName: 'Петров',
      gender: 'male',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(['phone'])
    }
  })

  it('режектит пустые имя/фамилию', () => {
    const result = step1Schema.safeParse({
      phone: '+380501234567',
      firstName: '   ',
      lastName: '',
      gender: 'female',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0])
      expect(paths).toContain('firstName')
      expect(paths).toContain('lastName')
    }
  })

  it('режектит неизвестное значение пола', () => {
    const result = step1Schema.safeParse({
      phone: '+380501234567',
      firstName: 'Иван',
      lastName: 'Петров',
      gender: 'other',
    })
    expect(result.success).toBe(false)
  })
})
