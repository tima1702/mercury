import { PhoneInput as IntlPhoneInput } from 'react-international-phone'

// react-international-phone: селектор страны + автоматическая маска
// под формат конкретной страны. Лёгкая (без libphonenumber-js),
// маски и флаги встроены.

type Props = {
  value: string
  onChange: (value: string) => void
  invalid?: boolean
  id?: string
}

export default function PhoneInput({ value, onChange, invalid, id }: Props) {
  return (
    <IntlPhoneInput
      defaultCountry="ua"
      value={value}
      onChange={onChange}
      inputProps={{ id }}
      inputClassName={`form-control ${invalid ? 'is-invalid' : ''}`}
      className="phone-input"
    />
  )
}
