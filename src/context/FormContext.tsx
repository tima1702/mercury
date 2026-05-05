import { createContext, useContext, useMemo, useReducer, type ReactNode } from 'react'

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

export type FormState = {
  step1: Step1Data
  step2: Step2Data
  step3: Step3Data
}

const initialState: FormState = {
  step1: { phone: '', firstName: '', lastName: '', gender: '' },
  step2: { workplace: '', address: '' },
  step3: { amount: 200, term: 10 },
}

type Action =
  | { type: 'setStep1'; payload: Step1Data }
  | { type: 'setStep2'; payload: Step2Data }
  | { type: 'setStep3'; payload: Step3Data }
  | { type: 'reset' }

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'setStep1':
      return { ...state, step1: action.payload }
    case 'setStep2':
      return { ...state, step2: action.payload }
    case 'setStep3':
      return { ...state, step3: action.payload }
    case 'reset':
      return initialState
  }
}

type Ctx = {
  state: FormState
  setStep1: (d: Step1Data) => void
  setStep2: (d: Step2Data) => void
  setStep3: (d: Step3Data) => void
  reset: () => void
}

const FormCtx = createContext<Ctx | null>(null)

export function FormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = useMemo<Ctx>(
    () => ({
      state,
      setStep1: (d) => dispatch({ type: 'setStep1', payload: d }),
      setStep2: (d) => dispatch({ type: 'setStep2', payload: d }),
      setStep3: (d) => dispatch({ type: 'setStep3', payload: d }),
      reset: () => dispatch({ type: 'reset' }),
    }),
    [state],
  )

  return <FormCtx.Provider value={value}>{children}</FormCtx.Provider>
}

export function useFormState() {
  const ctx = useContext(FormCtx)
  if (!ctx) throw new Error('useFormState must be used within FormProvider')
  return ctx
}
