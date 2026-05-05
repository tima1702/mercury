type Props = {
  firstName: string
  lastName: string
  amount: number
  term: number
  onClose: () => void
}

export default function SuccessModal({ firstName, lastName, amount, term, onClose }: Props) {
  return (
    <>
      <div className="modal-backdrop fade show" />
      <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Заявка одобрена</h5>
              <button type="button" className="btn-close" aria-label="Закрыть" onClick={onClose} />
            </div>
            <div className="modal-body">
              <p className="mb-0">
                Поздравляем, {lastName} {firstName}. Вам одобрена ${amount} на {term} дней.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={onClose}>OK</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
