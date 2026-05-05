import { forwardRef } from 'react'
import { IMaskInput } from 'react-imask'

// react-imask: маска 0XXX XXX XXX из ТЗ. Ручной regex плохо переживает
// вставку из буфера и редактирование курсором в середине строки.

type Props = {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  invalid?: boolean
  id?: string
}

const PhoneInput = forwardRef<HTMLInputElement, Props>(function PhoneInput(
  { value, onChange, onBlur, invalid, id },
  ref,
) {
  return (
    <IMaskInput
      mask="0000 000 000"
      definitions={{ '0': /[0-9]/ }}
      lazy={false}
      placeholderChar="X"
      overwrite="shift"
      inputRef={ref as never}
      id={id}
      type="tel"
      inputMode="numeric"
      className={`form-control ${invalid ? 'is-invalid' : ''}`}
      value={value}
      onAccept={(v: string) => onChange(v)}
      onBlur={onBlur}
    />
  )
})

export default PhoneInput
