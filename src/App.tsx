import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Step1Personal from './pages/Step1Personal'
import Step2Address from './pages/Step2Address'
import Step3Loan from './pages/Step3Loan'
import { useFormState } from './context/FormContext'
import { step1Schema } from './schemas/step1'
import { step2Schema } from './schemas/step2'

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

export default function App() {
  const { state } = useFormState()
  const step1Ok = step1Schema.safeParse(state.step1).success
  const step2Ok = step1Ok && step2Schema.safeParse(state.step2).success

  return (
    <div className="app-shell">
      <StepBar />
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
    </div>
  )
}
