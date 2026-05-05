import { create } from 'zustand'

export type Gender = 'male' | 'female'

export type Step1Data = {
  phone: string
  firstName: string
  lastName: string
  gender: Gender | ''
}

export type Step2Data = {
  workplace: string
  address: string
}

export type Step3Data = {
  amount: number
  term: number
}

type FormStore = {
  step1: Step1Data
  step2: Step2Data
  step3: Step3Data
  setStep1: (data: Step1Data) => void
  setStep2: (data: Step2Data) => void
  setStep3: (data: Step3Data) => void
  reset: () => void
}

const initial = {
  step1: { phone: '', firstName: '', lastName: '', gender: '' as Gender | '' },
  step2: { workplace: '', address: '' },
  step3: { amount: 200, term: 10 },
}

export const useFormStore = create<FormStore>((set) => ({
  ...initial,
  setStep1: (step1) => set({ step1 }),
  setStep2: (step2) => set({ step2 }),
  setStep3: (step3) => set({ step3 }),
  reset: () => set(initial),
}))
