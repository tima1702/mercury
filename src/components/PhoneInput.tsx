import { PhoneInput as IntlPhoneInput } from 'react-international-phone'

// react-international-phone: селектор страны + автоматическая маска
// под формат конкретной страны. Лёгкая (без libphonenumber-js),
// маски и флаги встроены.

// Определяем страну по локали браузера: navigator.language даёт что-то
// вроде "ru-RU", "en-US"; Intl.Locale умеет вытащить регион. Если в локали
// нет региона ("ru" без RU) — пробуем navigator.languages, затем фоллбэк us.
function detectCountry(): string {
  if (typeof navigator === 'undefined') return 'us'
  const langs = [navigator.language, ...(navigator.languages ?? [])]
  for (const lang of langs) {
    try {
      const region = new Intl.Locale(lang).region
      if (region) return region.toLowerCase()
    } catch {
      // некорректный тег — пропускаем
    }
  }
  return 'us'
}

const defaultCountry = detectCountry()

type Props = {
  value: string
  onChange: (value: string) => void
  invalid?: boolean
  id?: string
}

export default function PhoneInput({ value, onChange, invalid, id }: Props) {
  return (
    <IntlPhoneInput
      defaultCountry={defaultCountry}
      value={value}
      onChange={onChange}
      inputProps={{ id }}
      inputClassName={`form-control ${invalid ? 'is-invalid' : ''}`}
      className="phone-input"
    />
  )
}
