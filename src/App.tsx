import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useFormStore } from './store/formStore'
import { step1Schema } from './schemas/step1'
import { step2Schema } from './schemas/step2'

// Каждый шаг грузится отдельным чанком: на первом экране в бандле нет
// кода step2/step3, что заметно ускоряет TTI.
const Step1Personal = lazy(() => import('./pages/Step1Personal'))
const Step2Address = lazy(() => import('./pages/Step2Address'))
const Step3Loan = lazy(() => import('./pages/Step3Loan'))

function StepGuard({ allow, children }: { allow: boolean; children: React.ReactNode }) {
  return allow ? <>{children}</> : <Navigate to="/" replace />
}

function StepBar() {
  const { pathname } = useLocation()
  const idx = pathname === '/step3' ? 2 : pathname === '/step2' ? 1 : 0
  return (
    <div className="steps">
      {[0, 1, 2].map((i) => (
        <div key={i} className={`dot ${i <= idx ? 'active' : ''}`} />
      ))}
    </div>
  )
}

function StepFallback() {
  return (
    <div className="text-center text-muted py-5" role="status" aria-live="polite">
      Загрузка…
    </div>
  )
}

export default function App() {
  const step1 = useFormStore((s) => s.step1)
  const step2 = useFormStore((s) => s.step2)
  const step1Ok = step1Schema.safeParse(step1).success
  const step2Ok = step1Ok && step2Schema.safeParse(step2).success

  return (
    <div className="app-shell">
      <StepBar />
      <Suspense fallback={<StepFallback />}>
        <Routes>
          <Route path="/" element={<Step1Personal />} />
          <Route
            path="/step2"
            element={
              <StepGuard allow={step1Ok}>
                <Step2Address />
              </StepGuard>
            }
          />
          <Route
            path="/step3"
            element={
              <StepGuard allow={step2Ok}>
                <Step3Loan />
              </StepGuard>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  )
}
