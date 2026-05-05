import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SuccessModal from '../SuccessModal'

describe('<SuccessModal />', () => {
  it('рендерит сообщение по шаблону из ТЗ', () => {
    render(
      <SuccessModal
        firstName="Иван"
        lastName="Петров"
        amount={500}
        term={20}
        onClose={() => {}}
      />,
    )
    expect(
      screen.getByText('Поздравляем, Петров Иван. Вам одобрена $500 на 20 дней.'),
    ).toBeInTheDocument()
  })

  it('зовёт onClose при клике на кнопку OK', async () => {
    const onClose = vi.fn()
    render(
      <SuccessModal
        firstName="Иван"
        lastName="Петров"
        amount={500}
        term={20}
        onClose={onClose}
      />,
    )
    await userEvent.click(screen.getByRole('button', { name: 'OK' }))
    expect(onClose).toHaveBeenCalledOnce()
  })
})
