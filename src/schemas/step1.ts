import { z } from 'zod'

// Телефон в формате E.164: + и минимум 8 цифр (короткие номера некоторых стран)
const phoneRegex = /^\+\d{8,15}$/

export const step1Schema = z.object({
  phone: z.string().regex(phoneRegex, 'Введите телефон полностью'),
  firstName: z.string().trim().min(1, 'Введите имя'),
  lastName: z.string().trim().min(1, 'Введите фамилию'),
  gender: z.enum(['male', 'female'], { message: 'Выберите пол' }),
})

export type Step1Form = z.infer<typeof step1Schema>
