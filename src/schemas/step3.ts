import { z } from 'zod'

export const step3Schema = z.object({
  amount: z.number().min(200).max(1000),
  term: z.number().min(10).max(30),
})

export type Step3Form = z.infer<typeof step3Schema>
