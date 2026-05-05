import { z } from 'zod'

export const step2Schema = z.object({
  workplace: z.string().min(1, 'Выберите место работы'),
  address: z.string().trim().min(1, 'Введите адрес'),
})

export type Step2Form = z.infer<typeof step2Schema>
