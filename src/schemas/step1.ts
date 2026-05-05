import { z } from 'zod'

const phoneRegex = /^0\d{3} \d{3} \d{3}$/

export const step1Schema = z.object({
  phone: z.string().regex(phoneRegex, 'Введите телефон в формате 0XXX XXX XXX'),
  firstName: z.string().trim().min(1, 'Введите имя'),
  lastName: z.string().trim().min(1, 'Введите фамилию'),
  gender: z.enum(['male', 'female'], { message: 'Выберите пол' }),
})

export type Step1Form = z.infer<typeof step1Schema>
