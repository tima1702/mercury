import { useEffect } from 'react'
import type { FieldValues, UseFormWatch } from 'react-hook-form'

// Подписываемся на изменения формы и дебаунсим запись в общий стор.
// Так данные из шага попадают в стор ещё до клика "Далее" — пользователь
// может вернуться назад без потери ввода. Дебаунс нужен, чтобы не дёргать
// сеттер стора на каждое нажатие клавиши.
export function useAutoSave<T extends FieldValues>(
  watch: UseFormWatch<T>,
  save: (values: T) => void,
  delay = 300,
) {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null
    const sub = watch((values) => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => save(values as T), delay)
    })
    return () => {
      sub.unsubscribe()
      if (timer) clearTimeout(timer)
    }
  }, [watch, save, delay])
}
